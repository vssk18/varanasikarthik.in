/*
 * WORK SECTION JS
 * Projects & Research with detailed modals, QR codes for GitHub/TechRxiv
 * Orb navigation that auto-switches tabs
 */

class WorkSection {
    constructor() {
        this.tabs = document.querySelectorAll('.work-tab');
        this.panels = document.querySelectorAll('.work-panel');
        this.cards = document.querySelectorAll('.work-card');
        this.overlay = document.querySelector('.work-modal-overlay');
        this.modal = document.querySelector('.work-modal');
        this.closeBtn = document.querySelector('.work-modal-close');
        
        this.init();
    }
    
    init() {
        // Tab switching
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });
        
        // Card click to open modal
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const type = card.dataset.type;
                this.openModal(id, type);
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
        
        // Setup orb navigation
        this.setupOrbNavigation();
    }
    
    switchTab(activeTab) {
        const tabName = activeTab.dataset.tab;
        
        // Update tabs
        this.tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
        
        // Update panels
        this.panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.dataset.panel === tabName) {
                panel.classList.add('active');
            }
        });
    }
    
    // Navigate to tab programmatically (for orb clicks)
    navigateToTab(tabName) {
        const targetTab = document.querySelector(`.work-tab[data-tab="${tabName}"]`);
        if (targetTab) {
            this.switchTab(targetTab);
        }
    }
    
    setupOrbNavigation() {
        // Research orb should switch to research tab
        const orbs = document.querySelectorAll('.floating-orb');
        
        orbs.forEach(orb => {
            orb.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = orb.dataset.section;
                const targetTab = orb.dataset.tab;
                
                // Scroll to work section
                if (targetSection) {
                    const section = document.querySelector(targetSection);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        // If tab specified, switch to it after scroll
                        if (targetTab) {
                            setTimeout(() => {
                                this.navigateToTab(targetTab);
                            }, 500);
                        }
                    }
                }
            });
        });
    }
    
    openModal(id, type) {
        const data = this.getData(id, type);
        if (!data) return;
        
        this.renderModal(data);
        
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize chart after modal opens
        setTimeout(() => {
            this.initChart(data);
            this.generateQRCodes(data);
        }, 400);
    }
    
    closeModal() {
        this.overlay?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    getData(id, type) {
        const allData = {
            // =====================
            // RESEARCH PAPERS
            // =====================
            'manet-ids': {
                type: 'research',
                icon: '🔐',
                badges: ['Under Review', 'Elsevier Ad Hoc Networks'],
                title: 'MANET Intrusion Detection System',
                subtitle: 'Machine Learning-Based Network Security for Mobile Ad-Hoc Networks',
                overview: `Developed a comprehensive intrusion detection system for Mobile Ad-Hoc Networks (MANETs) using machine learning. Built AI system achieving <strong>94.7% accuracy</strong>—originally showed 99.8% but I found data leakage and fixed it despite the accuracy drop, demonstrating research integrity. Created end-to-end pipeline from NS-3 simulation to feature extraction.`,
                methodology: `Simulated AODV routing in NS-3 and extracted 21 features from 4,207 flow records. First results showed 99.8% accuracy, which was too clean for network data this noisy. Traced through the pipeline and found the scaler had been fitted before the train-test split. Rebuilt everything with proper temporal splitting for honest evaluation.`,
                results: `The final XGBoost model achieved <strong>94.7% detection accuracy</strong> with 0.978 ROC-AUC and 5.2% false positive rate. Particularly effective against Blackhole attacks (97.2% detection). The methodology is available on TechRxiv, and the manuscript is under faculty review.`,
                stats: [
                    { value: '94.7%', label: 'Accuracy' },
                    { value: '0.978', label: 'ROC-AUC' },
                    { value: '97.2%', label: 'Blackhole Detection' },
                    { value: '4,207', label: 'Flow Records' }
                ],
                contributions: [
                    'Designed complete ML pipeline from NS-3 simulation to deployment',
                    'Identified and corrected data leakage (scientific integrity)',
                    'Achieved 5.2% false positive rate with balanced metrics',
                    'Validated with 5,000+ bootstrap iterations for confidence intervals',
                    'Created reproducible experimental framework on TechRxiv'
                ],
                tech: ['Python', 'XGBoost', 'NS-3', 'Scikit-learn', 'Pandas', 'NumPy'],
                github: 'https://github.com/vssk18/manet-ids',
                paper: 'https://doi.org/10.36227/techrxiv.176422680.06172390/v1',
                supervisor: 'Dr. Arshad Ahmad Khan Mohammad',
                chartData: {
                    type: 'bar',
                    labels: ['XGBoost', 'Random Forest', 'SVM', 'Neural Net', 'Decision Tree'],
                    data: [94.7, 91.2, 85.6, 88.3, 82.1],
                    title: 'Model Accuracy Comparison (%)'
                }
            },
            'adversarial-ml': {
                type: 'research',
                icon: '⚔️',
                badges: ['Under Review', 'IEEE TIFS'],
                title: 'Adversarial Machine Learning Evaluation',
                subtitle: 'Constraint-Aware Attack Analysis on Network Intrusion Detection',
                overview: `Found that most standard adversarial attacks (73-89%) break basic network rules—they create impossible scenarios like negative timing or oversized packets. Built constrained attack algorithms (C-FGSM, C-PGD, C-C&W) that respect real-world network physics while still achieving 40-68% attack success rates.`,
                methodology: `Implemented comprehensive evaluation framework testing multiple adversarial attack methods against trained IDS models. Developed constraint validation system to check if adversarial samples maintain valid network traffic properties (MTU limits, TCP termination rules, timing constraints). Created live MQTT testbed for realistic validation.`,
                results: `Standard attacks showed high theoretical success but <strong>73-89% of adversarial samples violated network constraints</strong>, making them detectable or impossible in real networks. Created live MQTT testbed proving current detection systems drop <strong>30-40 percentage points</strong> under realistic constrained attacks.`,
                stats: [
                    { value: '73-89%', label: 'Constraint Violations' },
                    { value: '40-68%', label: 'Constrained Success' },
                    { value: '30-40%', label: 'Detection Drop' },
                    { value: '12', label: 'Constraints Defined' }
                ],
                contributions: [
                    'Revealed high constraint violation rates in standard adversarial attacks',
                    'Built constrained attack algorithms respecting protocol semantics',
                    'Constrained perturbations stayed within 0.99x of original feature manifold',
                    'Created live MQTT testbed for realistic attack validation',
                    'Solo manuscript under review at IEEE TIFS'
                ],
                tech: ['Python', 'PyTorch', 'ART', 'MQTT', 'NumPy', 'Matplotlib'],
                github: 'https://github.com/vssk18/manet-adversarial-ids',
                paper: 'https://doi.org/10.36227/techrxiv.176422212.24352740/v1',
                supervisor: 'Dr. C. Atheeq',
                chartData: {
                    type: 'bar',
                    labels: ['FGSM Violations', 'PGD Violations', 'C&W Violations', 'C-FGSM Success', 'C-PGD Success'],
                    data: [89, 79, 73, 68, 52],
                    colors: ['#ef4444', '#ef4444', '#ef4444', '#10b981', '#10b981'],
                    title: 'Attack Analysis (%)'
                }
            },
            'pqc-iot': {
                type: 'research',
                icon: '🔮',
                badges: ['Under Review', 'IEEE TIFS'],
                title: 'Post-Quantum Cryptography for IoT',
                subtitle: 'Performance Analysis of NIST PQC Algorithms on Constrained Devices',
                overview: `Tested 6 NIST post-quantum algorithms across <strong>4,608 configurations</strong> on Raspberry Pi, ESP32, and Arduino, measuring handshake latency, memory usage, and thermal behavior under realistic MQTT workloads. Found performance varied significantly—under memory pressure, ML-KEM handshake latency rose 3.4x above baseline while NTRU-Prime stayed within 12%.`,
                methodology: `Built testing framework handling broker reconnections, isolating cryptographic timing from network delay using perf_counter_ns, and logging over 600,000 messages. Tested six NIST algorithms (ML-KEM, NTRU-Prime, BIKE, HQC, FrodoKEM, Classic McEliece) across varying heap pressure, thermal load, and packet loss simultaneously.`,
                results: `<strong>NTRU-Prime</strong> emerged as optimal for IoT, staying within 12% performance under stress while ML-KEM degraded 3.4x. Larger finding: network delay swallows cryptographic overhead once conditions degrade, making real-world network engineering as critical as algorithm selection.`,
                stats: [
                    { value: '4,608', label: 'Configurations' },
                    { value: '600K+', label: 'Messages Logged' },
                    { value: '12%', label: 'NTRU Variance' },
                    { value: '3.4x', label: 'ML-KEM Degradation' }
                ],
                contributions: [
                    'Comprehensive PQC benchmark on resource-constrained devices',
                    'Identified NTRU-Prime as optimal for IoT under stress',
                    'Built framework isolating crypto timing from network delay',
                    'Measured thermal behavior affecting CPU throttling',
                    'Open-source benchmarking framework for reproducibility'
                ],
                tech: ['C', 'Python', 'liboqs', 'MQTT', 'Raspberry Pi', 'ESP32'],
                github: 'https://github.com/vssk18/PQSM-RESEARCH',
                paper: 'https://doi.org/10.36227/techrxiv.176425515.57150749/v1',
                supervisor: 'Dr. C. Atheeq',
                chartData: {
                    type: 'bar',
                    labels: ['ML-KEM', 'NTRU-Prime', 'BIKE', 'HQC', 'FrodoKEM'],
                    data: [340, 112, 185, 210, 290],
                    title: 'Latency Under Stress (% of Baseline)'
                }
            },
            
            // =====================
            // PROJECTS
            // =====================
            'portfolio': {
                type: 'project',
                icon: '🌐',
                badges: ['Live', 'Web Dev'],
                title: 'Personal Portfolio Website',
                subtitle: 'Modern, Interactive Portfolio with Premium Animations',
                overview: `Built a highly interactive personal portfolio showcasing my work in cybersecurity research and development. Features include premium gold particle animations with cursor influence, smooth scroll reveals, expandable content sections, animated skill bars, and QR code integration for easy access to resources.`,
                methodology: `Developed using vanilla JavaScript for maximum performance, with CSS custom properties for theming. Implemented custom cursor, particle systems, and water ripple effects. Mobile-first responsive design with progressive enhancement for desktop features.`,
                results: `A fast, visually stunning portfolio that effectively showcases research and projects while providing excellent user experience across all devices. Achieves 60fps animation performance.`,
                stats: [
                    { value: '120+', label: 'Gold Particles' },
                    { value: '60fps', label: 'Animation' },
                    { value: 'A+', label: 'Performance' },
                    { value: '100%', label: 'Responsive' }
                ],
                contributions: [
                    'Custom gold particle system with cursor influence',
                    'Premium animations and staggered transitions',
                    'Animated skill bars with shine effects',
                    'QR code integration throughout',
                    'Mobile-optimized performance'
                ],
                tech: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
                github: 'https://github.com/vssk18/varanasikarthik.in',
                liveUrl: 'https://varanasikarthik.in',
                chartData: {
                    type: 'doughnut',
                    labels: ['JavaScript', 'CSS', 'HTML', 'Assets'],
                    data: [45, 35, 15, 5],
                    title: 'Project Composition'
                }
            },
            'sahayam': {
                type: 'project',
                icon: '🛡️',
                badges: ['Active', 'Community'],
                title: 'Project SAHAYAM',
                subtitle: 'Bilingual Cybersecurity Education for Elderly',
                overview: `Founded a community initiative to teach cybersecurity basics to elderly individuals in Telugu and Hindi. Weekly park sessions and campus seminars reaching <strong>320+ participants</strong> since August 2024, with bilingual checklists and follow-up adoption tracking to measure real impact.`,
                methodology: `Developed culturally appropriate educational materials. Topics cover phishing awareness, secure banking, password management, UPI scam detection, and smartphone security—all explained in relatable, jargon-free language. Built offline SMS scam filter for participants with limited data.`,
                results: `Successfully educated 320+ community members about digital safety. The bilingual approach significantly improved comprehension and retention. Follow-ups track whether MFA stays enabled one week later.`,
                stats: [
                    { value: '320+', label: 'Participants' },
                    { value: '2', label: 'Languages' },
                    { value: '8+', label: 'Topics Covered' },
                    { value: 'Aug 2024', label: 'Started' }
                ],
                contributions: [
                    'Bilingual educational materials in Telugu/Hindi',
                    'Practical, jargon-free security guidance',
                    'Built offline SMS scam filter in C++',
                    'Hands-on demonstration sessions',
                    'Follow-up adoption tracking system'
                ],
                tech: ['Community Education', 'Telugu', 'Hindi', 'C++', 'Security Awareness'],
                github: 'https://github.com/vssk18/PROJECT-SAHAYAM',
                liveUrl: null,
                chartData: {
                    type: 'doughnut',
                    labels: ['Phishing/UPI Scams', 'Banking Safety', 'Password/MFA', 'General Safety'],
                    data: [35, 25, 25, 15],
                    title: 'Topics Coverage'
                }
            },
            'uni-rec': {
                type: 'project',
                icon: '🎓',
                badges: ['ML', 'Web App'],
                title: 'University Recommendation System',
                subtitle: 'ML-Powered Graduate School Matching',
                overview: `Built a recommendation system for graduate school applications. Takes GPA, GRE, research papers, and work experience, then computes a profile score. Maps to tiers that classify universities into Ambitious, Target, or Safe buckets. Used for my actual Stanford and CMU applications.`,
                methodology: `Uses TF-IDF to convert student research interests and program descriptions into comparable vectors. Cosine similarity measures match quality. Multi-factor scoring with weighted factors (GPA 40%, IELTS 25%, GRE 20%, Research 10%, Experience 5%). Database of 470+ universities.`,
                results: `Used for Stanford and CMU applications. Quota system distributes picks across buckets for balanced recommendations. Added hard rule that top-15 programs are always Ambitious regardless of profile strength.`,
                stats: [
                    { value: '470+', label: 'Universities' },
                    { value: 'TF-IDF', label: 'Algorithm' },
                    { value: '5', label: 'Scoring Factors' },
                    { value: '3', label: 'Buckets' }
                ],
                contributions: [
                    'TF-IDF vectorization for research interest matching',
                    'Multi-factor weighted scoring system',
                    'Ambitious/Target/Safe bucket classification',
                    'Flask web interface with responsive design',
                    'HashMap for O(1) university lookup by name'
                ],
                tech: ['Python', 'Flask', 'Scikit-learn', 'TF-IDF', 'Pandas', 'SQLite'],
                github: 'https://github.com/vssk18/UNIVERSITY-RECOMMENDATION-SYSTEM',
                liveUrl: null,
                chartData: {
                    type: 'bar',
                    labels: ['GPA (40%)', 'IELTS (25%)', 'GRE (20%)', 'Research (10%)', 'Experience (5%)'],
                    data: [40, 25, 20, 10, 5],
                    title: 'Factor Weights'
                }
            },
            'iot-lighting': {
                type: 'project',
                icon: '💡',
                badges: ['IoT', 'Hardware'],
                title: 'Energy Efficient IoT Lighting',
                subtitle: 'Smart Automation with 40% Energy Savings',
                overview: `Arduino-based smart lighting system automatically adjusting brightness based on ambient light and occupancy. Achieved <strong>40% energy savings</strong> through intelligent sensor fusion and PWM dimming.`,
                methodology: `PIR motion detection activates lights only when room occupied. LDR continuously monitors natural light levels. PWM provides smooth 0-100% dimming via IRF540N MOSFET. ACS712 current sensor logs energy consumption. State machine logic for smooth transitions.`,
                results: `40% energy savings vs always-on baseline. Average response time 200ms. Smooth dimming with no visible flicker. SD card logging for analysis.`,
                stats: [
                    { value: '40%', label: 'Energy Saved' },
                    { value: '8mo', label: 'Payback' },
                    { value: '200ms', label: 'Response' },
                    { value: '5m', label: 'PIR Range' }
                ],
                contributions: [
                    'PIR + LDR sensor fusion for intelligent control',
                    'PWM dimming via IRF540N MOSFET',
                    'Energy monitoring with ACS712 current sensor',
                    'SD card logging for analysis',
                    'State machine logic for smooth transitions'
                ],
                tech: ['Arduino', 'C++', 'PIR Sensor', 'LDR', 'PWM', 'MOSFET'],
                github: 'https://github.com/vssk18/ENERGY-EFFICIENT-IOT-LIGHTING-SYSTEM',
                liveUrl: null,
                chartData: {
                    type: 'line',
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    data: [15, 28, 35, 38, 40, 40],
                    title: 'Cumulative Energy Savings (%)'
                }
            },
            'wealth-mgmt': {
                type: 'project',
                icon: '📊',
                badges: ['Java', 'Desktop'],
                title: 'Strategic Wealth Management',
                subtitle: 'Portfolio Tracking with Java/MySQL',
                overview: `Java-based desktop application for personal investment portfolio management. Features real-time tracking, risk assessment, asset allocation analysis, and performance visualization. Layered architecture separating model, logic, and data classes.`,
                methodology: `Java 11 with Swing GUI. MySQL database with JDBC connectivity. Portfolio tracking uses HashMap for O(1) asset lookup by symbol. ArrayList for transaction history. JFreeChart for visualization.`,
                results: `Full-featured portfolio manager with transaction history, risk metrics (beta, Sharpe ratio), and benchmark comparison. Multi-asset support including stocks, bonds, mutual funds, and FDs.`,
                stats: [
                    { value: 'Java 11', label: 'Backend' },
                    { value: 'MySQL', label: 'Database' },
                    { value: 'MVC', label: 'Pattern' },
                    { value: 'Swing', label: 'GUI' }
                ],
                contributions: [
                    'Real-time portfolio dashboard with visual indicators',
                    'Multi-asset support (stocks, bonds, mutual funds, FDs)',
                    'Risk assessment with beta and Sharpe ratio',
                    'Complete transaction history with audit trail',
                    'JFreeChart performance visualization'
                ],
                tech: ['Java', 'Swing', 'MySQL', 'JDBC', 'JFreeChart'],
                github: 'https://github.com/vssk18/StrategicWealthManagementSystem',
                liveUrl: null,
                chartData: {
                    type: 'doughnut',
                    labels: ['Equities', 'Bonds', 'Mutual Funds', 'Fixed Deposits'],
                    data: [45, 25, 20, 10],
                    title: 'Sample Asset Allocation'
                }
            }
        };
        
        return allData[id];
    }
    
    renderModal(data) {
        const header = document.querySelector('.work-modal-header');
        const body = document.querySelector('.work-modal-body');
        
        if (!header || !body) return;
        
        // Render header
        const badgesHTML = data.badges.map(b => `<span class="work-modal-badge">${b}</span>`).join('');
        
        header.innerHTML = `
            <button class="work-modal-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="work-modal-meta">
                <div class="work-modal-icon">${data.icon}</div>
                <div class="work-modal-badges">${badgesHTML}</div>
            </div>
            <h2 class="work-modal-title">${data.title}</h2>
            <p class="work-modal-subtitle">${data.subtitle}</p>
        `;
        
        // Rebind close button
        header.querySelector('.work-modal-close').addEventListener('click', () => this.closeModal());
        
        // Render stats
        const statsHTML = data.stats.map(s => `
            <div class="work-modal-stat">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>
        `).join('');
        
        // Render contributions
        const contribHTML = data.contributions.map(c => `
            <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ${c}
            </li>
        `).join('');
        
        // Render tech stack
        const techHTML = data.tech.map(t => `<span class="work-modal-tech-tag">${t}</span>`).join('');
        
        // QR section (different for research vs project)
        let qrSectionHTML = '';
        if (data.type === 'research') {
            qrSectionHTML = `
                <div class="work-modal-qr-section">
                    <h4 class="work-modal-qr-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Quick Access (Scan QR)
                    </h4>
                    <div class="work-modal-qr-grid">
                        ${data.github ? `
                        <div class="work-qr-item">
                            <div class="work-qr-code" id="qr-github" data-url="${data.github}"></div>
                            <span class="work-qr-label github">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </span>
                        </div>
                        ` : ''}
                        ${data.paper ? `
                        <div class="work-qr-item">
                            <div class="work-qr-code" id="qr-paper" data-url="${data.paper}"></div>
                            <span class="work-qr-label techrxiv">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                TechRxiv
                            </span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        } else {
            // Project QRs
            qrSectionHTML = `
                <div class="work-modal-qr-section">
                    <h4 class="work-modal-qr-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Quick Access (Scan QR)
                    </h4>
                    <div class="work-modal-qr-grid">
                        ${data.github ? `
                        <div class="work-qr-item">
                            <div class="work-qr-code" id="qr-github" data-url="${data.github}"></div>
                            <span class="work-qr-label github">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </span>
                        </div>
                        ` : ''}
                        ${data.liveUrl ? `
                        <div class="work-qr-item">
                            <div class="work-qr-code" id="qr-live" data-url="${data.liveUrl}"></div>
                            <span class="work-qr-label paper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                                Live Site
                            </span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }
        
        // Supervisor info for research
        const supervisorHTML = data.supervisor ? `
            <div class="work-modal-section">
                <h4 class="work-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Supervisor
                </h4>
                <p class="work-modal-text">${data.supervisor}</p>
            </div>
        ` : '';
        
        body.innerHTML = `
            <div class="work-modal-section">
                <h4 class="work-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                    Overview
                </h4>
                <p class="work-modal-text">${data.overview}</p>
            </div>
            
            <div class="work-modal-stats">${statsHTML}</div>
            
            <div class="work-modal-section">
                <h4 class="work-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                    Methodology
                </h4>
                <p class="work-modal-text">${data.methodology}</p>
            </div>
            
            <div class="work-modal-section">
                <h4 class="work-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    Results
                </h4>
                <p class="work-modal-text">${data.results}</p>
            </div>
            
            <div class="work-modal-chart" id="work-chart-container">
                <canvas id="work-chart"></canvas>
            </div>
            
            <div class="work-modal-section">
                <h4 class="work-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Key Contributions
                </h4>
                <ul class="work-modal-list">${contribHTML}</ul>
            </div>
            
            <div class="work-modal-section">
                <h4 class="work-modal-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    Technologies Used
                </h4>
                <div class="work-modal-tech">${techHTML}</div>
            </div>
            
            ${supervisorHTML}
            
            ${qrSectionHTML}
        `;
    }
    
    initChart(data) {
        const ctx = document.getElementById('work-chart')?.getContext('2d');
        if (!ctx || typeof Chart === 'undefined' || !data.chartData) return;
        
        if (window.workChart) {
            window.workChart.destroy();
        }
        
        const chartConfig = this.getChartConfig(data.chartData);
        window.workChart = new Chart(ctx, chartConfig);
    }
    
    getChartConfig(chartData) {
        const baseOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: chartData.title,
                    color: '#f8fafc',
                    font: { size: 15, weight: '600' },
                    padding: { bottom: 25 }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        };
        
        // Custom colors for adversarial chart
        const getColors = () => {
            if (chartData.colors) {
                return chartData.colors.map(c => c === '#ef4444' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(16, 185, 129, 0.7)');
            }
            return 'rgba(251, 191, 36, 0.7)';
        };
        
        const getBorderColors = () => {
            if (chartData.colors) {
                return chartData.colors;
            }
            return 'rgba(251, 191, 36, 1)';
        };
        
        switch (chartData.type) {
            case 'bar':
            case 'horizontalBar':
                return {
                    type: 'bar',
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            data: chartData.data,
                            backgroundColor: getColors(),
                            borderColor: getBorderColors(),
                            borderWidth: 2,
                            borderRadius: 6
                        }]
                    },
                    options: {
                        ...baseOptions,
                        indexAxis: chartData.type === 'horizontalBar' ? 'y' : 'x',
                        scales: {
                            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
                            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', font: { size: 11 } }, beginAtZero: true }
                        }
                    }
                };
            
            case 'line':
                return {
                    type: 'line',
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            data: chartData.data,
                            borderColor: 'rgba(251, 191, 36, 1)',
                            backgroundColor: 'rgba(251, 191, 36, 0.15)',
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
                        ...baseOptions,
                        scales: {
                            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' }, beginAtZero: true }
                        }
                    }
                };
            
            case 'doughnut':
            case 'pie':
                return {
                    type: chartData.type,
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            data: chartData.data,
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
                        ...baseOptions,
                        cutout: chartData.type === 'doughnut' ? '55%' : 0
                    }
                };
            
            default:
                return null;
        }
    }
    
    generateQRCodes(data) {
        // Generate QR codes using API
        const qrElements = document.querySelectorAll('.work-qr-code');
        
        qrElements.forEach(el => {
            const url = el.dataset.url;
            if (!url) return;
            
            // Clear existing
            el.innerHTML = '';
            
            // Use QR code API
            const img = document.createElement('img');
            img.src = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=000000`;
            img.alt = 'QR Code';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            
            el.appendChild(img);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.workSection = new WorkSection();
});
