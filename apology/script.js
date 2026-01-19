// Toggle the hidden messages
function showMore() {
    const moreMessage = document.getElementById('more-message');
    const giftMessage = document.getElementById('gift-message');
    
    if (moreMessage.classList.contains('show')) {
        moreMessage.classList.remove('show');
        // Reset the angry section when closing
        resetAngrySection();
    } else {
        moreMessage.classList.add('show');
        giftMessage.classList.remove('show');
        // Reset angry section when opening fresh
        resetAngrySection();
    }
}

// Reset the angry section to initial state
function resetAngrySection() {
    const angryButtons = document.querySelector('.angry-buttons');
    const angryQuestion = document.querySelector('.angry-question');
    const cuteMessage = document.getElementById('cuteMessage');
    const yesBtn = document.getElementById('yesBtn');
    
    if (angryButtons) {
        angryButtons.style.display = 'flex';
    }
    if (angryQuestion) {
        angryQuestion.style.display = 'block';
    }
    if (cuteMessage) {
        cuteMessage.classList.add('hidden');
    }
    if (yesBtn) {
        yesBtn.textContent = 'Yes 😤';
        yesBtn.style.left = '0px';
        yesBtn.style.top = '0px';
    }
}

function showGift() {
    const giftMessage = document.getElementById('gift-message');
    const moreMessage = document.getElementById('more-message');
    
    if (giftMessage.classList.contains('show')) {
        giftMessage.classList.remove('show');
    } else {
        giftMessage.classList.add('show');
        moreMessage.classList.remove('show');
        createConfetti();
    }
}

// ============ RUNAWAY YES BUTTON ============
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const cuteMessage = document.getElementById('cuteMessage');

// Make YES button run away on hover/touch
if (yesBtn) {
    yesBtn.addEventListener('mouseenter', runAway);
    yesBtn.addEventListener('touchstart', runAway);
    yesBtn.addEventListener('click', runAway);
}

function runAway(e) {
    e.preventDefault();
    
    const btn = yesBtn;
    const container = document.querySelector('.still-angry-section');
    const containerRect = container.getBoundingClientRect();
    
    // Random position within container
    const maxX = containerRect.width - btn.offsetWidth - 40;
    const maxY = 150;
    
    const randomX = Math.random() * maxX - maxX/2;
    const randomY = Math.random() * maxY;
    
    btn.style.position = 'relative';
    btn.style.transition = 'all 0.3s ease';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    
    // Change button text randomly
    const texts = ['Pakro mujhe! 😜', 'Haha! 🏃‍♂️', 'Too slow! 💨', 'Miss! 😂', 'Try again! 🤪', 'Nahi milonga! 😝'];
    btn.textContent = texts[Math.floor(Math.random() * texts.length)];
}

// NO button click - show cute message
if (noBtn) {
    noBtn.addEventListener('click', function() {
        cuteMessage.classList.remove('hidden');
        createConfetti();
        createHeartExplosion();
        
        // Hide the buttons after clicking No
        document.querySelector('.angry-buttons').style.display = 'none';
        document.querySelector('.angry-question').style.display = 'none';
    });
}

function createHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💓', '💞', '🌹', '🥰', '😍'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'popIn 1s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }, i * 50);
    }
}

// Add pop animation
const popStyle = document.createElement('style');
popStyle.textContent = `
    @keyframes popIn {
        0% { transform: scale(0); opacity: 1; }
        50% { transform: scale(1.5); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(popStyle);

// Create confetti when gift is clicked
function createConfetti() {
    const colors = ['❤️', '💕', '💖', '✨', '🌸', '🌺'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(confetti);
        
        // Animate falling
        let pos = -10;
        const speed = Math.random() * 3 + 2;
        const sway = Math.random() * 3 - 1.5;
        let swayAmount = 0;
        
        const interval = setInterval(() => {
            pos += speed;
            swayAmount += sway;
            confetti.style.top = pos + 'px';
            confetti.style.left = (parseFloat(confetti.style.left) + sway / 5) + '%';
            confetti.style.opacity = 1 - (pos / window.innerHeight);
            
            if (pos > window.innerHeight) {
                clearInterval(interval);
                confetti.remove();
            }
        }, 20);
    }
}

// Add some interactivity - confetti on page load
window.addEventListener('load', () => {
    // You could add a surprise confetti on load
    console.log('Website loaded! Show her this and she will forgive you! 💕');
});

// Easter egg: Double click anywhere to show a surprise message
let doubleClickCount = 0;
document.addEventListener('dblclick', (e) => {
    if (e.target.tagName !== 'BUTTON') {
        doubleClickCount++;
        
        // Create heart at click location
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10000';
        heart.style.animation = 'floatUp 2s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
        
        // Secret message after 5 double clicks
        if (doubleClickCount === 5) {
            alert('🌹 You really love her, don\'t you? Go make her laugh and she\'ll forgive you! 💖');
            doubleClickCount = 0;
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'M' to show more message
    if (e.key.toLowerCase() === 'm') {
        showMore();
    }
    // Press 'G' to show gift
    if (e.key.toLowerCase() === 'g') {
        showGift();
    }
});

// Dynamic greeting - Fixed title without time-based greeting
function setGreeting() {
    const titleElement = document.querySelector('.title');
    titleElement.textContent = 'I\'m Really Sorry! 🥺';
}

// Call greeting function on load
window.addEventListener('load', setGreeting);

// Add a button click effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (rect.width - size) / 2 + 'px';
        ripple.style.top = (rect.height - size) / 2 + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);