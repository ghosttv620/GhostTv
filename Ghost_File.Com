<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gh👻st_File Downloads</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            /* ওয়েবসাইট থেকে টেক্সট সিলেক্ট বা কপি করা বন্ধ করার জন্য */
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        body {
            background-color: #070913;
            color: #ffffff;
            min-height: 100vh;
            padding: 20px 10px;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
        }

        /* Header / Logo - One Line Fix for Mobile */
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 5px;
            width: 100%;
        }

        .logo {
            font-size: 24px;
            font-weight: 800;
            display: inline-block;
            white-space: nowrap;
            letter-spacing: 0.5px;
            animation: glowText 2s ease-in-out infinite alternate;
        }

        @media (min-width: 768px) {
            .logo {
                font-size: 32px;
            }
        }

        .logo .ghost-part {
            color: #ff3333;
        }

        .logo .downloader-part {
            color: #00bfff;
            margin-left: 6px;
        }

        @keyframes glowText {
            0% {
                text-shadow: 0 0 8px rgba(255, 51, 51, 0.3), 0 0 15px rgba(0, 191, 255, 0.3);
            }
            100% {
                text-shadow: 0 0 20px rgba(255, 51, 51, 0.8), 0 0 35px rgba(0, 191, 255, 0.8);
            }
        }

        /* Cards Layout */
        .cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }

        /* Download Card: Transparent Background & 10px Border Radius */
        .download-card {
            background: transparent;
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 18px;
            text-align: center;
            position: relative;
            z-index: 1;
            overflow: hidden;
            transition: all 0.4s ease;
            cursor: pointer;
        }

        .download-card:hover {
            border-color: #00bfff;
            transform: translateY(-5px);
            box-shadow: 0 0 20px rgba(0, 191, 255, 0.4);
        }

        .download-card.selected {
            border: 2px solid transparent;
            box-shadow: 0 0 25px rgba(0, 255, 0, 0.7), inset 0 0 15px rgba(0, 255, 0, 0.2);
            transform: translateY(-5px);
        }

        /* কার্ডের ভেতরের নাম কালারফুল অ্যানিমেশন */
        .card-title {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
            animation: titleColorAnim 4s infinite;
        }

        @keyframes titleColorAnim {
            0% { color: #ff3333; }
            33% { color: #00bfff; }
            66% { color: #00ff00; }
            100% { color: #ff3333; }
        }

        /* Card Image Box */
        .card-img-box {
            width: 100%;
            height: 140px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
        }

        .card-img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
            pointer-events: none; /* ছবি ড্র্যাগ করা বা সেভ করা রোধ করতে */
        }

        .download-card:hover .card-img-box img, .download-card.selected .card-img-box img {
            transform: scale(1.08);
        }

        /* Download Button with Animation */
        .card-download-btn {
            background: linear-gradient(135deg, #ff3333, #cc0000);
            color: white;
            padding: 12px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            box-shadow: 0 4px 15px rgba(255, 51, 51, 0.4);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .card-download-btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: 0.5s;
        }

        .card-download-btn:hover::after {
            left: 100%;
        }

        .download-card.selected .card-download-btn {
            background: linear-gradient(135deg, #00ff00, #00aa00);
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
            transform: scale(1.02);
            animation: btnPulse 1.5s infinite;
        }

        @keyframes btnPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
        }

        .card-download-btn:active {
            transform: scale(0.98);
        }

        .status-msg {
            grid-column: 1 / -1;
            text-align: center;
            color: #9ca3af;
            font-size: 15px;
            padding: 20px;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 30px 0;
            margin-top: 30px;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
        }
    </style>
</head>
<body>

    <div class="container">
        
        <!-- Header with One-line Animated Name -->
        <div class="header">
            <div class="logo">
                <span class="ghost-part">Gh👻st_File</span>
                <span class="downloader-part">Downloads</span>
            </div>
        </div>

        <!-- Cards Container -->
        <div class="cards-container" id="cardsContainer">
            <div class="status-msg">Loading files...</div>
        </div>

        <!-- Footer -->
        <footer>
            <p>Copyright 2026 Gh👻st_File Downloads. All Rights Reserved.</p>
        </footer>

    </div>

    <script>
        // ১. রাইট ক্লিক ডিজেবল করা
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        // ২. কিবোর্ড শর্টকাট দিয়ে ডেভলপার টুল ও সোর্স কোড দেখা বন্ধ করা (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U ইত্যাদি)
        document.addEventListener('keydown', function(e) {
            if (
                e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) || 
                (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's'))
            ) {
                e.preventDefault();
                return false;
            }
        });

        function selectCard(card) {
            const allCards = document.querySelectorAll('.download-card');
            allCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('selected');
                }
            });
            card.classList.toggle('selected');
        }

        async function loadFiles() {
            const container = document.getElementById('cardsContainer');
            const jsonUrl = 'https://raw.githubusercontent.com/nirob1520/Ghost-File/main/Ghost_File.json';

            const fallbackData = [
                { title: "Free Fire", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300", downloadLink: "#" },
                { title: "Hyper V Win_10", image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=300", downloadLink: "#" },
                { title: "Hyper V Win_11", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300", downloadLink: "#" }
            ];

            try {
                const response = await fetch(jsonUrl);
                if (!response.ok) throw new Error('Network response was not ok');
                
                const files = await response.json();
                renderCards(files && files.length > 0 ? files : fallbackData);

            } catch (error) {
                console.warn('Using fallback data due to fetch error:', error);
                renderCards(fallbackData);
            }
        }

        function renderCards(files) {
            const container = document.getElementById('cardsContainer');
            container.innerHTML = '';

            files.forEach(item => {
                const card = document.createElement('div');
                card.className = 'download-card';
                card.setAttribute('onclick', 'selectCard(this)');

                card.innerHTML = `
                    <div class="card-title">${item.title || 'Untitled'}</div>
                    <div class="card-img-box">
                        <img src="${item.image || ''}" alt="${item.title || 'File Image'}" draggable="false">
                    </div>
                    <a href="${item.downloadLink || '#'}" class="card-download-btn" target="_blank">
                        <i class="fa-solid fa-download"></i> DOWNLOAD
                    </a>
                `;

                container.appendChild(card);
            });
        }

        loadFiles();
    </script>

</body>
</html>
