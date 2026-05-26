import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaCss3Alt,
  FaFigma,
  FaGithub,
  FaHtml5,
  FaJava,
  FaLinkedin,
  FaPython,
  FaReact,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiMongodb,
  SiPostgresql,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import './index.css';

// Framer motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function FirebaseIcon({ className, size = 38 }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <path fill="#FFCA28" d="M5.5 25.1l-1.9-12c-.1-.5.3-.9.8-.8l10.9 6.2z" />
      <path fill="#FFA000" d="M15.3 18.5l-4.1-8.2c-.2-.5-.9-.4-1 .1L5.5 25.1z" />
      <path fill="#F57C00" d="M26.5 25.1l-1.6-13.6c-.1-.5-.7-.7-1-.3L15.3 18.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <div className="letter-image" aria-hidden="true">
      <div className="animated-mail">
        <div className="back-fold"></div>
        <div className="letter">
          <div className="letter-border"></div>
          <div className="letter-title"></div>
          <div className="letter-context"></div>
          <div className="letter-stamp"></div>
        </div>
        <div className="top-fold"></div>
        <div className="mail-body"></div>
        <div className="left-fold"></div>
      </div>
      <div className="mail-shadow"></div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <span className="phone-button" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 32 32" height="32" fill="none" className="phone-svg">
        <path strokeWidth="2" strokeLinecap="round" stroke="#fff" fillRule="evenodd" d="m24.8868 19.1288c-1.0274-.1308-2.036-.3815-3.0052-.7467-.7878-.29-1.6724-.1034-2.276.48-.797.8075-2.0493.9936-2.9664.3258-1.4484-1.055-2.7233-2.3295-3.7783-3.7776-.6681-.9168-.4819-2.1691.3255-2.9659.5728-.6019.7584-1.4748.4802-2.2577-.3987-.98875-.6792-2.02109-.8358-3.07557-.2043-1.03534-1.1138-1.7807-2.1694-1.77778h-3.18289c-.60654-.00074-1.18614.25037-1.60035.69334-.40152.44503-.59539 1.03943-.53345 1.63555.344 3.31056 1.47164 6.49166 3.28961 9.27986 1.64878 2.5904 3.84608 4.7872 6.43688 6.4356 2.7927 1.797 5.9636 2.9227 9.2644 3.289h.1778c.5409.0036 1.0626-.2 1.4581-.569.444-.406.6957-.9806.6935-1.5822v-3.1821c.0429-1.0763-.7171-2.0185-1.7782-2.2046z" clipRule="evenodd" />
      </svg>
    </span>
  );
}

const skillGroups = [
  {
    title: '💻 Programming Languages',
    skills: [
      { name: 'Java', icon: FaJava, style: 'java' },
      { name: 'Python', icon: FaPython, style: 'python' },
      { name: 'JavaScript', icon: SiJavascript, style: 'javascript' },
    ],
  },
  {
    title: '🌐 Web Technologies',
    skills: [
      { name: 'HTML5', icon: FaHtml5, style: 'html' },
      { name: 'CSS3', icon: FaCss3Alt, style: 'css' },
    ],
  },
  {
    title: '⚛️ Frontend Development',
    skills: [
      { name: 'React', icon: FaReact, style: 'react' },
    ],
  },
  {
    title: '🗄️ Databases',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, style: 'mongodb' },
      { name: 'PostgreSQL', icon: SiPostgresql, style: 'postgresql' },
    ],
  },
  {
    title: '☁️ Backend Services & Cloud',
    skills: [
      { name: 'Firebase', icon: FirebaseIcon, style: 'firebase' },
    ],
  },
  {
    title: '🛠️ Tools',
    skills: [
      { name: 'GitHub', icon: FaGithub, style: 'github' },
      { name: 'VS Code', icon: VscCode, style: 'vscode' },
      { name: 'Figma', icon: FaFigma, style: 'figma' },
    ],
  },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/osho1203/',
    icon: FaLinkedin,
    style: 'linkedin',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Osho03',
    icon: FaGithub,
    style: 'github',
  },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!isResumeOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsResumeOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isResumeOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setContactStatus({ type: 'sending', message: 'Sending your message...' });

    try {
      const response = await fetch('https://formsubmit.co/ajax/oshomani2006@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });

      if (!response.ok) {
        throw new Error('Message could not be sent.');
      }

      await response.json();
      form.reset();
      setContactStatus({
        type: 'success',
        message: 'Message sent successfully!',
      });
    } catch {
      setContactStatus({ type: 'error', message: 'Unable to send right now. Please email me directly.' });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Osho M</div>
        <div className="nav-links">
          <a href="#welcome">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <label className="theme-switch" aria-label="Toggle theme">
          <input className="theme-switch__checkbox" type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
          <div className="theme-switch__container">
            <div className="theme-switch__clouds"></div>
            <div className="theme-switch__stars-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor" />
              </svg>
            </div>
            <div className="theme-switch__circle-container">
              <div className="theme-switch__sun-moon-container">
                <div className="theme-switch__moon">
                  <div className="theme-switch__spot"></div>
                  <div className="theme-switch__spot"></div>
                  <div className="theme-switch__spot"></div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </nav>

      <main>
        <motion.section id="welcome" className="welcome-section" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="content-left">
            <motion.p className="greeting" variants={fadeInUp}>Hello, I am</motion.p>
            <motion.h1 className="name" variants={fadeInUp}>Osho</motion.h1>
            <motion.h2 className="role" variants={fadeInUp}>Final-Year Computer Science and Engineering Student</motion.h2>
            <motion.p className="college" variants={fadeInUp}>at Mailam Engineering College</motion.p>
            <motion.a className="hero-start-button" href="#about" variants={fadeInUp}>
              <strong>GET STARTED</strong>
              <span className="hero-start-stars-container">
                <span className="hero-start-stars"></span>
              </span>
              <span className="hero-start-glow">
                <span className="hero-start-circle"></span>
                <span className="hero-start-circle"></span>
              </span>
            </motion.a>
            <motion.div className="resume-actions" variants={fadeInUp}>
              <a className="resume-action resume-download" href="/Osho-M-Resume.png" download="Osho-M-Resume.png">Download Resume</a>
              <button className="resume-action resume-view" type="button" onClick={() => setIsResumeOpen(true)}>View Resume</button>
            </motion.div>
          </div>
          <motion.div className="image-right" variants={fadeInUp}>
            <img className="hero-photo" src="/osho-photo.png" alt="Portrait of Osho M." />
          </motion.div>
        </motion.section>

        <motion.section id="about" className="about-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
          <div className="about-content">
            <h2>About Me</h2>
            <p>I'm a final-year Computer Science and Engineering student at Mailam Engineering College with a strong interest in AI, Machine Learning, and Software Development.</p>
            <p>From intelligent applications to full-stack web platforms, I enjoy building projects that blend creativity with technology.</p>
            <p>Every project is an opportunity to learn, innovate, and contribute to the future of digital solutions.</p>
          </div>
        </motion.section>

        <motion.section id="projects" className="projects-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <div className="section-header">
            <motion.h2 variants={fadeInUp}>Featured Projects</motion.h2>
            <motion.p variants={fadeInUp}>A selection of my recent work</motion.p>
          </div>

          <div className="projects-grid">
            {/* MentorAI */}
            <motion.div className="project-card" variants={fadeInUp}>
              <div className="project-image-gallery">
                <img src="/mentorai1.png" alt="MentorAI Homepage" className="project-img" />
                <img src="/mentorai2.png" alt="MentorAI Results" className="project-img" />
                <img src="/mentorai3.png" alt="MentorAI Chat" className="project-img" />
              </div>
              <div className="project-content">
                <h3 className="animated-title">MentorAI - AI Mentoring Platform</h3>
                <p className="project-desc">"As a student, I struggled to find the right project ideas, validate my skills, and know if my resume was ATS-ready. So I built the tool I wish I had."<br /><br />MentorAI is a comprehensive platform featuring personalized AI roadmaps, an AI coding mentor chat, ATS Resume Scanners, and integrated YouTube/GitHub resources to guide developers and students.</p>
                <div className="tech-stack">
                  <span>Next.js</span><span>React</span><span>TypeScript</span><span>Tailwind CSS</span><span>Supabase</span><span>Groq AI</span>
                </div>
                <div className="project-links">
                  <a href="https://lnkd.in/g9N9wn2D" target="_blank" rel="noreferrer" className="project-demo-button">Live Demo</a>
                  <a href="https://lnkd.in/gXnZvsYj" target="_blank" rel="noreferrer" className="btn-github">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14V12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733V14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331Z" fill="currentColor" />
                    </svg>
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* UrbanEye */}
            <motion.div className="project-card" variants={fadeInUp}>
              <div className="project-image-gallery">
                <img src="/urbaneye1.png" alt="UrbanEye Mobile App" className="project-img" />
                <img src="/urbaneye2.png" alt="UrbanEye Admin Dashboard" className="project-img" />
              </div>
              <div className="project-content">
                <h3 className="animated-title">UrbanEye - AI-Powered Civic Reporting</h3>
                <p className="project-desc">"See it. Report it. Improve your city."<br /><br />UrbanEye is a full-stack application that connects citizens and city administrators using AI to make issue reporting, tracking, and resolution faster and more effective. Citizens can report issues using photos, while the integrated Google Gemini AI automatically detects, classifies, and prioritizes problems.</p>
                <div className="tech-stack">
                  <span>Flutter</span><span>React.js</span><span>Python (Flask)</span><span>MongoDB Atlas</span><span>Google Gemini</span>
                </div>
                <div className="project-links">
                  <a href="https://lnkd.in/gXmM9d6H" target="_blank" rel="noreferrer" className="project-demo-button">Try App (APK)</a>
                  <a href="https://lnkd.in/gsZuNB4i" target="_blank" rel="noreferrer" className="btn-github">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14V12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733V14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331Z" fill="currentColor" />
                    </svg>
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="skills" className="skills-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.div className="section-header" variants={fadeInUp}>
            <h2>Skills & Tools</h2>
            <p>Technologies I use to turn ideas into working products</p>
          </motion.div>
          <div className="skills-panel">
            {skillGroups.map((group) => (
              <motion.div className="skill-group" variants={fadeInUp} key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-items">
                  {group.skills.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <div className="skill-card" key={skill.name}>
                        <Icon className={`skill-icon ${skill.style}`} size={38} aria-hidden="true" />
                        <span className="skill-name">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" className="contact-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
          <div className="contact-content">
            <p className="contact-eyebrow">Let's Connect</p>
            <h2>Get In Touch</h2>
            <p className="contact-intro">I am Osho M., a final-year Computer Science and Engineering student based in Puducherry, open to opportunities and collaboration.</p>
            <div className="contact-cards">
              <a className="contact-card email-card" href="mailto:oshomani2006@gmail.com">
                <div className="contact-icon-stage"><MailIcon /></div>
                <span>Email</span>
                <strong>oshomani2006@gmail.com</strong>
              </a>
              <a className="contact-card phone-card" href="tel:+918778215728">
                <div className="contact-icon-stage"><PhoneIcon /></div>
                <span>Phone</span>
                <strong>+91 87782 15728</strong>
              </a>
              <div className="contact-card location-card">
                <div className="contact-icon-stage"><div className="location-loader" aria-hidden="true"></div></div>
                <span>Location</span>
                <strong>Puducherry, India</strong>
              </div>
            </div>
            <div className="social-links contact-socials">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a className={`social-link ${social.style}`} href={social.href} target="_blank" rel="noreferrer" key={social.name}>
                    <Icon aria-hidden="true" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="site-footer">
        <div className="footer-message">
          <div className="footer-message-copy">
            <p className="contact-eyebrow">Message Me</p>
            <h2>Have an idea or opportunity?</h2>
            <p>Send a message and I will get back to you soon.</p>
          </div>
          <form className="message-form" onSubmit={handleContactSubmit}>
            <div className="message-fields">
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="your@email.com" required />
              </label>
            </div>
            <label>
              <span>Message</span>
              <textarea name="message" rows="4" placeholder="Write your message here..." required></textarea>
            </label>
            <div className="message-submit-row">
              <button type="submit" disabled={contactStatus.type === 'sending'}>
                {contactStatus.type === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {contactStatus.message && (
                <p className={`message-status ${contactStatus.type}`} role="status">{contactStatus.message}</p>
              )}
            </div>
          </form>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Osho M. All rights reserved.</p>
          <div className="footer-socials">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
      {isResumeOpen && (
        <div className="resume-modal-backdrop" onClick={() => setIsResumeOpen(false)} role="presentation">
          <section className="resume-modal" role="dialog" aria-modal="true" aria-label="Osho M. resume preview" onClick={(event) => event.stopPropagation()}>
            <div className="resume-modal-header">
              <h2>Resume</h2>
              <div className="resume-modal-controls">
                <a href="/Osho-M-Resume.png" download="Osho-M-Resume.png">Download</a>
                <button type="button" onClick={() => setIsResumeOpen(false)} aria-label="Close resume preview">Close</button>
              </div>
            </div>
            <div className="resume-frame">
              <img src="/Osho-M-Resume.png" alt="Osho M. resume" />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
