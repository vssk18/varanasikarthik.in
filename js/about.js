/*
 * ABOUT SECTION JS
 * What I Do - Modal expansion with detailed content
 */

class AboutSection {
    constructor() {
        this.cards = document.querySelectorAll('.about-card');
        this.overlay = document.querySelector('.about-modal-overlay');
        this.modal = document.querySelector('.about-modal');
        this.closeBtn = document.querySelector('.about-modal-close');
        this.currentCard = null;
        
        this.init();
    }
    
    init() {
        // Card click to open modal
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => this.openModal(index));
        });
        
        // Close modal
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.overlay?.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.closeModal();
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay?.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(index) {
        const data = this.getCardData(index);
        this.renderModal(data);
        
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate chart after modal opens
        setTimeout(() => {
            const chartContainer = document.querySelector('.about-modal-chart');
            chartContainer?.classList.add('animate');
            this.initChart(index);
        }, 400);
    }
    
    closeModal() {
        this.overlay?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    getCardData(index) {
        const cardData = [
            {
                badge: 'Security Research',
                title: 'Cybersecurity Research',
                overview: `I conduct rigorous academic research in cybersecurity, focusing on practical security solutions for emerging threats. My work spans intrusion detection systems, adversarial machine learning, and post-quantum cryptography—areas critical to securing tomorrow's digital infrastructure.`,
                sections: [
                    {
                        title: '🔬 Current Research Focus',
                        content: `My research addresses real-world security challenges through a systematic, evidence-based approach. I specialize in applying machine learning to network security problems, always maintaining scientific integrity—as demonstrated when I identified and corrected data leakage issues that reduced my MANET IDS accuracy from an unrealistic 100% to a credible <strong>94.7%</strong>.`
                    },
                    {
                        title: '📊 Research Methodology',
                        content: `I follow rigorous experimental protocols: establishing baselines, conducting controlled experiments across thousands of configurations, and validating results through cross-validation. My post-quantum cryptography analysis involved <strong>4,608 experimental configurations</strong> to ensure comprehensive coverage.`
                    }
                ],
                stats: [
                    { value: '3', label: 'Papers Under Review' },
                    { value: '94.7%', label: 'Best IDS Accuracy' },
                    { value: '4608', label: 'Experiments Run' }
                ],
                highlights: [
                    'Published research submitted to IEEE TIFS and Elsevier Ad Hoc Networks',
                    'Developed novel approaches to constraint-aware adversarial attacks on network IDS',
                    'Identified NTRU-Prime-hrss701 as optimal PQC algorithm for IoT devices',
                    'Collaborated with academic supervisors and industry mentors'
                ],
                chartType: 'research'
            },
            {
                badge: 'Applied Security',
                title: 'Security Engineering',
                overview: `Beyond research, I build practical security solutions. From implementing intrusion detection systems to analyzing cryptographic protocols, I bridge the gap between academic theory and real-world application, ensuring security tools that actually work in production environments.`,
                sections: [
                    {
                        title: '🛠️ Technical Implementation',
                        content: `I've implemented complete security systems from scratch, including network simulation environments using <strong>NS-3</strong>, machine learning pipelines with feature engineering for network traffic analysis, and cryptographic implementations on constrained IoT devices. Every system is built with testability and maintainability in mind.`
                    },
                    {
                        title: '🔍 Security Analysis',
                        content: `At Hitachi Systems India, I performed <strong>X.509 certificate debugging</strong>, reading OpenSSL C code and writing test snippets to isolate bugs. This hands-on experience with production security infrastructure taught me how security works at the protocol level.`
                    }
                ],
                stats: [
                    { value: '6+', label: 'ML Models Trained' },
                    { value: '17+', label: 'Months Industry Exp' },
                    { value: '100+', label: 'Students Trained' }
                ],
                highlights: [
                    'Built MANET intrusion detection system with XGBoost achieving 94.7% accuracy',
                    'Implemented adversarial attack evaluation framework revealing 73-89% constraint violations',
                    'Performed X.509 certificate analysis and debugging at Hitachi Systems',
                    'Created network simulation environments for security research'
                ],
                chartType: 'skills'
            },
            {
                badge: 'Community Impact',
                title: 'Security Education',
                overview: `I'm passionate about making cybersecurity accessible to everyone. Through Project SAHAYAM and academic initiatives, I've taught security concepts to diverse audiences—from elderly community members learning smartphone safety to university students exploring digital forensics.`,
                sections: [
                    {
                        title: '🌟 Project SAHAYAM',
                        content: `Inspired by helping my father during a 2 AM security incident, I founded this <strong>bilingual cybersecurity education initiative</strong> for elderly community members. Teaching in Telugu and Hindi, I make complex security concepts understandable for non-technical users, covering topics from phishing awareness to secure banking practices.`
                    },
                    {
                        title: '🎓 Academic Leadership',
                        content: `As <strong>Teaching Assistant for Digital Forensics</strong> and Department Student Assistant at GITAM, I led security teams, conducted cyber safety drives for 100+ students, established monthly seminars, and improved lab documentation. These roles taught me how to communicate technical concepts effectively.`
                    }
                ],
                stats: [
                    { value: '100+', label: 'Students Trained' },
                    { value: '2', label: 'Languages Used' },
                    { value: '12+', label: 'Seminars Led' }
                ],
                highlights: [
                    'Founded Project SAHAYAM for elderly cybersecurity education',
                    'Served as Teaching Assistant for Digital Forensics course',
                    'Conducted cyber safety awareness drives reaching 100+ students',
                    'Established monthly security seminars at department level',
                    'Improved lab documentation for better student learning'
                ],
                chartType: 'impact'
            }
        ];
        
        return cardData[index] || cardData[0];
    }
    
    renderModal(data) {
        const modalBody = document.querySelector('.about-modal-body');
        const modalTitle = document.querySelector('.about-modal-title');
        const modalBadge = document.querySelector('.about-modal-badge');
        
        if (modalBadge) modalBadge.textContent = data.badge;
        if (modalTitle) modalTitle.textContent = data.title;
        
        if (!modalBody) return;
        
        let sectionsHTML = data.sections.map(section => `
            <div class="about-modal-section">
                <h4 class="about-modal-section-title">${section.title}</h4>
                <p class="about-modal-text">${section.content}</p>
            </div>
        `).join('');
        
        let statsHTML = data.stats.map(stat => `
            <div class="about-modal-stat">
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
        
        let highlightsHTML = data.highlights.map(h => `
            <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ${h}
            </li>
        `).join('');
        
        modalBody.innerHTML = `
            <div class="about-modal-section">
                <h4 class="about-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                    Overview
                </h4>
                <p class="about-modal-text">${data.overview}</p>
            </div>
            
            <div class="about-modal-stats">${statsHTML}</div>
            
            ${sectionsHTML}
            
            <div class="about-modal-section">
                <h4 class="about-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Key Achievements
                </h4>
                <ul class="about-modal-highlights">${highlightsHTML}</ul>
            </div>
            
            <div class="about-modal-chart" id="about-chart-container">
                <canvas id="about-chart"></canvas>
            </div>
        `;
    }
    
    initChart(index) {
        const ctx = document.getElementById('about-chart')?.getContext('2d');
        if (!ctx || typeof Chart === 'undefined') return;
        
        // Destroy existing chart
        if (window.aboutChart) {
            window.aboutChart.destroy();
        }
        
        const chartConfigs = [
            // Research chart
            {
                type: 'bar',
                data: {
                    labels: ['MANET IDS', 'Adversarial ML', 'PQC Analysis'],
                    datasets: [{
                        label: 'Research Impact Score',
                        data: [94.7, 89, 85],
                        backgroundColor: [
                            'rgba(251, 191, 36, 0.7)',
                            'rgba(168, 85, 247, 0.7)',
                            'rgba(16, 185, 129, 0.7)'
                        ],
                        borderColor: [
                            'rgba(251, 191, 36, 1)',
                            'rgba(168, 85, 247, 1)',
                            'rgba(16, 185, 129, 1)'
                        ],
                        borderWidth: 2,
                        borderRadius: 8
                    }]
                },
                options: this.getChartOptions('Research Performance')
            },
            // Skills chart
            {
                type: 'radar',
                data: {
                    labels: ['Python', 'ML/AI', 'Network Security', 'Cryptography', 'Research', 'Linux'],
                    datasets: [{
                        label: 'Skill Level',
                        data: [90, 85, 88, 82, 92, 85],
                        backgroundColor: 'rgba(251, 191, 36, 0.2)',
                        borderColor: 'rgba(251, 191, 36, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(251, 191, 36, 1)',
                        pointBorderColor: '#fff',
                        pointRadius: 4
                    }]
                },
                options: {
                    ...this.getChartOptions('Technical Skills'),
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                            pointLabels: { color: '#94a3b8', font: { size: 11 } },
                            ticks: { display: false }
                        }
                    }
                }
            },
            // Impact chart
            {
                type: 'doughnut',
                data: {
                    labels: ['Students Trained', 'Seminars', 'Safety Drives', 'Documentation'],
                    datasets: [{
                        data: [100, 12, 8, 15],
                        backgroundColor: [
                            'rgba(251, 191, 36, 0.8)',
                            'rgba(168, 85, 247, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(99, 102, 241, 0.8)'
                        ],
                        borderColor: 'rgba(10, 10, 15, 1)',
                        borderWidth: 3
                    }]
                },
                options: {
                    ...this.getChartOptions('Community Impact'),
                    cutout: '60%'
                }
            }
        ];
        
        window.aboutChart = new Chart(ctx, chartConfigs[index] || chartConfigs[0]);
    }
    
    getChartOptions(title) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title,
                    color: '#f8fafc',
                    font: { size: 14, weight: '600' },
                    padding: { bottom: 20 }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' },
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        };
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AboutSection();
});
