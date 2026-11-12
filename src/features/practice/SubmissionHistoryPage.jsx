import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import zentrionLogo from "../../assets/zentrion-logo.png";
import {
  SUBMISSION_STATUSES,
  calculateSubmissionStats,
} from "../../data/submissionsData";
import { fetchSubmissions } from "../../services/submissionService";
import "./SubmissionHistory.css";

const STATUS_FILTER_OPTIONS = [
  { value: "ALL", label: "All Statuses" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "WRONG_ANSWER", label: "Wrong Answer" },
  { value: "TIME_LIMIT_EXCEEDED", label: "Time Limit Exceeded" },
  { value: "COMPILATION_ERROR", label: "Compilation Error" },
  { value: "RUNTIME_ERROR", label: "Runtime Error" },
  { value: "PENDING", label: "Pending" },
];

const LANGUAGE_FILTER_OPTIONS = [
  { value: "ALL", label: "All Languages" },
  { value: "python", label: "Python 3" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "javascript", label: "JavaScript" },
  { value: "c", label: "C" },
];

function SubmissionHistoryPage() {
  const navigate = useNavigate();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [languageFilter, setLanguageFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("latest");

  // Data & loading states
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  // Load submissions with filters
  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    fetchSubmissions({
      searchQuery,
      statusFilter,
      languageFilter,
      sortBy,
    }).then((data) => {
      if (isCurrent) {
        setSubmissions(data);
        setIsLoading(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [searchQuery, statusFilter, languageFilter, sortBy]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedSubmission(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const stats = calculateSubmissionStats(submissions);

  const handleCopyCode = async (codeText) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setLanguageFilter("ALL");
    setSortBy("latest");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    statusFilter !== "ALL" ||
    languageFilter !== "ALL" ||
    sortBy !== "latest";

  return (
    <div className="submission-page">
      {/* ================= NAVBAR ================= */}
      <header className="submission-navbar">
        <div className="submission-nav-left">
          <button
            className="submission-logo-btn"
            onClick={() => navigate("/")}
            aria-label="Zentrion Home"
          >
            <img src={zentrionLogo} alt="Zentrion" className="submission-logo-img" />
          </button>

          <div className="submission-nav-divider" />

          <div className="submission-breadcrumb">
            <button onClick={() => navigate("/problems")}>
              Engineering Problems
            </button>
            <span className="submission-breadcrumb-separator">/</span>
            <span className="submission-breadcrumb-current">Submission History</span>
          </div>
        </div>

        <div className="submission-nav-right">
          <ThemeToggle />

          <button
            className="submission-nav-btn primary"
            onClick={() => navigate("/coding-workspace")}
          >
            Open Workspace →
          </button>

          <button
            className="submission-nav-btn"
            onClick={() => navigate("/problems")}
          >
            ← Problems List
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="submission-main">
        {/* HERO / HEADING SECTION */}
        <section className="submission-hero">
          <div className="submission-hero-top">
            <p className="submission-eyebrow">PORTFOLIO & ATTEMPTS</p>
            <div className="demo-mode-badge">
              <span className="demo-dot" />
              <span>Frontend Demonstration Mode • Sample Data</span>
            </div>
          </div>

          <h1>
            Submission <span>History.</span>
          </h1>
          <p>
            Track your coding attempts, test-case outcomes, and performance benchmarks across all engineering challenges.
          </p>
        </section>

        {/* SUMMARY METRICS CARDS */}
        <section className="submission-summary-strip" aria-label="Submission summary statistics">
          <div className="summary-card">
            <div className="summary-icon total">📋</div>
            <div className="summary-info">
              <span className="summary-label">Total Submissions</span>
              <span className="summary-value">{stats.total}</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon accepted">✓</div>
            <div className="summary-info">
              <span className="summary-label">Accepted</span>
              <span className="summary-value">{stats.accepted}</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon wrong">✗</div>
            <div className="summary-info">
              <span className="summary-label">Wrong Answers</span>
              <span className="summary-value">{stats.wrongAnswer}</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon rate">⚡</div>
            <div className="summary-info">
              <span className="summary-label">Success Rate</span>
              <span className="summary-value">{stats.successRate}</span>
            </div>
          </div>
        </section>

        {/* SEARCH AND FILTERS BAR */}
        <section className="submission-filters-bar">
          <div className="filters-search-wrap">
            <span className="filters-search-icon" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>

            <input
              type="search"
              className="filters-search-input"
              placeholder="Search by problem name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search submissions"
            />

            {searchQuery && (
              <button
                className="filters-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="filters-dropdowns-group">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              {STATUS_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              className="filter-select"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              aria-label="Filter by programming language"
            >
              {LANGUAGE_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort submissions"
            >
              <option value="latest">Sort: Latest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>

            {hasActiveFilters && (
              <button
                className="filters-reset-btn"
                onClick={resetAllFilters}
                title="Reset all filters"
              >
                Reset Filters
              </button>
            )}
          </div>
        </section>

        {/* SUBMISSION HISTORY TABLE */}
        <section className="submission-table-card">
          <div className="table-header-meta">
            <span className="table-count-text">
              Showing <strong>{submissions.length}</strong>{" "}
              {submissions.length === 1 ? "submission" : "submissions"}
            </span>
          </div>

          <div className="table-responsive-container">
            <table className="submission-table">
              <thead>
                <tr>
                  <th>Problem Name</th>
                  <th>Language</th>
                  <th>Submitted At</th>
                  <th>Status</th>
                  <th>Runtime</th>
                  <th>Memory</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "40px" }}>
                      <span style={{ color: "var(--text-muted)" }}>Loading submission history...</span>
                    </td>
                  </tr>
                ) : submissions.length > 0 ? (
                  submissions.map((sub) => {
                    const statusMeta =
                      SUBMISSION_STATUSES[sub.status] || SUBMISSION_STATUSES.PENDING;
                    const statusClass = sub.status.toLowerCase().replace(/_/g, "-");

                    return (
                      <tr
                        key={sub.id}
                        className="submission-row"
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        <td>
                          <div className="problem-cell-title">
                            <span className="problem-link-text">{sub.problemTitle}</span>
                            <span className="problem-cell-sub">
                              <span className="submission-id-tag">{sub.id}</span>
                              <span>•</span>
                              <span>{sub.domain}</span>
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="language-cell-badge">
                            {sub.language}
                          </span>
                        </td>

                        <td>
                          <span className="time-cell-text">{sub.submittedAt}</span>
                        </td>

                        <td>
                          <span className={`status-badge ${statusClass}`}>
                            <span>{statusMeta.icon}</span>
                            <span>{statusMeta.label}</span>
                          </span>
                        </td>

                        <td>
                          <span className="metric-number-cell">
                            {sub.executionTime}
                          </span>
                        </td>

                        <td>
                          <span className="metric-number-cell">
                            {sub.memoryUsed}
                          </span>
                        </td>

                        <td>
                          <button
                            className="action-view-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSubmission(sub);
                            }}
                          >
                            View Details →
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7">
                      <div className="submission-empty-state">
                        <div className="empty-icon">⌕</div>
                        <h3>No submissions found</h3>
                        <p>
                          No submission records matched your active filter or search criteria.
                        </p>
                        <button
                          className="empty-clear-btn"
                          onClick={resetAllFilters}
                        >
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* ================= SUBMISSION DETAILS MODAL ================= */}
      {selectedSubmission && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedSubmission(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-problem-title"
        >
          <div
            className="submission-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-badges-group">
                  <span className="submission-id-tag" style={{ fontSize: "0.78rem" }}>
                    {selectedSubmission.id}
                  </span>
                  <span
                    className={`status-badge ${selectedSubmission.status
                      .toLowerCase()
                      .replace(/_/g, "-")}`}
                  >
                    <span>
                      {SUBMISSION_STATUSES[selectedSubmission.status]?.icon || "•"}
                    </span>
                    <span>
                      {SUBMISSION_STATUSES[selectedSubmission.status]?.label ||
                        selectedSubmission.status}
                    </span>
                  </span>
                </div>

                <h2 id="modal-problem-title">{selectedSubmission.problemTitle}</h2>
              </div>

              <button
                className="modal-close-btn"
                onClick={() => setSelectedSubmission(null)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* QUICK METRICS BAR */}
            <div className="modal-metrics-bar">
              <div className="modal-metric-col">
                <span>Language</span>
                <strong>{selectedSubmission.language}</strong>
              </div>

              <div className="modal-metric-col">
                <span>Submitted At</span>
                <strong>{selectedSubmission.submittedAt}</strong>
              </div>

              <div className="modal-metric-col">
                <span>Execution Time</span>
                <strong>{selectedSubmission.executionTime}</strong>
              </div>

              <div className="modal-metric-col">
                <span>Memory Used</span>
                <strong>{selectedSubmission.memoryUsed}</strong>
              </div>
            </div>

            {/* SCROLLABLE MODAL BODY */}
            <div className="modal-body-scrollable">
              {/* ERROR DETAILS (IF APPLICABLE) */}
              {selectedSubmission.errorDetails && (
                <div>
                  <div className="modal-section-title">
                    <div className="modal-section-title-left">
                      <span>Compiler / Runtime Diagnostic Trace</span>
                    </div>
                  </div>
                  <div className="modal-error-box">
                    {selectedSubmission.errorDetails}
                  </div>
                </div>
              )}

              {/* TEST CASE RESULTS */}
              {selectedSubmission.testCases && selectedSubmission.testCases.length > 0 && (
                <div>
                  <div className="modal-section-title">
                    <div className="modal-section-title-left">
                      <span>Test Case Results ({selectedSubmission.testCases.length})</span>
                    </div>
                  </div>

                  <div className="modal-testcases-list">
                    {selectedSubmission.testCases.map((tc) => (
                      <div key={tc.id} className="modal-tc-card">
                        <div className="modal-tc-header">
                          <span>{tc.name}</span>
                          <span
                            className={
                              tc.status === "PASSED"
                                ? "modal-tc-status-passed"
                                : "modal-tc-status-failed"
                            }
                          >
                            {tc.status === "PASSED" ? "✓ Passed" : `✗ ${tc.status}`}{" "}
                            ({tc.runtime})
                          </span>
                        </div>

                        <div className="modal-tc-grid">
                          <div>
                            <strong>Input</strong>
                            <div className="modal-tc-snippet">{tc.input}</div>
                          </div>

                          <div>
                            <strong>Expected vs Actual</strong>
                            <div className="modal-tc-snippet">
                              Expected: {tc.expectedOutput}
                              {"\n"}
                              Actual: {tc.actualOutput}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBMITTED CODE */}
              <div>
                <div className="modal-section-title">
                  <div className="modal-section-title-left">
                    <span>Submitted Code</span>
                  </div>
                  <button
                    className="copy-code-btn"
                    onClick={() => handleCopyCode(selectedSubmission.code)}
                  >
                    {isCopied ? "✓ Copied" : "Copy Code"}
                  </button>
                </div>

                <div className="modal-code-wrapper">
                  <div className="modal-code-header">
                    <span className="code-header-lang">
                      {selectedSubmission.language}
                    </span>
                  </div>
                  <pre className="modal-code-block">
                    <code>{selectedSubmission.code}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="modal-footer">
              <span className="modal-notice-text">
                Ready for backend API integration (`GET /api/v1/submissions/{selectedSubmission.id}`).
              </span>

              <div className="modal-footer-actions">
                <button
                  className="modal-close-action-btn"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Close
                </button>

                <button
                  className="modal-open-workspace-btn"
                  onClick={() =>
                    navigate(`/coding-workspace/${selectedSubmission.problemId}`)
                  }
                >
                  Open in Workspace →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmissionHistoryPage;

