// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}));

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.member, .album, .tour-date').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingNotes = document.querySelector('.floating-notes');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (floatingNotes) {
        floatingNotes.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98) translateY(1px)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation and animation
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.border = '2px solid #ff6b6b';
                input.style.animation = 'shake 0.5s';
                
                setTimeout(() => {
                    input.style.border = 'none';
                    input.style.animation = 'none';
                }, 2000);
            }
        });
        
        if (isValid) {
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Đang Gửi...';
            submitButton.disabled = true;
            submitButton.style.background = '#45b7d1';
            
            // Simulate sending
            setTimeout(() => {
                submitButton.textContent = 'Đã Gửi! ✓';
                submitButton.style.background = '#4ecdc4';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                    this.reset();
                }, 2000);
            }, 1000);
        }
    });
}

// Add loading animation
window.addEventListener('load', () => {
    // Create and show loader
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #333;
                border-top: 3px solid #4ecdc4;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
    `;
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// Add music visualization effect
function createMusicVisualization() {
    const musicSection = document.querySelector('.music');
    if (!musicSection) return;

    const bars = document.createElement('div');
    bars.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: flex;
        align-items: end;
        justify-content: space-around;
        opacity: 0.3;
        z-index: 1;
    `;

    for (let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            width: 4px;
            height: ${Math.random() * 100 + 20}px;
            background: linear-gradient(to top, #ff6b6b, #4ecdc4);
            border-radius: 2px;
            animation: musicBar 2s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        bars.appendChild(bar);
    }

    musicSection.appendChild(bars);
}

// Play button interactions
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
        const isPlaying = this.textContent.includes('⏸');
        
        // Reset all other buttons
        document.querySelectorAll('.play-button').forEach(btn => {
            if (btn !== this) {
                btn.textContent = '▶ Nghe Ngay';
                btn.style.background = '#4ecdc4';
            }
        });
        
        if (isPlaying) {
            this.textContent = '▶ Nghe Ngay';
            this.style.background = '#4ecdc4';
        } else {
            this.textContent = '⏸ Đang Phát';
            this.style.background = '#ff6b6b';
        }
        
        // Add pulse effect
        this.style.animation = 'pulse 0.3s';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

// Ticket button interactions
document.querySelectorAll('.ticket-button').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        
        this.textContent = 'Đang Xử Lý...';
        this.disabled = true;
        this.style.opacity = '0.7';
        
        setTimeout(() => {
            this.textContent = 'Đã Thêm Vào Giỏ';
            this.style.background = '#4ecdc4';
            this.style.color = 'white';
            this.style.border = '2px solid #4ecdc4';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                this.style.opacity = '1';
                this.style.background = 'transparent';
                this.style.color = '#4ecdc4';
                this.style.border = '2px solid #4ecdc4';
            }, 2000);
        }, 1000);
    });
});

// Add shake animation for form validation
const shakeKeyframes = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;

const shakeStyle = document.createElement('style');
shakeStyle.textContent = shakeKeyframes;
document.head.appendChild(shakeStyle);

// Add pulse animation
const pulseKeyframes = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;

const pulseStyle = document.createElement('style');
pulseStyle.textContent = pulseKeyframes;
document.head.appendChild(pulseStyle);

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add floating particles background
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(78, 205, 196, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${15 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 15}s;
        `;
        particleContainer.appendChild(particle);
    }

    document.body.appendChild(particleContainer);

    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createMusicVisualization();
    createScrollProgress();
    createFloatingParticles();
});

// Add typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect when page loads
setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }
}, 1500);

// Add 3D tilt effect to cards
document.querySelectorAll('.member, .album').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
// Play button functionality for music
const buttons = document.querySelectorAll(".play-button");
  const audios = document.querySelectorAll("audio");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-audio");
      const targetAudio = document.getElementById(targetId);

      // Dừng tất cả nhạc khác
      audios.forEach(audio => {
        if (audio !== targetAudio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      // Play/Pause nhạc được chọn
      if (targetAudio.paused) {
        targetAudio.play();
        button.textContent = "⏸ Dừng Nhạc";
      } else {
        targetAudio.pause();
        button.textContent = "▶ Nghe Ngay";
      }
    });
  });