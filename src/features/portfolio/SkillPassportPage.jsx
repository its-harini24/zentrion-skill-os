import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import zentrionLogo from "../../assets/zentrion-logo.png";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import { getSkillPassportData } from "../../services/skillPassportService";
import { formatBytes } from "../../services/evidenceService";
import "./SkillPassportPage.css";

export default function SkillPassportPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Public View Mode (can be activated via URL or toggle)
  const isPublicUrl = searchParams.get("view") === "public";
  const [isPublicMode, setIsPublicMode] = useState(isPublicUrl);

  // Active Category Filter for Competency Matrix
  const [selectedCompetencyDomain, setSelectedCompetencyDomain] = useState("All");

  // Load Passport Data
  const passport = useMemo(() => getSkillPassportData(), []);
  const {
    passportMetadata,
    student,
    summaryStats,
    competencies,
    projects,
    facultyReviews,
    codingPractice,
    github,
    certificates,
  } = passport;

  // Filtered Competencies
  const filteredCompetencies = useMemo(() => {
    if (selectedCompetencyDomain === "All") return competencies;
    return competencies.filter((c) => c.domain === selectedCompetencyDomain);
  }, [competencies, selectedCompetencyDomain]);

  const uniqueDomains = useMemo(() => {
    const set = new Set(competencies.map((c) => c.domain));
    return ["All", ...Array.from(set)];
  }, [competencies]);

  // Toast / Copy notification
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const shareableUrl = `${window.location.origin}/passport?student=${student.portfolioSlug || "harini-csbs"}&view=public`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareableUrl);
      showToast("Official Skill Passport URL copied to clipboard!");
    } else {
      showToast(`Passport URL: ${shareableUrl}`);
    }
  };

  return (
    <div className={`skill-passport-page ${isPublicMode ? "is-public-mode" : ""}`}>
      {/* =====================================================
          TOP NAVIGATION (Hidden on Print)
      ===================================================== */}
      <header className="passport-navbar no-print">
        <div className="nav-left">
          <button
            className="logo-btn"
            onClick={() => navigate("/student-dashboard")}
            aria-label="Back to Zentrion Dashboard"
          >
            <img src={zentrionLogo} alt="Zentrion" className="logo-img" />
          </button>
          <span className="nav-sep" aria-hidden="true" />
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button onClick={() => navigate("/student-dashboard")}>Dashboard</button>
            <span aria-hidden="true">/</span>
            <button onClick={() => navigate("/portfolio")}>Portfolio</button>
            <span aria-hidden="true">/</span>
            <span className="current">Skill Passport</span>
          </nav>
        </div>

        <div className="nav-right">
          <ThemeToggle />

          {/* Toggle Public / Student View */}
          <button
            type="button"
            className={`btn-toggle-view ${isPublicMode ? "active" : ""}`}
            onClick={() => setIsPublicMode(!isPublicMode)}
            title="Toggle between student workspace view and public recruiter transcript view"
          >
            {isPublicMode ? "✏️ Student View" : "👁️ Recruiter View"}
          </button>

          {/* Copy Shareable Link */}
          <button
            type="button"
            className="btn-share-passport"
            onClick={handleCopyLink}
            title="Copy public link to this Skill Passport"
          >
            🔗 Share Link
          </button>

          {/* Print / Export PDF */}
          <button
            type="button"
            className="btn-print-passport"
            onClick={() => window.print()}
            title="Print or save as official A4 PDF transcript"
          >
            🖨️ Export PDF
          </button>

          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/portfolio")}
          >
            ← Portfolio
          </button>
        </div>
      </header>

      {/* Public View Notification Bar */}
      {isPublicMode && (
        <aside className="public-mode-banner no-print" role="status">
          <span>
            👁️ <strong>Public Academic Credential View:</strong> You are viewing an official, tamper-evident Skill Passport record on Zentrion Skill OS.
          </span>
          <button type="button" onClick={() => setIsPublicMode(false)}>
            Exit Public View
          </button>
        </aside>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <aside className="passport-toast no-print" role="status" aria-live="polite">
          <span>✨ {toastMessage}</span>
          <button onClick={() => setToastMessage(null)} aria-label="Dismiss">
            ×
          </button>
        </aside>
      )}

      {/* =====================================================
          MAIN PASSPORT DOCUMENT
      ===================================================== */}
      <main className="passport-document-container">
        {/* =====================================================
            1. PASSPORT OVERVIEW & STUDENT IDENTITY
        ===================================================== */}
        <section className="passport-dossier-card" aria-label="Passport Header">
          <div className="dossier-top-strip">
            <div className="dossier-badge-block">
              <span className="dossier-institution">ZENTRION SKILL OS</span>
              <span className="dossier-title">OFFICIAL STUDENT SKILL PASSPORT</span>
            </div>
            <div className="dossier-meta-block">
              <span className="meta-label">PASSPORT ID</span>
              <span className="meta-value">{passportMetadata.passportId}</span>
              <span className="meta-sub">Issued: {passportMetadata.issuedOn}</span>
            </div>
          </div>

          <div className="dossier-profile-grid">
            <div className="student-avatar-box">
              <div className="avatar-letter" aria-hidden="true">
                {student.fullName ? student.fullName.charAt(0) : "H"}
              </div>
              <span className="status-seal-pill">Active Record</span>
            </div>

            <div className="student-details-box">
              <div className="student-name-row">
                <h1>{student.fullName}</h1>
                <span className="enrollment-pill">
                  ✓ Verified Enrolled Student
                </span>
              </div>

              <div className="academic-meta-list">
                <span className="academic-chip dept">
                  🏛️ {student.department}
                </span>
                <span className="academic-chip degree">
                  🎓 {student.degree}
                </span>
                <span className="academic-chip term">
                  📚 {student.year} · {student.semester}
                </span>
                <span className="academic-chip location">
                  📍 {student.location}
                </span>
              </div>

              <p className="student-headline">{student.headline}</p>
              <p className="student-bio">{student.bio}</p>

              {/* Verified Career Pathways */}
              <div className="career-goals-wrap">
                <span className="career-label">Target Engineering Domains:</span>
                <div className="career-tags">
                  {student.careerInterests.map((interest, idx) => (
                    <span key={idx} className="career-pill">
                      🎯 {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Source Identifiers */}
              <div className="social-links-row">
                {student.github && (
                  <a
                    href={student.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verified-social-link"
                  >
                    <span>🐙 GitHub:</span> @{github.connection?.username || "its-harini24"} ↗
                  </a>
                )}
                {student.linkedin && (
                  <a
                    href={student.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verified-social-link"
                  >
                    <span>💼 LinkedIn:</span> Profile ↗
                  </a>
                )}
                <span className="verified-social-link email">
                  <span>✉️ Institutional:</span> {student.email}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Platform Metrics */}
          <div className="passport-metrics-strip" aria-label="Cumulative Verification Summary">
            <div className="metric-cell">
              <span className="metric-icon">✓</span>
              <div>
                <span className="metric-number">{summaryStats.verifiedCompetenciesCount}</span>
                <span className="metric-caption">Verified Competencies</span>
              </div>
            </div>

            <div className="metric-cell">
              <span className="metric-icon">📁</span>
              <div>
                <span className="metric-number">{summaryStats.verifiedProjectsCount}</span>
                <span className="metric-caption">Verified Projects</span>
              </div>
            </div>

            <div className="metric-cell">
              <span className="metric-icon">👨‍🏫</span>
              <div>
                <span className="metric-number">{summaryStats.approvedEvidenceCount}</span>
                <span className="metric-caption">Faculty Endorsements</span>
              </div>
            </div>

            <div className="metric-cell">
              <span className="metric-icon">⚡</span>
              <div>
                <span className="metric-number">{summaryStats.problemsSolvedCount}</span>
                <span className="metric-caption">Problems Solved</span>
              </div>
            </div>

            <div className="metric-cell">
              <span className="metric-icon">⭐</span>
              <div>
                <span className="metric-number">{summaryStats.totalSkillXp} XP</span>
                <span className="metric-caption">Platform XP</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            2. TECHNICAL COMPETENCY MATRIX
        ===================================================== */}
        <section className="passport-section" aria-label="Technical Competency Matrix">
          <div className="section-title-bar">
            <div>
              <span className="section-eyebrow">ASSESSED & DEMONSTRATED</span>
              <h2>Technical Competency Matrix</h2>
              <p className="section-description">
                Competencies verified through automated scenario testcases, algorithmic benchmarks, and mentor milestone reviews.
              </p>
            </div>

            <div className="competency-filter-chips no-print">
              {uniqueDomains.map((dom) => (
                <button
                  key={dom}
                  type="button"
                  className={`filter-chip ${selectedCompetencyDomain === dom ? "active" : ""}`}
                  onClick={() => setSelectedCompetencyDomain(dom)}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          <div className="competencies-grid">
            {filteredCompetencies.map((comp) => {
              const isVerified = comp.verificationStatus === "VERIFIED";

              return (
                <article
                  key={comp.id}
                  className={`competency-card ${isVerified ? "is-verified" : "is-in-progress"}`}
                >
                  <div className="comp-card-top">
                    <div>
                      <span className="comp-domain">{comp.domain}</span>
                      <h3 className="comp-name">{comp.name}</h3>
                    </div>
                    <span
                      className={`verification-status-pill ${
                        isVerified ? "verified" : "in-progress"
                      }`}
                    >
                      {isVerified ? "✓ Verified Competency" : "⚡ In-Progress Milestone"}
                    </span>
                  </div>

                  <div className="comp-score-bar">
                    <div className="score-label-row">
                      <span>Proficiency: <strong>{comp.proficiency}</strong></span>
                      <strong>{comp.score}%</strong>
                    </div>
                    <div className="score-track">
                      <div
                        className="score-fill"
                        style={{ width: `${comp.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="comp-evidence-box">
                    <div className="evidence-item">
                      <span className="evidence-label">Assessment Method:</span>
                      <span className="evidence-value">{comp.verificationMethod}</span>
                    </div>

                    <div className="evidence-item">
                      <span className="evidence-label">Proof Source:</span>
                      <span className="evidence-value">{comp.proofSource}</span>
                    </div>

                    <div className="evidence-item footer-meta">
                      <span>Evaluator: <strong>{comp.verifiedBy}</strong></span>
                      <span>{comp.dateVerified}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            3. VERIFIED PROJECT MILESTONES
        ===================================================== */}
        <section className="passport-section" aria-label="Project Milestones">
          <div className="section-title-bar">
            <div>
              <span className="section-eyebrow">HANDS-ON ENGINEERING</span>
              <h2>Project Milestones & Deliverables</h2>
              <p className="section-description">
                Substantive engineering projects completed and validated against departmental criteria.
              </p>
            </div>
          </div>

          <div className="passport-projects-grid">
            {projects.all.map((proj) => {
              const isVerified = proj.isVerified;
              const hasDeliverables = proj.approvedDeliverables.length > 0;

              return (
                <div
                  key={proj.id}
                  className={`passport-project-card ${isVerified ? "verified" : "active"}`}
                >
                  <div className="project-card-header">
                    <div>
                      <span className="project-category-tag">{proj.category}</span>
                      <h3 className="project-title">{proj.title}</h3>
                    </div>
                    <span
                      className={`project-status-pill ${
                        proj.isCompleted
                          ? "completed"
                          : isVerified
                          ? "milestone-verified"
                          : "in-progress"
                      }`}
                    >
                      {proj.isCompleted
                        ? "✓ Completed Project"
                        : isVerified
                        ? "✓ Level 1 Verified"
                        : "⚡ In Progress"}
                    </span>
                  </div>

                  <div className="project-meta-strip">
                    <span>Difficulty: <strong>{proj.difficulty}</strong></span>
                    <span>·</span>
                    <span>Reward: <strong>⭐ {proj.xpReward} XP</strong></span>
                    <span>·</span>
                    <span>
                      Progress: <strong>{proj.stats.completedSubtasks} / {proj.stats.totalSubtasks} tasks ({proj.stats.percent}%)</strong>
                    </span>
                  </div>

                  <div className="project-tags-list">
                    {proj.tags.map((t) => (
                      <span key={t} className="project-tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Approved Deliverables Attached */}
                  {hasDeliverables && (
                    <div className="approved-deliverables-block">
                      <span className="deliverables-heading">
                        Verified Deliverable Artifacts:
                      </span>
                      <div className="deliverables-chips">
                        {proj.approvedDeliverables.flatMap((d) =>
                          (d.files || []).map((file, i) => (
                            <span key={i} className="deliverable-file-chip">
                              📄 {file.name} ({formatBytes(file.size)})
                            </span>
                          ))
                        )}
                        {proj.approvedDeliverables.map((d) =>
                          d.deliverableLink ? (
                            <a
                              key={d.id}
                              href={d.deliverableLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="deliverable-link-chip"
                            >
                              🐙 GitHub Source ↗
                            </a>
                          ) : null
                        )}
                      </div>
                    </div>
                  )}

                  {!isPublicMode && (
                    <div className="project-nav-action no-print">
                      <button
                        type="button"
                        onClick={() => navigate(`/project-workspace/${proj.id}`)}
                        className="btn-workspace-link"
                      >
                        Open Workspace →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            4. CODING PRACTICE & ASSESSMENT ACHIEVEMENTS
        ===================================================== */}
        <section className="passport-section" aria-label="Coding Practice Ledger">
          <div className="section-title-bar">
            <div>
              <span className="section-eyebrow">ALGORITHMIC LAB</span>
              <h2>Coding Practice & Problem Solving</h2>
              <p className="section-description">
                Problem-solving verified through automated test suites in the Zentrion Coding Lab.
              </p>
            </div>
          </div>

          <div className="coding-overview-card">
            <div className="coding-stat-strip">
              <div className="coding-stat-item">
                <span className="stat-value">{codingPractice.totalSolved}</span>
                <span className="stat-label">Accepted Problems</span>
              </div>
              <div className="coding-stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">Test Case Pass Rate</span>
              </div>
              <div className="coding-stat-item">
                <span className="stat-value">5 Days</span>
                <span className="stat-label">Active Coding Streak</span>
              </div>
            </div>

            <div className="languages-breakdown-row">
              <span className="breakdown-label">Programming Languages Used:</span>
              <div className="language-pills">
                <span className="lang-pill java">Java (DSA & Algorithms)</span>
                <span className="lang-pill python">Python 3 (System Logic)</span>
                <span className="lang-pill js">JavaScript (Frontend & State)</span>
              </div>
            </div>

            <div className="recent-submissions-table-wrap">
              <table className="recent-submissions-table">
                <thead>
                  <tr>
                    <th>Submission ID</th>
                    <th>Problem Name</th>
                    <th>Domain</th>
                    <th>Language</th>
                    <th>Execution Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {codingPractice.recentAccepted.map((sub) => (
                    <tr key={sub.id}>
                      <td><code>{sub.id}</code></td>
                      <td><strong>{sub.problemTitle}</strong></td>
                      <td>{sub.domain}</td>
                      <td>{sub.language}</td>
                      <td>{sub.executionTime}</td>
                      <td>
                        <span className="status-badge-accepted">✓ Accepted</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            5. FACULTY FEEDBACK & APPROVED EVIDENCE
        ===================================================== */}
        <section className="passport-section" aria-label="Faculty Endorsements">
          <div className="section-title-bar">
            <div>
              <span className="section-eyebrow">MENTOR OVERSIGHT</span>
              <h2>Faculty Reviews & Evidence Ledger</h2>
              <p className="section-description">
                Direct faculty feedback, milestone rubrics, and formal evaluation sign-offs.
              </p>
            </div>
          </div>

          <div className="faculty-reviews-grid">
            {facultyReviews.approved.map((sub) => (
              <div key={sub.id} className="faculty-review-card approved">
                <div className="review-card-top">
                  <div>
                    <span className="review-project">{sub.projectTitle} · {sub.levelName}</span>
                    <h3 className="review-title">{sub.title}</h3>
                  </div>
                  <span className="review-status-badge approved">✓ Approved by Faculty</span>
                </div>

                <p className="review-desc">{sub.description}</p>

                {sub.feedback && (
                  <div className="mentor-quote-box">
                    <div className="mentor-header">
                      <div className="mentor-avatar">{sub.reviewer?.avatar || "AS"}</div>
                      <div>
                        <strong>{sub.reviewer?.name}</strong>
                        <span>{sub.reviewer?.role}</span>
                      </div>
                    </div>
                    <blockquote className="mentor-comments">
                      &ldquo;{sub.feedback.comments}&rdquo;
                    </blockquote>

                    {sub.feedback.criteriaScores && (
                      <div className="criteria-scores-list">
                        {sub.feedback.criteriaScores.map((c, i) => (
                          <div key={i} className="criteria-row">
                            <span>{c.criterion}</span>
                            <strong>{c.score}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="review-card-footer">
                  <span>Reviewed: {new Date(sub.reviewedAt).toLocaleDateString()}</span>
                  <span>Submission Ref: <code>{sub.id}</code></span>
                </div>
              </div>
            ))}

            {facultyReviews.revisionsRequested.map((sub) => (
              <div key={sub.id} className="faculty-review-card revision">
                <div className="review-card-top">
                  <div>
                    <span className="review-project">{sub.projectTitle} · {sub.levelName}</span>
                    <h3 className="review-title">{sub.title}</h3>
                  </div>
                  <span className="review-status-badge revision">⚡ Revision In Progress</span>
                </div>

                <p className="review-desc">{sub.description}</p>

                {sub.feedback && (
                  <div className="mentor-quote-box">
                    <div className="mentor-header">
                      <div className="mentor-avatar">{sub.reviewer?.avatar || "NR"}</div>
                      <div>
                        <strong>{sub.reviewer?.name}</strong>
                        <span>{sub.reviewer?.role}</span>
                      </div>
                    </div>
                    <blockquote className="mentor-comments">
                      &ldquo;{sub.feedback.comments}&rdquo;
                    </blockquote>
                  </div>
                )}

                <div className="review-card-footer">
                  <span>Reviewed: {new Date(sub.reviewedAt).toLocaleDateString()}</span>
                  <span>Status: <strong>Active Revision</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            6. GITHUB REPOSITORY INTEGRATION
        ===================================================== */}
        <section className="passport-section" aria-label="GitHub Source Integration">
          <div className="section-title-bar">
            <div>
              <span className="section-eyebrow">CODE ARTIFACTS</span>
              <h2>Connected GitHub Repositories</h2>
              <p className="section-description">
                Public repositories linked to Zentrion projects for code reviews and version tracking.
              </p>
            </div>
          </div>

          <div className="github-passport-box">
            <div className="github-account-info">
              <span className="gh-icon">🐙</span>
              <div>
                <strong>@{student.github?.split("/").pop() || "its-harini24"}</strong>
                <span>Connected Public Developer Profile · {github.connection?.publicRepos || 12} Public Repositories</span>
              </div>
              <a
                href={student.github || "https://github.com/its-harini24"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github-external"
              >
                View GitHub Profile ↗
              </a>
            </div>

            <div className="linked-repos-table-wrap">
              <table className="linked-repos-table">
                <thead>
                  <tr>
                    <th>Linked Zentrion Project</th>
                    <th>GitHub Repository</th>
                    <th>Technology</th>
                    <th>Repository Link</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(github.linkedProjects).map(([projectId, link]) => {
                    const project = projects.all.find((p) => p.id === projectId);
                    return (
                      <tr key={projectId}>
                        <td>
                          <strong>{project?.title || projectId}</strong>
                          <span className="table-sub">{project?.category}</span>
                        </td>
                        <td>
                          <code>{link.repoFullName || link.repoName}</code>
                        </td>
                        <td>
                          <span className="tech-badge">{link.language || "React"}</span>
                        </td>
                        <td>
                          <a
                            href={link.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="table-link-btn"
                          >
                            Open Repo ↗
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            7. PLATFORM CERTIFICATES & CREDENTIALS
        ===================================================== */}
        <section className="passport-section" aria-label="Official Certificates">
          <div className="section-title-bar">
            <div>
              <span className="section-eyebrow">HONORS & CREDENTIALS</span>
              <h2>Certificates & Achievements</h2>
              <p className="section-description">
                Formal milestone credentials earned upon meeting department assessment thresholds.
              </p>
            </div>
          </div>

          <div className="certificates-passport-grid">
            {certificates.map((cert) => (
              <div key={cert.id} className="passport-cert-card">
                <div className="cert-card-top">
                  <span className="cert-icon">🏅</span>
                  <div>
                    <span className="cert-status-badge">✓ {cert.status}</span>
                    <span className="cert-id-badge">ID: {cert.credentialId}</span>
                  </div>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-desc">{cert.description}</p>

                <div className="cert-skills">
                  {cert.skills.map((s, idx) => (
                    <span key={idx} className="cert-skill-tag">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="cert-footer-info">
                  <span>Issuer: <strong>{cert.issuer}</strong></span>
                  <span>Issued: {cert.issueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            8. ACADEMIC SEAL & VERIFICATION FOOTER
        ===================================================== */}
        <footer className="passport-verification-seal-footer">
          <div className="seal-content">
            <div className="seal-left">
              <span className="seal-crest">🛡️</span>
              <div>
                <strong>Zentrion Skill OS Platform Record</strong>
                <p>
                  This Skill Passport documents verified learning milestones, automated problem submissions, and faculty reviews conducted within the Zentrion engineering platform.
                </p>
              </div>
            </div>

            <div className="seal-right">
              <div className="verification-code-box">
                <span className="v-label">Verification Identifier</span>
                <code>{passportMetadata.passportId}</code>
                <span className="v-sub">Tamper-Evident Platform Record</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

