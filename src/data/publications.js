export const publications = [
  {
    id: 2,
    slug: "tea-concentrates-sensory",
    title: "Comprehensive Analysis of Tea Concentrates with Machine Learning–Assisted Sensory Characterization.",
    authors: "Dina, P. R., Niam, S., Ahmad, I., Zzaman, W., Salim, M., Ahmed, Md. M., Rahman, T., & Shifat, A. S.",
    journal: "Applied Food Research",
    year: "2026",
    type: "Journal Article",
    status: "Published",
    doi: "10.2139/SSRN.5398137",
    link: "https://doi.org/10.2139/SSRN.5398137",
    pdf: "",
    featured: true,
    background: "This research focused on analyzing the chemical profile and sensory attributes of concentrated tea extracts. We utilized machine learning models to map analytical data directly to sensory descriptors, reducing the reliance on subjective human panels. \n\n(Edit this to add behind-the-scenes details of the tea processing or data collection).",
    images: [
      { id: 1, caption: "[Lab Picture Placeholder 1: e.g., E-Nose Setup]" },
      { id: 2, caption: "[Lab Picture Placeholder 2: e.g., HPLC Analysis]" }
    ]
  },
  {
    id: 1,
    slug: "strawberry-edible-coatings",
    title: "Machine learning-based optimization of alginate, guar gum, and pectin-based edible coatings for extended strawberry shelf life.",
    authors: "Niam, S., Ahmad, I., Rayhan, M. A., Mahmood, S., Jon, P. H., & Ahmed, M. M.",
    journal: "LWT - Food Science and Technology",
    year: "2025",
    type: "Journal Article",
    status: "Published",
    doi: "10.1016/J.LWT.2025.118548",
    link: "https://doi.org/10.1016/J.LWT.2025.118548",
    pdf: "",
    featured: true,
    background: "During this study, we explored the impact of different bio-coatings on extending the shelf life of highly perishable strawberries. The work involved extensive wet lab experimentation combined with predictive machine learning models to identify the optimal coating formulations. \n\n(You can edit this narrative later to include your personal perspective, challenges overcome, or interesting anecdotes from the lab!)",
    images: [
      { id: 1, src: "/images/strawberries/lab1.jpg", caption: "Lab Setup & Sample Preparation" },
      { id: 2, src: "/images/strawberries/lab2.jpg", caption: "Coating Formulation Process" },
      { id: 3, src: "/images/strawberries/lab3.jpg", caption: "Sensory & Quality Evaluation" },
      { id: 4, src: "/images/strawberries/lab4.jpg", caption: "Data Collection & Analysis" }
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
    featured: false,
    background: "We introduced a novel framework that bridges plasma agriculture with predictive modeling. By feeding seed traits and non-thermal plasma treatment parameters into ML algorithms, we achieved highly accurate germination rate predictions. Among the models tested (GB, XGB, ET, and hybrids), Extra Trees (ET) performed best (R2 = 0.919; RMSE = 3.21; MAE = 2.62). Engineering analysis revealed a hormetic response: negligible effects at low/high voltages, with maximum germination at 7-15 kV for 200-500s. \n\n(Edit to add your presentation photos or lab equipment).",
    images: [
      { id: 1, caption: "[Lab Picture Placeholder 1: e.g., Plasma Treatment Chamber]" },
      { id: 2, caption: "[Conference Picture: e.g., Presenting at the Symposium]" }
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
    background: "This study utilized Response Surface Methodology (RSM) to determine the exact brewing parameters (time, temperature) that yield the highest concentration of bioactive compounds in CTC black tea. \n\n(Add details about your extraction procedures).",
    images: [
      { id: 1, caption: "[Lab Picture Placeholder 1: e.g., Spectrophotometry Analysis]" }
    ]
  },
  {
    id: 5,
    slug: "bread-multigrain-classification",
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
    background: "We applied computer vision techniques to analyze crumb structure, crust color, and pore distribution in various bread formulations. This non-destructive method strongly correlated with traditional physicochemical tests. \n\n(Describe your custom imaging rig here).",
    images: [
      { id: 1, caption: "[Lab Picture Placeholder 1: e.g., Computer Vision Imaging Setup]" }
    ]
  }
];