const MASTER_KEY = '$2a$10$HxsYIZoT7QPdPK.EtQZnG.e7AqIWHwpgQ/wsSSavXR3kTM6r.bsWG';
const USER_BIN = '6a351a15da38895dfedcd033';
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1520076484738416700/u82UBIcHlqgXP4uBcJCEJexHgRna2UTspg_b3VXyhXDTcn8Wxaff4byvDO3zzCEq_iRS';

const KEYS = {
    movie: 'https://raw.githubusercontent.com/ghosttv620/Ghost-Movie/main/Movie.json',
    livetv: 'https://raw.githubusercontent.com/ghosttv620/Ghost-Tv/main/Tv.json',
    adult: 'https://raw.githubusercontent.com/ghosttv620/Ghost-Adult/main/Adult.json'
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { action } = req.query;

    try {
        if (KEYS[action]) {
            const response = await fetch(KEYS[action]);
            const data = await response.json();
            return res.status(200).json(data);
        }

        if (action === 'users_latest') {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${USER_BIN}/latest`, {
                headers: {
                    'X-Master-Key': MASTER_KEY,
                    'X-Bin-Meta': 'false'
                }
            });
            const data = await response.json();
            return res.status(200).json(data);
        }

        if (action === 'users_update' && req.method === 'PUT') {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${USER_BIN}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': MASTER_KEY
                },
                body: JSON.stringify(req.body)
            });
            const data = await response.json();
            return res.status(200).json(data);
        }

        if (action === 'report_problem' && req.method === 'POST') {
            const response = await fetch(DISCORD_WEBHOOK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            });
            if (response.ok) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(500).json({ error: 'Failed to send report' });
            }
        }

        return res.status(400).json({ error: 'Invalid action' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
