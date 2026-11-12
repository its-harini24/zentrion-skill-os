import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import zentrionLogo from "../../assets/zentrion-logo.png";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import { projectsData } from "../../data/projectsData";
import {
  computeProjectStats,
  toggleSubtask,
  saveTaskEvidence,
  resetProjectProgress,
} from "../../services/projectProgressService";
import { getAllEvidenceSubmissions } from "../../services/evidenceService";
import { getProjectLinks } from "../../services/githubService";
import "./ProjectWorkspacePage.css";

function ProjectWorkspacePage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Find project
  const project = useMemo(() => {
    return (
      projectsData.find((p) => p.id === projectId) || projectsData[0]
    );
  }, [projectId]);

  // Version tick to trigger re-renders when localStorage updates
  const [version, setVersion] = useState(0);

  // Compute live gamified stats
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stats = useMemo(() => computeProjectStats(project), [project, version]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allSubmissions = useMemo(() => getAllEvidenceSubmissions(), [version]);

  // Linked GitHub repository (from GitHub Integration service)
  const linkedRepo = useMemo(() => {
    void version;
    const links = getProjectLinks();
    return links[project.id] || null;
  }, [project.id, version]);

  // Selected level state
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const activeLevelId =
    selectedLevelId && selectedLevelId <= stats.totalLevels
      ? selectedLevelId
      : stats.currentLevelNumber;

  const activeLevelEvidence = useMemo(() => {
    return (
      allSubmissions.find(
        (s) =>
          s.projectId === project.id &&
          Number(s.levelId) === Number(activeLevelId)
      ) || null
    );
  }, [allSubmissions, project.id, activeLevelId]);

  // UI state for expandable panels per task
  const [expandedInstructions, setExpandedInstructions] = useState({});
  const [expandedEvidence, setExpandedEvidence] = useState({});
  const [evidenceText, setEvidenceText] = useState({});
  const [savedFeedback, setSavedFeedback] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [lockedNotice, setLockedNotice] = useState(null);

  // Toggle instructions
  const toggleInstructions = (taskId) => {
    setExpandedInstructions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Toggle evidence panel
  const toggleEvidencePanel = (taskId) => {
    setExpandedEvidence((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
    // Pre-populate with existing evidence if available
    if (!evidenceText[taskId] && stats.taskEvidence[taskId]) {
      setEvidenceText((prev) => ({
        ...prev,
        [taskId]: stats.taskEvidence[taskId],
      }));
    }
  };

  // Handle task checkbox toggle
  const handleTaskToggle = (taskId, currentlyCompleted, levelId) => {
    const levelStatus = stats.levelStatuses.find((l) => l.levelId === levelId);
    if (!levelStatus?.isUnlocked) {
      setLockedNotice(`Level ${levelId} is locked. Complete preceding levels first.`);
      setTimeout(() => setLockedNotice(null), 3000);
      return;
    }

    const updated = toggleSubtask(project.id, taskId, !currentlyCompleted);
    setVersion((v) => v + 1);

    // If this completes the entire project, trigger celebration
    if (!currentlyCompleted && updated.length === stats.totalSubtasks) {
      setShowCelebration(true);
    }
  };

  // Handle saving evidence / notes
  const handleSaveEvidence = (taskId) => {
    const text = evidenceText[taskId] || "";
    saveTaskEvidence(project.id, taskId, text);
    setSavedFeedback((prev) => ({ ...prev, [taskId]: true }));
    setVersion((v) => v + 1);
    setTimeout(() => {
      setSavedFeedback((prev) => ({ ...prev, [taskId]: false }));
    }, 2000);
  };

  // Handle reset progress
  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all progress for this project? This will re-lock subsequent levels for a fresh experience."
      )
    ) {
      resetProjectProgress(project.id);
      setSelectedLevelId(1);
      setShowCelebration(false);
      setVersion((v) => v + 1);
    }
  };

  // Find active level object
  const activeLevel =
    project.levels.find((l) => l.id === activeLevelId) || project.levels[0];
  const activeLevelStatus =
    stats.levelStatuses.find((l) => l.levelId === activeLevelId) || {};

  // Check if active level is complete
  const isActiveLevelDone = activeLevelStatus.isDone;
  const isFinalLevel = activeLevelId === project.levels.length;

  return (
    <div className="gamified-workspace">
      {/* =====================================================
          TOP NAVIGATION (Preserves official Zentrion logo)
      ===================================================== */}
      <header className="workspace-navbar">
        <div className="workspace-nav-left">
          <button
            className="workspace-logo-btn"
            onClick={() => navigate("/student-dashboard")}
            aria-label="Back to Zentrion Dashboard"
          >
            <img
              src={zentrionLogo}
              alt="Zentrion"
              className="workspace-logo-img"
            />
          </button>
          <span className="workspace-nav-divider" aria-hidden="true" />
          <nav className="workspace-breadcrumbs" aria-label="Breadcrumb">
            <button onClick={() => navigate("/student-dashboard")}>
              Dashboard
            </button>
            <span aria-hidden="true">/</span>
            <button onClick={() => navigate("/projects")}>Projects</button>
            <span aria-hidden="true">/</span>
            <span className="active">{project.title}</span>
          </nav>
        </div>

        <div className="workspace-nav-right">
          <button
            className="workspace-back-btn"
            onClick={() =>
              navigate(`/evidence-review?projectId=${project.id}&levelId=${activeLevelId}`)
            }
            title="Upload and review evidence artifacts for this project"
          >
            📤 Evidence & Review
          </button>
          <ThemeToggle />
          <button
            className="workspace-back-btn"
            onClick={() => navigate("/projects")}
          >
            ← Back to Projects
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}
      <main className="workspace-main-content">
        {/* =====================================================
            PROJECT HERO CARD
        ===================================================== */}
        <section className="workspace-hero-card">
          <div className="workspace-hero-top">
            <div>
              <div className="workspace-hero-meta">
                <span className="hero-category-tag">{project.category}</span>
                <span className="hero-difficulty-tag">{project.difficulty}</span>
                <span className="hero-xp-badge">⭐ {project.xpReward} XP Reward</span>
                {linkedRepo ? (
                  <a
                    href={linkedRepo.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-github-link"
                    title={`Linked repository: ${linkedRepo.repoFullName || linkedRepo.repoName}`}
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    <span>{linkedRepo.repoName}</span>
                    <span className="hero-github-ext" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate("/github-integration")}
                    className="hero-github-link-btn"
                    title="Connect or link a GitHub repository to this project"
                  >
                    <span>🐙 Link GitHub</span>
                  </button>
                )}
              </div>
              <h1>{project.title}</h1>
              <p className="workspace-hero-desc">{project.description}</p>
            </div>

            <div className="workspace-hero-actions">
              <button
                className="workspace-reset-btn"
                onClick={handleReset}
                title="Reset progress to replay the project journey"
              >
                🔄 Reset Progress
              </button>
            </div>
          </div>

          {/* Overall Progress Strip */}
          <div className="workspace-progress-strip">
            <div className="progress-strip-header">
              <div className="progress-strip-left">
                <span>Overall Quest Journey:</span>
                <span>
                  Level {stats.currentLevelNumber} of {stats.totalLevels}
                </span>
              </div>
              <div className="progress-strip-right">
                <span>
                  {stats.completedSubtasks} of {stats.totalSubtasks} tasks completed
                </span>
                <span className="progress-percent-badge">{stats.percent}%</span>
              </div>
            </div>
            <div className="workspace-progress-track">
              <div
                className={`workspace-progress-fill ${
                  stats.percent === 100 ? "completed" : ""
                }`}
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>
        </section>

        {/* Locked Notice Banner */}
        {lockedNotice && (
          <div
            style={{
              padding: "12px 18px",
              background: "#fee2e2",
              border: "1px solid #f87171",
              color: "#991b1b",
              borderRadius: "10px",
              marginBottom: "18px",
              fontSize: "0.82rem",
              fontWeight: 700,
            }}
          >
            🔒 {lockedNotice}
          </div>
        )}

        {/* =====================================================
            LEVEL MAP / STEPPER (PART 3 & 4)
        ===================================================== */}
        <section
          className="workspace-level-map-section"
          aria-label="Gamified Level Progression Map"
        >
          <div className="level-map-title">
            <h2>Level Roadmap</h2>
            <span>Click any unlocked level to view subtasks</span>
          </div>

          <div className="level-stepper-track">
            {project.levels.map((level) => {
              const statusInfo =
                stats.levelStatuses.find((l) => l.levelId === level.id) || {};
              const isUnlocked = statusInfo.isUnlocked;
              const isDone = statusInfo.isDone;
              const isSelected = activeLevelId === level.id;

              return (
                <button
                  type="button"
                  key={level.id}
                  className={`level-node-card ${
                    isSelected ? "active-level" : ""
                  } ${isDone ? "completed-level" : ""} ${
                    !isUnlocked ? "locked-level" : ""
                  }`}
                  onClick={() => {
                    if (isUnlocked) {
                      setSelectedLevelId(level.id);
                    } else {
                      setLockedNotice(
                        `Level ${level.id} is locked. Complete all subtasks in Level ${
                          level.id - 1
                        } to unlock.`
                      );
                      setTimeout(() => setLockedNotice(null), 3000);
                    }
                  }}
                  aria-label={`${level.name}: ${
                    isDone
                      ? "Completed"
                      : isUnlocked
                      ? "Unlocked"
                      : "Locked"
                  }`}
                >
                  <div className="level-node-top">
                    <span className="level-node-icon" aria-hidden="true">
                      {level.icon}
                    </span>
                    <span
                      className={`level-status-pill ${
                        isDone
                          ? "completed"
                          : isUnlocked
                          ? "unlocked"
                          : "locked"
                      }`}
                    >
                      {statusInfo.isVerified && "✓ Verified"}
                      {!statusInfo.isVerified && isDone && "✓ Done"}
                      {!isDone && isUnlocked && "🔓 Unlocked"}
                      {!isUnlocked && "🔒 Locked"}
                    </span>
                  </div>

                  <span className="level-node-number">Level {level.id}</span>
                  <div className="level-node-title">{level.shortTitle}</div>

                  <div className="level-node-progress">
                    {statusInfo.completed || 0} / {statusInfo.total || 0} subtasks
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            ACTIVE LEVEL TASK BOARD (PART 4 & 5)
        ===================================================== */}
        <section
          className="workspace-active-level-board"
          aria-label={`Subtasks for ${activeLevel.name}`}
        >
          <div className="active-level-header">
            <div className="active-level-title-wrap">
              <span className="active-level-tag">CURRENT LEVEL FOCUS</span>
              <h2>{activeLevel.name}</h2>
              <p className="active-level-desc">{activeLevel.description}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="workspace-back-btn"
                style={{
                  background: "var(--primary-light)",
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  fontSize: "0.74rem",
                }}
                onClick={() =>
                  navigate(
                    `/evidence-review?projectId=${project.id}&levelId=${activeLevel.id}`
                  )
                }
                title="Submit evidence artifacts, PDFs or screenshots for this level"
              >
                📤 Submit Level Evidence
              </button>

              {activeLevelEvidence && (
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background:
                      activeLevelEvidence.status === "Approved"
                        ? "#ecfdf5"
                        : activeLevelEvidence.status === "Needs Changes" ||
                          activeLevelEvidence.status === "Changes Requested"
                        ? "#fff1f2"
                        : "#fffbeb",
                    color:
                      activeLevelEvidence.status === "Approved"
                        ? "#059669"
                        : activeLevelEvidence.status === "Needs Changes" ||
                          activeLevelEvidence.status === "Changes Requested"
                        ? "#e11d48"
                        : "#d97706",
                    border: `1px solid ${
                      activeLevelEvidence.status === "Approved"
                        ? "#10b981"
                        : activeLevelEvidence.status === "Needs Changes" ||
                          activeLevelEvidence.status === "Changes Requested"
                        ? "#f43f5e"
                        : "#f59e0b"
                    }`,
                  }}
                  onClick={() =>
                    navigate(
                      `/evidence-review?projectId=${project.id}&levelId=${activeLevel.id}`
                    )
                  }
                  title="Click to view mentor review & submitted deliverables"
                >
                  {activeLevelEvidence.status === "Approved"
                    ? "✓ Evidence Approved"
                    : activeLevelEvidence.status === "Needs Changes" ||
                      activeLevelEvidence.status === "Changes Requested"
                    ? "⚠️ Changes Requested"
                    : "⏳ Under Review"}
                </span>
              )}

              <div className="active-level-counter-badge">
                <span>Level Progress:</span>
                <strong className="counter-highlight">
                  {activeLevelStatus.completed || 0} of {activeLevelStatus.total || 0}{" "}
                  Done
                </strong>
              </div>
            </div>
          </div>

          {/* Subtasks List */}
          <div className="subtasks-list">
            {activeLevel.subtasks.map((task) => {
              const isChecked = (stats.completedSubtaskIds || []).includes(task.id);

              const isInstructionOpen = !!expandedInstructions[task.id];
              const isEvidenceOpen = !!expandedEvidence[task.id];
              const isSaved = !!savedFeedback[task.id];

              return (
                <article
                  className={`subtask-card ${
                    isChecked ? "subtask-completed" : ""
                  }`}
                  key={task.id}
                >
                  <div className="subtask-main-row">
                    {/* Interactive Completion Button / Checkbox */}
                    <button
                      type="button"
                      className={`subtask-checkbox-btn ${
                        isChecked ? "checked" : ""
                      }`}
                      onClick={() =>
                        handleTaskToggle(task.id, isChecked, activeLevel.id)
                      }
                      aria-label={`Mark task ${task.title} as ${
                        isChecked ? "incomplete" : "complete"
                      }`}
                      title={
                        isChecked
                          ? "Click to uncheck task"
                          : "Click to mark task complete"
                      }
                    >
                      {isChecked ? "✓" : ""}
                    </button>

                    <div className="subtask-content-wrap">
                      <div className="subtask-header-row">
                        <h3
                          className="subtask-title"
                          onClick={() =>
                            handleTaskToggle(task.id, isChecked, activeLevel.id)
                          }
                        >
                          {task.title}
                        </h3>

                        <span
                          className={`subtask-status-tag ${
                            isChecked ? "tag-done" : ""
                          }`}
                        >
                          {isChecked ? "Completed ✓" : "Required"}
                        </span>
                      </div>

                      {/* Interactive Task Tools */}
                      <div className="subtask-actions-row">
                        <button
                          type="button"
                          className="subtask-tool-btn"
                          onClick={() => toggleInstructions(task.id)}
                        >
                          {isInstructionOpen ? "Hide Instructions ▲" : "View Instructions ▼"}
                        </button>
                        <span>·</span>
                        <button
                          type="button"
                          className="subtask-tool-btn"
                          onClick={() => toggleEvidencePanel(task.id)}
                        >
                          {isEvidenceOpen
                            ? "Close Evidence & Notes ▲"
                            : "Upload Evidence / Add Notes 📝"}
                        </button>
                      </div>

                      {/* Expandable Instructions Panel */}
                      {isInstructionOpen && (
                        <div className="subtask-instructions-panel">
                          <p>
                            <strong>Guidance:</strong> {task.instructions}
                          </p>
                          {task.hint && (
                            <div className="hint-box">
                              <span aria-hidden="true">💡</span>
                              <span>
                                <strong>Pro-Tip:</strong> {task.hint}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Expandable Evidence / Notes Panel */}
                      {isEvidenceOpen && (
                        <div className="subtask-evidence-panel">
                          <label
                            className="evidence-label"
                            htmlFor={`notes-${task.id}`}
                          >
                            Task Verification Notes & Deliverable Link:
                          </label>
                          <textarea
                            id={`notes-${task.id}`}
                            className="evidence-textarea"
                            placeholder="Document your findings, test results, or repo artifact link here..."
                            value={
                              evidenceText[task.id] !== undefined
                                ? evidenceText[task.id]
                                : stats.taskEvidence[task.id] || ""
                            }
                            onChange={(e) => {
                              const val = e.target.value;
                              setEvidenceText((prev) => ({
                                ...prev,
                                [task.id]: val,
                              }));
                            }}
                          />
                          <div className="evidence-save-row">
                            <button
                              type="button"
                              className="evidence-save-btn"
                              onClick={() => handleSaveEvidence(task.id)}
                            >
                              Save Notes
                            </button>
                            {isSaved && (
                              <span className="evidence-saved-indicator">
                                Saved ✓
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Level Completion Footer / Next Level Action (Part 4 & 5) */}
          {isActiveLevelDone && (
            <div className="level-footer-banner">
              <div className="level-footer-text">
                <h4>🎉 {activeLevel.name} Completed!</h4>
                <p>
                  {isFinalLevel
                    ? "Congratulations! You have completed all levels for this project!"
                    : `Great work! Level ${
                        activeLevelId + 1
                      } is now unlocked and ready for you.`}
                </p>
              </div>

              {!isFinalLevel ? (
                <button
                  type="button"
                  className="advance-level-btn"
                  onClick={() => setSelectedLevelId(activeLevelId + 1)}
                >
                  Advance to Level {activeLevelId + 1} →
                </button>
              ) : (
                <button
                  type="button"
                  className="advance-level-btn"
                  onClick={() => setShowCelebration(true)}
                >
                  View Completion Award 🏆
                </button>
              )}
            </div>
          )}
        </section>

        {/* =====================================================
            CELEBRATION SCREEN / MODAL (PART 6)
        ===================================================== */}
        {showCelebration && (
          <div
            className="celebration-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="celebration-heading"
          >
            <div className="celebration-card">
              <div className="celebration-badge-hero" aria-hidden="true">
                🏆
              </div>

              <h2 id="celebration-heading">Amazing work!</h2>
              <p className="celebration-message">
                You have completed all levels and subtasks for this engineering
                project! Your solution demonstrates strong problem solving and
                execution skills.
              </p>

              <div className="celebration-achievement-box">
                <span className="achievement-title">
                  ⭐ Milestone Master · Capstone Certified
                </span>
                <span className="achievement-project-name">
                  {project.title}
                </span>
                <span className="achievement-date">
                  Completed on:{" "}
                  {stats.completedAt
                    ? new Date(stats.completedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date().toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </span>
              </div>

              <div className="celebration-actions">
                <button
                  type="button"
                  className="celebration-btn secondary"
                  onClick={() => setShowCelebration(false)}
                >
                  Review Project Journey
                </button>
                <button
                  type="button"
                  className="celebration-btn primary"
                  onClick={() => navigate("/projects")}
                >
                  Return to Projects
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProjectWorkspacePage;
