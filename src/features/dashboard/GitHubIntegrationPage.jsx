import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zentrionLogo from "../../assets/zentrion-logo.png";
import githubOctocat from "../../assets/github-octocat.svg";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import { projectsData } from "../../data/projectsData";
import {
  getGitHubConnection,
  connectGitHub,
  disconnectGitHub,
  getRepositories,
  getProjectLinks,
  linkProjectToRepo,
  unlinkProject,
  getLinkedProjectForRepo,
  getLanguageColor,
} from "../../services/githubService";
import "./GitHubIntegrationPage.css";

export default function GitHubIntegrationPage() {
  const navigate = useNavigate();

  // Connection State
  const [connection, setConnection] = useState(() => getGitHubConnection());
  const [usernameInput, setUsernameInput] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  // Repositories State
  const [repositories, setRepositories] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // Project Links State
  const [projectLinks, setProjectLinks] = useState(() => getProjectLinks());
  const [linkingModalRepo, setLinkingModalRepo] = useState(null); // Repo object being linked
  const [selectedProjectId, setSelectedProjectId] = useState("");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load repositories whenever connection changes
  useEffect(() => {
    let isMounted = true;
    if (!connection?.username) return;

    Promise.resolve().then(() => {
      if (isMounted) setIsLoadingRepos(true);
    });

    getRepositories(connection.username)
      .then((repos) => {
        if (isMounted) {
          setRepositories(repos);
          setIsLoadingRepos(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoadingRepos(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [connection?.username]);

  // Handle Connect
  const handleConnect = async (e) => {
    if (e) e.preventDefault();
    setConnectionError(null);

    const targetUser = usernameInput.trim() || "its-harini24";

    setIsConnecting(true);
    try {
      const result = await connectGitHub(targetUser);
      setConnection(result.connection);
      setRepositories(result.repositories);
      setUsernameInput("");
      showToast(
        `Connected @${result.connection.username} (${result.connection.name}) successfully via GitHub Public API!`
      );
    } catch (err) {
      setConnectionError(err.message || "Failed to connect GitHub account.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Quick Connect Harini Profile
  const handleQuickHariniConnect = () => {
    setUsernameInput("its-harini24");
    setIsConnecting(true);
    connectGitHub("its-harini24")
      .then((res) => {
        setConnection(res.connection);
        setRepositories(res.repositories);
        setUsernameInput("");
        showToast("Connected @its-harini24 successfully!");
      })
      .catch((err) => {
        setConnectionError(err.message);
      })
      .finally(() => setIsConnecting(false));
  };

  // Handle Disconnect
  const handleDisconnect = () => {
    disconnectGitHub();
    setConnection(null);
    setRepositories([]);
    setConnectionError(null);
    showToast("GitHub account disconnected.");
  };

  // Handle Linking Modal Open
  const openLinkingModal = (repo) => {
    setLinkingModalRepo(repo);
    // If repo is already linked, preselect its project
    const existing = getLinkedProjectForRepo(repo.fullName, projectLinks);
    setSelectedProjectId(existing?.projectId || projectsData[0]?.id || "");
  };

  const closeLinkingModal = () => {
    setLinkingModalRepo(null);
    setSelectedProjectId("");
  };

  // Confirm Link Project
  const handleConfirmLink = () => {
    if (!linkingModalRepo || !selectedProjectId) return;
    const updated = linkProjectToRepo(selectedProjectId, linkingModalRepo);
    setProjectLinks({ ...updated });
    const targetProject = projectsData.find((p) => p.id === selectedProjectId);
    showToast(`Linked "${linkingModalRepo.name}" to ${targetProject?.title || "project"}!`);
    closeLinkingModal();
  };

  // Handle Unlink Project
  const handleUnlink = (projectId) => {
    const updated = unlinkProject(projectId);
    setProjectLinks({ ...updated });
    showToast("Project link removed.");
  };

  // Unique Languages for Filter Chips
  const availableLanguages = useMemo(() => {
    const set = new Set();
    repositories.forEach((r) => {
      if (r.language && r.language !== "Other") {
        set.add(r.language);
      }
    });
    return ["All", ...Array.from(set).sort()];
  }, [repositories]);

  // Filtered Repositories
  const filteredRepositories = useMemo(() => {
    return repositories.filter((repo) => {
      const matchesLanguage =
        selectedLanguage === "All" || repo.language === selectedLanguage;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        repo.name.toLowerCase().includes(q) ||
        (repo.description && repo.description.toLowerCase().includes(q)) ||
        (repo.language && repo.language.toLowerCase().includes(q));

      return matchesLanguage && matchesSearch;
    });
  }, [repositories, selectedLanguage, searchQuery]);

  // Statistics Summary
  const linkedCount = useMemo(() => {
    return Object.keys(projectLinks).length;
  }, [projectLinks]);

  const totalStarsCount = useMemo(() => {
    return repositories.reduce((sum, r) => sum + (r.stars || 0), 0);
  }, [repositories]);

  return (
    <div className="github-page">
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}
      <header className="github-navbar">
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
            <span className="current">GitHub Integration</span>
          </nav>
        </div>

        <div className="nav-right">
          <ThemeToggle />
          <button
            className="nav-secondary-btn"
            onClick={() => navigate("/student-dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="github-main">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="github-toast" role="status" aria-live="polite">
            <span>✨ {toastMessage}</span>
            <button onClick={() => setToastMessage(null)} aria-label="Dismiss">
              ×
            </button>
          </div>
        )}

        {/* =====================================================
            1. PAGE HEADER
        ===================================================== */}
        <section className="github-header-section">
          <div className="header-text-block">
            <span className="header-eyebrow">DEVELOPER TOOLCHAIN</span>
            <h1>GitHub Integration</h1>
            <p className="header-subtitle">
              Connect your GitHub profile, explore public repositories, and link project code directly to your Zentrion engineering milestones.
            </p>
          </div>

          {/* Quick Stats Strip */}
          <div className="github-stats-strip" aria-label="GitHub integration statistics">
            <div className="stat-card">
              <img src={githubOctocat} alt="GitHub" className="github-icon" />
              <div className="stat-text">
                <span className="stat-number">{connection ? "Active" : "None"}</span>
                <span className="stat-name">Connection</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon-badge">📁</span>
              <div className="stat-text">
                <span className="stat-number">{repositories.length}</span>
                <span className="stat-name">Repositories</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon-badge">🔗</span>
              <div className="stat-text">
                <span className="stat-number">{linkedCount}</span>
                <span className="stat-name">Linked Projects</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon-badge">⭐</span>
              <div className="stat-text">
                <span className="stat-number">{totalStarsCount}</span>
                <span className="stat-name">Total Stars</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            2. GITHUB CONNECTION PANEL
        ===================================================== */}
        <section className="connection-card" aria-label="GitHub Account Connection">
          {connection ? (
            /* Connected State */
            <div className="connected-profile-wrap">
              <div className="profile-identity">
                <img
                  src={connection.avatarUrl}
                  alt={`${connection.username} avatar`}
                  className="github-avatar"
                />
                <div className="profile-details">
                  <div className="name-row">
                    <h2>{connection.name}</h2>
                    <a
                      href={connection.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="username-pill"
                      title="View profile on GitHub"
                    >
                      @{connection.username} ↗
                    </a>
                    {connection.isDemo && (
                      <span className="demo-badge">Demo Account</span>
                    )}
                  </div>
                  <p className="profile-bio">{connection.bio}</p>
                  <div className="profile-meta-row">
                    <span>👥 <strong>{connection.followers}</strong> followers</span>
                    <span>·</span>
                    <span>📦 <strong>{connection.publicRepos}</strong> public repos</span>
                    {connection.location && (
                      <>
                        <span>·</span>
                        <span>📍 {connection.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="connection-actions">
                <a
                  href={connection.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-github-view"
                >
                  View on GitHub ↗
                </a>
                <button
                  type="button"
                  className="btn-disconnect"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            /* Disconnected State */
            <div className="connect-form-wrap">
              <div className="connect-info">
                <div className="connect-icon-circle">🐙</div>
                <div>
                  <h2>Connect Your GitHub Account</h2>
                  <p className="connect-desc">
                    Enter your public GitHub username to inspect repositories and link source code to your course deliverables.
                  </p>
                  <div className="privacy-notice">
                    <span>🔒 Public API Notice:</span>
                    <span>
                      Uses GitHub's public REST API for read-only repository information. No password, token, or private data access required.
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConnect} className="connect-input-form">
                {connectionError && (
                  <div className="connection-error-box" role="alert">
                    ⚠️ {connectionError}
                  </div>
                )}
                <div className="input-group">
                  <span className="input-prefix">github.com/</span>
                  <input
                    type="text"
                    placeholder="username (e.g. its-harini24)"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="username-input"
                    disabled={isConnecting}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="btn-connect-primary"
                    disabled={isConnecting}
                  >
                    {isConnecting ? "Connecting..." : "Connect GitHub"}
                  </button>
                </div>

                <div className="quick-demo-row">
                  <span className="quick-label">Or connect default profile:</span>
                  <button
                    type="button"
                    className="btn-demo-chip"
                    onClick={handleQuickHariniConnect}
                    disabled={isConnecting}
                  >
                    Connect @its-harini24 (Harini N)
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>

        {/* =====================================================
            3. LINKED ZENTRION PROJECTS SHOWCASE
        ===================================================== */}
        {connection && linkedCount > 0 && (
          <section className="linked-projects-section" aria-label="Active Project Links">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">LINKED ARTIFACTS</span>
                <h2>Active Project Repositories</h2>
              </div>
              <span className="section-hint">
                These repositories provide source deliverables for your course milestone evaluations
              </span>
            </div>

            <div className="linked-projects-grid">
              {Object.entries(projectLinks).map(([projectId, link]) => {
                const project = projectsData.find((p) => p.id === projectId);
                return (
                  <div key={projectId} className="linked-project-card">
                    <div className="linked-card-top">
                      <span className="project-category-badge">
                        {project?.category || "Engineering Project"}
                      </span>
                      <button
                        type="button"
                        className="unlink-btn"
                        onClick={() => handleUnlink(projectId)}
                        title="Unlink this repository from project"
                      >
                        Unlink ×
                      </button>
                    </div>

                    <h3 className="linked-project-title">
                      {project?.title || projectId}
                    </h3>

                    <div className="linked-repo-box">
                      <div className="repo-box-left">
                        <span className="repo-icon">📦</span>
                        <div>
                          <strong className="linked-repo-name">{link.repoName}</strong>
                          <span className="linked-date">
                            Linked {new Date(link.linkedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <a
                        href={link.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo-ext-btn"
                        title="Open on GitHub"
                      >
                        View Repo ↗
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================
            4. REPOSITORY EXPLORER
        ===================================================== */}
        <section className="repositories-section" aria-label="GitHub Repositories">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">SOURCE REPOSITORIES</span>
              <h2>Public Repositories {connection ? `(${filteredRepositories.length})` : ""}</h2>
            </div>
          </div>

          {!connection ? (
            <div className="empty-repos-prompt">
              <span className="empty-icon">🐙</span>
              <h3>No GitHub Account Connected</h3>
              <p>Connect your username above to view your public repositories and link them to projects.</p>
              <button
                type="button"
                className="btn-connect-primary"
                onClick={handleQuickHariniConnect}
              >
                Connect Profile (@its-harini24)
              </button>
            </div>
          ) : (
            <>
              {/* Toolbar: Language Chips & Search */}
              <div className="repos-toolbar">
                <div className="language-chips" role="tablist">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      className={`lang-chip ${selectedLanguage === lang ? "active" : ""}`}
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang !== "All" && (
                        <span
                          className="lang-dot"
                          style={{ backgroundColor: getLanguageColor(lang) }}
                        />
                      )}
                      <span>{lang}</span>
                    </button>
                  ))}
                </div>

                <div className="search-wrap">
                  <span className="search-icon" aria-hidden="true">🔍</span>
                  <input
                    type="search"
                    placeholder="Search repositories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    aria-label="Search repositories"
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

              {/* Repositories Grid */}
              {isLoadingRepos ? (
                <div className="loading-state">
                  <span>⏳ Fetching public repositories from GitHub API...</span>
                </div>
              ) : filteredRepositories.length === 0 ? (
                <div className="empty-repos-prompt">
                  <span className="empty-icon">📂</span>
                  <h3>No matching repositories found</h3>
                  <p>Try clearing your search query or selecting a different language filter.</p>
                  <button
                    type="button"
                    className="btn-reset-filters"
                    onClick={() => {
                      setSelectedLanguage("All");
                      setSearchQuery("");
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="repos-grid">
                  {filteredRepositories.map((repo) => {
                    const linkedInfo = getLinkedProjectForRepo(repo.fullName, projectLinks);

                    const formattedDate = repo.updatedAt
                      ? new Date(repo.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : null;

                    return (
                      <article key={repo.id} className="repo-card">
                        {/* Card Top: Name & Link Pill */}
                        <div className="repo-card-top">
                          <div className="repo-title-row">
                            <span className="repo-book-icon">📘</span>
                            <a
                              href={repo.htmlUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="repo-name"
                              title="Open on GitHub"
                            >
                              {repo.name} ↗
                            </a>
                          </div>
                          <span className="visibility-badge">Public</span>
                        </div>

                        {/* Description */}
                        <p className="repo-description">{repo.description}</p>

                        {/* Linked Project Banner (If linked) */}
                        {linkedInfo && (
                          <div className="repo-linked-banner">
                            <span className="link-icon">🔗</span>
                            <div className="linked-text">
                              <span className="linked-label">Linked to Project:</span>
                              <strong>{linkedInfo.projectTitle}</strong>
                            </div>
                          </div>
                        )}

                        {/* Meta: Language, Stars, Forks, Updated */}
                        <div className="repo-meta-row">
                          {repo.language && (
                            <div className="repo-lang-meta">
                              <span
                                className="lang-dot"
                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                              />
                              <span>{repo.language}</span>
                            </div>
                          )}

                          <div className="repo-stat-meta" title="Stars">
                            <span>⭐</span>
                            <span>{repo.stars}</span>
                          </div>

                          <div className="repo-stat-meta" title="Forks">
                            <span>🍴</span>
                            <span>{repo.forks}</span>
                          </div>

                          {formattedDate && (
                            <span className="repo-date">Updated {formattedDate}</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="repo-card-actions">
                          <button
                            type="button"
                            className={`btn-link-project ${linkedInfo ? "is-linked" : ""}`}
                            onClick={() => openLinkingModal(repo)}
                          >
                            {linkedInfo ? "Change Linked Project" : "🔗 Link to Project"}
                          </button>

                          <a
                            href={repo.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-external-view"
                            title="Open repository on GitHub in new tab"
                          >
                            Open GitHub ↗
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* =====================================================
          5. MODAL: LINK REPOSITORY TO ZENTRION PROJECT
      ===================================================== */}
      {linkingModalRepo && (
        <div
          className="github-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="linking-modal-title"
        >
          <div className="github-modal-card">
            <header className="modal-header">
              <div>
                <span className="modal-subheading">PROJECT DELIVERABLE MAPPING</span>
                <h2 id="linking-modal-title">Link Repository to Project</h2>
              </div>
              <button
                type="button"
                className="modal-x-btn"
                onClick={closeLinkingModal}
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="modal-body">
              <div className="selected-repo-summary">
                <span className="repo-summary-label">Selected Repository:</span>
                <div className="repo-summary-box">
                  <strong className="summary-repo-name">{linkingModalRepo.name}</strong>
                  <span className="summary-repo-url">{linkingModalRepo.htmlUrl}</span>
                </div>
              </div>

              <div className="form-item">
                <label htmlFor="select-project-dropdown">
                  Select Target Zentrion Project *
                </label>
                <p className="field-hint">
                  Associating this repository will allow faculty mentors and automated assessment tools to review your commits and source files.
                </p>
                <select
                  id="select-project-dropdown"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="project-select-input"
                >
                  {projectsData.map((project) => {
                    const isAlreadyLinked =
                      projectLinks[project.id]?.repoName === linkingModalRepo.name;
                    return (
                      <option key={project.id} value={project.id}>
                        {project.title} ({project.category}) {isAlreadyLinked ? "— Currently Linked" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="linking-note-box">
                <span>ℹ️ Persistence Notice:</span>
                <p>
                  Repository links are saved in your platform workspace state (`localStorage`) and can be changed or unlinked at any time.
                </p>
              </div>
            </div>

            <footer className="modal-footer">
              <button
                type="button"
                className="btn-ghost"
                onClick={closeLinkingModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-confirm-link"
                onClick={handleConfirmLink}
              >
                Confirm Link
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
