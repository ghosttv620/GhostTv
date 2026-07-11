// ========================================
// 🛡️ GHOSTTV DOMAIN PROTECTION
// ========================================

(function() {
    'use strict';
    
    // অনুমোদিত ডোমেইন লিস্ট
    const ALLOWED = [
        'ghosttv.top',
        'www.ghosttv.top'
    ];
    
    const currentHost = window.location.hostname;
    
    // চেক করা
    const isAllowed = ALLOWED.some(domain => 
        currentHost === domain || 
        currentHost.endsWith('.' + domain)
    );
    
    // যদি অনুমোদিত না হয়
    if (!isAllowed) {
        // পুরো পেজ রিপ্লেস করা
        document.documentElement.innerHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>⛔ Access Denied - GhostTV</title>
                <style>
                    * { margin:0; padding:0; box-sizing:border-box; }
                    body {
                        background: #0a0a0a;
                        color: #ff0040;
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
                        border: 2px solid #ff0040;
                        border-radius: 12px;
                        background: #1a1a1a;
                        max-width: 500px;
                        box-shadow: 0 0 50px rgba(255,0,64,0.1);
                    }
                    h1 { 
                        font-size: 52px; 
                        margin: 0; 
                        color: #ff0040;
                        text-shadow: 0 0 30px rgba(255,0,64,0.3);
                    }
                    p { 
                        color: #888; 
                        font-size: 18px; 
                        margin-top: 15px;
                    }
                    .domain { 
                        color: #ff0040; 
                        font-weight: bold;
                        font-size: 24px;
                    }
                    .icon {
                        font-size: 80px;
                        display: block;
                        margin-bottom: 10px;
                    }
                    .info {
                        font-size: 12px;
                        color: #444;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="box">
                    <span class="icon">⛔</span>
                    <h1>ACCESS DENIED</h1>
                    <p>This site is only available at</p>
                    <p class="domain">ghosttv.top</p>
                    <p class="info">Unauthorized: ${currentHost}</p>
                </div>
            </body>
            </html>
        `;
        
        // সব JavaScript থামানো
        throw new Error('⛔ Unauthorized domain: ' + currentHost);
    }
    
    // ✅ অনুমোদিত
    console.log('✅ GhostTV: Authorized -', currentHost);
    
})();
