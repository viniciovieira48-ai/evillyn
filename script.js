/**
 * EVILLYN Galaxy - Interactive Cosmic Experience
 * Version: 1.0
 */

// ===== CONFIGURATION =====
const CONFIG = {
    particleCount: Math.min(100, Math.floor(window.innerWidth / 10)),
    starCount: Math.min(200, Math.floor(window.innerWidth / 5)),
    animationDuration: 2000,
};

// ===== STATE MANAGEMENT =====
const state = {
    isMusicPlaying: false,
    isInitialized: false,
    currentScreen: 'intro',
};

// ===== DOM ELEMENTS =====
const elements = {
    particles: document.getElementById('particles'),
    introScreen: document.getElementById('intro'),
    overlayScreen: document.getElementById('overlay'),
    startBtn: document.getElementById('startBtn'),
    backBtn: document.getElementById('backBtn'),
    music: document.getElementById('music'),
    musicBtn: document.getElementById('musicBtn'),
    nameText: document.getElementById('name'),
    messageText: document.getElementById('message'),
};

// ===== PARTICLES BACKGROUND =====
function createParticles() {
    // Clear existing particles
    elements.particles.innerHTML = '';

    for (let i = 0; i < CONFIG.particleCount; i++) {
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

        elements.particles.appendChild(particle);
    }

    console.log(`✨ Created ${CONFIG.particleCount} particles`);
}

// ===== STARS BACKGROUND =====
function createStars() {
    const starsBg = document.querySelectorAll('.stars-bg');

    starsBg.forEach((bg, bgIndex) => {
        // Clear existing stars
        bg.innerHTML = '';

        for (let i = 0; i < CONFIG.starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            const randomOpacity = Math.random() * 0.5 + 0.3;
            const randomDuration = Math.random() * 3 + 2;
            const uniqueKeyframe = `twinkle-${bgIndex}-${i}`;

            star.style.left = randomX + 'px';
            star.style.top = randomY + 'px';
            star.style.opacity = randomOpacity;
            star.style.animation = `${uniqueKeyframe} ${randomDuration}s infinite`;

            // Create unique keyframe animation
            if (i === 0) {
                const style = document.createElement('style');
                style.innerHTML = `
                    @keyframes ${uniqueKeyframe} {
                        0%, 100% { opacity: ${randomOpacity}; }
                        50% { opacity: ${Math.max(randomOpacity * 0.5, 0.1)}; }
                    }
                `;
                document.head.appendChild(style);
            }

            bg.appendChild(star);
        }
    });

    console.log(`⭐ Created stars for ${starsBg.length} background(s)`);
}

// ===== SCREEN NAVIGATION =====
function navigateToScreen(targetScreen) {
    // Remove active class from all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Add active class to target screen
    targetScreen.classList.add('active');

    // Update state
    if (targetScreen === elements.introScreen) {
        state.currentScreen = 'intro';
    } else if (targetScreen === elements.overlayScreen) {
        state.currentScreen = 'overlay';
    }

    console.log(`🎬 Navigated to ${state.currentScreen} screen`);
}

// Start button click handler
elements.startBtn.addEventListener('click', () => {
    navigateToScreen(elements.overlayScreen);
});

// Back button click handler
elements.backBtn.addEventListener('click', () => {
    navigateToScreen(elements.introScreen);
});

// ===== MUSIC CONTROL =====
function initializeMusic() {
    // Attempt to auto-play music
    const playPromise = elements.music.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                state.isMusicPlaying = true;
                updateMusicButton();
                console.log('🎵 Music auto-play successful');
            })
            .catch(error => {
                // Auto-play was prevented by browser
                state.isMusicPlaying = false;
                updateMusicButton();
                console.log('🔇 Auto-play prevented by browser (user interaction required)');
            });
    }
}

function updateMusicButton() {
    if (state.isMusicPlaying) {
        elements.musicBtn.textContent = '🔊';
        elements.musicBtn.classList.remove('muted');
        elements.musicBtn.setAttribute('title', 'Mute Music');
    } else {
        elements.musicBtn.textContent = '🔇';
        elements.musicBtn.classList.add('muted');
        elements.musicBtn.setAttribute('title', 'Play Music');
    }
}

function toggleMusic() {
    if (state.isMusicPlaying) {
        elements.music.pause();
        state.isMusicPlaying = false;
    } else {
        const playPromise = elements.music.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    state.isMusicPlaying = true;
                })
                .catch(error => {
                    console.warn('Failed to play music:', error);
                    state.isMusicPlaying = false;
                });
        }
    }
    updateMusicButton();
}

elements.musicBtn.addEventListener('click', toggleMusic);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Escape':
            if (state.currentScreen === 'overlay') {
                elements.backBtn.click();
            }
            break;
        case 'Enter':
            if (state.currentScreen === 'intro') {
                elements.startBtn.click();
            }
            break;
    }
});

// ===== TEXT INTERACTIVITY =====
if (elements.nameText) {
    elements.nameText.addEventListener('click', function () {
        // Reset animation
        this.style.animation = 'none';
        // Trigger reflow to restart animation
        void this.offsetWidth;
        this.style.animation = 'glow 2s ease-in-out infinite';
    });

    // Add hover effect
    elements.nameText.style.cursor = 'pointer';
}

if (elements.messageText) {
    elements.messageText.addEventListener('click', function () {
        // Reset animation
        this.style.animation = 'none';
        // Trigger reflow to restart animation
        void this.offsetWidth;
        this.style.animation = 'fadeInDelay 1.2s ease-out forwards';
    });

    // Add hover effect
    elements.messageText.style.cursor = 'pointer';
}

// ===== TOUCH OPTIMIZATION =====
document.addEventListener('touchend', (event) => {
    // Improve touch responsiveness
    if (event.target.tagName === 'BUTTON') {
        event.target.focus();
    }
});

// Prevent double-tap zoom on buttons
document.addEventListener('touchmove', (event) => {
    if (event.scale !== 1 && event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// ===== WINDOW RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Update particle count based on new window size
        CONFIG.particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
        CONFIG.starCount = Math.min(200, Math.floor(window.innerWidth / 5));

        // Recreate particles for better performance
        createParticles();
        createStars();

        console.log('📐 Window resized - particles updated');
    }, 250); // Debounce resize
});

// ===== PERFORMANCE MONITORING =====
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`⚡ Page load time: ${loadTime}ms`);
    }
}

// ===== INITIALIZATION =====
function initialize() {
    if (state.isInitialized) return;

    console.log('🚀 Initializing EVILLYN Galaxy...');

    // Create visual elements
    createParticles();
    createStars();

    // Initialize music
    initializeMusic();

    // Set initialization flag
    state.isInitialized = true;

    console.log('✅ EVILLYN Galaxy loaded successfully! ❤️');
    console.log('💫 Welcome to the cosmic experience');

    // Log performance metrics
    logPerformance();
}

// ===== DOM READY =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    // DOM is already ready
    initialize();
}

// ===== PAGE VISIBILITY HANDLER =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (state.isMusicPlaying) {
            elements.music.pause();
            console.log('⏸️ Music paused (page hidden)');
        }
    } else {
        if (state.isMusicPlaying) {
            elements.music.play().catch(error => {
                console.warn('Failed to resume music:', error);
            });
            console.log('▶️ Music resumed (page visible)');
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('❌ Error:', event.message, event.filename, event.lineno);
});

// ===== UNLOAD HANDLER =====
window.addEventListener('beforeunload', () => {
    if (state.isMusicPlaying) {
        elements.music.pause();
    }
});
