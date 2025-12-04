/*
 * EXPERIENCE SECTION JS
 * Timeline with detailed modals
 * Includes: Hitachi Systems, Strategic Wealth (GITAM), Teaching Assistant
 */

class ExperienceSection {
    constructor() {
        this.cards = document.querySelectorAll('.experience-card');
        this.overlay = document.querySelector('.experience-modal-overlay');
        this.modal = document.querySelector('.experience-modal');
        this.closeBtn = document.querySelector('.experience-modal-close');
        
        this.init();
    }
    
    init() {
        // Card click to open modal
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                this.openModal(id);
            });
        });
        
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
    
    openModal(id) {
        const data = this.getData(id);
        if (!data) return;
        
        this.renderModal(data);
        
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.overlay?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    getData(id) {
        const experienceData = {
            'hitachi': {
                company: 'Hitachi Systems India',
                role: 'Cybersecurity Research Intern',
                icon: '🏢',
                location: 'Hyderabad, India',
                duration: '2 Months',
                period: 'May - June 2024',
                type: 'Industry Internship',
                overview: `Conducted research internship at Hitachi Systems India under the mentorship of <strong>Vishal Kalla</strong>. Deployed Palo Alto firewalls across three regional sites, analyzed 1,000+ VPN sessions for capacity planning, and debugged X.509 certificate chain issues in GlobalProtect.`,
                responsibilities: `Examined over 1,000 concurrent VPN sessions using live encrypted traffic and logs. Built capacity matrix with defined growth limits. Traced GlobalProtect connection drops to misordered intermediate certificate. Wrote troubleshooting runbook.`,
                achievements: [
                    'Deployed Palo Alto firewalls across 3 regional sites',
                    'Analyzed 1,000+ VPN sessions for capacity planning',
                    'Debugged X.509 certificate chain issues with OpenSSL',
                    'Wrote troubleshooting guide reused 3+ times',
                    'Maintained strict change discipline with peer reviews'
                ],
                skills: ['Palo Alto', 'Firewall', 'VPN', 'X.509', 'OpenSSL', 'GlobalProtect'],
                stats: [
                    { value: '1,000+', label: 'VPN Sessions' },
                    { value: '3', label: 'Sites Deployed' },
                    { value: 'X.509', label: 'Focus Area' }
                ],
                mentor: 'Vishal Kalla'
            },
            'strategic-wealth': {
                company: 'GITAM University',
                role: 'Strategic Wealth Internship',
                icon: '📊',
                location: 'Hyderabad, India',
                duration: 'Internship Period',
                period: 'During B.Tech',
                type: 'Academic Internship',
                overview: `Completed an internship focused on strategic wealth management and financial analysis within the academic framework at GITAM University. This experience provided exposure to financial concepts and analytical methodologies.`,
                responsibilities: `Applied analytical skills to financial data analysis. Learned about wealth management strategies and financial planning. Contributed to research and documentation in the financial domain.`,
                achievements: [
                    'Gained exposure to financial analysis methodologies',
                    'Applied analytical and research skills to financial domain',
                    'Developed understanding of wealth management concepts',
                    'Completed all internship requirements successfully'
                ],
                skills: ['Financial Analysis', 'Research', 'Data Analysis', 'Documentation', 'Presentation'],
                stats: [
                    { value: '✓', label: 'Completed' },
                    { value: 'GITAM', label: 'Institution' },
                    { value: 'Finance', label: 'Domain' }
                ],
                mentor: 'GITAM Faculty'
            },
            'ta': {
                company: 'GITAM University',
                role: 'Teaching Assistant - Computer Networks',
                icon: '🎓',
                location: 'Hyderabad, India',
                duration: '5 Months',
                period: 'January - May 2024',
                type: 'Academic Role',
                overview: `Served as Teaching Assistant for Computer Networks course at GITAM. Led lab sessions for <strong>120+ students</strong> covering subnetting to packet analysis. Redesigned confusing DNS tunneling lab with curated packet captures and reading guide.`,
                responsibilities: `Ran two lab sessions weekly for about 60 students each, covering subnetting, ARP, routing basics, and packet analysis. Helped write portions of the lab manual and weekly handouts. Tested revised DNS tunneling lab with struggling students.`,
                achievements: [
                    'Led lab sessions for 120+ students',
                    'Redesigned DNS tunneling lab with curated PCAPs',
                    'Created one-page reading guide for packet analysis',
                    'Helped rewrite lab manuals for consistency',
                    'Course adopted revised lab as standard material'
                ],
                skills: ['Teaching', 'Computer Networks', 'Packet Analysis', 'Wireshark', 'Lab Design', 'Documentation'],
                stats: [
                    { value: '120+', label: 'Students' },
                    { value: 'CN', label: 'Course' },
                    { value: 'TA', label: 'Role' }
                ],
                mentor: 'Dr. C. Atheeq'
            },
            'dsa': {
                company: 'GITAM University',
                role: 'Department Student Assistant',
                icon: '📋',
                location: 'Hyderabad, India',
                duration: '18 Months',
                period: 'July 2023 - January 2025',
                type: 'Academic Role',
                overview: `Led an eight-member student team on department security work. Ran a 15-day cyber safety drive across BBA, BPharm, BTech, and BArch using one-page checklists. Established monthly seminar series for juniors with real incident topics.`,
                responsibilities: `Led 15-day digital safety campaign reaching 100+ students across 4 departments. Curated topics from real incidents. Built demos for sessions, invited industry speakers including Vishal Kalla from Hitachi. Reviewed Computer Networks and Digital Forensics labs.`,
                achievements: [
                    'Led 15-day campaign across BBA, B.Pharm, B.Tech, B.Arch',
                    'Established monthly campus security seminar series',
                    'Invited industry speakers including Vishal Kalla',
                    'Reviewed Networks and Digital Forensics labs',
                    'Coordinated semester feedback collection for faculty'
                ],
                skills: ['Leadership', 'Event Organization', 'Security Awareness', 'Documentation', 'Team Management'],
                stats: [
                    { value: '100+', label: 'Students Reached' },
                    { value: '15', label: 'Day Campaign' },
                    { value: '18mo', label: 'Duration' }
                ],
                mentor: 'Department Faculty'
            }
        };
        
        return experienceData[id];
    }
    
    renderModal(data) {
        const header = document.querySelector('.experience-modal-header');
        const body = document.querySelector('.experience-modal-body');
        
        if (!header || !body) return;
        
        // Render header
        header.innerHTML = `
            <button class="experience-modal-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="experience-modal-top">
                <div class="experience-modal-logo">${data.icon}</div>
                <div class="experience-modal-info">
                    <h2 class="experience-modal-company">${data.company}</h2>
                    <p class="experience-modal-role">${data.role}</p>
                    <div class="experience-modal-meta">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            ${data.location}
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            ${data.duration}
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
                    </div>
                </div>
            </div>
        `;
        
        // Rebind close
        header.querySelector('.experience-modal-close').addEventListener('click', () => this.closeModal());
        
        // Render stats
        const statsHTML = data.stats.map(s => `
            <div class="experience-modal-stat">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
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
        
        // Render skills
        const skillsHTML = data.skills.map(s => `<span class="experience-modal-skill">${s}</span>`).join('');
        
        body.innerHTML = `
            <div class="experience-modal-section">
                <h4 class="experience-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                    Overview
                </h4>
                <p class="experience-modal-text">${data.overview}</p>
            </div>
            
            <div class="experience-modal-stats">${statsHTML}</div>
            
            <div class="experience-modal-section">
                <h4 class="experience-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                    Responsibilities
                </h4>
                <p class="experience-modal-text">${data.responsibilities}</p>
            </div>
            
            <div class="experience-modal-section">
                <h4 class="experience-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Key Achievements
                </h4>
                <ul class="experience-modal-achievements">${achievementsHTML}</ul>
            </div>
            
            <div class="experience-modal-section">
                <h4 class="experience-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    Skills Developed
                </h4>
                <div class="experience-modal-skills">${skillsHTML}</div>
            </div>
            
            <div class="experience-modal-section">
                <h4 class="experience-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Mentor / Supervisor
                </h4>
                <p class="experience-modal-text">${data.mentor}</p>
            </div>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ExperienceSection();
});
