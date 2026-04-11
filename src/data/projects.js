export const projects = [
  {
    id: 1,
    slug: "cauliflower-reid-drone",
    title: "Cauliflower Plant Re-ID and Field Mapping with Drones (No GPS)",
    category: "Computer Vision & Robotics",
    story: "Drones flying over crop fields lose track of plants as they loop back — no GPS means no ground truth. This project built a pipeline that uses LoFTR for feature matching, BoTSORT for multi-object tracking, and YOLOv9 for segmentation to stitch together a persistent map of individual cauliflower and cabbage plants across an entire field pass. The core challenge was re-identifying the same plant after loop closure — solved using Hungarian matching in image space with mirror-frame homography correction to fight accumulated drift.",
    tags: ["YOLOv9", "LoFTR", "BoTSORT", "OpenCV", "Homography", "UAV"],
    imageLabel: "[Drone field footage frame / stitched mosaic overlay showing plant bounding boxes]",
    github: false,
    featured: true,
    thumbnail: "/images/cauliflower.jpg"
  },
  {
    id: 2,
    slug: "apple-tracking-orchard",
    title: "Real-Time Apple Tracking in Orchards with BotSORT + LoFTR",
    category: "Computer Vision & Robotics",
    story: "Tracking fruit in a moving, occluded orchard environment is harder than it looks — apples look identical, cluster together, and disappear behind branches. This project combined LoFTR's detector-free local feature matching with BotSORT's multi-object tracking to maintain persistent IDs on individual apples across frames in real time, intended for yield estimation pipelines.",
    tags: ["LoFTR", "BotSORT", "Real-time tracking", "Python", "OpenCV"],
    imageLabel: "[Side-by-side: raw orchard video frame | tracked frame with bounding boxes and IDs]",
    github: true,
    featured: true,
    youtubeId: "7ht56wef0Fc",
    thumbnail: "https://img.youtube.com/vi/7ht56wef0Fc/hqdefault.jpg"
  },
  {
    id: 3,
    slug: "south-asia-heatwave-causal",
    title: "South Asia Heatwave Causal Dynamics (2000–2024)",
    category: "Climate & Geospatial",
    story: "South Asian heatwaves are intensifying — but which atmospheric and oceanic variables are actually causing them, and where? This study uses ERA5 reanalysis data across 25 years, builds heatwave event networks via Event Synchronization, detects regional communities with Walktrap graph clustering, then runs PCMCI+ causal discovery (Tigramite) with 32 variables across 35 regional communities to map causal pathways for PreMonsoon and Monsoon seasons. The result is one of the first spatially-resolved causal maps of South Asian heat extremes.",
    tags: ["PCMCI+", "ERA5", "Tigramite", "Event Synchronization", "Walktrap", "NetCDF", "Python"],
    imageLabel: "[Heatwave frequency map of South Asia / community detection network graph — use a choropleth or graph visualization screenshot]",
    github: false,
    featured: true
  },
  {
    id: 4,
    slug: "ground-robot-lettuce-phenotyping",
    title: "Ground Robot Lettuce Phenotyping: Segmentation, Counting, Tracking",
    category: "Computer Vision & Robotics",
    story: "Phenotyping — measuring plant traits at scale — is slow and labor-intensive when done by hand. This project uses a ground robot equipped with a camera to autonomously segment individual lettuce heads, count them, and track their positions across the field using trajectory tracking algorithms. Designed for small-scale precision agriculture where aerial drones can't get close enough.",
    tags: ["Segmentation", "Counting", "Trajectory Tracking", "Python", "OpenCV"],
    imageLabel: "[Robot's-eye-view footage with lettuce segmentation masks overlaid and count labels]",
    github: true,
    featured: true
  },
  {
    id: 5,
    slug: "uav-tomato-weed-mapping",
    title: "UAV Tomato Plant Counting and Weed Mapping",
    category: "Computer Vision & Robotics",
    story: "Manual scouting of tomato fields for plant stands and weed pressure is time-consuming and error-prone. This project develops a real-time UAV pipeline that simultaneously counts tomato plants and maps weed distributions across small-scale agricultural fields — giving farmers an actionable field map after a single drone flight.",
    tags: ["UAV", "Object Detection", "Instance Segmentation", "Python"],
    imageLabel: "[Drone top-down field image with tomato plants and weeds highlighted in different colors]",
    github: false,
    featured: false
  },
  {
    id: 6,
    slug: "weed-detection-drone-maskrcnn",
    title: "Weed Detection from Drone Imagery with Mask RCNN + FPN",
    category: "Computer Vision & Robotics",
    story: "Weeds compete with crops for resources, and catching them early is critical. This project benchmarks Faster RCNN and Mask RCNN architectures with RPN and Feature Pyramid Networks for detecting and segmenting weeds in small-scale drone imagery — testing both detection accuracy and segmentation mask quality under real field conditions.",
    tags: ["Mask RCNN", "Faster RCNN", "FPN", "RPN", "Aerial Imagery", "PyTorch"],
    imageLabel: "[Drone field image split — raw vs. segmentation output with colored weed masks]",
    github: true,
    featured: false
  },
  {
    id: 7,
    slug: "tea-worker-activity-monitoring",
    title: "Tea Plantation Worker Activity Monitoring with YOLOv8",
    category: "Computer Vision & Robotics",
    story: "Monitoring worker activity in large tea gardens is practically infeasible manually. This real-time system uses YOLOv8 to detect and classify worker activities — plucking, walking, idle, etc. — from camera feeds deployed across the plantation, enabling supervisors to track productivity patterns.",
    tags: ["YOLOv8", "Activity Recognition", "Real-time", "Python"],
    imageLabel: "[Tea garden scene with worker bounding boxes and activity class labels overlaid]",
    github: false,
    featured: false
  },
  {
    id: 8,
    slug: "ml-strawberry-edible-coatings",
    title: "ML-Optimized Edible Coatings for Strawberry Shelf Life",
    category: "Food Science & Biotech",
    story: "Strawberries rot fast. This published study optimized alginate, guar gum, and pectin-based edible coating formulations using machine learning models, predicting the coating combination that maximizes shelf life across multiple quality indicators — reducing the trial-and-error of traditional food formulation.",
    tags: ["Machine Learning", "Food Science", "Optimization", "Python", "LWT 2025"],
    imageLabel: "[Close-up of fresh vs. coated strawberries / ML prediction surface plot]",
    github: false,
    featured: false,
    thumbnail: "/images/strawberries/main.jpg"
  },
  {
    id: 9,
    slug: "tea-concentrate-sensory-ml",
    title: "Tea Concentrate Sensory Characterization with ML",
    category: "Food Science & Biotech",
    story: "Sensory evaluation of food products is subjective and hard to scale. This study builds ML-assisted models to characterize and predict sensory attributes of tea concentrates, connecting chemical composition data with trained panel responses.",
    tags: ["Sensory Science", "ML", "Tea", "Applied Food Research 2026"],
    imageLabel: "[Tea concentrate samples in lab / radar chart of sensory attributes]",
    github: false,
    featured: false
  },
  {
    id: 10,
    slug: "seed-germination-mlflow",
    title: "Seed Germination Rate Prediction with ML + MLflow Tracking",
    category: "Food Science & Biotech",
    story: "Seed germination is sensitive to both seed traits and pre-treatment parameters like plasma exposure. This project builds a machine learning framework that integrates seed morphological features and plasma treatment parameters to predict germination uplift — complete with MLflow experiment tracking for reproducibility.",
    tags: ["MLflow", "Scikit-learn", "Feature Engineering", "Python", "IPTCB 2025"],
    imageLabel: "[MLflow experiment dashboard screenshot / germination rate vs. prediction scatter plot]",
    github: false,
    featured: false
  },
  {
    id: 11,
    slug: "tea-leaf-disease-cnn",
    title: "Tea Leaf Disease Classification",
    category: "Food Science & Biotech",
    story: "Disease identification in tea leaves is typically done by experienced agronomists — which is slow and scarce. This project builds a CNN-based classifier trained on tea leaf imagery to detect and classify common disease types, aiming to democratize early disease detection for small tea growers.",
    tags: ["CNN", "Transfer Learning", "Image Classification", "Python"],
    imageLabel: "[Tea leaf images — healthy vs. diseased, with predicted class labels]",
    github: true,
    featured: false
  },
  {
    id: 12,
    slug: "cheminformatics-solubility",
    title: "Cheminformatics: Drug Solubility and Bioactivity Prediction",
    category: "Food Science & Biotech",
    story: "Two companion projects in computational drug discovery — one predicts aqueous solubility of molecules from chemical structure (SMILES) using regression models built on RDKit descriptors, the other predicts bioactivity of drug candidates against specific protein targets using ChEMBL data. Both are reproducible notebooks exploring structure-activity relationships.",
    tags: ["RDKit", "ChEMBL", "SMILES", "Cheminformatics", "Python"],
    imageLabel: "[Molecule structure visualization / predicted vs. actual solubility plot]",
    github: true,
    featured: false
  },
  {
    id: 13,
    slug: "bangladesh-flood-climate",
    title: "August 2024 Bangladesh Flood: Climatic Analysis",
    category: "Climate & Geospatial",
    story: "The August 2024 floods in Bangladesh were catastrophic. This project performs a data-driven climatic retrospective — analyzing rainfall patterns, upstream river discharge, and atmospheric conditions that converged to produce the event, using gridded satellite and reanalysis datasets.",
    tags: ["ERA5", "Geospatial Analysis", "Python", "Flood Analysis"],
    imageLabel: "[Flood extent map of Bangladesh / rainfall anomaly choropleth]",
    github: false,
    featured: false
  }
];