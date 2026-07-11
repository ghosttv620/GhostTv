(async function() {
    try {
        const res = await fetch('protection.json');
        if (!res.ok) throw new Error('Config missing');
        
        const config = await res.json();
        const host = window.location.hostname;
        const allowed = config.allowedDomains || [];
        
        const isAllowed = allowed.some(d => 
            host === d || host.endsWith('.' + d)
        );
        
        if (!isAllowed) {
            const block = config.blockPage || {};
            document.documentElement.innerHTML = `
                <!DOCTYPE html>
                <html>
                <head><title>${block.title || 'Access Denied'}</title>
                <style>
                    * { margin:0; padding:0; box-sizing:border-box; }
                    body {
                        background: ${block.bgColor || '#0a0a0a'};
                        color: ${block.textColor || '#ff0040'};
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                    }
                    .box {
                        padding: 50px;
                        border: 2px solid ${block.borderColor || '#ff0040'};
                        border-radius: 12px;
                        background: ${block.boxBg || '#1a1a1a'};
                        max-width: 500px;
                    }
                    h1 { font-size: 52px; margin:0; color:${block.textColor || '#ff0040'}; }
                    p { color:#888; font-size:18px; margin-top:15px; }
                    .domain { color:${block.textColor || '#ff0040'}; font-weight:bold; font-size:24px; }
                    .info { font-size:12px; color:#444; margin-top:20px; }
                </style>
                </head>
                <body>
                    <div class="box">
                        <h1>${block.heading || '⛔ ACCESS DENIED'}</h1>
                        <p>${block.message || 'This site is only available at'}</p>
                        <p class="domain">${block.domain || 'ghosttv.top'}</p>
                        <p class="info">${host}</p>
                    </div>
                </body>
                </html>
            `;
            throw new Error('Unauthorized');
        }
        console.log('✅ Authorized:', host);
    } catch (err) {
        document.documentElement.innerHTML = `
            <!DOCTYPE html>
            <html>
            <head><title>⚠️ Error</title>
            <style>
                body { background:#0a0a0a; color:#ff0040; font-family:Arial; 
                       display:flex; justify-content:center; align-items:center; 
                       height:100vh; margin:0; text-align:center; }
                .box { padding:50px; border:2px solid #ff0040; border-radius:12px; 
                       background:#1a1a1a; max-width:500px; }
                h1 { font-size:40px; margin:0; color:#ff0040; }
                p { color:#888; font-size:16px; margin-top:15px; }
            </style>
            </head>
            <body>
                <div class="box">
                    <h1>⚠️ CONFIG ERROR</h1>
                    <p>protection.json not found!</p>
                </div>
            </body>
            </html>
        `;
        console.error('Error:', err);
    }
})();
