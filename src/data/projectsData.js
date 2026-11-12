// =====================================================
// ZENTRION SKILL PLATFORM - GAMIFIED PROJECTS DATA
// Contains comprehensive project metadata, levels, and subtasks
// =====================================================

export const projectsData = [
  {
    id: "proj-campus-solver",
    title: "Campus Problem Solver",
    description:
      "Identify a real campus problem and design a technology-based solution from discovery and system design to prototype deployment.",
    category: "Cross Domain",
    difficulty: "Capstone Challenge",
    xpReward: 500,
    tags: ["System Design", "Full Stack", "Problem Solving", "Analytics"],
    levels: [
      {
        id: 1,
        shortTitle: "Understand the Problem",
        name: "Level 1 – Understand the Problem",
        description:
          "Analyze the campus challenge, identify affected stakeholders, pinpoint core friction areas, and define clear success goals.",
        icon: "🎯",
        subtasks: [
          {
            id: "task-cps-1-1",
            title: "Read the problem statement and scope",
            instructions:
              "Review the campus logistics overview document. Focus on workstation and room resource allocation bottlenecks across academic departments.",
            hint: "Pay special attention to peak hours between 10:00 AM and 3:00 PM.",
          },
          {
            id: "task-cps-1-2",
            title: "Identify the target users",
            instructions:
              "Map out the primary user personas who experience this challenge directly (e.g. engineering students, lab assistants, faculty coordinators).",
            hint: "Consider how user priorities differ between students booking time and staff scheduling maintenance.",
          },
          {
            id: "task-cps-1-3",
            title: "List the main problems",
            instructions:
              "Catalog the top 3-5 operational breakdowns (e.g. double booking, phantom reservations, manual sign-in friction).",
            hint: "Rank these issues by frequency and student impact.",
          },
          {
            id: "task-cps-1-4",
            title: "Define the project objectives",
            instructions:
              "Draft concise, measurable project goals (e.g. reduce booking conflicts to < 2%, provide real-time workstation availability).",
            hint: "Keep objectives SMART (Specific, Measurable, Achievable, Relevant, Time-bound).",
          },
        ],
      },
      {
        id: 2,
        shortTitle: "Research and Planning",
        name: "Level 2 – Research and Planning",
        description:
          "Investigate existing solutions, architect the database schema, diagram user flows, and prepare a development roadmap.",
        icon: "📋",
        subtasks: [
          {
            id: "task-cps-2-1",
            title: "Survey existing campus workflows and tools",
            instructions:
              "Review how departmental labs currently manage equipment reservations and identify gaps in existing spreadsheet approaches.",
            hint: "Document 2-3 specific deficiencies of paper/spreadsheet sign-up sheets.",
          },
          {
            id: "task-cps-2-2",
            title: "Design high-level system architecture and data model",
            instructions:
              "Define data entities for Users, Workstations, Reservations, and Audit Logs, with clear relationships and foreign keys.",
            hint: "Ensure your reservation model handles status: Active, Cancelled, and Checked-In.",
          },
          {
            id: "task-cps-2-3",
            title: "Draft UI wireframes and user interaction flows",
            instructions:
              "Create wireframes for the Student Dashboard, Workstation Grid, and Confirmation modal screens.",
            hint: "Prioritize quick 1-click reservations on mobile viewports.",
          },
          {
            id: "task-cps-2-4",
            title: "Create milestone checklist and timeline",
            instructions:
              "Break down implementation tasks across frontend components, state managers, and simulated reservation APIs.",
            hint: "Allocate sufficient buffer time for verification testing.",
          },
        ],
      },
      {
        id: 3,
        shortTitle: "Build the Basic Solution",
        name: "Level 3 – Build the Basic Solution",
        description:
          "Construct the functional application core, interactive components, booking engine, and data validation layer.",
        icon: "⚡",
        subtasks: [
          {
            id: "task-cps-3-1",
            title: "Initialize repository structure and layout",
            instructions:
              "Set up modular project directory structure with shared theme design tokens and responsive containers.",
            hint: "Separate presentation components from data-fetching and persistence logic.",
          },
          {
            id: "task-cps-3-2",
            title: "Build the interactive workstation selector grid",
            instructions:
              "Implement interactive cards or slots allowing students to browse real-time desk availability with color-coded badges.",
            hint: "Use accessible ARIA labels for screen reader support.",
          },
          {
            id: "task-cps-3-3",
            title: "Implement reservation state and conflict validation",
            instructions:
              "Build client-side collision checking to ensure no workstation can be double-booked for the same time interval.",
            hint: "Handle edge cases like immediate consecutive bookings.",
          },
          {
            id: "task-cps-3-4",
            title: "Add local persistence and notification triggers",
            instructions:
              "Persist student booking history to browser storage and trigger instantaneous confirmation feedback toast messages.",
            hint: "Ensure data persists when reloading the browser tab.",
          },
        ],
      },
      {
        id: 4,
        shortTitle: "Testing and Improvement",
        name: "Level 4 – Testing and Improvement",
        description:
          "Perform rigorous scenario testing, optimize rendering performance, ensure responsive scaling, and polish UX states.",
        icon: "🧪",
        subtasks: [
          {
            id: "task-cps-4-1",
            title: "Execute manual boundary and error case tests",
            instructions:
              "Verify system behavior under rapid double clicks, invalid input ranges, and browser storage limits.",
            hint: "Check that error prompts clearly inform the student of what went wrong.",
          },
          {
            id: "task-cps-4-2",
            title: "Test responsive behavior across mobile and tablet",
            instructions:
              "Ensure zero horizontal scroll, legible touch targets (> 44px), and proper modal centering on small screens.",
            hint: "Use browser DevTools mobile responsive mode (iPhone & iPad viewports).",
          },
          {
            id: "task-cps-4-3",
            title: "Verify dark and light mode contrast compliance",
            instructions:
              "Inspect color contrast ratios across card borders, text labels, and active button states in both appearance themes.",
            hint: "Ensure WCAG AA contrast (minimum 4.5:1 for body text).",
          },
          {
            id: "task-cps-4-4",
            title: "Refactor code and eliminate redundant re-renders",
            instructions:
              "Optimize React component tree with memoized selectors and clean effect dependencies.",
            hint: "Run ESLint and build verification to ensure 0 compile warnings.",
          },
        ],
      },
      {
        id: 5,
        shortTitle: "Final Project Submission",
        name: "Level 5 – Final Project Submission",
        description:
          "Prepare technical documentation, compile project deliverables, verify capstone objectives, and showcase your work.",
        icon: "🚀",
        subtasks: [
          {
            id: "task-cps-5-1",
            title: "Write comprehensive README and architectural summary",
            instructions:
              "Document project background, architecture diagram, tech stack choices, and step-by-step setup instructions.",
            hint: "Include screenshots or GIFs of the key user flows.",
          },
          {
            id: "task-cps-5-2",
            title: "Record video walkthrough or demo evidence",
            instructions:
              "Capture a 2-3 minute demonstration highlighting problem discovery, workstation booking flow, and conflict prevention.",
            hint: "Speak clearly and highlight your engineering problem-solving decisions.",
          },
          {
            id: "task-cps-5-3",
            title: "Self-audit against original Level 1 objectives",
            instructions:
              "Assess how successfully your completed prototype satisfies the measurable goals established in Level 1.",
            hint: "Note any future roadmap opportunities or next-phase enhancements.",
          },
          {
            id: "task-cps-5-4",
            title: "Submit capstone project for portfolio evaluation",
            instructions:
              "Finalize your submission package, confirm all milestone criteria are checked, and lock in your project score.",
            hint: "Once submitted, your achievement badge will be minted to your student profile.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-skill-tracker",
    title: "Campus Skill Tracker",
    description:
      "Build an interactive web application that helps students track competencies, practice streaks, and skill milestones with real-time feedback.",
    category: "Computer Science",
    difficulty: "Intermediate",
    xpReward: 350,
    tags: ["React", "JavaScript", "State Management", "CSS"],
    levels: [
      {
        id: 1,
        shortTitle: "Requirements & Schema",
        name: "Level 1 – Requirements & Schema",
        description:
          "Define skill taxonomy, proficiency levels (Beginner, Intermediate, Advanced), and user data structures.",
        icon: "🎯",
        subtasks: [
          {
            id: "task-cst-1-1",
            title: "Define engineering competency domains",
            instructions:
              "Map out the core skill categories (e.g. Core Programming, Frontend, Backend, Data Structures, DevOps).",
            hint: "Include 3-5 competencies per domain.",
          },
          {
            id: "task-cst-1-2",
            title: "Design student skill profile schema",
            instructions:
              "Define JSON data contract for skill level, points, streaks, and milestone completion dates.",
            hint: "Ensure points dynamically increment on task completion.",
          },
          {
            id: "task-cst-1-3",
            title: "Sketch dashboard progress overview wireframe",
            instructions:
              "Plan the layout of radial progress bars, streak badges, and recent activity timeline.",
            hint: "Keep the visual hierarchy focused on next recommended skill to practice.",
          },
        ],
      },
      {
        id: 2,
        shortTitle: "Core Interface & State",
        name: "Level 2 – Core Interface & State",
        description:
          "Implement skill cards, category tabs, progress bars, and localized state persistence.",
        icon: "⚡",
        subtasks: [
          {
            id: "task-cst-2-1",
            title: "Build skill category filter tabs",
            instructions:
              "Create clean filter buttons that allow instant filtering between Programming, Web, and Systems.",
            hint: "Show active skill counts inside filter tabs.",
          },
          {
            id: "task-cst-2-2",
            title: "Implement interactive competency cards",
            instructions:
              "Develop cards with progress bars, level badges, and 'Level Up' action triggers.",
            hint: "Animate progress bar fills on render.",
          },
          {
            id: "task-cst-2-3",
            title: "Hook up localStorage progress retention",
            instructions:
              "Ensure student skill gains persist across page reloads without data loss.",
            hint: "Add error boundary fallback if storage is cleared.",
          },
        ],
      },
      {
        id: 3,
        shortTitle: "Milestones & Analytics",
        name: "Level 3 – Milestones & Analytics",
        description:
          "Create milestone celebration alerts, daily streak tracker, and visual skill distribution radar/bar charts.",
        icon: "📊",
        subtasks: [
          {
            id: "task-cst-3-1",
            title: "Build streak tracking and flame indicator",
            instructions:
              "Calculate student practice streaks and display a motivating streak status indicator.",
            hint: "Award bonus streak multiplier after 3 consecutive days.",
          },
          {
            id: "task-cst-3-2",
            title: "Add skill mastery milestone badges",
            instructions:
              "Render collectible badge icons when a student completes all skills in a specific domain.",
            hint: "Include date stamped on unlocked badges.",
          },
        ],
      },
      {
        id: 4,
        shortTitle: "Final Testing & Polish",
        name: "Level 4 – Final Testing & Polish",
        description:
          "Perform mobile responsiveness audit, verify dark mode contrast, and complete project documentation.",
        icon: "🚀",
        subtasks: [
          {
            id: "task-cst-4-1",
            title: "Audit mobile layout and touch responsiveness",
            instructions:
              "Ensure skill cards stack smoothly without clipping progress percentages on 375px screens.",
            hint: "Test on both iOS and Android browser emulators.",
          },
          {
            id: "task-cst-4-2",
            title: "Publish demo documentation and final submission",
            instructions:
              "Summarize key learnings, state management architecture, and export portfolio link.",
            hint: "Double check all tasks are checked before generating submission.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-dsa-suite",
    title: "Java DSA Practice Suite",
    description:
      "A comprehensive algorithm implementation suite covering arrays, binary search, two-pointer techniques, and sorting patterns.",
    category: "Core Software",
    difficulty: "Starter",
    xpReward: 300,
    tags: ["Java", "DSA", "Algorithms", "Problem Solving"],
    levels: [
      {
        id: 1,
        shortTitle: "Linear Structures",
        name: "Level 1 – Linear Structures",
        description:
          "Implement fundamental array operations, prefix sums, and sliding window string algorithms.",
        icon: "🎯",
        subtasks: [
          {
            id: "task-dsa-1-1",
            title: "Solve Two Sum with HashMap lookup",
            instructions: "Implement O(n) time complexity solution with O(n) space.",
            hint: "Store value-to-index mapping as you iterate.",
          },
          {
            id: "task-dsa-1-2",
            title: "Implement Maximum Subarray (Kadane's)",
            instructions: "Compute maximum contiguous subarray sum in O(n) time.",
            hint: "Track maxEndingHere and maxSoFar at each step.",
          },
          {
            id: "task-dsa-1-3",
            title: "Implement Sliding Window Maximum",
            instructions: "Find maximum value in every window of size k using Deque.",
            hint: "Maintain monotonic decreasing order inside deque.",
          },
        ],
      },
      {
        id: 2,
        shortTitle: "Searching & Sorting",
        name: "Level 2 – Searching & Sorting",
        description:
          "Master binary search variations, Dutch National Flag three-way partitioning, and QuickSelect.",
        icon: "⚡",
        subtasks: [
          {
            id: "task-dsa-2-1",
            title: "Binary search in rotated sorted array",
            instructions: "Locate target in O(log n) time without full sorting.",
            hint: "Determine which half is cleanly sorted before branching.",
          },
          {
            id: "task-dsa-2-2",
            title: "Dutch National Flag algorithm (Sort Colors)",
            instructions: "Sort array of 0s, 1s, and 2s in-place in a single pass.",
            hint: "Use three pointers: low, mid, and high.",
          },
          {
            id: "task-dsa-2-3",
            title: "Merge intervals problem",
            instructions: "Sort intervals by start time and combine overlapping ranges.",
            hint: "Compare current start with previous interval end.",
          },
        ],
      },
      {
        id: 3,
        shortTitle: "Trees & Recursion",
        name: "Level 3 – Trees & Recursion",
        description:
          "Depth-First Search traversals, Lowest Common Ancestor, and Binary Search Tree validation.",
        icon: "🌳",
        subtasks: [
          {
            id: "task-dsa-3-1",
            title: "Validate Binary Search Tree",
            instructions: "Ensure all left descendants < node < all right descendants.",
            hint: "Pass valid min and max boundaries recursively.",
          },
          {
            id: "task-dsa-3-2",
            title: "Lowest Common Ancestor in BST",
            instructions: "Identify split point node in O(h) time.",
            hint: "Traverse left if both < node; right if both > node.",
          },
          {
            id: "task-dsa-3-3",
            title: "Binary tree level order traversal",
            instructions: "Execute BFS using queue and return levels as sublists.",
            hint: "Iterate by queue size at each level.",
          },
        ],
      },
      {
        id: 4,
        shortTitle: "Benchmark & Documentation",
        name: "Level 4 – Benchmark & Documentation",
        description:
          "Profile runtime execution metrics, write JUnit unit tests, and assemble code portfolio.",
        icon: "🚀",
        subtasks: [
          {
            id: "task-dsa-4-1",
            title: "Write automated test suite with edge cases",
            instructions: "Include empty array, negative numbers, and duplicates.",
            hint: "Verify 100% test pass rate.",
          },
          {
            id: "task-dsa-4-2",
            title: "Compile algorithm complexity reference sheet",
            instructions: "Document Big-O time and space complexity table for all patterns.",
            hint: "Highlight key trade-offs between space and runtime.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-digital-logic",
    title: "Digital Logic Arithmetic Unit",
    description:
      "Design and test a 4-bit ripple-carry adder and arithmetic logic sub-circuit with seven-segment display indicators in the Circuit Lab.",
    category: "Electronics & ECE",
    difficulty: "Intermediate",
    xpReward: 400,
    tags: ["Digital Logic", "Circuit Lab", "Gates", "Boolean Logic"],
    levels: [
      {
        id: 1,
        shortTitle: "Logic Gates Foundation",
        name: "Level 1 – Logic Gates Foundation",
        description:
          "Simulate fundamental gates (AND, OR, NOT, XOR) and construct truth tables for basic arithmetic.",
        icon: "🎯",
        subtasks: [
          {
            id: "task-dla-1-1",
            title: "Build and verify Half Adder circuit",
            instructions: "Wire XOR gate for Sum and AND gate for Carry bit.",
            hint: "Verify 1 + 1 produces Sum=0, Carry=1.",
          },
          {
            id: "task-dla-1-2",
            title: "Construct Full Adder from two Half Adders",
            instructions: "Incorporate Carry-In (Cin) pin to compute 3-bit sum and carry.",
            hint: "OR together the two internal carry outputs.",
          },
          {
            id: "task-dla-1-3",
            title: "Validate full adder truth table in simulator",
            instructions: "Test all 8 input combinations (000 through 111).",
            hint: "Confirm LED indicator glows for high logic outputs.",
          },
        ],
      },
      {
        id: 2,
        shortTitle: "4-Bit Ripple Carry Adder",
        name: "Level 2 – 4-Bit Ripple Carry Adder",
        description:
          "Cascade four Full Adder modules to create a complete 4-bit parallel binary adder circuit.",
        icon: "⚡",
        subtasks: [
          {
            id: "task-dla-2-1",
            title: "Place 4 Full Adder stages on the circuit breadboard",
            instructions: "Align stages horizontally from bit 0 (LSB) to bit 3 (MSB).",
            hint: "Keep spacing uniform for neat click-to-connect wiring.",
          },
          {
            id: "task-dla-2-2",
            title: "Route carry propagation chain (C0 -> C1 -> C2 -> C3 -> C4)",
            instructions: "Use click-to-connect wiring to chain carry outputs to adjacent carry inputs.",
            hint: "Avoid diagonal wiring; use clean orthogonal segments.",
          },
          {
            id: "task-dla-2-3",
            title: "Wire input toggle switches for Nibble A and Nibble B",
            instructions: "Connect 4 inputs for A and 4 inputs for B with status indicators.",
            hint: "Test 9 + 5 = 14 (1001 + 0101 = 1110).",
          },
        ],
      },
      {
        id: 3,
        shortTitle: "Seven-Segment Display Decoder",
        name: "Level 3 – Seven-Segment Display Decoder",
        description:
          "Interface output nibbles to BCD-to-7-segment decoder to display decimal digits 0-9.",
        icon: "📟",
        subtasks: [
          {
            id: "task-dla-3-1",
            title: "Connect 7-segment display component",
            instructions: "Wire pins a through g to the segment display driver.",
            hint: "Verify segments light up correctly for numbers 0 through 9.",
          },
          {
            id: "task-dla-3-2",
            title: "Test overflow indicator for sums > 15",
            instructions: "Connect Carry-out (C4) to a dedicated red overflow LED.",
            hint: "Test 15 + 1 = 16 to trigger overflow indicator.",
          },
        ],
      },
      {
        id: 4,
        shortTitle: "Simulation Report & Showcase",
        name: "Level 4 – Simulation Report & Showcase",
        description:
          "Record timing delay observations, document circuit schematic, and complete project review.",
        icon: "🚀",
        subtasks: [
          {
            id: "task-dla-4-1",
            title: "Calculate worst-case carry propagation delay",
            instructions: "Measure gate delay across the 4-stage ripple chain.",
            hint: "Formula: delay = 4 * t_carry + t_sum.",
          },
          {
            id: "task-dla-4-2",
            title: "Export circuit schematic and final project summary",
            instructions: "Save working circuit diagram and complete lab report notes.",
            hint: "Include input/output test evidence logs.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-smart-recommender",
    title: "Smart Problem Recommender",
    description:
      "An adaptive recommendation engine that analyzes student problem submissions and suggests targeted practice challenges to bridge skill gaps.",
    category: "AI & Data Science",
    difficulty: "Intermediate",
    xpReward: 450,
    tags: ["Python", "Machine Learning", "FastAPI", "Data Analytics"],
    levels: [
      {
        id: 1,
        shortTitle: "Data Extraction & Prep",
        name: "Level 1 – Data Extraction & Prep",
        description:
          "Parse submission logs, compute difficulty curves, and build student skill deficiency vectors.",
        icon: "🎯",
        subtasks: [
          {
            id: "task-spr-1-1",
            title: "Analyze submission history dataset schema",
            instructions: "Extract user_id, problem_id, verdict, time_taken, and tags.",
            hint: "Identify patterns in Accepted vs. Wrong Answer submissions.",
          },
          {
            id: "task-spr-1-2",
            title: "Calculate accuracy and error frequency per topic",
            instructions: "Group submissions by skill tags (e.g. Graphs, DP, Trees).",
            hint: "Flag tags with accuracy < 50% as priority growth areas.",
          },
          {
            id: "task-spr-1-3",
            title: "Formulate user weakness scoring vector",
            instructions: "Normalize topic deficiency scores on a scale from 0 to 1.",
            hint: "Weight recent submissions higher than older submissions.",
          },
        ],
      },
      {
        id: 2,
        shortTitle: "Recommendation Algorithm",
        name: "Level 2 – Recommendation Algorithm",
        description:
          "Implement collaborative filtering and content-based tag matching to recommend optimal next problems.",
        icon: "⚡",
        subtasks: [
          {
            id: "task-spr-2-1",
            title: "Implement cosine similarity matching",
            instructions: "Match student weakness vectors with problem attribute tags.",
            hint: "Filter out already solved problems.",
          },
          {
            id: "task-spr-2-2",
            title: "Build difficulty progression stair",
            instructions: "Ensure recommendations follow Easy -> Medium -> Hard cadence.",
            hint: "Do not recommend Hard problems if student has < 60% accuracy on Medium.",
          },
        ],
      },
      {
        id: 3,
        shortTitle: "API Service & Dashboard",
        name: "Level 3 – API Service & Dashboard",
        description:
          "Expose recommendation endpoint and render dynamic 'Recommended for You' cards in UI.",
        icon: "📊",
        subtasks: [
          {
            id: "task-spr-3-1",
            title: "Build lightweight recommendation API",
            instructions: "Create REST endpoint /api/recommendations returning top 3 problems.",
            hint: "Include explanatory reason string for each recommendation.",
          },
          {
            id: "task-spr-3-2",
            title: "Integrate recommendation card in Student Dashboard",
            instructions: "Display personalized problem cards with 'Why recommended' badges.",
            hint: "Allow student to click 'Practice Now' to jump straight to coding workspace.",
          },
        ],
      },
      {
        id: 4,
        shortTitle: "Evaluation & Final Submission",
        name: "Level 4 – Evaluation & Final Submission",
        description:
          "Benchmark recommendation relevance, collect student test feedback, and submit capstone report.",
        icon: "🚀",
        subtasks: [
          {
            id: "task-spr-4-1",
            title: "Conduct user feedback relevance survey",
            instructions: "Evaluate precision at K (P@3) across sample student test profiles.",
            hint: "Target precision score > 75%.",
          },
          {
            id: "task-spr-4-2",
            title: "Complete technical report and project submission",
            instructions: "Assemble documentation, algorithm breakdown, and model evaluation.",
            hint: "Confirm all subtasks are verified before final signoff.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-auto-evaluator",
    title: "Automated Submission Evaluator",
    description:
      "A sandboxed code execution pipeline and automated test runner providing instantaneous complexity analysis and execution metrics.",
    category: "DevOps & Cloud",
    difficulty: "Advanced",
    xpReward: 500,
    tags: ["Node.js", "Docker", "REST API", "Sandboxing"],
    levels: [
      {
        id: 1,
        shortTitle: "Sandbox Architecture",
        name: "Level 1 – Sandbox Architecture",
        description:
          "Define container isolation policies, memory limits, and process execution timeouts.",
        icon: "🎯",
        subtasks: [
          {
            id: "task-ase-1-1",
            title: "Define execution constraints and security boundaries",
            instructions: "Limit execution time to 2 seconds and memory to 256MB.",
            hint: "Block network requests and unauthorized filesystem access.",
          },
          {
            id: "task-ase-1-2",
            title: "Design test case input/output schema",
            instructions: "Support hidden test cases, visible test cases, and edge inputs.",
            hint: "Include expected output and diff formatting.",
          },
        ],
      },
      {
        id: 2,
        shortTitle: "Runner Pipeline",
        name: "Level 2 – Runner Pipeline",
        description:
          "Build compilation and execution worker pipeline for Java, Python, and JavaScript.",
        icon: "⚡",
        subtasks: [
          {
            id: "task-ase-2-1",
            title: "Implement multi-language compilation hooks",
            instructions: "Compile javac for Java, syntax check for Python, and V8 for JS.",
            hint: "Capture standard error (stderr) for compilation error reporting.",
          },
          {
            id: "task-ase-2-2",
            title: "Build test case comparator and diff reporter",
            instructions: "Trim trailing whitespaces and compare actual vs expected outputs.",
            hint: "Flag Time Limit Exceeded (TLE) when process exceeds timeout.",
          },
        ],
      },
      {
        id: 3,
        shortTitle: "Metric Analysis",
        name: "Level 3 – Metric Analysis",
        description:
          "Measure memory footprint, CPU cycles, and compute percentile runtime efficiency.",
        icon: "📊",
        subtasks: [
          {
            id: "task-ase-3-1",
            title: "Compute execution runtime percentiles",
            instructions: "Compare runtime against historical student submissions.",
            hint: "Render 'Beats 87% of Java submissions' badge.",
          },
          {
            id: "task-ase-3-2",
            title: "Add real-time verdict streaming to frontend",
            instructions: "Stream test case pass/fail statuses as each case executes.",
            hint: "Show spinning indicator on active test case.",
          },
        ],
      },
      {
        id: 4,
        shortTitle: "Final Verification & Release",
        name: "Level 4 – Final Verification & Release",
        description:
          "Perform load testing under concurrent submissions and package documentation for showcase.",
        icon: "🚀",
        subtasks: [
          {
            id: "task-ase-4-1",
            title: "Run concurrency load test with 50 simultaneous jobs",
            instructions: "Verify worker queue handles burst traffic without dropping tasks.",
            hint: "Ensure memory usage remains stable during peak load.",
          },
          {
            id: "task-ase-4-2",
            title: "Finalize deployment guide and submit capstone",
            instructions: "Publish architecture breakdown, Dockerfile configs, and submission report.",
            hint: "Complete final review checklist to lock in completion.",
          },
        ],
      },
    ],
  },
];
