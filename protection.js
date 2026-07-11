(function() {
    const ALLOWED = ['ghosttv.top', 'www.ghosttv.top'];
    const host = window.location.hostname;
    
    if (!ALLOWED.includes(host)) {
        document.documentElement.innerHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Access Denied</title>
                <style>
                    body { background:#0a0a0a; color:#ff0040; font-family:Arial; 
                           display:flex; justify-content:center; align-items:center; 
                           height:100vh; margin:0; text-align:center; }
                    .box { padding:50px; border:2px solid #ff0040; border-radius:12px; 
                           background:#1a1a1a; max-width:500px; }
                    h1 { font-size:52px; margin:0; color:#ff0040; }
                    p { color:#888; font-size:18px; margin-top:15px; }
                    .domain { color:#ff0040; font-weight:bold; font-size:22px; }
                </style>
            </head>
            <body>
                <div class="box">
                    <h1>⛔ ACCESS DENIED</h1>
                    <p>Available only at <span class="domain">ghosttv.top</span></p>
                </div>
            </body>
            </html>
        `;
        throw new Error('Unauthorized');
    }
})();
