import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import zentrionLogo from "../../assets/zentrion-logo.png";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import { projectsData } from "../../data/projectsData";
import { computeProjectStats } from "../../services/projectProgressService";
import "./ProjectsPage.css";

function ProjectsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Compute live gamified project stats
  const projectsWithStats = useMemo(() => {
    return projectsData.map((project) => ({
      ...project,
      stats: computeProjectStats(project),
    }));
  }, []);

  // Summary Metrics computed from actual gamified project data
  const totalProjects = projectsWithStats.length;
  const inProgressCount = useMemo(
    () => projectsWithStats.filter((p) => p.stats.status === "In Progress").length,
    [projectsWithStats]
  );
  const completedCount = useMemo(
    () => projectsWithStats.filter((p) => p.stats.status === "Completed").length,
    [projectsWithStats]
  );
  const notStartedCount = useMemo(
    () => projectsWithStats.filter((p) => p.stats.status === "Not Started").length,
    [projectsWithStats]
  );

  // Filter & Search Logic
  const filteredProjects = useMemo(() => {
    return projectsWithStats.filter((project) => {
      const matchesStatus =
        selectedStatus === "All" || project.stats.status === selectedStatus;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [projectsWithStats, searchQuery, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("All");
  };

  return (
    <div className="projects-page">
      {/* =====================================================
          TOP NAVIGATION (Keeps official Zentrion logo top-left)
      ===================================================== */}
      <header className="projects-navbar">
        <div className="projects-nav-left">
          <button
            className="projects-logo-btn"
            onClick={() => navigate("/student-dashboard")}
            aria-label="Back to Zentrion Dashboard"
          >
            <img
              src={zentrionLogo}
              alt="Zentrion"
              className="projects-logo-img"
            />
          </button>
          <span className="projects-nav-divider" aria-hidden="true" />
          <span className="projects-nav-crumb">Projects & Quests</span>
        </div>

        <div className="projects-nav-right">
          <ThemeToggle />
          <button
            className="projects-back-btn"
            onClick={() => navigate("/student-dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}
      <main className="projects-container">
        {/* =====================================================
            1. PAGE HEADER (No logo inside section or cards)
        ===================================================== */}
        <section className="projects-header-card">
          <div className="projects-header-info">
            <div className="projects-header-titles">
              <span className="projects-header-eyebrow">
                GAMIFIED ENGINEERING PORTFOLIO
              </span>
              <h1>My Projects</h1>
              <p className="projects-header-subtitle">
                Build skills. Create. Demonstrate your work.
              </p>
            </div>
          </div>

          <div className="projects-header-actions">
            <button
              className="projects-action-btn secondary"
              onClick={() => navigate("/evidence-review")}
              title="Page 34: Upload and review milestone artifacts and mentor feedback"
            >
              📤 Evidence & Reviews
            </button>
            <button
              className="projects-action-btn secondary"
              onClick={() => navigate("/problems")}
              title="Browse problems library"
            >
              Browse Problems
            </button>
            <button
              className="projects-action-btn primary"
              onClick={() => navigate("/coding-workspace")}
              title="Open Coding Workspace"
            >
              Coding Lab →
            </button>
          </div>
        </section>

        {/* =====================================================
            2. SUMMARY SECTION
        ===================================================== */}
        <section
          className="projects-summary-grid"
          aria-label="Projects Summary Metrics"
        >
          <div className="projects-summary-card">
            <div className="summary-icon-box total" aria-hidden="true">
              📁
            </div>
            <div className="summary-content">
              <span className="summary-value">{totalProjects}</span>
              <span className="summary-label">Total Projects</span>
            </div>
          </div>

          <div className="projects-summary-card">
            <div className="summary-icon-box progress" aria-hidden="true">
              ⏳
            </div>
            <div className="summary-content">
              <span className="summary-value">{inProgressCount}</span>
              <span className="summary-label">In Progress</span>
            </div>
          </div>

          <div className="projects-summary-card">
            <div className="summary-icon-box completed" aria-hidden="true">
              ✅
            </div>
            <div className="summary-content">
              <span className="summary-value">{completedCount}</span>
              <span className="summary-label">Completed</span>
            </div>
          </div>
        </section>

        {/* =====================================================
            3. PROJECT CONTROLS (SEARCH & FILTERS)
        ===================================================== */}
        <section
          className="projects-controls-bar"
          aria-label="Project search and status filters"
        >
          <div className="projects-search-wrapper">
            <span className="projects-search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              className="projects-search-input"
              placeholder="Search projects by title, skill or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                className="projects-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          <div className="projects-filter-group" role="tablist">
            <button
              className={`projects-filter-pill ${
                selectedStatus === "All" ? "active" : ""
              }`}
              onClick={() => setSelectedStatus("All")}
              role="tab"
              aria-selected={selectedStatus === "All"}
            >
              All Projects
              <span className="projects-filter-count">{totalProjects}</span>
            </button>

            <button
              className={`projects-filter-pill ${
                selectedStatus === "In Progress" ? "active" : ""
              }`}
              onClick={() => setSelectedStatus("In Progress")}
              role="tab"
              aria-selected={selectedStatus === "In Progress"}
            >
              In Progress
              <span className="projects-filter-count">{inProgressCount}</span>
            </button>

            <button
              className={`projects-filter-pill ${
                selectedStatus === "Completed" ? "active" : ""
              }`}
              onClick={() => setSelectedStatus("Completed")}
              role="tab"
              aria-selected={selectedStatus === "Completed"}
            >
              Completed
              <span className="projects-filter-count">{completedCount}</span>
            </button>

            <button
              className={`projects-filter-pill ${
                selectedStatus === "Not Started" ? "active" : ""
              }`}
              onClick={() => setSelectedStatus("Not Started")}
              role="tab"
              aria-selected={selectedStatus === "Not Started"}
            >
              Not Started
              <span className="projects-filter-count">{notStartedCount}</span>
            </button>
          </div>
        </section>

        {/* =====================================================
            4. PROJECT CARDS GRID (PART 2 - GAMIFIED)
        ===================================================== */}
        {filteredProjects.length > 0 ? (
          <section className="projects-grid" aria-label="Project Cards">
            {filteredProjects.map((project) => {
              const stats = project.stats;
              const isCompleted = stats.status === "Completed";
              const isInProgress = stats.status === "In Progress";
              const statusClass = isCompleted
                ? "status-completed"
                : isInProgress
                ? "status-in-progress"
                : "status-not-started";

              return (
                <article className="project-card" key={project.id}>
                  {/* Category & Status */}
                  <div className="project-card-top">
                    <span className="project-category-badge">
                      {project.category}
                    </span>
                    <span className={`project-status-badge ${statusClass}`}>
                      {isInProgress && (
                        <span className="status-dot" aria-hidden="true" />
                      )}
                      {isCompleted && "✓ "}
                      {stats.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="project-card-heading">{project.title}</h2>
                  <p className="project-card-desc">{project.description}</p>

                  {/* Technology / Skill tags */}
                  <div className="project-card-tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Gamified Level & Progress Bar */}
                  <div className="project-card-progress-wrap">
                    <div className="project-progress-meta">
                      <span className="project-milestone-text">
                        Level {stats.currentLevelNumber} of {stats.totalLevels} ·{" "}
                        {stats.completedSubtasks}/{stats.totalSubtasks} tasks
                      </span>
                      <span className="project-percent-text">
                        {stats.percent}%
                      </span>
                    </div>
                    <div className="project-progress-track">
                      <div
                        className={`project-progress-fill ${
                          isCompleted ? "fill-completed" : ""
                        }`}
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Bottom info & action */}
                  <div className="project-card-bottom">
                    <span className="project-updated-info">
                      ⭐ {project.xpReward} XP Reward
                    </span>
                    <button
                      className="project-workspace-btn"
                      onClick={() =>
                        navigate(`/project-workspace/${project.id}`)
                      }
                      aria-label={`Open workspace for ${project.title}`}
                    >
                      {isCompleted
                        ? "Review Project"
                        : isInProgress
                        ? `Continue Project (Lvl ${stats.currentLevelNumber})`
                        : "Start Project"}{" "}
                      <span>→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <div className="projects-empty-state">
            <span className="projects-empty-icon" aria-hidden="true">
              🔎
            </span>
            <h3>No projects found</h3>
            <p>
              No projects matched your current filter or search criteria. Try
              adjusting your query.
            </p>
            <button
              className="projects-empty-reset-btn"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProjectsPage;
