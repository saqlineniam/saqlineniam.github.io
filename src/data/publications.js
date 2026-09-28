export const publications = [
  {
    id: 6,
    slug: "cold-plasma-applications",
    title: "Cold plasma applications in agri-food processing and packaging.",
    authors: "Patwary, M. A., Rahman, T., Das, E., Hossain, M. A., Hossain, M., Niam, S., Islam, A. A., & Yasin, M.",
    journal: "Discover Food",
    year: "2026",
    type: "Journal Article",
    status: "Published",
    doi: "10.1007/s44187-026-01054-0",
    link: "https://doi.org/10.1007/s44187-026-01054-0",
    pdf: "",
    featured: false,
    background: "This review traces how cold plasma has moved from a nascent research stage to a technology of industrial-scale relevance for the agri-food sector, as a safer alternative to thermal and chemical preservation methods that degrade heat-sensitive nutrients and leave persistent chemical residues. It covers cold plasma applications across agri-food processing and sustainable packaging.",
    images: []
  },
  {
    id: 2,
    slug: "tea-concentrates-sensory",
    projectSlug: "tea-concentrate-sensory-ml",
    title: "Comprehensive Analysis of Tea Concentrates with Machine Learning Assisted Sensory Characterization.",
    authors: "Dina, P. R., Niam, S., Ahmad, I., Zzaman, W., Salim, M., Rayhan, M. A., Ahmed, M. M., Rahman, T., & Shifat, A. S.",
    journal: "Applied Food Research",
    year: "2026",
    type: "Journal Article",
    status: "Published",
    doi: "10.1016/j.afres.2026.101896",
    link: "https://doi.org/10.1016/j.afres.2026.101896",
    pdf: "",
    featured: true,
    background: "We tracked physicochemical, biochemical, microbiological and sensory changes in seven tea concentrate types (FBOP, FP, BOP, GBOP, CD, RD and PF) over 30 days of frozen storage at −18 °C, and built machine learning models that predict sensory quality from chemical parameters. Total phenolic content declined 19–30% and theaflavins 70–80%, while highly polymerized substances increased 7–15%. The Broken Orange Pekoe concentrate scored highest on sensory evaluation (38.76 out of 45, rated Excellent).",
    images: [
      { id: 1, caption: "E-Nose Setup and Analytical Rig" },
      { id: 2, caption: "HPLC Analysis of Tea Concentrates" }
    ]
  },
  {
    id: 1,
    slug: "strawberry-edible-coatings",
    projectSlug: "ml-strawberry-edible-coatings",
    title: "Machine learning-based optimization of alginate, guar gum, and pectin-based edible coatings for extended strawberry shelf life.",
    authors: "Niam, S., Ahmad, I., Rayhan, M. A., Mahmood, S., Jon, P. H., & Ahmed, M. M.",
    journal: "LWT",
    year: "2025",
    type: "Journal Article",
    status: "Published",
    doi: "10.1016/J.LWT.2025.118548",
    link: "https://doi.org/10.1016/J.LWT.2025.118548",
    pdf: "",
    featured: true,
    background: "During this study, we explored the impact of different bio-coatings on extending the shelf life of highly perishable strawberries. The work involved extensive wet lab experimentation combined with predictive machine learning models to identify the optimal coating formulations.",
    images: [
      { id: 1, src: "/images/strawberries/lab1.webp", caption: "Lab Setup & Sample Preparation" },
      { id: 2, src: "/images/strawberries/lab2.webp", caption: "Coating Formulation Process" },
      { id: 3, src: "/images/strawberries/lab3.webp", caption: "Sensory & Quality Evaluation" },
      { id: 4, src: "/images/strawberries/lab4.webp", caption: "Data Collection & Analysis" }
    ]
  },
  {
    id: 3,
    slug: "germination-uplift-plasma",
    title: "A machine learning framework integrating seed traits and plasma parameters for predicting germination uplift in crops.",
    authors: "Niam, S., Rahman, T., Patwary, A., Hossain, M.",
    journal: "International Plant Tissue Culture and Biotechnology Conference",
    year: "2025",
    type: "Conference Paper",
    status: "Published",
    doi: "arXiv:2510.23657v1",
    link: "https://arxiv.org/abs/2510.23657v1",
    pdf: "/pdfs/germination-uplift-plasma-poster.pdf",
    projectSlug: "seed-germination-mlflow",
    featured: false,
    background: "We introduced a novel framework that bridges plasma agriculture with predictive modeling. By feeding seed traits and non-thermal plasma treatment parameters into ML algorithms, we achieved highly accurate germination rate predictions. Among the models tested (GB, XGB, ET, and hybrids), Extra Trees (ET) performed best (R2 = 0.919; RMSE = 3.21; MAE = 2.62). Engineering analysis revealed a hormetic response: negligible effects at low/high voltages, with maximum germination at 7-15 kV for 200-500s.",
    images: [
      { id: 1, caption: "Plasma Treatment Chamber and Seed Monitoring" },
      { id: 2, caption: "Technical Presentation at the IPTCB Symposium" }
    ]
  },
  {
    id: 4,
    slug: "ctc-black-tea-bioactive",
    title: "Response surface optimization of the extraction of bioactive compounds in CTC black tea infusion.",
    authors: "S. M., S. M., Iftekhar, A., Zzaman, W., Patwary, M. A., Jon, P. H., & Niam, S.",
    journal: "International Tea Symposium, Sri Lanka",
    year: "2025",
    type: "Conference Paper",
    status: "Published",
    doi: "",
    link: "#",
    pdf: "",
    featured: false,
    background: "This study utilized Response Surface Methodology (RSM) to determine the exact brewing parameters (time, temperature) that yield the highest concentration of bioactive compounds in CTC black tea.",
    images: [
      { id: 1, caption: "Bioactive Compound Analysis via Spectrophotometry" }
    ]
  },
  {
    id: 5,
    slug: "bread-multigrain-classification",
    projectSlug: "bread-classification-cv",
    title: "Application of Computer Vision for Classification of Bread Made from All-Purpose and Multigrain Flour with Physicochemical Characterization",
    authors: "Niam, S., et al.",
    journal: "Food Chemistry",
    year: "2025",
    type: "Journal Article",
    status: "In Preparation",
    doi: "",
    link: "#",
    pdf: "",
    featured: false,
    background: "We applied computer vision techniques to analyze crumb structure, crust color, and pore distribution in various bread formulations. This non-destructive method strongly correlated with traditional physicochemical tests.",
    images: [
      { id: 1, caption: "Computer Vision Imaging Setup for Crumb Analysis" }
    ]
  }
];