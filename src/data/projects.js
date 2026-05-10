export const projects = [
  {
    id: 1,
    slug: "cauliflower-reid-drone",
    title: "Cabbage Plant Re-Identification Across GPS-Free Drone Loop Passes",
    category: "Computer Vision & Robotics",
    story: "A DJI Mavic 3E drone flies a single row of cabbage twice — outbound (Phase 1) and return (Phase 2) — with no GPS. With 372 plants per pass and the return view flipped and offset, the challenge is re-identifying every Phase 2 detection as its exact Phase 1 counterpart. Four failed approaches and a deep research dive led to a SeqSLAM-inspired pipeline combining YOLOv9c-seg, BoTSORT, phase correlation visual odometry, and image-space sequential matching — achieving 83% re-ID across 372 plants.",
    tags: ["YOLOv9c-seg", "BoTSORT", "Phase Correlation", "SeqSLAM", "OpenCV", "Python", "UAV", "Precision Agriculture"],
    github: false,
    featured: true,
    thumbnail: "/images/cauliflower.jpg",
    implementationDetails: {
      overview: "The drone flies a straight row of cabbage plants forward (Phase 1), then turns and flies back (Phase 2). During Phase 2, every detection must be matched to its corresponding Phase 1 plant to build a persistent, GPS-free field map. The return pass is the same row seen from the opposite direction — plants enter the frame from the top instead of the bottom, the drone travels in reverse, and there is no absolute position reference. Re-ID must be done frame-by-frame using only accumulated visual odometry and per-plant image history.",
      pipeline: [
        { step: "1", label: "Detection & Tracking", desc: "YOLOv9c-seg (instance segmentation, conf=0.7) produces per-frame masks. BoTSORT maintains persistent raw IDs across frames within each pass." },
        { step: "2", label: "Visual Odometry", desc: "cv2.phaseCorrelate() estimates sub-pixel camera displacement frame-to-frame. The row-axis component is accumulated into a cumulative displacement table. Outlier frames (>25px — caused by periodic crop-row FFT aliasing) are clamped to 0." },
        { step: "3", label: "Phase 1 Map Build", desc: "Each plant accumulates an img_history: a list of (frame, cx, cy) image-space center observations across all frames it appears in. Up to 200 observations per plant." },
        { step: "4", label: "Turn Detection", desc: "Angle reversal detector monitors frame-to-frame motion vectors. When the moving average reverses by ≥150° for 25 consecutive frames, Phase 2 begins. Drain channels log Phase 1 displacement landmarks." },
        { step: "5", label: "Phase 2 Sequential Matching", desc: "For each unmatched Phase 2 detection: estimate the equivalent Phase 1 frame index from cumulative displacement → retrieve the Phase 1 plant's image center at that frame → match by Euclidean distance in image space (threshold: 180px). No global canvas involved." },
        { step: "6", label: "Patience Counter", desc: "Plants entering Phase 2 from the frame top edge have cy≈0; Phase 1 records show cy≈1080 at the same position. A patience counter (80 frames) lets the plant drift to frame center (cy≈540) where both passes agree and distance≈0." }
      ],
      iterations: [
        {
          version: "v4.x",
          title: "LoFTR Homography",
          status: "failed",
          metric: "0% RE-ID",
          desc: "Used LoFTR (detector-free local feature matching) for frame-to-frame homography, composing 1500+ relative transforms into a global canvas. Re-ID matched by 2D canvas position. LoFTR catastrophically mismatched on periodic agricultural texture — crop rows all look identical to the FFT correlation, causing 400–1400px single-frame errors. Global canvas drift exceeded plant spacing (~35px). All matches failed."
        },
        {
          version: "v5.0",
          title: "Phase Correlation + Image-Space Matching",
          status: "breakthrough",
          metric: "55% RE-ID (205/372)",
          desc: "Replaced LoFTR with cv2.phaseCorrelate — 60× faster, proper per-frame sub-pixel motion estimation. Removed global canvas entirely; matched by image coordinates at the estimated Phase 1 frame. Breakthrough: image-space matching avoids all canvas drift. Still had two remaining bugs: outlier phase correlation frames corrupted the cumulative displacement table, and plants immediately became NEW_P2 on first match failure."
        },
        {
          version: "v5.1",
          title: "Outlier Clamping + Patience Counter",
          status: "improved",
          metric: "81% RE-ID (301/372)",
          desc: "Fix 1: Clamped |frame_disp| > 25px to 0. A single 1400px outlier frame had shifted p1_frame_est by 200+ frames from the correct position — the clamp prevents this. Fix 2: Patience counter (80 frames) before assigning NEW_P2. Plants entering from the frame edge naturally drift to center within ~60 frames, where match distance drops from 1080px to ~0px."
        },
        {
          version: "v5.2",
          title: "Drain Sync 1D + Display Fixes",
          status: "improved",
          metric: "83% RE-ID (310/372)",
          desc: "Drain sync switched from 2D Euclidean canvas distance to 1D row-displacement distance — immune to lateral canvas drift. Display counters fixed (unique plants not per-frame retry counts). Best overall RE-ID rate."
        },
        {
          version: "v5.3–5.4",
          title: "Drain Sync Formula + Direction Filter",
          status: "current",
          metric: "81% RE-ID (301/372)",
          desc: "Fixed the drain sync expected_p2_disp formula (systematic 273px baseline error from total_disp ≠ row_disp_at_turnaround). Added direction filter: only sync a drain once the drone has physically reached its Phase 1 position in Phase 2 (row_disp_cumulative ≤ d['row_disp']). Each drain used once. Offsets are now near-zero and monotonic. RE-ID slightly lower than v5.2 on this run — investigation ongoing."
        }
      ],
      insights: [
        "Agricultural texture defeats feature matchers (LoFTR, SIFT, ORB) — periodic vegetation rows create ambiguous FFT peaks causing catastrophic mismatches. Phase correlation is the right tool for consecutive-frame odometry.",
        "Global canvas drift is unavoidable over 1500+ relative homography compositions. The correct architecture avoids global canvas entirely and works in image space at each estimated Phase 1 frame.",
        "The frame-edge entry problem: plants at Phase 2 frame edges look displaced by an entire frame height (~1080px) vs Phase 1. Patience-based retry allows them to drift to frame center where both passes agree.",
        "Drain channels as 1D calibration anchors: matching drains by row-displacement (not 2D canvas position) correctly corrects cumulative odometry drift without lateral bias."
      ],
      results: {
        reidRate: "83.3%",
        reidCount: "310 / 372 Phase 1 plants",
        medianMatchDist: "93 px",
        maxMatchDist: "180 px",
        newP2Plants: "34 (genuinely undetected in Phase 1)",
        unmatchedP1: "0",
        processingSpeed: "~238 ms/frame on T4 GPU"
      },
      images: [
        {
          src: "/images/cabbage/reid_progression.png",
          caption: "Left: RE-ID rate across pipeline versions. Right: matched vs. genuinely-new plants breakdown for v5.0–v5.2.",
          alt: "RE-ID progression chart",
          wide: true
        },
        {
          src: "/images/cabbage/v53_map.png",
          caption: "Best-run field map (v5.2 architecture). Blue = Phase 1 plants (372). Red = plants not detected in Phase 1 (34). Gray line = drone path. All 372 Phase 1 clusters were eventually matched or patience-resolved.",
          alt: "Field plant map v5.2 result"
        },
        {
          src: "/images/cabbage/v50_map.png",
          caption: "v5.0 field map (before outlier clamping and patience counter). 144 plants incorrectly labelled as NEW_P2 due to early match failures and displacement table corruption.",
          alt: "Field plant map v5.0 result"
        }
      ]
    }
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