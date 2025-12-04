/*
 * PREMIUM CORE JS
 * Gold Particles with Cursor Influence, Water Ripples, Smooth Animations
 */

// ============================================
// GOLD PARTICLES SYSTEM - Cursor Influenced
// Each particle has its own path but gets subtly attracted to cursor
// ============================================
class GoldParticleSystem {
    constructor() {
        this.canvas = document.getElementById('gold-particles-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 50 : 120;
        this.mouse = { x: null, y: null };
        this.cursorInfluenceRadius = 200; // How far cursor affects particles
        this.cursorInfluenceStrength = 0.015; // How strong the attraction is
        this.isDesktop = window.innerWidth >= 768;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            // Each particle has its own natural orbit/path parameters
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                
                // Size variation
                radius: Math.random() * 2.5 + 0.8,
                
                // Original position (center of orbit)
                originX: Math.random() * this.canvas.width,
                originY: Math.random() * this.canvas.height,
                
                // Natural floating motion (independent path)
                angle: Math.random() * Math.PI * 2,
                angleSpeed: (Math.random() - 0.5) * 0.008, // How fast it orbits
                orbitRadius: Math.random() * 80 + 30, // Size of natural orbit
                orbitOffsetX: Math.random() * 20 - 10, // Offset for variation
                orbitOffsetY: Math.random() * 20 - 10,
                
                // Secondary wobble for organic feel
                wobbleAngle: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.01,
                wobbleRadius: Math.random() * 15 + 5,
                
                // Velocity for cursor influence (starts at 0)
                vx: 0,
                vy: 0,
                
                // Visual properties
                opacity: Math.random() * 0.6 + 0.3,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulseOffset: Math.random() * Math.PI * 2,
                
                // Color variation (gold spectrum)
                hue: 40 + Math.random() * 15, // 40-55 for gold tones
                saturation: 80 + Math.random() * 20
            });
        }
    }
    
    bindEvents() {
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        document.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.resize();
            this.isDesktop = window.innerWidth >= 768;
            this.particleCount = this.isDesktop ? 120 : 50;
            if (this.particles.length !== this.particleCount) {
                this.createParticles();
            }
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001; // Current time for animations
        
        this.particles.forEach(p => {
            // === NATURAL MOVEMENT (particle's own path) ===
            
            // Primary orbit movement
            p.angle += p.angleSpeed;
            const naturalX = p.originX + Math.cos(p.angle) * p.orbitRadius + p.orbitOffsetX;
            const naturalY = p.originY + Math.sin(p.angle) * p.orbitRadius + p.orbitOffsetY;
            
            // Secondary wobble for organic feel
            p.wobbleAngle += p.wobbleSpeed;
            const wobbleX = Math.cos(p.wobbleAngle) * p.wobbleRadius;
            const wobbleY = Math.sin(p.wobbleAngle * 0.7) * p.wobbleRadius; // Different rate for y
            
            // Target position (natural path)
            const targetX = naturalX + wobbleX;
            const targetY = naturalY + wobbleY;
            
            // === CURSOR INFLUENCE (only on desktop) ===
            let cursorForceX = 0;
            let cursorForceY = 0;
            
            if (this.isDesktop && this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.cursorInfluenceRadius) {
                    // Closer = stronger influence
                    const strength = (1 - distance / this.cursorInfluenceRadius) * this.cursorInfluenceStrength;
                    cursorForceX = dx * strength;
                    cursorForceY = dy * strength;
                }
            }
            
            // === COMBINE MOVEMENTS ===
            
            // Move towards natural position
            const returnStrength = 0.02; // How fast to return to natural path
            p.vx += (targetX - p.x) * returnStrength + cursorForceX;
            p.vy += (targetY - p.y) * returnStrength + cursorForceY;
            
            // Apply friction
            p.vx *= 0.92;
            p.vy *= 0.92;
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // === RENDER ===
            
            // Pulsing opacity
            const pulse = Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.2 + 0.8;
            const currentOpacity = p.opacity * pulse;
            
            // Draw glow
            const gradient = this.ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.radius * 4
            );
            gradient.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, 65%, ${currentOpacity})`);
            gradient.addColorStop(0.4, `hsla(${p.hue}, ${p.saturation}%, 55%, ${currentOpacity * 0.4})`);
            gradient.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, 50%, 0)`);
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Draw core
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, 70%, ${currentOpacity})`;
            this.ctx.fill();
        });
        
        // Draw subtle connections between nearby particles
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        const connectionDistance = 100;
        const maxConnections = 3;
        
        for (let i = 0; i < this.particles.length; i++) {
            let connections = 0;
            const p1 = this.particles[i];
            
            for (let j = i + 1; j < this.particles.length && connections < maxConnections; j++) {
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.15;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                    
                    connections++;
                }
            }
        }
    }
}

// ============================================
// CUSTOM CURSOR
// ============================================
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.ring = document.querySelector('.cursor-ring');
        
        if (!this.dot || !this.ring) return;
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        this.dotX = 0;
        this.dotY = 0;
        this.ringX = 0;
        this.ringY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Hover states
        const hoverElements = document.querySelectorAll('a, button, .work-card, .about-card, .experience-card, .education-card, .qr-mini, .floating-orb, .social-link, .icon-btn, [data-cursor="hover"]');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.ring.classList.remove('hover'));
        });
        
        // Click state
        document.addEventListener('mousedown', () => this.ring.classList.add('clicking'));
        document.addEventListener('mouseup', () => this.ring.classList.remove('clicking'));
        
        // Hide cursor on inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => this.ring.classList.add('hidden'));
            input.addEventListener('blur', () => this.ring.classList.remove('hidden'));
        });
        
        this.animate();
    }
    
    animate() {
        // Smooth follow for dot (faster)
        this.dotX += (this.mouseX - this.dotX) * 0.35;
        this.dotY += (this.mouseY - this.dotY) * 0.35;
        
        // Smooth follow for ring (slower, creates trail effect)
        this.ringX += (this.mouseX - this.ringX) * 0.15;
        this.ringY += (this.mouseY - this.ringY) * 0.15;
        
        this.dot.style.left = `${this.dotX}px`;
        this.dot.style.top = `${this.dotY}px`;
        this.ring.style.left = `${this.ringX}px`;
        this.ring.style.top = `${this.ringY}px`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// SPOTLIGHT EFFECT
// ============================================
class SpotlightEffect {
    constructor() {
        this.spotlight = document.querySelector('.spotlight');
        if (!this.spotlight) return;
        
        document.addEventListener('mousemove', (e) => {
            this.spotlight.style.left = `${e.clientX}px`;
            this.spotlight.style.top = `${e.clientY}px`;
        });
    }
}

// ============================================
// WATER RIPPLE EFFECT
// ============================================
class WaterRipple {
    constructor() {
        this.container = document.querySelector('.ripple-container');
        if (!this.container) return;
        
        this.init();
    }
    
    init() {
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
        });
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '400px';
        ripple.style.height = '400px';
        
        this.container.appendChild(ripple);
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
class ButtonRipple {
    constructor() {
        const buttons = document.querySelectorAll('.btn-magnetic, .ripple-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                btn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 800);
            });
        });
    }
}

// ============================================
// SCROLL REVEAL
// ============================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
        
        if (this.elements.length === 0) return;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => this.observer.observe(el));
    }
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
class SmoothNav {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.links = document.querySelectorAll('.nav-link, [data-scroll]');
        
        this.init();
    }
    
    init() {
        // Scroll state for nav
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.nav?.classList.add('scrolled');
            } else {
                this.nav?.classList.remove('scrolled');
            }
        });
        
        // Smooth scroll to sections
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Update active link on scroll
        this.updateActiveOnScroll();
    }
    
    updateActiveOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            this.links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ============================================
// LOADER
// ============================================
class Loader {
    constructor() {
        this.loader = document.querySelector('.loader');
        if (!this.loader) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1500);
        });
    }
}

// ============================================
// CARD MOUSE GLOW EFFECT
// ============================================
class CardGlow {
    constructor() {
        const cards = document.querySelectorAll('.about-card, .work-card, .experience-card, .education-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.style.setProperty('--mx', `${x}%`);
                card.style.setProperty('--my', `${y}%`);
            });
        });
    }
}

// ============================================
// QR CODE SYSTEM
// ============================================
class QRCodeSystem {
    constructor() {
        this.overlay = document.querySelector('.qr-overlay');
        this.expanded = document.querySelector('.qr-expanded');
        
        this.init();
    }
    
    init() {
        // Mini QR click to expand
        document.querySelectorAll('.qr-mini').forEach(qr => {
            qr.addEventListener('click', (e) => {
                e.stopPropagation();
                const url = qr.dataset.url;
                if (url) {
                    this.showExpanded(url);
                }
            });
        });
        
        // Close on overlay click
        this.overlay?.addEventListener('click', () => this.hideExpanded());
        this.expanded?.addEventListener('click', () => this.hideExpanded());
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideExpanded();
        });
    }
    
    showExpanded(url) {
        if (!this.overlay || !this.expanded) return;
        
        // Generate QR using qrcode library if available
        this.expanded.innerHTML = '';
        
        if (typeof QRCode !== 'undefined') {
            new QRCode(this.expanded, {
                text: url,
                width: 240,
                height: 240,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        } else {
            // Fallback to QR API
            const img = document.createElement('img');
            img.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(url)}`;
            img.alt = 'QR Code';
            this.expanded.appendChild(img);
        }
        
        this.overlay.classList.add('active');
        this.expanded.classList.add('active');
    }
    
    hideExpanded() {
        this.overlay?.classList.remove('active');
        this.expanded?.classList.remove('active');
    }
}

// ============================================
// INITIALIZE ALL SYSTEMS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Core systems
    new Loader();
    new GoldParticleSystem();
    new CustomCursor();
    new SpotlightEffect();
    new WaterRipple();
    new ButtonRipple();
    
    // Navigation and reveal
    new SmoothNav();
    new ScrollReveal();
    
    // Interactive elements
    new CardGlow();
    new QRCodeSystem();
    
    console.log('🌟 Premium Portfolio Loaded');
});

// Export for use in other modules
window.PortfolioCore = {
    GoldParticleSystem,
    CustomCursor,
    WaterRipple,
    QRCodeSystem
};
