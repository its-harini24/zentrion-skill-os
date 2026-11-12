import { useState, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import zentrionLogo from "../../assets/zentrion-logo.png";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import { projectsData } from "../../data/projectsData";
import { computeProjectStats } from "../../services/projectProgressService.js";
import {
  getAllEvidenceSubmissions,
  createEvidenceSubmission,
  resubmitEvidence,
  formatBytes,
  validateFile,
  simulateMentorReview,
} from "../../services/evidenceService.js";
import "./EvidenceReviewPage.css";

export default function EvidenceReviewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryProjectId = searchParams.get("projectId");
  const queryLevelId = searchParams.get("levelId");

  // Submissions State
  const [submissions, setSubmissions] = useState(() => getAllEvidenceSubmissions());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [toastMessage, setToastMessage] = useState(null);

  // Compute Initial Modal Target from Query Params (if provided)
  const initialModalTarget = useMemo(() => {
    if (!queryProjectId) return null;
    const proj = projectsData.find((p) => p.id === queryProjectId);
    if (!proj) return null;
    const lvlId = queryLevelId ? Number(queryLevelId) : 1;
    const lvl = proj.levels.find((l) => l.id === lvlId) || proj.levels[0];
    const initialSubs = getAllEvidenceSubmissions();
    const existing = initialSubs.find(
      (s) => s.projectId === proj.id && Number(s.levelId) === lvlId
    );
    const isResubmit =
      existing?.status === "Needs Changes" ||
      existing?.status === "Changes Requested";
    return { project: proj, level: lvl, isResubmit, existingSub: existing || null };
  }, [queryProjectId, queryLevelId]);

  // Modals State
  const [uploadModalTarget, setUploadModalTarget] = useState(initialModalTarget);
  const [detailModalSub, setDetailModalSub] = useState(null); // submission object to view

  // Upload Modal Form State
  const [uploadTitle, setUploadTitle] = useState(() => {
    if (!initialModalTarget) return "";
    const { isResubmit, existingSub, level } = initialModalTarget;
    if (isResubmit && existingSub) return existingSub.title || "";
    return `${level.shortTitle || level.name} Evidence`;
  });
  const [uploadDescription, setUploadDescription] = useState(() => {
    if (!initialModalTarget) return "";
    return initialModalTarget.existingSub?.description || "";
  });
  const [uploadLink, setUploadLink] = useState(() => {
    if (!initialModalTarget) return "";
    return initialModalTarget.existingSub?.deliverableLink || "";
  });
  const [uploadFiles, setUploadFiles] = useState(() => {
    if (!initialModalTarget) return [];
    return initialModalTarget.existingSub?.files
      ? [...initialModalTarget.existingSub.files]
      : [];
  });
  const [uploadErrors, setUploadErrors] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Computed Summary Metrics
  const totalSubmissions = submissions.length;
  const approvedCount = submissions.filter((s) => s.status === "Approved").length;
  const pendingCount = submissions.filter(
    (s) => s.status === "Pending Review" || s.status === "Under Review"
  ).length;

  // Compute Project Cards Data
  const projectCards = useMemo(() => {
    return projectsData.map((project) => {
      const stats = computeProjectStats(project);
      const activeLevelNumber = stats.currentLevelNumber || 1;
      const activeLevel =
        project.levels.find((l) => l.id === activeLevelNumber) ||
        project.levels[0];

      // Find submission for current active level if exists, or most recent submission for project
      const levelSub = submissions.find(
        (s) =>
          s.projectId === project.id &&
          Number(s.levelId) === Number(activeLevelNumber)
      );

      // Status derivation
      let status = "Not Submitted";
      if (levelSub) {
        if (levelSub.status === "Approved") status = "Approved";
        else if (
          levelSub.status === "Needs Changes" ||
          levelSub.status === "Changes Requested"
        )
          status = "Changes Requested";
        else status = "Pending";
      }

      return {
        project,
        activeLevel,
        stats,
        submission: levelSub || null,
        status,
        submittedAt: levelSub?.submittedAt || null,
      };
    });
  }, [submissions]);

  // Filter project cards based on search and status
  const filteredProjectCards = useMemo(() => {
    return projectCards.filter((card) => {
      let matchesStatus = true;
      if (statusFilter === "Approved") matchesStatus = card.status === "Approved";
      else if (statusFilter === "Pending") matchesStatus = card.status === "Pending";
      else if (statusFilter === "Changes Requested")
        matchesStatus = card.status === "Changes Requested";
      else if (statusFilter === "Not Submitted")
        matchesStatus = card.status === "Not Submitted";

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        card.project.title.toLowerCase().includes(q) ||
        card.project.category.toLowerCase().includes(q) ||
        card.activeLevel.name.toLowerCase().includes(q) ||
        (card.submission?.title &&
          card.submission.title.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [projectCards, statusFilter, searchQuery]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Open Upload Modal
  const openUploadModal = (project, level, isResubmit = false, existingSub = null) => {
    setUploadModalTarget({ project, level, isResubmit, existingSub });
    if (isResubmit && existingSub) {
      setUploadTitle(existingSub.title || "");
      setUploadDescription(existingSub.description || "");
      setUploadLink(existingSub.deliverableLink || "");
      setUploadFiles([...(existingSub.files || [])]);
    } else {
      setUploadTitle(`${level.shortTitle || level.name} Evidence`);
      setUploadDescription("");
      setUploadLink("");
      setUploadFiles([]);
    }
    setUploadErrors([]);
  };

  const closeUploadModal = () => {
    setUploadModalTarget(null);
    setUploadTitle("");
    setUploadDescription("");
    setUploadLink("");
    setUploadFiles([]);
    setUploadErrors([]);
  };

  // Handle Drag & Drop Upload
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const processFiles = (fileList) => {
    const errors = [];
    const validFiles = [];

    Array.from(fileList).forEach((file) => {
      const result = validateFile(file);
      if (!result.valid) {
        errors.push(result.error);
      } else {
        let previewUrl = null;
        if (file.type.startsWith("image/")) {
          previewUrl = URL.createObjectURL(file);
        }
        validFiles.push({
          id: `f-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          previewUrl,
          uploadedAt: new Date().toISOString(),
        });
      }
    });

    if (errors.length > 0) {
      setUploadErrors(errors);
      setTimeout(() => setUploadErrors([]), 5000);
    }

    if (validFiles.length > 0) {
      setUploadFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeFile = (id) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Submit Evidence Handler
  const handleUploadSubmit = (e) => {
    e.preventDefault();

    if (!uploadDescription.trim()) {
      alert("Please enter a brief description of your completed work.");
      return;
    }

    if (uploadFiles.length === 0 && !uploadLink.trim()) {
      alert("Please attach at least one proof file or add a project link.");
      return;
    }

    const { project, level, isResubmit, existingSub } = uploadModalTarget;

    if (isResubmit && existingSub) {
      resubmitEvidence(existingSub.id, {
        title: uploadTitle.trim() || `${level.name} Evidence`,
        description: uploadDescription.trim(),
        deliverableLink: uploadLink.trim(),
        files: uploadFiles,
      });
      showToast("Revision submitted! Mentor re-review queued.");
    } else {
      createEvidenceSubmission({
        projectId: project.id,
        projectTitle: project.title,
        levelId: level.id,
        levelName: level.name,
        title: uploadTitle.trim() || `${level.name} Evidence`,
        description: uploadDescription.trim(),
        deliverableLink: uploadLink.trim(),
        files: uploadFiles,
      });
      showToast("Evidence submitted successfully for review!");
    }

    setSubmissions(getAllEvidenceSubmissions());
    closeUploadModal();
  };

  // Simulate Mentor Decision (Quick Prototype Test)
  const handleSimulateDecision = (subId, status) => {
    simulateMentorReview(subId, {
      status,
      reviewerName: "Dr. Arvind Swaminathan",
      reviewerRole: "Senior Faculty Mentor",
      autoCompleteSubtasks: true,
    });

    const refreshed = getAllEvidenceSubmissions();
    setSubmissions(refreshed);

    const updated = refreshed.find((s) => s.id === subId);
    if (detailModalSub && detailModalSub.id === subId) {
      setDetailModalSub(updated);
    }

    showToast(
      status === "Approved"
        ? "✓ Evidence Approved! Next level unlocked."
        : "⚠️ Changes requested by mentor."
    );
  };

  // File Badge Icon
  const getFileIcon = (file) => {
    const name = (file.name || "").toLowerCase();
    if (file.type?.startsWith("image/") || name.endsWith(".png") || name.endsWith(".jpg")) {
      return "🖼️";
    }
    if (name.endsWith(".pdf")) return "📄";
    if (name.endsWith(".zip") || name.endsWith(".tar") || name.endsWith(".gz")) return "📦";
    if (name.endsWith(".doc") || name.endsWith(".docx")) return "📝";
    return "📁";
  };

  return (
    <div className="evidence-simple-page">
      {/* =====================================================
          TOP NAVIGATION (Consistent Zentrion Header)
      ===================================================== */}
      <header className="evidence-simple-nav">
        <div className="nav-left">
          <button
            className="logo-btn"
            onClick={() => navigate("/student-dashboard")}
            aria-label="Back to Zentrion Dashboard"
          >
            <img src={zentrionLogo} alt="Zentrion" className="logo-img" />
          </button>
          <span className="nav-sep" aria-hidden="true" />
          <nav className="nav-breadcrumbs" aria-label="Breadcrumb">
            <button onClick={() => navigate("/student-dashboard")}>Dashboard</button>
            <span aria-hidden="true">/</span>
            <button onClick={() => navigate("/projects")}>Projects</button>
            <span aria-hidden="true">/</span>
            <span className="current">Evidence & Reports</span>
          </nav>
        </div>

        <div className="nav-right">
          <ThemeToggle />
          <button
            className="nav-secondary-btn"
            onClick={() => navigate("/projects")}
          >
            ← Projects
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="evidence-simple-main">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="simple-toast" role="status" aria-live="polite">
            <span>✨ {toastMessage}</span>
            <button onClick={() => setToastMessage(null)} aria-label="Dismiss">
              ×
            </button>
          </div>
        )}

        {/* 1. HEADER & 3 COMPACT SUMMARY CARDS */}
        <section className="evidence-header-section">
          <div className="header-text-block">
            <span className="header-eyebrow">VERIFICATION WORKSPACE</span>
            <h1>Evidence & Reports</h1>
            <p className="header-subtitle">
              Submit your project deliverables, track review status, and inspect mentor verification reports.
            </p>
          </div>

          {/* Three Compact Summary Cards */}
          <div className="three-stats-grid" aria-label="Evidence Submissions Summary">
            <div className="stat-card">
              <div className="stat-card-top">
                <span className="stat-icon-badge default">📁</span>
                <span className="stat-number">{totalSubmissions}</span>
              </div>
              <span className="stat-name">Total Submissions</span>
            </div>

            <div className="stat-card stat-approved">
              <div className="stat-card-top">
                <span className="stat-icon-badge approved">✓</span>
                <span className="stat-number">{approvedCount}</span>
              </div>
              <span className="stat-name">Approved</span>
            </div>

            <div className="stat-card stat-pending">
              <div className="stat-card-top">
                <span className="stat-icon-badge pending">⏳</span>
                <span className="stat-number">{pendingCount}</span>
              </div>
              <span className="stat-name">Pending Review</span>
            </div>
          </div>
        </section>

        {/* FILTER & SEARCH BAR */}
        <div className="simple-toolbar">
          <div className="filter-chips" role="tablist" aria-label="Filter submissions by status">
            {[
              { id: "All", label: "All Projects", count: projectCards.length },
              {
                id: "Pending",
                label: "Pending",
                count: projectCards.filter((c) => c.status === "Pending").length,
              },
              {
                id: "Approved",
                label: "Approved",
                count: projectCards.filter((c) => c.status === "Approved").length,
              },
              {
                id: "Changes Requested",
                label: "Needs Changes",
                count: projectCards.filter((c) => c.status === "Changes Requested").length,
              },
              {
                id: "Not Submitted",
                label: "Not Submitted",
                count: projectCards.filter((c) => c.status === "Not Submitted").length,
              },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`chip-btn ${statusFilter === filter.id ? "active" : ""}`}
                onClick={() => setStatusFilter(filter.id)}
              >
                <span>{filter.label}</span>
                <span className="chip-count">{filter.count}</span>
              </button>
            ))}
          </div>

          <div className="search-wrap">
            <span className="search-symbol" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search projects or levels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-box"
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* 2. PROJECT SUBMISSIONS (CLEAN CARDS) */}
        {filteredProjectCards.length === 0 ? (
          <div className="empty-box">
            <div className="empty-icon">📂</div>
            <h3>No matching projects found</h3>
            <p>Try clearing your search query or choosing another status filter.</p>
            <button
              type="button"
              className="btn-link"
              onClick={() => {
                setStatusFilter("All");
                setSearchQuery("");
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="projects-card-grid">
            {filteredProjectCards.map((card) => {
              const { project, activeLevel, stats, submission, status, submittedAt } =
                card;

              const statusBadgeClass =
                status === "Approved"
                  ? "badge-approved"
                  : status === "Pending"
                  ? "badge-pending"
                  : status === "Changes Requested"
                  ? "badge-changes"
                  : "badge-not-submitted";

              const formattedDate = submittedAt
                ? new Date(submittedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <article key={project.id} className="simple-project-card">
                  {/* Card Category & Status Row */}
                  <div className="card-header-row">
                    <span className="project-category-tag">{project.category}</span>
                    <span className={`status-badge ${statusBadgeClass}`}>
                      {status === "Approved" && "✓ "}
                      {status === "Pending" && "⏳ "}
                      {status === "Changes Requested" && "⚠️ "}
                      {status === "Not Submitted" && "○ "}
                      {status === "Pending" ? "Under Review" : status}
                    </span>
                  </div>

                  {/* Project Title & Active Level */}
                  <div className="card-title-group">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="level-pill-row">
                      <span className="level-number-pill">Level {activeLevel.id}</span>
                      <span className="level-subtitle">
                        {activeLevel.shortTitle || activeLevel.name}
                      </span>
                    </div>
                  </div>

                  {/* Subtle Level Progress Bar */}
                  <div className="card-progress-wrap">
                    <div className="progress-labels">
                      <span>Level {stats.currentLevelNumber} of {stats.totalLevels}</span>
                      <span>{stats.percent}% Milestone Progress</span>
                    </div>
                    <div className="progress-rail">
                      <div
                        className="progress-fill"
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Metadata: Submission date & files/links */}
                  <div className="card-meta">
                    <span className="date-info">
                      {formattedDate ? `Submitted ${formattedDate}` : "Not submitted yet"}
                    </span>

                    <div className="meta-artifacts">
                      {submission?.files?.length > 0 && (
                        <span className="files-info">
                          📎 {submission.files.length} {submission.files.length === 1 ? "file" : "files"}
                        </span>
                      )}
                      {submission?.deliverableLink && (
                        <span className="link-info" title="External deliverable attached">
                          🔗 Link
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mentor Feedback / Evaluation Snippet */}
                  {submission?.feedback?.comments ? (
                    <div
                      className={`mentor-snippet ${
                        status === "Changes Requested"
                          ? "snippet-changes"
                          : "snippet-approved"
                      }`}
                    >
                      <div className="snippet-header">
                        <span className="snippet-author">
                          💬 {submission.reviewer?.name || "Faculty Mentor"}
                        </span>
                        {status === "Approved" && (
                          <span className="snippet-tag approved">✓ Verified</span>
                        )}
                        {status === "Changes Requested" && (
                          <span className="snippet-tag revision">Action Needed</span>
                        )}
                      </div>
                      <p className="snippet-text">
                        "{submission.feedback.comments}"
                      </p>
                    </div>
                  ) : status === "Pending" ? (
                    <div className="mentor-snippet snippet-pending">
                      <div className="snippet-header">
                        <span className="snippet-author">⏳ Faculty Queue</span>
                      </div>
                      <p className="snippet-text">
                        Submission received and awaiting faculty mentor verification.
                      </p>
                    </div>
                  ) : null}

                  {/* Card Action Buttons */}
                  <div className="card-actions">
                    {status === "Not Submitted" ? (
                      <button
                        type="button"
                        className="action-btn btn-primary"
                        onClick={() => openUploadModal(project, activeLevel, false, null)}
                      >
                        Submit Evidence →
                      </button>
                    ) : status === "Changes Requested" ? (
                      <div className="split-actions">
                        <button
                          type="button"
                          className="action-btn btn-primary btn-alert"
                          onClick={() => openUploadModal(project, activeLevel, true, submission)}
                        >
                          Resubmit →
                        </button>
                        <button
                          type="button"
                          className="action-btn btn-secondary"
                          onClick={() => setDetailModalSub(submission)}
                        >
                          View Review
                        </button>
                      </div>
                    ) : status === "Approved" ? (
                      <button
                        type="button"
                        className="action-btn btn-secondary btn-approved-report"
                        onClick={() => setDetailModalSub(submission)}
                      >
                        ✓ View Report & Evidence
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="action-btn btn-secondary"
                        onClick={() => setDetailModalSub(submission)}
                      >
                        View Submission
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* =====================================================
            3. UPLOAD MODAL (FOCUSED & MINIMAL)
        ===================================================== */}
        {uploadModalTarget && (
          <div
            className="simple-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-modal-title"
          >
            <div className="simple-modal-card">
              <div className="modal-header">
                <div>
                  <span className="modal-subheading">
                    {uploadModalTarget.project.title} · {uploadModalTarget.level.name}
                  </span>
                  <h2 id="upload-modal-title">
                    {uploadModalTarget.isResubmit ? "Resubmit Evidence" : "Submit Evidence"}
                  </h2>
                </div>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={closeUploadModal}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="modal-form">
                {/* Drag and Drop Zone */}
                <div className="form-item">
                  <label>Deliverable Files *</label>

                  {uploadErrors.length > 0 && (
                    <div className="error-box" role="alert">
                      {uploadErrors.map((err, i) => (
                        <div key={i}>⚠️ {err}</div>
                      ))}
                    </div>
                  )}

                  <div
                    className={`drop-box ${dragActive ? "drag-on" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden-file-input"
                      onChange={handleFileChange}
                      accept=".png,.jpg,.jpeg,.gif,.svg,.webp,.pdf,.doc,.docx,.zip,.tar,.gz,.txt,.md,.js,.jsx,.ts,.tsx,.py,.java,.json"
                    />
                    <span className="drop-icon" aria-hidden="true">
                      ☁️
                    </span>
                    <span className="drop-title">
                      Drag files here or <u>browse</u>
                    </span>
                    <span className="drop-hint">
                      Screenshots, PDFs, documents, code ZIP (Max 25 MB per file)
                    </span>
                  </div>

                  {/* Selected Files Preview */}
                  {uploadFiles.length > 0 && (
                    <div className="files-preview-list">
                      {uploadFiles.map((f) => (
                        <div key={f.id} className="preview-item">
                          {f.previewUrl ? (
                            <img
                              src={f.previewUrl}
                              alt=""
                              className="file-thumb"
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="file-icon">{getFileIcon(f)}</span>
                          )}
                          <span className="file-name" title={f.name}>
                            {f.name}
                          </span>
                          <span className="file-size">({formatBytes(f.size)})</span>
                          <button
                            type="button"
                            className="remove-file-btn"
                            onClick={() => removeFile(f.id)}
                            title="Remove file"
                            aria-label={`Remove ${f.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Short Description Field */}
                <div className="form-item">
                  <label htmlFor="upload-description">
                    What did you complete? *
                  </label>
                  <textarea
                    id="upload-description"
                    rows={3}
                    placeholder="Briefly describe what you implemented, key results, and how deliverables satisfy level criteria..."
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    required
                    className="simple-textarea"
                  />
                </div>

                {/* Optional GitHub or Demo Link */}
                <div className="form-item">
                  <label htmlFor="upload-link">
                    Repository or Demo Link <span className="label-sub">(Optional)</span>
                  </label>
                  <input
                    id="upload-link"
                    type="url"
                    placeholder="https://github.com/... or demo link"
                    value={uploadLink}
                    onChange={(e) => setUploadLink(e.target.value)}
                    className="simple-input"
                  />
                </div>

                {/* Modal Actions */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={closeUploadModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {uploadModalTarget.isResubmit ? "Submit Revision" : "Submit Evidence"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =====================================================
            4. REVIEW & SUBMISSION DETAIL / REPORT PANEL
        ===================================================== */}
        {detailModalSub && (
          <div
            className="simple-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-modal-title"
          >
            <div className="simple-modal-card">
              <div className="modal-header">
                <div>
                  <span className="modal-subheading">
                    {detailModalSub.projectTitle} · {detailModalSub.levelName}
                  </span>
                  <h2 id="detail-modal-title">
                    {detailModalSub.status === "Approved"
                      ? "Verification Report & Evidence"
                      : "Evidence Submission Details"}
                  </h2>
                </div>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={() => setDetailModalSub(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="modal-body-compact">
                {/* Status & Date Bar */}
                <div className="detail-status-row">
                  <div className="status-pair">
                    <span className="field-label">Status:</span>
                    <span
                      className={`status-badge ${
                        detailModalSub.status === "Approved"
                          ? "badge-approved"
                          : detailModalSub.status === "Needs Changes" ||
                            detailModalSub.status === "Changes Requested"
                          ? "badge-changes"
                          : "badge-pending"
                      }`}
                    >
                      {detailModalSub.status === "Approved" && "✓ "}
                      {detailModalSub.status === "Needs Changes" && "⚠️ "}
                      {detailModalSub.status === "Changes Requested" && "⚠️ "}
                      {detailModalSub.status}
                    </span>
                  </div>

                  <span className="detail-date">
                    Submitted {new Date(detailModalSub.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Mentor Feedback / Evaluation Report */}
                {detailModalSub.feedback?.comments && (
                  <div
                    className={`detail-feedback-box ${
                      detailModalSub.status === "Needs Changes" ||
                      detailModalSub.status === "Changes Requested"
                        ? "feedback-alert"
                        : "feedback-approved"
                    }`}
                  >
                    <div className="feedback-header">
                      <div>
                        <strong>
                          Faculty Evaluation: {detailModalSub.reviewer?.name || "Mentor"}
                        </strong>
                        <span className="reviewer-role">
                          {detailModalSub.reviewer?.role || "Faculty Mentor"}
                        </span>
                      </div>
                      {detailModalSub.reviewedAt && (
                        <span className="feedback-date">
                          {new Date(detailModalSub.reviewedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="feedback-message">
                      "{detailModalSub.feedback.comments}"
                    </p>

                    {/* Criteria scores breakdown if available */}
                    {detailModalSub.feedback.criteriaScores?.length > 0 && (
                      <div className="feedback-criteria-list">
                        {detailModalSub.feedback.criteriaScores.map((c, i) => (
                          <div key={i} className="criteria-row">
                            <span className="criteria-name">{c.criterion}</span>
                            <span className="criteria-score">{c.score}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Student Description / Submission Title */}
                <div className="detail-section">
                  <span className="field-label">Deliverable Description:</span>
                  <p className="detail-text">{detailModalSub.description}</p>
                </div>

                {/* External Deliverable Link */}
                {detailModalSub.deliverableLink && (
                  <div className="detail-section">
                    <span className="field-label">Repository / Deliverable Link:</span>
                    <a
                      href={detailModalSub.deliverableLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      🔗 {detailModalSub.deliverableLink} ↗
                    </a>
                  </div>
                )}

                {/* Attached Files */}
                {detailModalSub.files?.length > 0 && (
                  <div className="detail-section">
                    <span className="field-label">
                      Attached Artifacts ({detailModalSub.files.length}):
                    </span>
                    <div className="detail-files-list">
                      {detailModalSub.files.map((f) => (
                        <div key={f.id} className="detail-file-row">
                          <span className="file-icon">{getFileIcon(f)}</span>
                          <span className="file-name">{f.name}</span>
                          <span className="file-size">{formatBytes(f.size)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prototype Simulation Bar (Clearly identified for demo evaluation) */}
                <div className="demo-sim-bar">
                  <span className="demo-sim-label">Demo testing tools:</span>
                  <button
                    type="button"
                    className="sim-chip sim-approve"
                    onClick={() => handleSimulateDecision(detailModalSub.id, "Approved")}
                    title="Simulate mentor granting approval"
                  >
                    ✓ Simulate Approval
                  </button>
                  <button
                    type="button"
                    className="sim-chip sim-changes"
                    onClick={() =>
                      handleSimulateDecision(detailModalSub.id, "Needs Changes")
                    }
                    title="Simulate mentor requesting revision"
                  >
                    ⚠️ Request Changes
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                {(detailModalSub.status === "Needs Changes" ||
                  detailModalSub.status === "Changes Requested") && (
                  <button
                    type="button"
                    className="btn-primary btn-alert"
                    onClick={() => {
                      const proj = projectsData.find(
                        (p) => p.id === detailModalSub.projectId
                      );
                      const lvl =
                        proj?.levels.find(
                          (l) => l.id === Number(detailModalSub.levelId)
                        ) || proj?.levels[0];
                      const target = detailModalSub;
                      setDetailModalSub(null);
                      openUploadModal(proj, lvl, true, target);
                    }}
                  >
                    Resubmit Evidence →
                  </button>
                )}
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setDetailModalSub(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
