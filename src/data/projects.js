export const projects = [
  {
    id: 16,
    slug: "amiga-rl-crop-scouting",
    summary: "Reinforcement learning that decides how many onion plants a farm-ng Amiga measures in each 10-ft block, trading map accuracy against robot time on real drone-mapped fields.",
    highlight: { value: "+2.4", label: "vs best rule on unseen fields" },
    title: "Learning Where to Measure: RL Crop Scouting with a farm-ng Amiga",
    category: "Robotics & RL",
    story: "A farm-ng Amiga drives a fixed route along onion beds, measuring plant height with an Intel RealSense D455 and NDVI with a red + NIR camera. The lab protocol requires at least one plant in every 10-ft block, and every extra plant costs time. This project learns how much to measure where (quick or careful, 1–6 plants per block), scored as accuracy minus the value of mission hours, on two real commercial Vidalia onion fields (30 and 23.7 acres) mapped by a DJI Mavic 3M on six dates in 2024. After on-policy PPO failed, simulation-based policy iteration with common random numbers produced the only strategy that is near the best at every field size.",
    tags: ["Reinforcement Learning", "farm-ng Amiga", "Policy Iteration", "Common Random Numbers", "Gaussian Process", "Intel RealSense D455", "NDVI", "DJI Mavic 3M", "PyTorch", "Gymnasium", "Stable-Baselines3"],
    imageLabel: "Adaptive crop scouting on onion beds",
    github: "https://github.com/saqlineniam/RL-crop-scouting-system-for-the-farm-ng-Amiga-on-onion-filed",
    featured: true,
    thumbnail: "/images/amiga/scouting_schematic.webp",
    implementationDetails: {
      overview: "The Amiga follows a fixed, GPS-mapped route (one pass every 16 beds, about 30 m) and must sample at least one plant in every 10-ft block of 6 plant spots. At each block the policy chooses QUICK or CAREFUL and 1–6 plants; action masks enforce the protocol and energy masks guarantee the robot is never stranded. The simulator models the machine in detail: stop-and-go travel, two battery packs plus a spare pair swapped at 20% charge, a 15-minute bug-zapper stop after every 30 minutes of field work, and the optics and noise of both cameras. The robot builds its own block-level Gaussian-process map and never sees the drone map. The objective is SCORE = ACCURACY (0–100) − λ × mission hours, where accuracy combines 10-ft block values (25%), stressed plants found (30%), part-level flags (25%) and protocol compliance (20%).",
      pipeline: [
        { step: "1", label: "Drone survey → robot view", desc: "DJI Mavic 3M orthomosaics from six 2024 flights over two commercial onion fields are registered to the exact bed grid and converted into bed-aligned maps of what the robot would see." },
        { step: "2", label: "Mission simulator", desc: "A Gymnasium environment (AmigaMissionEnv) models the route and headland travel, batteries and swaps, the zapper, camera optics and measurement noise, and hidden stress added to the true field." },
        { step: "3", label: "Decisions under a protocol", desc: "Per 10-ft block: QUICK or CAREFUL × 1–6 plants; per plant: shoot at −30 to +30 cm or finish. Masks keep every block sampled and the robot able to get home." },
        { step: "4", label: "The robot's own map", desc: "A block-level Gaussian process with trust and anomaly signals turns measurements into the map that gets scored, so the policy is rewarded for what it actually learns about the field." },
        { step: "5", label: "Rollout policy iteration", desc: "Each choice is compared in copies of the mission with identical measurement noise (common random numbers); an ensemble of 5 Q-networks learns from those comparisons over successive training rounds." },
        { step: "6", label: "Held-out evaluation", desc: "80/20 spatial train/test split with a 30-m buffer, big test fields built only from held-out regions, stress tests (soft soil, aged battery packs, wind, longer zapper stops) and paired comparisons against 7 hand-written strategies, including a GP-uncertainty rule." },
      ],
      iterations: [
        { version: "PPO", title: "Hierarchical masked PPO (HAM-PPO)", status: "failed", metric: "Between the rules everywhere", desc: "One block decision changes a mission score by only 0.001–0.02 points, while the noise PPO saw when comparing decisions was 0.1–0.5 points, and its value estimate explained less than predicting the average would." },
        { version: "PI + CRN", title: "Rollout policy iteration with common random numbers", status: "breakthrough", metric: "Comparisons 25–650× cleaner", desc: "Comparing choices in copies of the mission with the same measurement noise made the comparisons 25–650× cleaner. Learning from those comparisons beat the hand-written rules." },
        { version: "Ensemble", title: "Five Q-networks instead of one", status: "improved", metric: "Near-ties decided reliably", desc: "A single network picked the truly best option only at chance level; an ensemble of 5 stopped random network errors from deciding near-equal choices." },
        { version: "Real fields", title: "Big training fields built from drone data", status: "improved", metric: "Beat synthetic squares", desc: "Tiling the real training regions into large fields (mirrored so beds and texture continue across the seam) beat the earlier synthetic square fields." },
        { version: "Round 3", title: "Final model (onion_rl3_it3)", status: "current", metric: "73.90 vs 71.62 (best rule)", desc: "Two value scales blended by field size, careful mode only when the networks agree it pays, and scoring each block, plant and part on its own. Chosen on training fields with new routes and stress, never on the test fields." },
      ],
      insights: [
        "Big fields are where the RL shines: on a 30-acre field it spends 9.3 h to reach 74.9 accuracy, versus 5.5 h and 68.7 for the minimum rule and 13.6 h (battery-limited) and 75.6 for measuring every plant.",
        "It measures more where the field shows stress or surprise, and gets the part-level flags right more often than either rule.",
        "On small fields it learns on its own to measure everything, which is the best strategy there, making it the only strategy near the best at every field size.",
        "The value of time matters: the RL adds the most when a robot hour is worth about 1 accuracy point or less; at higher values, measuring the minimum is almost optimal and the RL converges to it.",
      ],
      tables: [
        {
          title: "Strategy comparison",
          note: "Mean score (accuracy − 1 × hours, higher is better) on held-out ~30-acre fields and on whole real fields. The RL finishes hours earlier than any strategy that measures more.",
          columns: ["Strategy", "Held-out ~30-acre fields", "Whole real fields", "Accuracy / hours"],
          rows: [
            ["Minimum (1 plant per block, quick)", "69.5", "68.9", "75.0 / 5.5 h"],
            ["2 plants per block, careful", "63.8", "64.6", "77.2 / 13.4 h"],
            ["Every plant, careful", "63.7", "64.6", "77.2 / 13.5 h"],
            ["Every plant, quick", "66.3", "66.6", "79.9 / 13.6 h"],
            ["Adaptive rule (hand-written tree)", "65.1", "66.0", "78.5 / 13.4 h"],
            ["Uncertainty rule (GP-driven)", "65.7", "66.2", "79.3 / 13.6 h"],
            ["Battery-filling rule", "63.4", "63.7", "76.8 / 13.4 h"],
            ["RL (this work)", "70.5", "71.7", "78.8 / 8.3 h"],
          ],
          highlight: "RL (this work)",
        },
      ],
      results: {
        heldOutGain: "+2.4 ± 0.4",
        flightDates: "12 / 12",
        dateTypeWins: "41 / 48",
        wholeFieldGain: "+2.8 ± 1.8",
        smallFields: "Tie",
        safety: "0",
      },
      images: [
        {
          src: "/images/amiga/camera_curves.webp",
          caption: "Sensor model used in the simulator: Intel RealSense D455 depth noise and coverage versus distance, NIR camera blur, and per-plant height and NDVI error across the 2024 growth stages for quick and careful shots.",
          alt: "Camera model curves for the RealSense D455 and the NIR camera",
          wide: true,
        },
      ],
    },
  },
  {
    id: 1,
    slug: "cauliflower-reid-drone",
    highlight: { value: "83%", label: "re-ID across 372 plants" },
    summary: "GPS-free re-identification of 372 cabbage plants across outbound and return drone passes, reaching 83% re-ID with a SeqSLAM-inspired pipeline.",
    title: "Cabbage Plant Re-Identification Across GPS-Free Drone Loop Passes",
    category: "Computer Vision",
    story: "A DJI Mavic 3E drone flies a single row of cabbage twice, outbound (Phase 1) and return (Phase 2), with no GPS. With 372 plants per pass and the return view flipped and offset, the challenge is re-identifying every Phase 2 detection as its exact Phase 1 counterpart. Four failed approaches and a deep research dive led to a SeqSLAM-inspired pipeline combining YOLOv9c-seg, BoTSORT, phase correlation visual odometry, and image-space sequential matching, achieving 83% re-ID across 372 plants.",
    tags: ["YOLOv9c-seg", "BoTSORT", "Phase Correlation", "SeqSLAM", "OpenCV", "Python", "UAV", "Precision Agriculture"],
    github: false,
    featured: true,
    thumbnail: "/images/cauliflower.webp",
    implementationDetails: {
      overview: "The drone flies a straight row of cabbage plants forward (Phase 1), then turns and flies back (Phase 2). During Phase 2, every detection must be matched to its corresponding Phase 1 plant to build a persistent, GPS-free field map. The return pass is the same row seen from the opposite direction: plants enter the frame from the top instead of the bottom, the drone travels in reverse, and there is no absolute position reference. Re-ID must be done frame-by-frame using only accumulated visual odometry and per-plant image history.",
      modelComparison: {
        note: "YOLOv9c-seg was selected for the final pipeline because it achieved the highest MAP@50 (96.1%) and MAP@50-95 (78.2%) on box detection across all tested architectures.",
        models: [
          { name: "YOLOv9c-seg", chosen: true,
            box:  { precision: 95.0, recall: 94.7, map50: 96.1, map5095: 78.2 },
            mask: { precision: 94.7, recall: 94.9, map50: 96.1, map5095: 71.9 } },
          { name: "YOLOv8s-seg",
            box:  { precision: 96.2, recall: 95.2, map50: 95.3, map5095: 76.3 },
            mask: { precision: 96.2, recall: 95.2, map50: 95.3, map5095: 70.6 } },
          { name: "YOLOv11s-seg",
            box:  { precision: 92.5, recall: 95.3, map50: 95.2, map5095: 76.5 },
            mask: { precision: 92.8, recall: 95.7, map50: 95.2, map5095: 71.2 } },
          { name: "RF-DETR",
            box:  { precision: 94.7, recall: 95.5, map50: 93.4, map5095: 75.5 } },
          { name: "Mask R-CNN",
            box:  { precision: 91.0, recall: 98.2, map50: 92.5, map5095: 74.1 },
            mask: { precision: 91.0, recall: 98.2, map50: 92.6, map5095: 74.9 } },
          { name: "Mask R-CNN (ResNet-50)",
            box:  { precision: 91.2, recall: 98.7, map50: 94.6, map5095: 77.6 },
            mask: { precision: 91.2, recall: 98.7, map50: 94.5, map5095: 76.9 } },
        ]
      },
      pipeline: [
        { step: "1", label: "Detection & Tracking", desc: "YOLOv9c-seg (instance segmentation, conf=0.7) produces per-frame masks. BoTSORT maintains persistent raw IDs across frames within each pass." },
        { step: "2", label: "Visual Odometry", desc: "cv2.phaseCorrelate() estimates sub-pixel camera displacement frame-to-frame. The row-axis component is accumulated into a cumulative displacement table. Outlier frames (>25px, caused by periodic crop-row FFT aliasing) are clamped to 0." },
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
          desc: "Used LoFTR (detector-free local feature matching) for frame-to-frame homography, composing 1500+ relative transforms into a global canvas. Re-ID matched by 2D canvas position. LoFTR catastrophically mismatched on periodic agricultural texture: crop rows all look identical to the FFT correlation, causing 400–1400px single-frame errors. Global canvas drift exceeded plant spacing (~35px). All matches failed."
        },
        {
          version: "v5.0",
          title: "Phase Correlation + Image-Space Matching",
          status: "breakthrough",
          metric: "55% RE-ID (205/372)",
          desc: "Replaced LoFTR with cv2.phaseCorrelate, which is 60× faster and gives proper per-frame sub-pixel motion estimation. Removed global canvas entirely; matched by image coordinates at the estimated Phase 1 frame. Breakthrough: image-space matching avoids all canvas drift. Still had two remaining bugs: outlier phase correlation frames corrupted the cumulative displacement table, and plants immediately became NEW_P2 on first match failure."
        },
        {
          version: "v5.1",
          title: "Outlier Clamping + Patience Counter",
          status: "improved",
          metric: "81% RE-ID (301/372)",
          desc: "Fix 1: Clamped |frame_disp| > 25px to 0. A single 1400px outlier frame had shifted p1_frame_est by 200+ frames from the correct position, and the clamp prevents this. Fix 2: Patience counter (80 frames) before assigning NEW_P2. Plants entering from the frame edge naturally drift to center within ~60 frames, where match distance drops from 1080px to ~0px."
        },
        {
          version: "v5.2",
          title: "Drain Sync 1D + Display Fixes",
          status: "improved",
          metric: "83% RE-ID (310/372)",
          desc: "Drain sync switched from 2D Euclidean canvas distance to 1D row-displacement distance, which is immune to lateral canvas drift. Display counters fixed (unique plants not per-frame retry counts). Best overall RE-ID rate."
        },
        {
          version: "v5.3–5.4",
          title: "Drain Sync Formula + Direction Filter",
          status: "current",
          metric: "81% RE-ID (301/372)",
          desc: "Fixed the drain sync expected_p2_disp formula (systematic 273px baseline error from total_disp ≠ row_disp_at_turnaround). Added direction filter: only sync a drain once the drone has physically reached its Phase 1 position in Phase 2 (row_disp_cumulative ≤ d['row_disp']). Each drain used once. Offsets are now near-zero and monotonic. RE-ID slightly lower than v5.2 on this run. Investigation ongoing."
        }
      ],
      insights: [
        "Agricultural texture defeats feature matchers (LoFTR, SIFT, ORB): periodic vegetation rows create ambiguous FFT peaks causing catastrophic mismatches. Phase correlation is the right tool for consecutive-frame odometry.",
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
    id: 10,
    slug: "seed-germination-mlflow",
    highlight: { value: "R² 0.919", label: "germination prediction" },
    summary: "Predicting germination uplift from seed traits and cold-plasma parameters (R² = 0.919), with MLflow tracking and a live Streamlit app.",
    publication: "germination-uplift-plasma",
    title: "Seed Germination Rate Prediction with ML + MLflow Tracking",
    category: "Food Science & Biotech",
    story: "Seed germination is sensitive to both seed traits and pre-treatment parameters like plasma exposure. This project builds a machine learning framework that integrates seed morphological features and plasma treatment parameters to predict germination uplift, complete with MLflow experiment tracking for reproducibility and a live Streamlit prediction interface.",
    tags: ["MLflow", "Scikit-learn", "Docker", "MLOps", "Streamlit", "Python", "IPTCB 2025"],
    imageLabel: "MLflow experiment tracking & live prediction",
    github: "https://github.com/saqlineniam/Cold-Plasma-Seed-Treatment-Germination-Prediction-App",
    streamlitUrl: "https://w7hv3tu6obfi7afvhpt33t.streamlit.app/",
    dockerHubUrl: "https://hub.docker.com/r/spacehatmanager/cold-plasma-ml",
    paperUrl: "https://arxiv.org/abs/2510.23657v1",
    featured: true,
    thumbnail: "/images/seed_cold_plasma.webp",
    implementationDetails: {
      overview: "A multi-model MLOps pipeline that benchmarks Extra Trees, Gradient Boosting, and XGBoost along with Hybrid Stacking architectures. The system is fully containerized using Docker, with an integrated MLflow server for experiment tracking and a Streamlit frontend for real-time inference.",
      results: {
        bestModel: "Extra Trees / Hybrid",
        bestR2: "0.919",
        rmse: "3.21",
        mae: "2.62",
        infrastructure: "Docker + MLflow"
      },
      pipeline: [
        { step: "1", label: "Data Engineering", desc: "Preprocessing seed traits and plasma parameters (Voltage, Power, Time) using Yeo-Johnson transforms and polynomial features." },
        { step: "2", label: "Experiment Tracking", desc: "Automated logging of hyperparameters and metrics for 7+ model variants in MLflow." },
        { step: "3", label: "Model Stacking", desc: "Building hybrid meta-models that combine the strengths of different tree-based architectures." },
        { step: "4", label: "Deployment", desc: "Containerized Streamlit app that pulls the best-performing model for user-driven simulation." }
      ]
    }
  },
  {
    id: 2,
    slug: "apple-tracking-orchard",
    summary: "Persistent IDs on individual apples in occluded orchards by combining LoFTR matching with BotSORT tracking.",
    title: "Real-Time Apple Tracking in Orchards with BotSORT + LoFTR",
    category: "Computer Vision",
    story: "Tracking fruit in a moving, occluded orchard environment is harder than it looks: apples look identical, cluster together, and disappear behind branches. This project combined LoFTR's detector-free local feature matching with BotSORT's multi-object tracking to maintain persistent IDs on individual apples across frames in real time, intended for yield estimation pipelines.",
    tags: ["LoFTR", "BotSORT", "Real-time tracking", "Python", "OpenCV"],
    imageLabel: "Real-time multi-object tracking in orchard environments",
    github: "https://github.com/saqlineniam/Real-Time-Apple-Detection-for-Robust-Multi-Object-Tracking-in-Orchard-Environments",
    featured: true,
    youtubeId: "7ht56wef0Fc",
    thumbnail: "https://img.youtube.com/vi/7ht56wef0Fc/hqdefault.jpg"
  },
  {
    id: 4,
    slug: "ground-robot-lettuce-phenotyping",
    highlight: { value: "99.3%", label: "mAP@50 segmentation" },
    summary: "Ground-robot segmentation, tracking and unique counting of lettuce plants (mAP@50 99.3%).",
    title: "Ground Robot Lettuce Phenotyping: Segmentation, Counting, Tracking",
    category: "Computer Vision",
    story: "Developing an autonomous phenotyping system for lettuce crop monitoring. This project integrates high-precision instance segmentation with global map reconstruction to track individual plants across field sequences, achieving nearly perfect detection accuracy and reliable unique plant counting in complex agricultural environments.",
    tags: ["YOLOv8-seg", "BoTSORT", "LoFTR", "Trajectory Tracking", "Global Mapping", "Python", "OpenCV"],
    imageLabel: "Unique Plant Count: 23 | mAP@50: 99.3%",
    github: "https://github.com/saqlineniam/Ground-Robot-Based-Lettuce-Phenotyping-Segmentation-Counting-and-Trajectory-Tracking",
    featured: true,
    thumbnail: "/images/lettuce_pheno.webp",
    implementationDetails: {
      overview: "The system uses a ground robot to capture sequential imagery of lettuce rows. The core challenge is maintainting persistent IDs for each plant across frames despite robotic motion and overlapping foliage. The solution combines state-of-the-art segmentation with a 'Map Healing' logic that averages old and new positions to correct for motion drift.",
      results: {
        mAP50: "99.3%",
        mAP5095: "97.0%",
        uniqueCount: "23 Plants",
        latency: "424.9 ms",
        fps: "2.4",
        motionEst: "218.6 ms (LoFTR)"
      },
      pipeline: [
        { step: "1", label: "Segmentation", desc: "YOLOv8-seg model trained on custom LettuceMOTS dataset to isolate individual plants with pixel-level precision." },
        { step: "2", label: "Motion Estimation", desc: "LoFTR (Detector-Free Local Feature Matching) calculates frame-to-frame homography to track robotic displacement." },
        { step: "3", label: "ID Association", desc: "BoTSORT maintains short-term temporal IDs, which are then mapped to a persistent Global Database." },
        { step: "4", label: "Global Mapping", desc: "A 'Global Re-ID' logic checks the existing plant database for spatial matches, using 'Map Healing' to refine coordinates and eliminate duplicates." }
      ]
    }
  },
  {
    id: 17,
    slug: "realsense-plant-height",
    summary: "Real-time plant height from Intel RealSense RGB-D: YOLO11 segmentation plus a depth ground-plane fit, with smoothed, stability-labelled readings.",
    title: "Real-Time Plant Height Measurement with Intel RealSense",
    category: "Robotics & RL",
    story: "Plant height is a core phenotyping trait. This tool measures a plant live from aligned Intel RealSense color and depth frames: YOLO11 segmentation finds the plant, a ground plane is fitted to the valid depth around it, and height is the plant's distance from that plane. Recent readings are smoothed and labelled stable or stabilizing, and inference runs in a background worker so the camera preview stays responsive, even on a CPU.",
    tags: ["Intel RealSense", "RGB-D", "YOLO11-seg", "Ground-plane fitting", "OpenCV", "PyTorch", "Python"],
    imageLabel: "RGB-D plant height measurement",
    github: "https://github.com/saqlineniam/plant_height_using_Intel_Realsense",
    featured: false
  },
  {
    id: 5,
    slug: "uav-tomato-weed-mapping",
    summary: "Real-time UAV pipeline that counts tomato plants and maps weeds after a single flight.",
    title: "UAV Tomato Plant Counting and Weed Mapping",
    category: "Computer Vision",
    story: "Manual scouting of tomato fields for plant stands and weed pressure is time-consuming and error-prone. This project develops a real-time UAV pipeline that simultaneously counts tomato plants and maps weed distributions across small-scale agricultural fields, giving farmers an actionable field map after a single drone flight.",
    tags: ["UAV", "Object Detection", "Instance Segmentation", "Python"],
    imageLabel: "Tomato Count: 148 | Real-time mapping",
    github: false,
    featured: false,
    thumbnail: "/images/tomato_mapping.webp"
  },
  {
    id: 6,
    slug: "weed-detection-drone-maskrcnn",
    summary: "Benchmarking Faster R-CNN and Mask R-CNN with FPN for weed detection and segmentation in drone imagery.",
    title: "Weed Detection from Drone Imagery with Mask RCNN + FPN",
    category: "Computer Vision",
    story: "Weeds compete with crops for resources, and catching them early is critical. This project benchmarks Faster RCNN and Mask RCNN architectures with RPN and Feature Pyramid Networks for detecting and segmenting weeds in small-scale drone imagery, testing both detection accuracy and segmentation mask quality under real field conditions.",
    tags: ["Mask RCNN", "Faster RCNN", "FPN", "RPN", "Aerial Imagery", "PyTorch"],
    imageLabel: "Weed segmentation mask analysis",
    github: "https://github.com/saqlineniam/Small-Scale-Drone-Weed-Detection-using-Machine-Vision",
    featured: false
  },
  {
    id: 7,
    slug: "tea-worker-activity-monitoring",
    summary: "YOLOv8 system that detects and classifies tea plantation worker activities from camera feeds.",
    title: "Tea Plantation Worker Activity Monitoring with YOLOv8",
    category: "Computer Vision",
    story: "Monitoring worker activity in large tea gardens is practically infeasible manually. This real-time system uses YOLOv8 to detect and classify worker activities (plucking, walking, idle, etc.) from camera feeds deployed across the plantation, enabling supervisors to track productivity patterns.",
    tags: ["YOLOv8", "Activity Recognition", "Real-time", "Python"],
    imageLabel: "Activity classification and detection",
    github: false,
    featured: false
  },
  {
    id: 8,
    slug: "ml-strawberry-edible-coatings",
    summary: "ML-optimized alginate, guar gum and pectin coatings that extend strawberry shelf life (LWT 2025).",
    publication: "strawberry-edible-coatings",
    title: "Bio-based Edible Coating for Strawberry Shelf Life",
    category: "Food Science & Biotech",
    story: "Strawberries rot fast. This published study optimized alginate, guar gum, and pectin-based edible coating formulations using machine learning models, predicting the coating combination that maximizes shelf life across multiple quality indicators, reducing the trial-and-error of traditional food formulation.",
    tags: ["Machine Learning", "Food Science", "Optimization", "Python", "LWT 2025"],
    imageLabel: "Coating performance comparison",
    github: "https://github.com/saqlineniam/Strawberry_Edible_coating",
    featured: false,
    thumbnail: "/images/strawberries/main.webp"
  },
  {
    id: 9,
    slug: "tea-concentrate-sensory-ml",
    summary: "ML models linking tea concentrate chemistry to trained-panel sensory attributes.",
    publication: "tea-concentrates-sensory",
    title: "Tea Concentrate Sensory Characterization with ML",
    category: "Food Science & Biotech",
    story: "Sensory evaluation of food products is subjective and hard to scale. This study builds ML-assisted models to characterize and predict sensory attributes of tea concentrates, connecting chemical composition data with trained panel responses.",
    tags: ["Sensory Science", "ML", "Tea", "Applied Food Research 2026"],
    imageLabel: "Sensory attribute characterization",
    github: false,
    featured: false
  },
  {
    id: 11,
    slug: "tea-leaf-disease-cnn",
    summary: "CNN classifier for detecting common tea leaf diseases from leaf imagery.",
    title: "Tea Leaf Disease Classification",
    category: "Computer Vision",
    story: "Disease identification in tea leaves typically relies on experienced agronomists, who are scarce, so it is slow. This project builds a CNN-based classifier trained on tea leaf imagery to detect and classify common disease types, aiming to democratize early disease detection for small tea growers.",
    tags: ["CNN", "Transfer Learning", "Image Classification", "Python"],
    imageLabel: "CNN Heatmap of diseased tea leaf regions",
    github: "https://github.com/saqlineniam/Tea-Leaves-Disease-Classification",
    featured: false
  },
  {
    id: 14,
    slug: "bread-classification-cv",
    summary: "Computer vision classification of all-purpose vs. multigrain bread from crumb structure.",
    publication: "bread-multigrain-classification",
    title: "Computer Vision for Bread Classification",
    category: "Computer Vision",
    story: "Developing a computer vision system to classify bread made from all-purpose and multigrain flour, correlating visual crumb structure with physicochemical characterization.",
    tags: ["Computer Vision", "Food Science", "Crumb Analysis"],
    github: false,
    featured: false
  },
  {
    id: 15,
    slug: "plant-layout-optimization",
    summary: "Production floor layout optimization for probiotic pineapple juice manufacturing.",
    title: "Plant Layout Optimization for Pineapple Juice Manufacturing",
    category: "Food Science & Biotech",
    story: "Optimizing the production floor layout for PinePlus probiotic pineapple juice manufacturing to minimize material handling costs and maximize efficiency.",
    tags: ["Optimization", "Industrial Engineering", "Food Processing"],
    github: false,
    featured: false
  },
  {
    id: 18,
    slug: "taalmantra",
    summary: "Web and Android app for Indian classical music practice: tabla rhythm cycles, a tanpura drone and raag guides, built on React and the Web Audio API.",
    title: "TaalMantra: Indian Classical Metronome & Tanpura Drone",
    category: "Side Projects",
    story: "A standalone mobile metronome and drone accompaniment app for Indian classical music practice (riyaz). It plays recorded tabla cycles for popular taals (Tintal, Dadra, Ektaal, Jhaptal, Rupak, Kaherwa) synced to any tempo, or schedules individual tabla bols stroke by stroke with lookahead timing. The tanpura drone is either pitch-shifted from a recording or synthesized from additive sawtooth oscillators with slow detune LFOs and waveshaping to mimic the bridge buzz. It also has raag melody guides and a custom taal creator, ships as an Android app via Capacitor, and runs in the browser right here on this site.",
    tags: ["React", "Web Audio API", "Capacitor", "Android", "Audio DSP", "JavaScript"],
    imageLabel: "Tabla, tanpura and raag practice app",
    webApp: "/taalmantra/",
    thumbnail: "/images/taalmantra.webp",
    github: "https://github.com/saqlineniam/TaalMantra",
    featured: false
  }
];
