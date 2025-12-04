/*
 * EDUCATION SECTION JS
 * GITAM University with detailed modal, SGPA chart
 */

class EducationSection {
    constructor() {
        this.card = document.querySelector('.education-card');
        this.overlay = document.querySelector('.education-modal-overlay');
        this.modal = document.querySelector('.education-modal');
        this.closeBtn = document.querySelector('.education-modal-close');
        
        this.educationData = {
            institution: 'GITAM University',
            campus: 'Hyderabad',
            degree: 'B.Tech Computer Science',
            specialization: 'Cybersecurity',
            cgpa: '8.82',
            result: 'First Class with Distinction',
            period: '2021 - 2025',
            graduation: 'July 2025',
            icon: '🎓',
            
            overview: `Completed Bachelor of Technology in Computer Science with specialization in Cybersecurity from GITAM University, Hyderabad. Achieved First Class with Distinction with a CGPA of <strong>8.82</strong>, ranking <strong>4th overall in the batch</strong>. Conducted extensive research in network security, machine learning applications in cybersecurity, and post-quantum cryptography.`,
            
            journey: `Academic performance showed steady growth throughout the program. Semester 4 presented challenges with an 8.00 SGPA during a period of increased extracurricular commitments. Through improved time management and focused study approaches, achieved systematic recovery with <strong>9.47 and 9.50 SGPA</strong> in final semesters (Semesters 7 and 8)—securing <strong>first position in the batch</strong> for both terms.`,
            
            sgpaData: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                data: [9.28, 8.75, 8.68, 8.00, 8.64, 8.86, 9.47, 9.50]
            },
            
            coursework: [
                'Network Security',
                'Cryptography',
                'Digital Forensics',
                'Machine Learning',
                'Data Structures',
                'Computer Networks',
                'Operating Systems',
                'Database Systems',
                'Web Security',
                'Cloud Computing',
                'Ethical Hacking',
                'Information Security'
            ],
            
            achievements: [
                'First Class with Distinction (CGPA 8.82/10)',
                'Ranked 4th overall in B.Tech Cyber Security batch',
                'Semester 7 and 8 SGPA: 9.47 and 9.50 (First in batch for both semesters)',
                '3 research papers submitted to IEEE TIFS and Elsevier Ad Hoc Networks',
                'Teaching Assistant for Digital Forensics',
                'Department Student Assistant leadership role',
                'Founded Project SAHAYAM reaching 320+ community members'
            ],
            
            activities: [
                'Research under Dr. Arshad Ahmad Khan Mohammad',
                'Research under Dr. C. Atheeq',
                'Led cyber safety awareness drives',
                'Organized monthly security seminars',
                'Improved department lab documentation'
            ]
        };
        
        this.init();
    }
    
    init() {
        // Card click to open modal
        this.card?.addEventListener('click', () => this.openModal());
        
        // Close modal
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.overlay?.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay?.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal() {
        this.renderModal();
        
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize chart after modal opens
        setTimeout(() => {
            this.initChart();
        }, 400);
    }
    
    closeModal() {
        this.overlay?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    renderModal() {
        const header = document.querySelector('.education-modal-header');
        const body = document.querySelector('.education-modal-body');
        const data = this.educationData;
        
        if (!header || !body) return;
        
        // Render header
        header.innerHTML = `
            <button class="education-modal-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="education-modal-top">
                <div class="education-modal-logo">${data.icon}</div>
                <div class="education-modal-info">
                    <h2 class="education-modal-institution">${data.institution}</h2>
                    <p class="education-modal-degree">${data.degree} (${data.specialization})</p>
                    <div class="education-modal-meta">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            ${data.campus}, India
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            ${data.period}
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Graduated ${data.graduation}
                        </span>
                    </div>
                </div>
                <div class="education-modal-gpa">
                    <div class="education-modal-gpa-item">
                        <div class="education-modal-gpa-value">${data.cgpa}</div>
                        <div class="education-modal-gpa-label">CGPA / 10</div>
                    </div>
                </div>
            </div>
        `;
        
        // Rebind close
        header.querySelector('.education-modal-close').addEventListener('click', () => this.closeModal());
        
        // Render coursework
        const courseworkHTML = data.coursework.map(c => `
            <div class="education-course">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                ${c}
            </div>
        `).join('');
        
        // Render achievements
        const achievementsHTML = data.achievements.map(a => `
            <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ${a}
            </li>
        `).join('');
        
        // Render activities
        const activitiesHTML = data.activities.map(a => `
            <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ${a}
            </li>
        `).join('');
        
        body.innerHTML = `
            <div class="education-modal-section">
                <h4 class="education-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                    Overview
                </h4>
                <p class="education-modal-text">${data.overview}</p>
            </div>
            
            <div class="education-modal-section">
                <h4 class="education-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    Academic Journey
                </h4>
                <p class="education-modal-text">${data.journey}</p>
                
                <div class="education-sgpa-chart">
                    <canvas id="sgpa-chart"></canvas>
                </div>
            </div>
            
            <div class="education-modal-section">
                <h4 class="education-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    Key Coursework
                </h4>
                <div class="education-coursework">${courseworkHTML}</div>
            </div>
            
            <div class="education-modal-section">
                <h4 class="education-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    Achievements
                </h4>
                <ul class="education-modal-achievements">${achievementsHTML}</ul>
            </div>
            
            <div class="education-modal-section">
                <h4 class="education-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Research & Activities
                </h4>
                <ul class="education-modal-achievements">${activitiesHTML}</ul>
            </div>
            
        `;
    }
    
    initChart() {
        const ctx = document.getElementById('sgpa-chart')?.getContext('2d');
        if (!ctx || typeof Chart === 'undefined') return;
        
        const data = this.educationData.sgpaData;
        
        // Destroy existing
        if (window.sgpaChart) {
            window.sgpaChart.destroy();
        }
        
        window.sgpaChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'SGPA',
                    data: data.data,
                    borderColor: 'rgba(251, 191, 36, 1)',
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(251, 191, 36, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Semester-wise SGPA Progress',
                        color: '#f8fafc',
                        font: { size: 14, weight: '600' },
                        padding: { bottom: 20 }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(18, 18, 26, 0.95)',
                        titleColor: '#fbbf24',
                        bodyColor: '#f8fafc',
                        borderColor: 'rgba(251, 191, 36, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: (context) => `SGPA: ${context.parsed.y.toFixed(2)}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        min: 7,
                        max: 10,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { 
                            color: '#94a3b8',
                            stepSize: 0.5
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new EducationSection();
});
