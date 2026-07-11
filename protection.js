// ============================================
// 🛡️ GhostTV Ultimate Domain Protection v2.0
// ============================================
(function() {
    'use strict';
    
    // অনুমোদিত ডোমেইন লিস্ট
    const ALLOWED = [
        'ghosttv.top',
        'www.ghosttv.top'
    ];
    
    const currentHost = window.location.hostname;
    const currentUrl = window.location.href;
    
    // চেক করা
    const isAllowed = ALLOWED.some(domain => 
        currentHost === domain || 
        currentHost.endsWith('.' + domain)
    );
    
    // যদি অনুমোদিত না হয়
    if (!isAllowed) {
        // সব ধরণের অ্যাক্সেস ব্লক
        document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Access Denied - GhostTV</title>
                <style>
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
                    .container {
                        padding: 40px;
                        border: 2px solid #ff0040;
                        border-radius: 10px;
                        background: #1a1a1a;
                    }
                    h1 { font-size: 48px; margin: 0; }
                    p { color: #888; font-size: 18px; }
                    .domain { color: #ff0040; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>⛔ ACCESS DENIED</h1>
                    <p>This site is only available at</p>
                    <p class="domain">ghosttv.top</p>
                    <p style="font-size:14px; color:#555; margin-top:20px;">
                        Unauthorized access attempt detected from: ${currentHost}
                    </p>
                </div>
            </body>
            </html>
        `);
        
        // সব JavaScript থামানো
        throw new Error('Unauthorized domain: ' + currentHost);
    }
    
    // লগ (ডিবাগিং-এর জন্য)
    console.log('✅ GhostTV: Authorized domain -', currentHost);
})();
