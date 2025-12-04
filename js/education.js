/*
 * EDUCATION SECTION JS
 * GITAM University with detailed modal, SGPA chart, Technical Skills & Coursework
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
            
            overview: `Completed Bachelor of Technology in Computer Science with specialization in Cybersecurity from GITAM University, Hyderabad. Achieved <strong>First Class with Distinction</strong> with a CGPA of <strong>8.82/10</strong>, ranking <strong>4th overall in the batch</strong>. Final semesters achieved <strong>9.47 and 9.50 SGPA</strong>—first in batch for both terms. Conducted extensive research in network security, adversarial ML, and post-quantum cryptography.`,
            
            journey: `Academic performance showed consistent growth throughout the program. After a challenging fourth semester (8.00 SGPA), implemented focused study approaches and hands-on learning in specialized coursework. This systematic effort resulted in steady improvement: 8.64, then 8.86, culminating in <strong>9.47 and 9.50 SGPA</strong> in the final semesters—securing <strong>first position in batch</strong> for both terms.`,
            
            sgpaData: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                data: [9.28, 8.75, 8.68, 8.00, 8.64, 8.86, 9.47, 9.50]
            },
            
            // Technical Skills with proficiency levels
            technicalSkills: [
                { name: 'Python', level: 90, category: 'Programming' },
                { name: 'Java', level: 85, category: 'Programming' },
                { name: 'C/C++', level: 75, category: 'Programming' },
                { name: 'SQL', level: 80, category: 'Programming' },
                { name: 'XGBoost/scikit-learn', level: 85, category: 'ML/AI' },
                { name: 'PyTorch', level: 70, category: 'ML/AI' },
                { name: 'Wireshark', level: 88, category: 'Security' },
                { name: 'Palo Alto/PAN-OS', level: 80, category: 'Security' },
                { name: 'NS-3 Simulation', level: 85, category: 'Security' },
                { name: 'Linux/Docker', level: 82, category: 'Tools' },
                { name: 'Git/GitHub', level: 88, category: 'Tools' },
                { name: 'liboqs (PQC)', level: 75, category: 'Crypto' }
            ],
            
            // Key Coursework organized by category
            coursework: {
                'Security & Cryptography': [
                    { name: 'Cryptography and Network Security', grade: 'O' },
                    { name: 'Digital Forensics', grade: 'O' },
                    { name: 'Network Security', grade: 'A+' },
                    { name: 'Ethical Hacking', grade: 'A+' }
                ],
                'Computer Science Core': [
                    { name: 'Data Structures', grade: 'A+' },
                    { name: 'Design and Analysis of Algorithms', grade: 'O' },
                    { name: 'Computer Networks', grade: 'A' },
                    { name: 'Operating Systems', grade: 'A+' }
                ],
                'Mathematics': [
                    { name: 'Single Variable Calculus', grade: 'A+' },
                    { name: 'Several Variable Calculus', grade: 'A+' },
                    { name: 'Discrete Mathematics', grade: 'A' },
                    { name: 'Linear Algebra', grade: 'B+' },
                    { name: 'Number Theory', grade: 'A' },
                    { name: 'Graph Theory', grade: 'O' }
                ],
                'Data & AI': [
                    { name: 'Database Management Systems', grade: 'A' },
                    { name: 'Big Data Analytics', grade: 'A+' },
                    { name: 'Artificial Intelligence Applications', grade: 'O' },
                    { name: 'Programming with Python', grade: 'A+' }
                ]
            },
            
            achievements: [
                'First Class with Distinction (CGPA 8.82/10)',
                'Ranked 4th overall in B.Tech Cyber Security batch',
                'Semester 7 & 8 SGPA: 9.47 and 9.50 (First in batch)',
                '3 research papers submitted to IEEE TIFS and Elsevier',
                'Teaching Assistant for Computer Networks',
                'Department Student Assistant (18 months)',
                'Founded Project SAHAYAM (320+ participants)'
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
        
        // Initialize charts and animations after modal opens
        setTimeout(() => {
            this.initChart();
            this.animateSkillBars();
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
                    <div class="education-modal-gpa-item">
                        <div class="education-modal-gpa-value">4th</div>
                        <div class="education-modal-gpa-label">Batch Rank</div>
                    </div>
                </div>
            </div>
        `;
        
        // Rebind close
        header.querySelector('.education-modal-close').addEventListener('click', () => this.closeModal());
        
        // Render Technical Skills with animated bars
        const skillsHTML = this.renderSkillBars(data.technicalSkills);
        
        // Render Coursework by category
        const courseworkHTML = this.renderCoursework(data.coursework);
        
        // Render achievements
        const achievementsHTML = data.achievements.map(a => `
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
                    Academic Progress
                </h4>
                <p class="education-modal-text">${data.journey}</p>
                
                <div class="education-sgpa-chart">
                    <canvas id="sgpa-chart"></canvas>
                </div>
            </div>
            
            <div class="education-modal-section">
                <h4 class="education-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    Technical Skills
                </h4>
                <div class="education-skills-container">
                    ${skillsHTML}
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
                <div class="education-coursework-grid">
                    ${courseworkHTML}
                </div>
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
        `;
    }
    
    renderSkillBars(skills) {
        // Group skills by category
        const categories = {};
        skills.forEach(skill => {
            if (!categories[skill.category]) {
                categories[skill.category] = [];
            }
            categories[skill.category].push(skill);
        });
        
        let html = '';
        for (const [category, categorySkills] of Object.entries(categories)) {
            html += `<div class="skill-category">
                <h5 class="skill-category-title">${category}</h5>
                <div class="skill-bars">`;
            
            categorySkills.forEach(skill => {
                html += `
                    <div class="skill-bar-item">
                        <div class="skill-bar-header">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level">${skill.level}%</span>
                        </div>
                        <div class="skill-bar-track">
                            <div class="skill-bar-fill" data-level="${skill.level}" style="width: 0%"></div>
                        </div>
                    </div>
                `;
            });
            
            html += `</div></div>`;
        }
        
        return html;
    }
    
    renderCoursework(coursework) {
        let html = '';
        
        for (const [category, courses] of Object.entries(coursework)) {
            html += `
                <div class="coursework-category">
                    <h5 class="coursework-category-title">${category}</h5>
                    <div class="coursework-list">
            `;
            
            courses.forEach(course => {
                const gradeClass = course.grade === 'O' ? 'grade-o' : 
                                   course.grade === 'A+' ? 'grade-aplus' : 
                                   course.grade === 'A' ? 'grade-a' : 'grade-b';
                html += `
                    <div class="coursework-item">
                        <span class="course-name">${course.name}</span>
                        <span class="course-grade ${gradeClass}">${course.grade}</span>
                    </div>
                `;
            });
            
            html += `</div></div>`;
        }
        
        return html;
    }
    
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        
        skillBars.forEach((bar, index) => {
            const level = bar.dataset.level;
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-out';
                bar.style.width = `${level}%`;
            }, index * 80); // Stagger animation
        });
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
                    backgroundColor: 'rgba(251, 191, 36, 0.15)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: data.data.map((val, i) => 
                        i >= 6 ? 'rgba(16, 185, 129, 1)' : 'rgba(251, 191, 36, 1)'
                    ),
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 7,
                    pointHoverRadius: 10
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
                        font: { size: 15, weight: '600' },
                        padding: { bottom: 25 }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(18, 18, 26, 0.95)',
                        titleColor: '#fbbf24',
                        bodyColor: '#f8fafc',
                        borderColor: 'rgba(251, 191, 36, 0.3)',
                        borderWidth: 1,
                        padding: 14,
                        displayColors: false,
                        callbacks: {
                            label: (context) => {
                                const sgpa = context.parsed.y.toFixed(2);
                                const notes = context.dataIndex >= 6 ? ' (First in Batch)' : '';
                                return `SGPA: ${sgpa}${notes}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8', font: { size: 12 } }
                    },
                    y: {
                        min: 7.5,
                        max: 10,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { 
                            color: '#94a3b8',
                            stepSize: 0.5,
                            font: { size: 12 }
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
