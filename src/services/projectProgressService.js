// =====================================================
// ZENTRION SKILL PLATFORM - GAMIFIED PROJECT PROGRESS SERVICE
// Persistent localStorage state management for project levels & tasks
// =====================================================

const STORAGE_KEY = "zentrion_gamified_project_progress_v1";

// Default seed progress for prototype:
// Campus Problem Solver has Level 1 done so students can immediately see "Continue Level 2"
const DEFAULT_INITIAL_PROGRESS = {
  "proj-campus-solver": {
    completedSubtasks: ["task-cps-1-1", "task-cps-1-2", "task-cps-1-3", "task-cps-1-4"],
    taskEvidence: {
      "task-cps-1-1": "Reviewed campus logistics brief and identified primary bottlenecks in lab resource scheduling.",
      "task-cps-1-2": "Target personas: CS undergrads, lab assistants, and department coordinators.",
      "task-cps-1-3": "Core pain points: double-booked workstations, unnotified schedule changes, manual attendance sheets.",
      "task-cps-1-4": "Objective: reduce workstation booking conflict rate to < 2% via unified digital check-in."
    },
    completedAt: null,
    verifiedLevels: [1],
  },
  "proj-skill-tracker": {
    completedSubtasks: ["task-cst-1-1", "task-cst-1-2"],
    taskEvidence: {
      "task-cst-1-1": "Defined core competency matrix covering DSA, React, and Backend REST APIs."
    },
    completedAt: null,
    verifiedLevels: [],
  },
  "proj-dsa-suite": {
    completedSubtasks: [
      "task-dsa-1-1", "task-dsa-1-2", "task-dsa-1-3",
      "task-dsa-2-1", "task-dsa-2-2", "task-dsa-2-3",
      "task-dsa-3-1", "task-dsa-3-2", "task-dsa-3-3",
      "task-dsa-4-1", "task-dsa-4-2"
    ],
    taskEvidence: {},
    completedAt: "2026-11-05T14:30:00.000Z",
    verifiedLevels: [1, 2, 3, 4],
  }
};

/**
 * Loads all project progress from localStorage
 */
export function getAllProjectProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_PROGRESS));
      return { ...DEFAULT_INITIAL_PROGRESS };
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load project progress from localStorage:", err);
    return { ...DEFAULT_INITIAL_PROGRESS };
  }
}

/**
 * Retrieves progress for a specific project
 */
export function getProjectProgress(projectId) {
  const all = getAllProjectProgress();
  return (
    all[projectId] || {
      completedSubtasks: [],
      taskEvidence: {},
      completedAt: null,
    }
  );
}

/**
 * Saves updated progress for a project
 */
export function saveProjectProgress(projectId, data) {
  try {
    const all = getAllProjectProgress();
    all[projectId] = {
      ...all[projectId],
      ...data,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error("Failed to save project progress to localStorage:", err);
  }
}

/**
 * Toggles a subtask's completion status
 */
export function toggleSubtask(projectId, subtaskId, isCompleted) {
  const current = getProjectProgress(projectId);
  let updatedSubtasks = [...current.completedSubtasks];

  if (isCompleted) {
    if (!updatedSubtasks.includes(subtaskId)) {
      updatedSubtasks.push(subtaskId);
    }
  } else {
    updatedSubtasks = updatedSubtasks.filter((id) => id !== subtaskId);
  }

  saveProjectProgress(projectId, {
    ...current,
    completedSubtasks: updatedSubtasks,
  });

  return updatedSubtasks;
}

/**
 * Saves text notes / evidence for a specific subtask
 */
export function saveTaskEvidence(projectId, subtaskId, text) {
  const current = getProjectProgress(projectId);
  const updatedEvidence = {
    ...current.taskEvidence,
    [subtaskId]: text,
  };

  saveProjectProgress(projectId, {
    ...current,
    taskEvidence: updatedEvidence,
  });

  return updatedEvidence;
}

/**
 * Verifies a project level (e.g., when mentor approves evidence)
 */
export function verifyProjectLevel(projectId, levelId) {
  const current = getProjectProgress(projectId);
  const verified = new Set(current.verifiedLevels || []);
  verified.add(Number(levelId));

  const updated = {
    ...current,
    verifiedLevels: Array.from(verified),
  };
  saveProjectProgress(projectId, updated);
  return updated;
}

/**
 * Removes verification status for a project level
 */
export function unverifyProjectLevel(projectId, levelId) {
  const current = getProjectProgress(projectId);
  const verified = (current.verifiedLevels || []).filter(
    (id) => Number(id) !== Number(levelId)
  );

  const updated = {
    ...current,
    verifiedLevels: verified,
  };
  saveProjectProgress(projectId, updated);
  return updated;
}

/**
 * Computes gamified stats for a project given its levels definition
 */
export function computeProjectStats(project) {
  const progress = getProjectProgress(project.id);
  const completedIds = new Set(progress.completedSubtasks || []);
  const verifiedSet = new Set((progress.verifiedLevels || []).map((id) => Number(id)));

  let totalSubtasks = 0;
  let completedSubtasks = 0;
  let allLevelsCompleted = true;

  const levelStatuses = project.levels.map((level) => {
    const levelSubtasks = level.subtasks || [];
    const levelTotal = levelSubtasks.length;
    totalSubtasks += levelTotal;

    const levelCompletedCount = levelSubtasks.filter((task) =>
      completedIds.has(task.id)
    ).length;
    completedSubtasks += levelCompletedCount;

    const isVerified = verifiedSet.has(Number(level.id));
    // A level is completed if all its subtasks are done OR its evidence is verified/approved
    const isDone = (levelTotal > 0 && levelCompletedCount === levelTotal) || isVerified;

    return {
      levelId: level.id,
      name: level.name,
      total: levelTotal,
      completed: levelCompletedCount,
      isDone,
      isVerified,
    };
  });

  // Level unlocking rule:
  // Level 1 is always unlocked.
  // Level N is unlocked if Level N-1 is complete.
  for (let i = 0; i < levelStatuses.length; i++) {
    if (i === 0) {
      levelStatuses[i].isUnlocked = true;
    } else {
      levelStatuses[i].isUnlocked = levelStatuses[i - 1].isDone;
    }

    if (!levelStatuses[i].isDone) {
      allLevelsCompleted = false;
    }
  }

  // Find lowest incomplete unlocked level (or highest level if all complete)
  const activeLevel =
    levelStatuses.find((l) => l.isUnlocked && !l.isDone) ||
    levelStatuses[levelStatuses.length - 1];

  const currentLevelNumber = activeLevel ? activeLevel.levelId : 1;

  const percent =
    totalSubtasks > 0
      ? Math.round((completedSubtasks / totalSubtasks) * 100)
      : 0;

  let status = "Not Started";
  if (allLevelsCompleted && totalSubtasks > 0) {
    status = "Completed";
    if (!progress.completedAt) {
      saveProjectProgress(project.id, {
        ...progress,
        completedAt: new Date().toISOString(),
      });
    }
  } else if (completedSubtasks > 0) {
    status = "In Progress";
  }

  return {
    totalSubtasks,
    completedSubtasks,
    completedSubtaskIds: Array.from(completedIds),
    percent,
    status,
    currentLevelNumber,
    totalLevels: project.levels.length,
    levelStatuses,
    completedAt: progress.completedAt,
    taskEvidence: progress.taskEvidence || {},
  };
}

/**
 * Resets progress for a specific project
 */
export function resetProjectProgress(projectId) {
  saveProjectProgress(projectId, {
    completedSubtasks: [],
    taskEvidence: {},
    completedAt: null,
  });
}
