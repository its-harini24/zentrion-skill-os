import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import zentrionLogo from "../../assets/zentrion-logo.png";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import { projectsData } from "../../data/projectsData";
import { computeProjectStats } from "../../services/projectProgressService.js";
import {
  getAllEvidenceSubmissions,
  formatBytes,
} from "../../services/evidenceService.js";
import "./StudentPortfolioPage.css";

const PROFILE_STORAGE_KEY = "zentrion-student-profile";

const DEFAULT_PROFILE = {
  fullName: "Harini N.",
  email: "harini.s@student.zentrion.edu",
  department: "Computer Science & Business Systems (CSBS)",
  year: "2nd Year",
  semester: "3rd Semester",
  headline: "Aspiring Full-Stack & Systems Engineer building verified competencies on Zentrion Skill OS.",
  bio: "Engineering student passionate about building scalable web applications, modular component architecture, and algorithmic solutions. Actively completing hands-on project milestones and verifying deliverables with faculty mentors.",
  careerInterests: [
    "Full-Stack Development",
    "Distributed Systems",
    "Cloud Architecture",
    "System Design",
  ],
  location: "Chennai, India",
  github: "https://github.com/its-harini24",
  linkedin: "https://linkedin.com/in/its-harini24",
  portfolioSlug: "harini-csbs",
};

export default function StudentPortfolioPage() {
  const navigate = useNavigate();

  // Profile State (synchronized with localStorage)
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      }
    } catch (err) {
      console.warn("Failed to read profile:", err);
    }
    return DEFAULT_PROFILE;
  });

  // Preview Mode State (Student view vs Recruiter/Public view)
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Modals State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedCertModal, setSelectedCertModal] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Edit Profile Form Buffer State
  const [editForm, setEditForm] = useState(profile);

  // Filter for projects in portfolio: "All", "Verified Only", "Completed"
  const [projectFilter, setProjectFilter] = useState("All");

  // Load Submissions from Evidence Service
  const submissions = useMemo(() => getAllEvidenceSubmissions(), []);

  // Compute Project Showcase Data
  const projectsShowcase = useMemo(() => {
    return projectsData.map((project) => {
      const stats = computeProjectStats(project);
      const isCompleted = stats.status === "Completed";

      // Find any approved evidence submissions for this project
      const projectSubs = submissions.filter((s) => s.projectId === project.id);
      const approvedSubs = projectSubs.filter((s) => s.status === "Approved");
      const hasVerifiedEvidence = approvedSubs.length > 0;

      // Extract all verified deliverable files & links
      const verifiedFiles = approvedSubs.flatMap((s) => s.files || []);
      const externalLinks = approvedSubs
        .map((s) => s.deliverableLink)
        .filter(Boolean);

      return {
        ...project,
        stats,
        isCompleted,
        hasVerifiedEvidence,
        approvedSubmissions: approvedSubs,
        verifiedFiles,
        externalLinks,
        primaryEvidenceLink: externalLinks[0] || null,
      };
    });
  }, [submissions]);

  // Verified & Showcase Projects
  const filteredProjects = useMemo(() => {
    if (projectFilter === "Completed") {
      return projectsShowcase.filter((p) => p.isCompleted);
    }
    if (projectFilter === "Verified Only") {
      return projectsShowcase.filter((p) => p.isCompleted || p.hasVerifiedEvidence);
    }
    return projectsShowcase;
  }, [projectsShowcase, projectFilter]);

  // Verified Skills Derived from Assessments & Completed Projects
  const verifiedSkills = useMemo(() => {
    return [
      {
        name: "Java",
        category: "Programming",
        level: "Proficient",
        score: 65,
        verification: "Verified via Coding Lab (Arrays & Binary Search)",
        badge: "✓ Assessment Verified",
      },
      {
        name: "Python",
        category: "Programming",
        level: "Advanced",
        score: 75,
        verification: "Verified via 42 Solved Engineering Problems",
        badge: "✓ Assessment Verified",
      },
      {
        name: "React & Component State",
        category: "Web Engineering",
        level: "Proficient",
        score: 68,
        verification: "Verified in Campus Skill Tracker & Problem Solver",
        badge: "✓ Project Evidence",
      },
      {
        name: "Data Structures & Algorithms",
        category: "Problem Solving",
        level: "Master",
        score: 85,
        verification: "Completed Algorithmic Problem Suite (All 4 Levels)",
        badge: "✓ Capstone Verified",
      },
      {
        name: "System Design & Modeling",
        category: "Architecture",
        level: "Intermediate",
        score: 60,
        verification: "Level 1 Verified by Dr. Arvind Swaminathan",
        badge: "✓ Mentor Verified",
      },
    ];
  }, []);

  // Verified Certificates & Achievements
  const certificates = useMemo(() => {
    return [
      {
        id: "cert-dsa-master",
        title: "Algorithmic Problem Suite – Certified Master",
        issuer: "Zentrion Skill OS · Department Evaluation Board",
        issueDate: "November 5, 2026",
        credentialId: "ZOS-DSA-88214",
        skills: ["Algorithms", "Binary Trees", "Dynamic Programming", "Complexity Analysis"],
        status: "Verified",
        description:
          "Successfully implemented, optimized, and passed automated scenario benchmarks across all 4 gamified levels and 11 subtasks.",
      },
      {
        id: "cert-campus-analysis",
        title: "Problem Statement Analysis & Systems Engineering",
        issuer: "Faculty Evaluation Queue · Dr. Arvind Swaminathan",
        issueDate: "November 6, 2026",
        credentialId: "ZOS-SYS-41902",
        skills: ["System Design", "Stakeholder Personas", "SMART Metrics"],
        status: "Verified",
        description:
          "Completed in-depth campus workstation bottleneck research and user persona breakdown for Campus Problem Solver.",
      },
      {
        id: "cert-streak-master",
        title: "Continuous Learning Consistency Award",
        issuer: "Zentrion Engineering Portal",
        issueDate: "November 7, 2026",
        credentialId: "ZOS-STRK-05",
        skills: ["Consistency", "Code Practice", "Platform Engagement"],
        status: "Active",
        description:
          "Maintained active learning and problem-solving streak on Zentrion Skill OS platform.",
      },
    ];
  }, []);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profile Save Handler
  const handleProfileSave = (e) => {
    e.preventDefault();
    const updated = {
      ...editForm,
      careerInterests: Array.isArray(editForm.careerInterests)
        ? editForm.careerInterests
        : (editForm.careerInterests || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
    };

    setProfile(updated);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Failed to persist profile:", err);
    }

    setIsEditModalOpen(false);
    showToast("Profile details updated successfully!");
  };

  // Share Copy Link Handler
  const shareableUrl = `${window.location.origin}/portfolio?student=${profile.portfolioSlug || "harini-csbs"}`;

  const handleCopyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareableUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } else {
      showToast("Shareable link: " + shareableUrl);
    }
  };

  return (
    <div className={`portfolio-page ${isPreviewMode ? "preview-active" : ""}`}>
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}
      <header className="portfolio-navbar">
        <div className="nav-left">
          <button
            className="logo-btn"
            onClick={() => navigate("/student-dashboard")}
            aria-label="Back to Zentrion Dashboard"
          >
            <img src={zentrionLogo} alt="Zentrion" className="logo-img" />
          </button>
          <span className="nav-divider" aria-hidden="true" />
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button onClick={() => navigate("/student-dashboard")}>Dashboard</button>
            <span aria-hidden="true">/</span>
            <span className="current">Student Portfolio</span>
          </nav>
        </div>

        <div className="nav-right">
          <ThemeToggle />

          {/* Preview Mode Toggle */}
          <button
            type="button"
            className={`preview-toggle-btn ${isPreviewMode ? "is-preview" : ""}`}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            title="Toggle between student editing mode and public recruiter view"
          >
            {isPreviewMode ? "✏️ Edit Mode" : "👁️ Recruiter Preview"}
          </button>

          {/* Skill Passport Navigation Link */}
          <button
            type="button"
            className="passport-link-btn"
            onClick={() => navigate("/skill-passport")}
            title="Open official verified Skill Passport"
          >
            🛂 Skill Passport
          </button>

          {/* Share Action */}
          <button
            type="button"
            className="share-portfolio-btn"
            onClick={() => setIsShareModalOpen(true)}
          >
            🔗 Share Portfolio
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/student-dashboard")}
          >
            ← Dashboard
          </button>
        </div>
      </header>

      {/* Preview Mode Alert Banner */}
      {isPreviewMode && (
        <aside className="preview-mode-banner" role="status">
          <span>
            👁️ <strong>Public Recruiter Preview:</strong> This is how your verified portfolio appears to employers, mentors, and faculty evaluators.
          </span>
          <button type="button" onClick={() => setIsPreviewMode(false)}>
            Exit Preview
          </button>
        </aside>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <aside className="portfolio-toast" role="status" aria-live="polite">
          <span>✨ {toastMessage}</span>
          <button onClick={() => setToastMessage(null)} aria-label="Dismiss">
            ×
          </button>
        </aside>
      )}

      {/* =====================================================
          MAIN PORTFOLIO CONTAINER
      ===================================================== */}
      <main className="portfolio-container">
        {/* =====================================================
            1. PROFILE INTRODUCTION SECTION
        ===================================================== */}
        <section className="profile-hero-card" aria-label="Student Profile Introduction">
          <div className="profile-hero-content">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-circle" aria-hidden="true">
                {profile.fullName.charAt(0)}
              </div>
              <span className="verified-seal-dot" title="Verified Zentrion Student" />
            </div>

            <div className="profile-info-block">
              <div className="name-row">
                <h1>{profile.fullName}</h1>
                <span className="verified-status-tag">
                  ✓ Verified Zentrion Skill OS Student
                </span>
              </div>

              <div className="academic-badges-row">
                <span className="academic-badge dept">{profile.department}</span>
                <span className="academic-badge year">
                  {profile.year} · {profile.semester}
                </span>
                <span className="academic-badge loc">📍 {profile.location}</span>
              </div>

              <p className="profile-headline">{profile.headline}</p>
              <p className="profile-bio-text">{profile.bio}</p>

              {/* Career Interests Tags */}
              <div className="career-interests-wrap">
                <span className="interests-label">Target Career Roles:</span>
                <div className="interests-tags-list">
                  {profile.careerInterests.map((interest, idx) => (
                    <span key={idx} className="interest-pill">
                      🎯 {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Links */}
              <div className="profile-social-links">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <span>🐙</span> GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <span>💼</span> LinkedIn
                  </a>
                )}
                <span className="social-link copy" onClick={handleCopyShareLink}>
                  <span>🔗</span> {copySuccess ? "Copied!" : "Public Link"}
                </span>
              </div>
            </div>
          </div>

          {/* Action on Hero */}
          <div className="profile-hero-actions">
            <button
              type="button"
              className="passport-hero-btn"
              onClick={() => navigate("/skill-passport")}
              title="View comprehensive official Skill Passport"
            >
              🛂 View Skill Passport →
            </button>
            {!isPreviewMode && (
              <button
                type="button"
                className="edit-profile-btn"
                onClick={() => {
                  setEditForm(profile);
                  setIsEditModalOpen(true);
                }}
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </section>

        {/* Quick Platform Verification Metrics */}
        <div className="verified-stats-strip" aria-label="Verified Platform Metrics">
          <div className="metric-box">
            <span className="metric-icon">✓</span>
            <div>
              <span className="metric-val">42 Problems</span>
              <span className="metric-sub">Solved & Verified</span>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-icon">📁</span>
            <div>
              <span className="metric-val">3 Project Milestones</span>
              <span className="metric-sub">Faculty Verified</span>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-icon">🔥</span>
            <div>
              <span className="metric-val">5 Days</span>
              <span className="metric-sub">Active Learning Streak</span>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-icon">⚡</span>
            <div>
              <span className="metric-val">1,120 XP</span>
              <span className="metric-sub">Verified Skill Points</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            2. SKILLS DEMONSTRATED SECTION
        ===================================================== */}
        <section className="portfolio-section" aria-label="Demonstrated Competencies">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">ASSESSED & DEMONSTRATED</span>
              <h2>Verified Skill Matrix</h2>
            </div>
            <span className="section-note">
              Demonstrated through automated coding tests and mentor milestone reviews
            </span>
          </div>

          <div className="skills-grid">
            {verifiedSkills.map((skill, idx) => (
              <div key={idx} className="skill-card">
                <div className="skill-card-top">
                  <div>
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className="skill-cat">{skill.category}</span>
                  </div>
                  <span className="skill-badge-tag">{skill.badge}</span>
                </div>

                <div className="skill-bar-wrap">
                  <div className="skill-bar-info">
                    <span>Proficiency</span>
                    <strong>{skill.level} ({skill.score}%)</strong>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>

                <p className="skill-proof-source">
                  <span>Proof Source:</span> {skill.verification}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            3. COMPLETED & VERIFIED PROJECTS
        ===================================================== */}
        <section className="portfolio-section" aria-label="Student Engineering Projects">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">PLATFORM ARTIFACTS</span>
              <h2>Engineering Projects & Evidence</h2>
            </div>

            <div className="filter-button-group">
              {["All", "Verified Only", "Completed"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-btn ${projectFilter === filter ? "active" : ""}`}
                  onClick={() => setProjectFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="portfolio-projects-grid">
            {filteredProjects.map((proj) => {
              const isDone = proj.isCompleted;
              const hasVerified = proj.hasVerifiedEvidence;

              return (
                <article key={proj.id} className="portfolio-project-card">
                  {/* Card Visual Header / Preview Mock */}
                  <div className="project-preview-mockup">
                    <div className="mockup-header">
                      <span className="dot red" />
                      <span className="dot yellow" />
                      <span className="dot green" />
                      <span className="mockup-url">zentrion.skill-os/projects/{proj.id}</span>
                    </div>
                    <div className="mockup-body">
                      <span className="mockup-category">{proj.category}</span>
                      <strong className="mockup-title">{proj.title}</strong>
                      <span className="mockup-reward">⭐ {proj.xpReward} XP Milestone</span>
                    </div>

                    {/* Status Badge */}
                    <div className="mockup-status-badge">
                      {isDone ? (
                        <span className="badge-tag completed">✓ Completed Project</span>
                      ) : hasVerified ? (
                        <span className="badge-tag verified">✓ Milestone Verified</span>
                      ) : (
                        <span className="badge-tag in-progress">⚡ In Progress</span>
                      )}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="project-card-body">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.description}</p>

                    {/* Technology tags */}
                    <div className="project-tech-tags">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="tech-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Gamified Level Progress */}
                    <div className="project-progress-block">
                      <div className="progress-text-row">
                        <span>Milestone Progress</span>
                        <strong>
                          Level {proj.stats.currentLevelNumber} of {proj.stats.totalLevels} ({proj.stats.percent}%)
                        </strong>
                      </div>
                      <div className="progress-rail">
                        <div
                          className="progress-fill"
                          style={{ width: `${proj.stats.percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Verified Evidence Deliverables (Requirement) */}
                    {hasVerified && (
                      <div className="verified-evidence-box">
                        <span className="evidence-box-title">
                          Faculty Verified Artifacts:
                        </span>
                        <div className="evidence-files-list">
                          {proj.verifiedFiles.map((f, i) => (
                            <span key={i} className="evidence-chip">
                              📄 {f.name} ({formatBytes(f.size)})
                            </span>
                          ))}
                          {proj.primaryEvidenceLink && (
                            <a
                              href={proj.primaryEvidenceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="evidence-chip link"
                            >
                              🐙 GitHub Repository ↗
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="project-card-actions">
                      <button
                        type="button"
                        className="project-action-btn primary"
                        onClick={() => navigate(`/project-workspace/${proj.id}`)}
                      >
                        View Project Workspace →
                      </button>

                      <button
                        type="button"
                        className="project-action-btn secondary"
                        onClick={() =>
                          navigate(`/evidence-review?projectId=${proj.id}`)
                        }
                      >
                        Evidence & Reviews
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            4. ACHIEVEMENTS & CERTIFICATES SECTION
        ===================================================== */}
        <section className="portfolio-section" aria-label="Student Achievements and Certificates">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">HONORS & CREDENTIALS</span>
              <h2>Achievements & Certificates</h2>
            </div>
            <span className="section-note">
              Official verification credentials signed by department mentors
            </span>
          </div>

          <div className="certificates-grid">
            {certificates.map((cert) => (
              <article key={cert.id} className="certificate-card">
                <div className="cert-top">
                  <div className="cert-seal-icon" aria-hidden="true">
                    🏅
                  </div>
                  <div className="cert-meta">
                    <span className="cert-status-badge">✓ {cert.status}</span>
                    <span className="cert-id">{cert.credentialId}</span>
                  </div>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-desc">{cert.description}</p>

                <div className="cert-skills-list">
                  {cert.skills.map((s, idx) => (
                    <span key={idx} className="cert-skill-pill">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="cert-footer">
                  <div className="cert-issuer-info">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-date">Issued {cert.issueDate}</span>
                  </div>

                  <button
                    type="button"
                    className="view-cert-btn"
                    onClick={() => setSelectedCertModal(cert)}
                  >
                    Inspect Credential ↗
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* =====================================================
          MODAL: EDIT PROFILE
      ===================================================== */}
      {isEditModalOpen && (
        <div
          className="portfolio-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-heading"
        >
          <div className="portfolio-modal-card">
            <header className="modal-header">
              <div>
                <span className="modal-sub">ZENTRION SKILL OS</span>
                <h2 id="edit-profile-heading">Edit Student Profile</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <form onSubmit={handleProfileSave} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="edit-name">Full Name *</label>
                  <input
                    id="edit-name"
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-dept">Department *</label>
                  <input
                    id="edit-dept"
                    type="text"
                    required
                    value={editForm.department}
                    onChange={(e) =>
                      setEditForm({ ...editForm, department: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-year">Year & Semester</label>
                  <input
                    id="edit-year"
                    type="text"
                    value={`${editForm.year || ""} · ${editForm.semester || ""}`}
                    onChange={(e) => {
                      const parts = e.target.value.split("·");
                      setEditForm({
                        ...editForm,
                        year: parts[0]?.trim() || editForm.year,
                        semester: parts[1]?.trim() || editForm.semester,
                      });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-loc">Location</label>
                  <input
                    id="edit-loc"
                    type="text"
                    value={editForm.location || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-headline">Headline</label>
                <input
                  id="edit-headline"
                  type="text"
                  value={editForm.headline || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, headline: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-bio">Bio & Background</label>
                <textarea
                  id="edit-bio"
                  rows={3}
                  value={editForm.bio || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-interests">
                  Target Career Roles (comma-separated)
                </label>
                <input
                  id="edit-interests"
                  type="text"
                  value={
                    Array.isArray(editForm.careerInterests)
                      ? editForm.careerInterests.join(", ")
                      : editForm.careerInterests || ""
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      careerInterests: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="edit-github">GitHub Profile URL</label>
                  <input
                    id="edit-github"
                    type="url"
                    value={editForm.github || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, github: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-linkedin">LinkedIn Profile URL</label>
                  <input
                    id="edit-linkedin"
                    type="url"
                    value={editForm.linkedin || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, linkedin: e.target.value })
                    }
                  />
                </div>
              </div>

              <footer className="modal-footer">
                <button
                  type="button"
                  className="modal-btn secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-btn primary">
                  Save Changes
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL: SHARE PORTFOLIO
      ===================================================== */}
      {isShareModalOpen && (
        <div
          className="portfolio-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-heading"
        >
          <div className="portfolio-modal-card compact">
            <header className="modal-header">
              <div>
                <span className="modal-sub">SHAREABLE CREDENTIALS</span>
                <h2 id="share-heading">Share Student Portfolio</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsShareModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="modal-body-pad">
              <p className="share-desc">
                Share your verified engineering portfolio with recruiters, hiring managers, and academic evaluators.
              </p>

              <div className="share-link-box">
                <input
                  type="text"
                  readOnly
                  value={shareableUrl}
                  className="share-link-input"
                />
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyShareLink}
                >
                  {copySuccess ? "Copied! ✓" : "Copy Link"}
                </button>
              </div>

              <div className="share-actions-row">
                <button
                  type="button"
                  className="share-action-item"
                  onClick={() => window.print()}
                >
                  <span>🖨️</span> Print / Save PDF
                </button>
                <button
                  type="button"
                  className="share-action-item"
                  onClick={() => {
                    setIsShareModalOpen(false);
                    setIsPreviewMode(true);
                  }}
                >
                  <span>👁️</span> Recruiter Preview
                </button>
              </div>

              <div className="share-note-box">
                <span>🔒 Verification Note:</span>
                <p>
                  Recipients will see all verified project artifacts, test results, and mentor endorsements in read-only mode.
                </p>
              </div>
            </div>

            <footer className="modal-footer">
              <button
                type="button"
                className="modal-btn secondary"
                onClick={() => setIsShareModalOpen(false)}
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL: CERTIFICATE CREDENTIAL INSPECTOR
      ===================================================== */}
      {selectedCertModal && (
        <div
          className="portfolio-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-heading"
        >
          <div className="portfolio-modal-card cert-modal">
            <header className="modal-header">
              <div>
                <span className="modal-sub">OFFICIAL CREDENTIAL</span>
                <h2 id="cert-modal-heading">{selectedCertModal.title}</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedCertModal(null)}
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="cert-certificate-paper">
              <div className="cert-paper-border">
                <div className="cert-paper-header">
                  <img src={zentrionLogo} alt="Zentrion" className="cert-logo" />
                  <span className="cert-paper-badge">VERIFIED CERTIFICATE</span>
                </div>

                <span className="cert-awarded-text">THIS IS PROUDLY CONFERRED TO</span>
                <h3 className="cert-recipient-name">{profile.fullName}</h3>
                <p className="cert-conferred-body">
                  for demonstrating certified technical excellence and fulfilling all milestone criteria in{" "}
                  <strong>{selectedCertModal.title}</strong> on Zentrion Skill OS.
                </p>

                <div className="cert-signatures-row">
                  <div className="signature-block">
                    <span className="sig-line">Dr. Arvind Swaminathan</span>
                    <span className="sig-role">Faculty Mentor & Assessment Chair</span>
                  </div>
                  <div className="signature-seal">
                    <span>✓ ZENTRION VERIFIED</span>
                  </div>
                  <div className="signature-block">
                    <span className="sig-line">{selectedCertModal.issueDate}</span>
                    <span className="sig-role">Verification Date</span>
                  </div>
                </div>

                <div className="cert-credential-id-bar">
                  <span>Credential ID: <code>{selectedCertModal.credentialId}</code></span>
                  <span>Tamper-evident platform record</span>
                </div>
              </div>
            </div>

            <footer className="modal-footer">
              <button
                type="button"
                className="modal-btn primary"
                onClick={() => window.print()}
              >
                🖨️ Print Credential
              </button>
              <button
                type="button"
                className="modal-btn secondary"
                onClick={() => setSelectedCertModal(null)}
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

