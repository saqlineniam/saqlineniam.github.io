// Single source of truth for personal info shown across the site.
// Edit this file to update your bio, links, CV entries and skills.

export const profile = {
  name: "Saklain Niam",
  role: "Graduate Research Assistant",
  affiliation: "Precision Horticulture Lab, University of Georgia",
  orgShort: "UGA",
  photo: "/images/profile.webp",
  avatar: "/images/avatar.webp",
  // *Starred* words are shown in the serif-italic accent style.
  tagline: "Robotics, computer vision and machine learning for *agriculture* and *food systems*.",
  bio: [
    "MS student in Horticulture at the University of Georgia and Graduate Research Assistant in the Precision Horticulture Lab. I build perception and decision-making systems for field robots and drones — from reinforcement learning that teaches a farm-ng Amiga where to measure in onion fields, to GPS-free plant re-identification from UAV imagery.",
    "My background is in Food Engineering and Tea Technology (BSc, SUST), which means I work on both sides of the problem: the wet lab that produces the data, and the models that learn from it.",
  ],
  email: "saklain35@student.sust.edu",
  links: {
    github: "https://github.com/saqlineniam",
    linkedin: "https://linkedin.com/in/saklain-niam",
  },
  // Big call-to-action at the bottom of every page.
  contact: {
    heading: "Let’s build something *together*.",
    blurb: "Open to research collaborations in agricultural robotics, computer vision and machine learning for food systems.",
  },
};

// Tools shown in the scrolling strip on the home page.
export const toolbox = [
  "farm-ng Amiga", "Intel RealSense", "Python", "PyTorch", "Gymnasium", "Stable-Baselines3", "OpenCV",
  "YOLOv8 / v9 / v11", "Mask R-CNN", "RF-DETR", "BoTSORT", "LoFTR", "Scikit-learn", "MLflow", "Docker",
  "ROS 2", "Streamlit", "HPLC", "GC", "E-Nose",
];

export const researchAreas = [
  {
    key: "robotics",
    title: "Agricultural Robotics",
    icon: "Bot",
    desc: "Field robots that decide where and how much to measure, trained in simulation on real drone-mapped fields.",
    items: ["farm-ng Amiga", "Reinforcement learning", "Active sensing", "RGB-D phenotyping"],
  },
  {
    key: "vision",
    title: "Agricultural Computer Vision",
    icon: "ScanEye",
    desc: "Detection, segmentation and tracking of plants from drones and ground robots.",
    items: ["UAV mapping", "Instance segmentation", "Multi-object tracking", "Plant re-identification"],
  },
  {
    key: "ml",
    title: "Machine Learning & MLOps",
    icon: "Cpu",
    desc: "Predictive models with reproducible pipelines, from experiment tracking to deployment.",
    items: ["Ensemble & stacked models", "MLflow tracking", "Docker deployment", "Reinforcement learning"],
  },
  {
    key: "food",
    title: "Food Engineering",
    icon: "FlaskConical",
    desc: "Post-harvest quality, non-thermal processing and data-driven food formulation.",
    items: ["Edible coatings", "Cold plasma treatment", "Sensory analysis", "Tea technology"],
  },
];

export const education = [
  {
    school: "University of Georgia",
    degree: "MS in Horticulture",
    period: "Aug 2026 – Present",
    details: [
      "Graduate Research Assistant, Precision Horticulture Lab (Tifton campus)",
      "Focus: autonomous robotics and computer vision for high-throughput phenotyping and precision horticultural management.",
    ],
  },
  {
    school: "Shahjalal University of Science and Technology",
    degree: "BSc (Engineering) in Food Engineering and Tea Technology",
    period: "2019 – 2024",
    details: [
      "CGPA: 3.46 / 4.00",
      "Thesis: Impact of alginate, guar gum, and pectin-based edible coatings on strawberry shelf life.",
    ],
  },
];

export const experience = [
  {
    title: "Graduate Research Assistant",
    org: "Precision Horticulture Lab, Dept. of Horticulture, University of Georgia (Tifton)",
    period: "Aug 2026 – Present",
    desc: "Agricultural robotics and computer vision for high-throughput phenotyping: reinforcement learning for adaptive crop scouting with a farm-ng Amiga on drone-mapped onion fields, and RGB-D plant height measurement with Intel RealSense.",
  },
  {
    title: "Research Assistant",
    org: "Dept. of Food Engineering and Tea Technology, SUST",
    period: "May 2024 – 2026",
    desc: "Research under Dr. Iftekhar Ahmad, integrating machine learning with non-thermal processing and post-harvest preservation to extend perishable food shelf life.",
  },
];

export const trainings = [
  { title: "Quality Control and Unit Operation", org: "TICI, Bangladesh", period: "Jan – Feb 2023", desc: "Industrial food processing and quality assurance protocols." },
  { title: "Agro-Processing & Preservation", org: "BRRI, Bangladesh", period: "Nov 2022", desc: "Sustainable post-harvest technologies and value addition." },
  { title: "International Tea Trade (Online)", org: "Zhangzhou College, China", period: "Nov 2022", desc: "Global tea economics, processing technology, and trade certification." },
];

export const activities = [
  {
    title: "Publication Secretary",
    org: "Shikorh Cultural Club",
    period: "2023 – 2024",
    desc: "Directed the editorial workflow for departmental publications and cultural newsletters, managing digital and print production.",
  },
];

export const skills = [
  { group: "Programming & ML", items: ["Python", "PyTorch", "OpenCV", "Scikit-learn", "Vision Transformers", "Autoencoders", "Reinforcement Learning", "LaTeX"] },
  { group: "Computer Vision", items: ["YOLOv8 / v9 / v11", "Mask R-CNN", "RF-DETR", "BoTSORT", "LoFTR", "Phase correlation"] },
  { group: "Robotics & DevOps", items: ["farm-ng Amiga", "Intel RealSense", "ROS 2", "SLAM", "Gymnasium", "Stable-Baselines3", "Docker", "MLflow", "Streamlit", "Git", "Linux"] },
  { group: "Food Science", items: ["Bioactive extraction", "Physicochemical analysis", "Chemical formulation", "Non-thermal processing"] },
  { group: "Instruments", items: ["GC", "HPLC", "E-Nose", "Spectrophotometry"] },
  { group: "Stats & Cheminformatics", items: ["Gaussian processes", "PCA / LDA", "Variance tests", "Response surface methodology", "PCMCI", "RDKit", "ChEMBL"] },
];

export const testScores = [
  { name: "IELTS", total: "7.0", parts: [["Reading", "8.0"], ["Listening", "7.5"], ["Speaking", "7.0"], ["Writing", "6.0"]] },
  { name: "GRE", total: "306", parts: [["Quant", "162"], ["Verbal", "144"], ["AWA", "3.0"]] },
];

export const references = [
  { name: "Dr. Iftekhar Ahmad", title: "Professor, SUST", email: "iftekhar-ttc@sust.edu" },
  { name: "Dr. G M Rabiul Islam", title: "Professor, SUST", email: "rabi-ttc@sust.edu" },
];

// Short "what I'm working on now" items shown on the home page.
export const currently = [
  { text: "Reinforcement learning for adaptive crop scouting: teaching a farm-ng Amiga how many onion plants to measure in each 10-ft block.", link: "/projects/amiga-rl-crop-scouting" },
  { text: "Real-time plant height from Intel RealSense depth and YOLO segmentation.", link: "/projects/realsense-plant-height" },
  { text: "Writing up GPS-free cabbage re-identification across drone loop passes (83% re-ID over 372 plants).", link: "/projects/cauliflower-reid-drone" },
];
