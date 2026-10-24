// ✏️ EDIT THIS FILE to update your portfolio. Add an item to any list and save.
export const data = {
  name: 'Sonu Kumar Thakur',
  role: 'Full-stack developer',
  status: 'Immediate joiner, open to work',
  photo: '/images/avatar.png',
  email: 'sonukumart74@gmail.com',
  github: 'https://github.com/SonuSk584',
  linkedin: 'https://www.linkedin.com/in/sonu-thakur-87b5353a0', 
  resume: 'https://drive.google.com/file/d/1r4i0TvoYWg71ODjqTnU85aF4xVvHwK6-/view?usp=sharing',
  resumeFile: '/Sonu_Kumar_Thakur_Resume.pdf',
  web3formsKey: '', // or set VITE_WEB3FORMS_KEY in .env (free key at web3forms.com)
  about: 'CS engineering graduate from NMIT Bengaluru. I like taking a product from database to deployment: auth, payments, real-time features and CI/CD, then adding machine learning where the data supports it.',
  stats: [
    { v: '8.7', l: 'CGPA, B.E. Computer Science' }, 
    { v: '0.844', l: 'ROC-AUC on churn model' },
    { v: '3', l: 'Projects shipped' },
    { v: '2', l: 'Internships' },
  ],
  skills: {
    Languages: ['Java','Python', 'C', 'SQL'],
    Backend: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'WebSocket'],
    Frontend: ['React.js', 'Tailwind CSS', 'HTML', 'JavaScript', 'TypeScript'],
    'Data and ML': ['Pytorch', 'Scikit-learn', 'Pandas', 'NumPy', 'NLP', 'Transformers'],
    Databases: ['MySQL', 'MongoDB'],
    'Tools and cloud': ['Git', 'Docker', 'AWS', 'GitHub Actions', 'Render']
   
  },
  projects: [
    { kind: 'chat', title: 'Polyglot Chat', blurb: 'Real-time multi-user chat with live message translation. Retry and fallback logic keeps it working when the translation API fails; deployed with Docker and GitHub Actions CI/CD.', tags: ['Spring Boot', 'WebSocket', 'MongoDB', 'React', 'Docker'], image: '/images/polyglot.png', github: 'https://github.com/SonuSk584/POLYGLOT', live: 'https://polyglot-six-amber.vercel.app/chat' },
    { kind: 'commerce', title: 'GoFood', blurb: 'Food ordering platform with authentication, an admin dashboard, order management and Razorpay checkout.', tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay'], image: '/images/gofood.gif', github: 'https://github.com/SonuSk584/GoFood', live: 'https://go-food-alpha.vercel.app/' },
    { kind: 'machine learning', title: 'Customer churn prediction', blurb: 'Leakage-safe ML pipeline on 7,043 customers. Compared five model families and chose Random Forest: 0.844 ROC-AUC, 78% recall on held-out data.', tags: ['Python', 'Scikit-learn', 'Pandas'], image: '/images/churn.jpg', github: 'https://github.com/SonuSk584/Churn-prediction', live: '' },
  ],
  experience: [
    { when: 'Dec 2025 to Feb 2026', title: 'Full Stack Engineer Intern', org: 'Nitte Meenakshi Institute of Technology, Bengaluru', points: ['Built and deployed GoFood with React, Node.js, Express and MongoDB.', 'Added authentication, admin workflows, order management and Razorpay payments.'] },
    { when: 'Mar 2023 to Apr 2023', title: 'AI Engineer Intern', org: 'Aqmenz Automation Pvt. Ltd., Bengaluru', points: ['Built a cleaning and feature-engineering pipeline in Pandas and NumPy.', 'Trained Logistic Regression, KNN and Decision Tree classifiers.'] },
  ],
  education: [
    { when: '2022 to 2026', title: 'B.E. Computer Science Engineering', org: 'NMIT, Bengaluru. CGPA 8.7/10' },
    { when: '2020 to 2022', title: 'NEB, Class XII', org: 'Saint Xaviers College, Kathmandu. 90%' },
  ],
  certifications: ['Java Foundation (Infosys)', 'AWS Academy Cloud Foundations', 'DBMS (Infosys)', 'Machine Learning with Python (Infosys)'],
  // "Ask Sonu" answers: if the question contains any keyword (k), that answer (a) is used. h = '#section' or a URL.
  faq: [
    { k: ['available', 'hire', 'hiring', 'join', 'notice', 'open to work', 'immediate'], a: 'Yes. Sonu is an immediate joiner, open to full-stack, backend and ML roles.', l: [{ t: 'Contact him', h: '#contact' }] },
    { k: ['contact', 'email', 'reach', 'phone', 'message'], a: 'The quickest way is the contact form, or email sonukumart74@gmail.com.', l: [{ t: 'Open contact form', h: '#contact' }] },
    { k: ['education', 'degree', 'cgpa', 'college', 'study', 'university'], a: 'B.E. in Computer Science at NMIT Bengaluru (2022 to 2026), CGPA 8.7/10.', l: [{ t: 'Experience and education', h: '#experience' }] },
    { k: ['intern', 'experience', 'job', 'company'], a: 'Two internships: Full Stack Engineer at NMIT (Dec 2025 to Feb 2026) and AI Engineer at Aqmenz Automation (Mar to Apr 2023).', l: [{ t: 'See timeline', h: '#experience' }] },
    { k: ['resume', 'cv'], a: 'Here is the latest resume.', l: [{ t: 'Open resume', h: 'RESUME' }] },
    { k: ['who', 'about', 'yourself', 'introduce'], a: 'Sonu is a full-stack developer and CS graduate who ships products end to end, with ML and LLM skills on top.', l: [{ t: 'About', h: '#about' }] },
    { k: ['certif', 'course'], a: 'Java Foundation, DBMS and Machine Learning with Python (Infosys), and AWS Academy Cloud Foundations.', l: [] },
    { k: ['github', 'code', 'repo'], a: 'All his code is on GitHub.', l: [{ t: 'GitHub', h: 'GITHUB' }] },
    { k: ['linkedin'], a: 'Connect with him on LinkedIn.', l: [{ t: 'LinkedIn', h: 'LINKEDIN' }] },
  ],
}
export const sections = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' }, { id: 'experience', label: 'Experience' }, { id: 'contact', label: 'Contact' },
]
