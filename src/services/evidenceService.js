// =====================================================
// ZENTRION SKILL OS - EVIDENCE SUBMISSION & VERIFICATION SERVICE
// Persistent localStorage management for Page 34 - Project Evidence & Verification Workspace
// =====================================================

import { getProjectProgress, saveProjectProgress } from "./projectProgressService.js";

const STORAGE_KEY = "zentrion_evidence_submissions_v1";
const DRAFTS_KEY = "zentrion_evidence_drafts_v1";

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB per file
export const ALLOWED_FILE_EXTENSIONS = [
  "png", "jpg", "jpeg", "gif", "svg", "webp",
  "pdf", "doc", "docx", "txt", "md",
  "zip", "tar", "gz", "rar", "7z",
  "js", "jsx", "ts", "tsx", "py", "java", "cpp", "c", "html", "css", "json"
];

export const INITIAL_EVIDENCE_SUBMISSIONS = [
  {
    id: "sub-101",
    projectId: "proj-campus-solver",
    projectTitle: "Campus Problem Solver",
    levelId: 1,
    levelName: "Level 1 – Understand the Problem",
    title: "Problem Statement Analysis & User Persona Report",
    description:
      "Conducted extensive stakeholder interviews across 3 campus engineering labs. Documented workstation reservation bottlenecks, peak usage hours, and defined 4 SMART project objectives with measurable metrics.",
    deliverableLink: "https://github.com/its-harini24/zentrion-skill-os",
    videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    files: [
      {
        id: "f-1",
        name: "campus_user_personas.pdf",
        size: 1845000,
        type: "application/pdf",
        uploadedAt: "2026-11-05T10:30:00.000Z",
      },
      {
        id: "f-2",
        name: "stakeholder_flow_chart.png",
        size: 924000,
        type: "image/png",
        uploadedAt: "2026-11-05T10:30:00.000Z",
      },
    ],
    status: "Approved",
    currentAttempt: 1,
    submittedAt: "2026-11-05T10:35:00.000Z",
    reviewedAt: "2026-11-06T09:15:00.000Z",
    reviewer: {
      name: "Dr. Arvind Swaminathan",
      role: "Senior Engineering Faculty & Mentor",
      avatar: "AS",
    },
    feedback: {
      comments:
        "Excellent stakeholder analysis and user persona breakdown. The metrics defined for workstation conflict reduction are quantitative and achievable. Approved to proceed with Level 2 research and planning.",
      rating: 5,
      revisionRequested: false,
      criteriaScores: [
        { criterion: "Problem Scope & User Identification", score: "5/5" },
        { criterion: "Objective Quantification", score: "5/5" },
        { criterion: "Documentation Quality", score: "5/5" },
      ],
      suggestions: [
        "Include telemetry log format during Level 2 architecture design.",
        "Consider faculty coordinator permissions in your user persona matrix."
      ]
    },
    attempts: [
      {
        attemptNumber: 1,
        title: "Problem Statement Analysis & User Persona Report",
        description:
          "Conducted extensive stakeholder interviews across 3 campus engineering labs. Documented workstation reservation bottlenecks, peak usage hours, and defined 4 SMART project objectives.",
        deliverableLink: "https://github.com/its-harini24/zentrion-skill-os",
        videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        files: [
          {
            id: "f-1",
            name: "campus_user_personas.pdf",
            size: 1845000,
            type: "application/pdf",
            uploadedAt: "2026-11-05T10:30:00.000Z",
          },
          {
            id: "f-2",
            name: "stakeholder_flow_chart.png",
            size: 924000,
            type: "image/png",
            uploadedAt: "2026-11-05T10:30:00.000Z",
          },
        ],
        status: "Approved",
        submittedAt: "2026-11-05T10:35:00.000Z",
        reviewedAt: "2026-11-06T09:15:00.000Z",
        reviewer: {
          name: "Dr. Arvind Swaminathan",
          role: "Senior Engineering Faculty & Mentor",
          avatar: "AS",
        },
        feedback: {
          comments:
            "Excellent stakeholder analysis and user persona breakdown. Approved to proceed with Level 2 research and planning.",
          rating: 5,
        }
      }
    ]
  },
  {
    id: "sub-102",
    projectId: "proj-skill-tracker",
    projectTitle: "Campus Skill Tracker",
    levelId: 2,
    levelName: "Level 2 – Core Interface & State",
    title: "Component Hierarchy & State Flow Architecture",
    description:
      "Drafted React component tree breakdown and state transition diagrams for competency cards and interactive filters. Hooked up local storage for skill levels.",
    deliverableLink: "https://github.com/its-harini24/react-todo-list",
    videoLink: "",
    files: [
      {
        id: "f-3",
        name: "component_tree_v1.pdf",
        size: 2150000,
        type: "application/pdf",
        uploadedAt: "2026-11-06T14:20:00.000Z",
      },
    ],
    status: "Needs Changes",
    currentAttempt: 1,
    submittedAt: "2026-11-06T14:25:00.000Z",
    reviewedAt: "2026-11-07T09:40:00.000Z",
    reviewer: {
      name: "Prof. Neha Ranganathan",
      role: "Full-Stack Project Mentor",
      avatar: "NR",
    },
    feedback: {
      comments:
        "Strong component composition layout. However, your architecture diagram does not address how error boundaries or network failures are handled when persisting competency data. Please add offline/error state transitions to your diagram and resubmit.",
      rating: 3,
      revisionRequested: true,
      criteriaScores: [
        { criterion: "Component Hierarchy", score: "4/5" },
        { criterion: "Error & Offline Handling", score: "2/5" },
        { criterion: "Technical Completeness", score: "3/5" },
      ],
      suggestions: [
        "Include React ErrorBoundary fallback mockup.",
        "Document retry mechanics for localStorage quota exhaustion."
      ]
    },
    attempts: [
      {
        attemptNumber: 1,
        title: "Component Hierarchy & State Flow Architecture",
        description:
          "Drafted React component tree breakdown and state transition diagrams for competency cards and interactive filters.",
        deliverableLink: "https://github.com/its-harini24/react-todo-list",
        videoLink: "",
        files: [
          {
            id: "f-3",
            name: "component_tree_v1.pdf",
            size: 2150000,
            type: "application/pdf",
            uploadedAt: "2026-11-06T14:20:00.000Z",
          },
        ],
        status: "Needs Changes",
        submittedAt: "2026-11-06T14:25:00.000Z",
        reviewedAt: "2026-11-07T09:40:00.000Z",
        reviewer: {
          name: "Prof. Neha Ranganathan",
          role: "Full-Stack Project Mentor",
          avatar: "NR",
        },
        feedback: {
          comments:
            "Strong component composition layout. However, your architecture diagram does not address how error boundaries or network failures are handled.",
          rating: 3,
        }
      }
    ]
  },
  {
    id: "sub-103",
    projectId: "proj-digital-logic",
    projectTitle: "Digital Logic Arithmetic Unit",
    levelId: 1,
    levelName: "Level 1 – Logic Gates Foundation",
    title: "Half Adder and Full Adder Simulation Verification",
    description:
      "Constructed and simulated Half Adder and Full Adder circuits in the ECE Circuit Simulator. Attached input/output waveform capture logs and verified truth tables for all 8 input combinations.",
    deliverableLink: "",
    videoLink: "https://loom.com/share/sample-adder-demo",
    files: [
      {
        id: "f-4",
        name: "full_adder_simulation_capture.png",
        size: 840000,
        type: "image/png",
        uploadedAt: "2026-11-07T11:15:00.000Z",
      },
      {
        id: "f-5",
        name: "truth_table_verification.pdf",
        size: 1420000,
        type: "application/pdf",
        uploadedAt: "2026-11-07T11:15:00.000Z",
      },
    ],
    status: "Pending Review",
    currentAttempt: 1,
    submittedAt: "2026-11-07T11:20:00.000Z",
    reviewedAt: null,
    reviewer: {
      name: "Faculty Evaluation Queue",
      role: "ECE Department Assessment Cell",
      avatar: "⏳",
    },
    feedback: {
      comments:
        "Your submission has been queued for faculty verification. Mentor evaluation usually completes within 24–48 hours.",
      rating: null,
      revisionRequested: false,
      criteriaScores: [],
      suggestions: []
    },
    attempts: [
      {
        attemptNumber: 1,
        title: "Half Adder and Full Adder Simulation Verification",
        description:
          "Constructed and simulated Half Adder and Full Adder circuits in the ECE Circuit Simulator.",
        deliverableLink: "",
        videoLink: "https://loom.com/share/sample-adder-demo",
        files: [
          {
            id: "f-4",
            name: "full_adder_simulation_capture.png",
            size: 840000,
            type: "image/png",
            uploadedAt: "2026-11-07T11:15:00.000Z",
          },
          {
            id: "f-5",
            name: "truth_table_verification.pdf",
            size: 1420000,
            type: "application/pdf",
            uploadedAt: "2026-11-07T11:15:00.000Z",
          },
        ],
        status: "Pending Review",
        submittedAt: "2026-11-07T11:20:00.000Z",
        reviewedAt: null,
      }
    ]
  },
];

/**
 * Loads all evidence submissions from localStorage
 */
export function getAllEvidenceSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EVIDENCE_SUBMISSIONS));
      return [...INITIAL_EVIDENCE_SUBMISSIONS];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load evidence submissions:", err);
    return [...INITIAL_EVIDENCE_SUBMISSIONS];
  }
}

/**
 * Saves all evidence submissions to localStorage
 */
export function saveAllEvidenceSubmissions(submissions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (err) {
    console.error("Failed to save evidence submissions:", err);
  }
}

/**
 * Finds existing submission for project and level
 */
export function getSubmissionForLevel(projectId, levelId) {
  const all = getAllEvidenceSubmissions();
  return (
    all.find(
      (s) => s.projectId === projectId && Number(s.levelId) === Number(levelId)
    ) || null
  );
}

/**
 * Validates a file for extension and size limit
 */
export function validateFile(file) {
  if (!file) return { valid: false, error: "No file provided" };
  
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `"${file.name}" exceeds the maximum allowed size of 25 MB (${formatBytes(file.size)}).`,
    };
  }

  const nameParts = file.name.split(".");
  const ext = nameParts.length > 1 ? nameParts.pop().toLowerCase() : "";
  if (!ALLOWED_FILE_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `File type ".${ext}" is not supported. Please upload PDF, images, docs, code archives, or text.`,
    };
  }

  return { valid: true };
}

/**
 * Adds a new evidence submission
 */
export function createEvidenceSubmission({
  projectId,
  projectTitle,
  levelId,
  levelName,
  title,
  description,
  deliverableLink,
  videoLink,
  files,
}) {
  const existing = getAllEvidenceSubmissions();
  const numLevelId = Number(levelId);

  // Check if submission already exists for this project + level
  const existingIndex = existing.findIndex(
    (s) => s.projectId === projectId && Number(s.levelId) === numLevelId
  );

  const newAttempt = {
    attemptNumber: 1,
    title: title.trim(),
    description: description.trim(),
    deliverableLink: deliverableLink ? deliverableLink.trim() : "",
    videoLink: videoLink ? videoLink.trim() : "",
    files: files || [],
    status: "Pending Review",
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
  };

  const newSubmission = {
    id: existingIndex !== -1 ? existing[existingIndex].id : `sub-${Date.now()}`,
    projectId,
    projectTitle,
    levelId: numLevelId,
    levelName,
    title: title.trim(),
    description: description.trim(),
    deliverableLink: deliverableLink ? deliverableLink.trim() : "",
    videoLink: videoLink ? videoLink.trim() : "",
    files: files || [],
    status: "Pending Review",
    currentAttempt: existingIndex !== -1 ? (existing[existingIndex].currentAttempt || 1) + 1 : 1,
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    reviewer: {
      name: "Faculty Review Queue",
      role: "Department Mentor Assessment",
      avatar: "⏳",
    },
    feedback: {
      comments:
        "Submission received and assigned to faculty evaluation queue. Expected turnaround is 24–48 hours.",
      rating: null,
      revisionRequested: false,
      criteriaScores: [],
      suggestions: [],
    },
    attempts: existingIndex !== -1 
      ? [
          {
            ...newAttempt,
            attemptNumber: (existing[existingIndex].attempts?.length || 1) + 1,
          },
          ...(existing[existingIndex].attempts || []),
        ]
      : [newAttempt],
  };

  let updated;
  if (existingIndex !== -1) {
    updated = [...existing];
    updated[existingIndex] = newSubmission;
  } else {
    updated = [newSubmission, ...existing];
  }

  saveAllEvidenceSubmissions(updated);
  clearDraft(projectId, levelId);
  return newSubmission;
}

/**
 * Updates / resubmits an existing submission (e.g., in response to "Needs Changes")
 */
export function resubmitEvidence(submissionId, {
  title,
  description,
  deliverableLink,
  videoLink,
  files,
}) {
  const existing = getAllEvidenceSubmissions();
  const index = existing.findIndex((s) => s.id === submissionId);
  if (index === -1) return null;

  const current = existing[index];
  const nextAttemptNum = (current.attempts?.length || current.currentAttempt || 1) + 1;

  const currentAttemptRecord = {
    attemptNumber: nextAttemptNum,
    title: title ? title.trim() : current.title,
    description: description ? description.trim() : current.description,
    deliverableLink: deliverableLink !== undefined ? deliverableLink.trim() : current.deliverableLink,
    videoLink: videoLink !== undefined ? videoLink.trim() : current.videoLink,
    files: files || current.files,
    status: "Pending Review",
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
  };

  const updatedSubmission = {
    ...current,
    title: title ? title.trim() : current.title,
    description: description ? description.trim() : current.description,
    deliverableLink: deliverableLink !== undefined ? deliverableLink.trim() : current.deliverableLink,
    videoLink: videoLink !== undefined ? videoLink.trim() : current.videoLink,
    files: files || current.files,
    status: "Pending Review",
    currentAttempt: nextAttemptNum,
    submittedAt: new Date().toISOString(),
    previousReview: {
      reviewer: current.reviewer,
      reviewedAt: current.reviewedAt,
      feedback: current.feedback,
    },
    reviewedAt: null,
    reviewer: {
      name: "Faculty Re-Evaluation Queue",
      role: "Department Mentor Assessment",
      avatar: "⏳",
    },
    feedback: {
      comments:
        `Updated revision (Attempt ${nextAttemptNum}) submitted by student. Awaiting re-review from mentor.`,
      rating: null,
      revisionRequested: false,
      criteriaScores: [],
      suggestions: [],
    },
    attempts: [currentAttemptRecord, ...(current.attempts || [])],
  };

  existing[index] = updatedSubmission;
  saveAllEvidenceSubmissions(existing);
  clearDraft(current.projectId, current.levelId);
  return updatedSubmission;
}

/**
 * Simulates Mentor Review (Approval or Changes Requested)
 * Deeply integrates with Gamified Projects to unlock the next level on approval!
 */
export function simulateMentorReview(
  submissionId,
  {
    status,
    reviewerName = "Dr. Arvind Swaminathan",
    reviewerRole = "Senior Faculty Mentor",
    comments,
    rating,
    criteriaScores,
    suggestions,
    autoCompleteSubtasks = true,
  }
) {
  const existing = getAllEvidenceSubmissions();
  const index = existing.findIndex((s) => s.id === submissionId);
  if (index === -1) return null;

  const current = existing[index];
  const isApproved = status === "Approved";

  const defaultComments = isApproved
    ? "Outstanding deliverable! All evidence files and links meet departmental verification standards. Level milestone approved."
    : "Review completed. Certain critical edge cases or documentation requirements are missing. Please inspect suggestions below and resubmit.";

  const defaultSuggestions = isApproved
    ? ["Maintain this documentation standard in upcoming milestones.", "Ready to proceed to next level."]
    : ["Address missing error states and boundaries.", "Attach step-by-step test capture log."];

  const defaultScores = isApproved
    ? [
        { criterion: "Technical Correctness", score: "5/5" },
        { criterion: "Deliverable Quality", score: "5/5" },
        { criterion: "Documentation & Clarity", score: "5/5" },
      ]
    : [
        { criterion: "Technical Correctness", score: "3/5" },
        { criterion: "Deliverable Quality", score: "3/5" },
        { criterion: "Documentation & Clarity", score: "2/5" },
      ];

  const updatedSubmission = {
    ...current,
    status: isApproved ? "Approved" : "Needs Changes",
    reviewedAt: new Date().toISOString(),
    reviewer: {
      name: reviewerName,
      role: reviewerRole,
      avatar: reviewerName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "FA",
    },
    feedback: {
      comments: comments || defaultComments,
      rating: rating !== undefined ? rating : (isApproved ? 5 : 3),
      revisionRequested: !isApproved,
      criteriaScores: criteriaScores || defaultScores,
      suggestions: suggestions || defaultSuggestions,
    },
  };

  // Update latest attempt record with review outcome
  if (updatedSubmission.attempts && updatedSubmission.attempts.length > 0) {
    updatedSubmission.attempts[0] = {
      ...updatedSubmission.attempts[0],
      status: updatedSubmission.status,
      reviewedAt: updatedSubmission.reviewedAt,
      reviewer: updatedSubmission.reviewer,
      feedback: updatedSubmission.feedback,
    };
  }

  existing[index] = updatedSubmission;
  saveAllEvidenceSubmissions(existing);

  // If approved and autoCompleteSubtasks is true, mark subtasks complete in projectProgressService
  if (isApproved && autoCompleteSubtasks) {
    try {
      const projProgress = getProjectProgress(current.projectId);
      const verifiedLevels = projProgress.verifiedLevels || [];
      if (!verifiedLevels.includes(current.levelId)) {
        verifiedLevels.push(current.levelId);
      }
      saveProjectProgress(current.projectId, {
        ...projProgress,
        verifiedLevels,
      });
    } catch (err) {
      console.warn("Could not sync approval to project progress:", err);
    }
  }

  return updatedSubmission;
}

/**
 * Drafts Management
 */
export function getDraft(projectId, levelId) {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    if (!raw) return null;
    const drafts = JSON.parse(raw);
    const key = `${projectId}_lvl_${levelId}`;
    return drafts[key] || null;
  } catch (err) {
    console.error("Failed to load draft:", err);
    return null;
  }
}

export function saveDraft(projectId, levelId, draftData) {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    const drafts = raw ? JSON.parse(raw) : {};
    const key = `${projectId}_lvl_${levelId}`;
    drafts[key] = {
      ...draftData,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    return drafts[key];
  } catch (err) {
    console.error("Failed to save draft:", err);
    return null;
  }
}

export function clearDraft(projectId, levelId) {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    if (!raw) return;
    const drafts = JSON.parse(raw);
    const key = `${projectId}_lvl_${levelId}`;
    delete drafts[key];
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch (err) {
    console.error("Failed to clear draft:", err);
  }
}

/**
 * Resets evidence storage to initial demo state
 */
export function resetEvidenceStorage() {
  saveAllEvidenceSubmissions(INITIAL_EVIDENCE_SUBMISSIONS);
  try {
    localStorage.removeItem(DRAFTS_KEY);
  } catch {
    // ignore
  }
  return [...INITIAL_EVIDENCE_SUBMISSIONS];
}

/**
 * Format bytes into readable string (e.g. 1.4 MB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Returns structured evidence requirements for a given project and level
 */
export function getLevelEvidenceRequirements(project, level) {
  if (!level) {
    return {
      title: "Milestone Deliverables",
      overview: "Submit comprehensive project artifacts verifying level milestone completion.",
      requiredArtifacts: [
        "Architecture diagram or specification document (PDF)",
        "Screenshot captures showing functional completion",
        "Public GitHub repository or code bundle (.ZIP)",
      ],
      rubricCriteria: [
        "Technical correctness and scope fidelity",
        "Code quality and engineering architecture",
        "Documentation and reproducibility",
      ],
      maxFileSize: "25 MB per file",
    };
  }

  // Generate tailored requirements based on level ID and name
  switch (level.id) {
    case 1:
      return {
        title: `${level.name} – Verification Requirements`,
        overview:
          "Provide evidence that the engineering problem is thoroughly bounded, user personas are validated, and quantitative objectives are defined.",
        requiredArtifacts: [
          "Problem Statement & User Persona Report (.PDF)",
          "Stakeholder flow chart or friction breakdown diagram (.PNG / .PDF)",
          "SMART project objectives specification with measurable success criteria",
        ],
        rubricCriteria: [
          "Problem Scope & User Identification (30%)",
          "Measurable Objective Quantification (40%)",
          "Clarity & Documentation Quality (30%)",
        ],
        maxFileSize: "25 MB per file",
      };
    case 2:
      return {
        title: `${level.name} – Verification Requirements`,
        overview:
          "Demonstrate thorough system design, database schema, component wireframes, and error/offline state handling.",
        requiredArtifacts: [
          "System Architecture & Entity Relationship Diagram (.PDF / .PNG)",
          "UI wireframes or user journey storyboard (.PDF / .PNG / Figma Link)",
          "Milestone task roadmap and technology stack rationale document",
        ],
        rubricCriteria: [
          "Architectural Robustness & Data Integrity (40%)",
          "UI/UX Design Clarity & Wireframe Coverage (30%)",
          "Error Boundary & Offline Handling (30%)",
        ],
        maxFileSize: "25 MB per file",
      };
    case 3:
      return {
        title: `${level.name} – Verification Requirements`,
        overview:
          "Deliver the working prototype implementation, functional interactive components, and state management logic.",
        requiredArtifacts: [
          "Clean GitHub Repository URL with organized commit history",
          "Full source archive (.ZIP) with installation instructions",
          "Screen capture demo or video walkthrough showing working features",
        ],
        rubricCriteria: [
          "Functional Completeness & Working Features (50%)",
          "Code Modularization & Design Token Consistency (30%)",
          "State Persistence & Input Validation (20%)",
        ],
        maxFileSize: "25 MB per file",
      };
    case 4:
      return {
        title: `${level.name} – Verification Requirements`,
        overview:
          "Submit test logs, responsive layout validation captures, and WCAG accessibility contrast compliance reports.",
        requiredArtifacts: [
          "Automated or manual test scenario execution logs (.PDF / .TXT)",
          "Mobile, Tablet, and Desktop responsive screenshot captures (.PNG / .ZIP)",
          "Loom or demo video recording validating all edge cases",
        ],
        rubricCriteria: [
          "Edge Case & Error Handling Rigor (40%)",
          "Responsive Layout & Cross-device Compatibility (30%)",
          "Accessibility & Visual Polish (30%)",
        ],
        maxFileSize: "25 MB per file",
      };
    default:
      return {
        title: `${level.name} – Verification Requirements`,
        overview:
          "Provide documented verification artifacts demonstrating complete fulfillment of all level subtasks.",
        requiredArtifacts: [
          "Project artifacts and documentation report (.PDF)",
          "Source code repository or packaged bundle (.ZIP)",
          "Visual screenshot captures or demonstration video link",
        ],
        rubricCriteria: [
          "Technical Execution (40%)",
          "Documentation & Rigor (30%)",
          "Engineering Quality (30%)",
        ],
        maxFileSize: "25 MB per file",
      };
  }
}
