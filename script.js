// === Particles Background ===
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomDuration = Math.random() * 10 + 15;
        const randomDelay = Math.random() * 5;

        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        particle.style.animationDuration = randomDuration + 's';
        particle.style.animationDelay = randomDelay + 's';

        particlesContainer.appendChild(particle);
    }
}

// === Create Stars ===
function createStars() {
    const starsBg = document.querySelectorAll('.stars-bg');

    starsBg.forEach(bg => {
        const starCount = Math.min(200, Math.floor(window.innerWidth / 5));

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            const randomOpacity = Math.random() * 0.5 + 0.3;
            const randomDuration = Math.random() * 3 + 2;

            star.style.left = randomX + 'px';
            star.style.top = randomY + 'px';
            star.style.opacity = randomOpacity;
            star.style.animation = `twinkle ${randomDuration}s infinite`;

            // Add twinkle animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes twinkle {
                    0%, 100% { opacity: ${randomOpacity}; }
                    50% { opacity: ${randomOpacity * 0.5}; }
                }
            `;
            if (i === 0) document.head.appendChild(style);

            bg.appendChild(star);
        }
    });
}

// === Screen Navigation ===
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const introScreen = document.getElementById('intro');
const overlayScreen = document.getElementById('overlay');

startBtn.addEventListener('click', () => {
    introScreen.classList.remove('active');
    overlayScreen.classList.add('active');
});

backBtn.addEventListener('click', () => {
    overlayScreen.classList.remove('active');
    introScreen.classList.add('active');
});

// === Music Control ===
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');
let isMusicPlaying = false;

// Try to auto-play music (may be blocked by browser)
window.addEventListener('load', () => {
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                isMusicPlaying = true;
                musicBtn.classList.remove('muted');
            })
            .catch(() => {
                // Auto-play was prevented
                isMusicPlaying = false;
                musicBtn.classList.add('muted');
            });
    }
});

musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        music.pause();
        isMusicPlaying = false;
        musicBtn.classList.add('muted');
        musicBtn.textContent = '🔇';
    } else {
        music.play();
        isMusicPlaying = true;
        musicBtn.classList.remove('muted');
        musicBtn.textContent = '🔊';
    }
});

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createStars();
});

// === Responsive Particles on Resize ===
window.addEventListener('resize', () => {
    // Recreate particles on window resize for better performance
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
    createParticles();
});

// === Keyboard Navigation ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (overlayScreen.classList.contains('active')) {
            backBtn.click();
        }
    }
    if (e.key === 'Enter') {
        if (introScreen.classList.contains('active')) {
            startBtn.click();
        }
    }
});

// === Touch/Mobile Optimization ===
document.addEventListener('touchend', (e) => {
    // Prevent double-tap zoom
    if (e.touches.length === 0) {
        e.target.focus();
    }
});

// === Add some interactivity to the main text ===
const nameText = document.getElementById('name');
const messageText = document.getElementById('message');

if (nameText) {
    nameText.addEventListener('click', () => {
        nameText.style.animation = 'none';
        setTimeout(() => {
            nameText.style.animation = 'glow 2s ease-in-out infinite';
        }, 10);
    });
}

if (messageText) {
    messageText.addEventListener('click', () => {
        messageText.style.animation = 'none';
        setTimeout(() => {
            messageText.style.animation = 'fadeInDelay 1.2s ease-out';
        }, 10);
    });
}

console.log('🚀 EVILLYN Galaxy loaded successfully! ❤️');