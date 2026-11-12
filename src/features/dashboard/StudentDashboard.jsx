import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import zentrionLogo from "../../assets/zentrion-logo.png";
import githubOctocat from "../../assets/github-octocat.svg";
import "./StudentDashboard.css";
import { sampleNotifications } from "../../data/notifications";
import { projectsData } from "../../data/projectsData";
import { computeProjectStats } from "../../services/projectProgressService";

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(() =>
    isNaN(parseInt(value, 10)) ? value : 0
  );
  useEffect(() => {
    const end = typeof value === "number" ? value : parseInt(value, 10);
    if (isNaN(end)) {
      return;
    }
    let frame = 0;
    const totalFrames = 24;
    const frameInterval = duration / totalFrames;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const ease = progress * (2 - progress); // easeOutQuad
      setDisplay(Math.round(end * ease));
      if (frame >= totalFrames) {
        clearInterval(timer);
        setDisplay(end);
      }
    }, frameInterval);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{typeof display === "number" ? display.toLocaleString("en-IN") : display}</>;
}

function StudentDashboard() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };
  const scrollToSection = (sectionId) => {
    setProfileMenuOpen(false);
    setNotificationOpen(false);
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const sections = ["dashboard", "practice", "learn", "projects"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-90px 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="student-dashboard">
      {/* ================= NAVBAR ================= */}
      <header className="student-navbar">
        <a
          href="#dashboard"
          className="student-logo"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("dashboard");
          }}
          aria-label="Zentrion Learntech home"
        >
          <img src={zentrionLogo} alt="Zentrion Learntech" />
        </a>

        <nav className="student-nav">
          <a
            href="#dashboard"
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("dashboard");
            }}
          >
            Dashboard
          </a>

          <a
            href="#practice"
            className={activeSection === "practice" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("practice");
            }}
          >
            Practice
          </a>

          <a
            href="#learn"
            className={activeSection === "learn" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("learn");
            }}
          >
            Learn
          </a>

          <a
            href="#projects"
            className={activeSection === "projects" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("projects");
            }}
          >
            Projects
          </a>

          <a
            href="/leaderboard"
            onClick={(event) => {
              event.preventDefault();
              navigate("/leaderboard");
            }}
          >
            Leaderboard
          </a>
        </nav>

        <div className="student-nav-right">


          <div className="notification-wrapper">
            <button
              type="button"
              className="notification-btn"
              onClick={() => setNotificationOpen((previous) => !previous)}
              aria-label={`Notifications, ${unreadCount} unread`}
              aria-expanded={notificationOpen}
              title="Notifications"
            >
              🔔

              {unreadCount > 0 && (
                <span className="notification-count">{unreadCount}</span>
              )}
            </button>

            {notificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>

                  {unreadCount > 0 && (
                    <button type="button" onClick={markAllAsRead}>
                      Mark all as read
                    </button>
                  )}
                </div>

                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.read ? "read" : "unread"
                        }`}
                    >
                      <div className="notification-content">
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>
                      </div>

                      {!notification.read && (
                        <button
                          type="button"
                          className="mark-read-btn"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No notifications yet.</p>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className={`student-profile ${profileMenuOpen ? "profile-menu-open" : ""}`}
            onClick={() => setProfileMenuOpen((previous) => !previous)}
            aria-label="Open profile menu"
            aria-expanded={profileMenuOpen}
          >
            <div className="profile-avatar">H</div>

            <div className="profile-info">
              <strong>Harini</strong>
              <span>CSBS · 3rd Sem</span>
            </div>

            <span className="profile-menu-arrow" aria-hidden="true">
              ▾
            </span>
          </button>

          {profileMenuOpen && (
            <div className="profile-dropdown">
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/student-settings");
                }}
              >
                ⚙️ Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/portfolio");
                }}
              >
                🎓 Student Portfolio
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/skill-passport");
                }}
              >
                🛂 Skill Passport
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/github-integration");
                }}
              >
                <img
                  src={githubOctocat}
                  alt="GitHub"
                  className="dropdown-github-icon"
                />{" "}
                GitHub Integration
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("dashboard")}
              >
                Dashboard
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("practice")}
              >
                Practice
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("learn")}
              >
                Learn
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("projects")}
              >
                Projects
              </button>

              <div className="profile-dropdown-divider"></div>

              <button type="button" onClick={() => navigate("/")}>
                Logout
              </button>
            </div>
          )}

          <button className="logout-btn" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="student-main">
        {/* ================= INTRO ================= */}
        <section id="dashboard" className="dashboard-intro">
          <div className="dashboard-intro-text">
            <p className="dashboard-eyebrow">YOUR LEARNING SPACE</p>

            <h1>
              Good evening, <span>Harini.</span>
            </h1>

            <p className="dashboard-description">
              You&apos;re on a 5-day learning streak. Keep building your skills today.
            </p>
          </div>

          <div className="dashboard-date">
            <span>YOUR PROGRESS</span>
            <strong>
              <AnimatedNumber value={5} /> DAY STREAK 🔥
            </strong>
          </div>
        </section>

        {/* ================= QUICK STATS SUMMARY STRIP ================= */}
        <div className="dashboard-metrics-strip">
          <div className="metric-card">
            <span className="metric-icon">🔥</span>
            <div>
              <span className="metric-label">Learning Streak</span>
              <strong>
                <AnimatedNumber value={5} /> Days Active
              </strong>
            </div>
          </div>

          <div className="metric-card">
            <span className="metric-icon">✓</span>
            <div>
              <span className="metric-label">Problems Solved</span>
              <strong>
                <AnimatedNumber value={42} /> Completed
              </strong>
            </div>
          </div>
          <button
            type="button"
            className="metric-card metric-card-interactive"
            onClick={() => navigate("/leaderboard")}
            title="View Leaderboard"
            aria-label="View leaderboard, current rank 3"
          >
            <span className="metric-icon">🏆</span>
            <div>
              <span className="metric-label">Leaderboard Rank</span>
              <strong>
                Rank #3 <span className="metric-arrow">→</span>
              </strong>
            </div>
          </button>

          <div className="metric-card">
            <span className="metric-icon">⚡</span>
            <div>
              <span className="metric-label">Skill XP Earned</span>
              <strong>
                <AnimatedNumber value={1120} /> XP
              </strong>
            </div>
          </div>
        </div>

        {/* ================= TODAY'S FOCUS ================= */}
        <section id="learn" className="today-focus">
          <div className="focus-content">
            <div className="focus-heading">
              <p>TODAY&apos;S FOCUS</p>
              <span>CONTINUE WHERE YOU LEFT OFF</span>
            </div>

            <div className="focus-course">
              <div className="focus-icon">&lt;/&gt;</div>

              <div>
                <span>JAVA · DSA</span>
                <h2>Arrays &amp; Binary Search</h2>
                <p>Lesson 6 of 10 · Last studied yesterday</p>
              </div>
            </div>

            <div className="focus-progress">
              <div className="focus-progress-top">
                <span>Course progress</span>
                <strong>
                  <AnimatedNumber value={68} />%
                </strong>
              </div>

              <div className="focus-progress-track">
                <div style={{ width: "68%" }} className="progress-bar-animated"></div>
              </div>
            </div>

            <div className="focus-footer">
              <span>Estimated time · 25 min</span>

              <button onClick={() => scrollToSection("practice")}>
                Continue <span>→</span>
              </button>
            </div>
          </div>

          <div className="focus-side">
            <span>NEXT UP</span>
            <h3>Binary Search</h3>
            <p>Learn how to search efficiently through sorted data.</p>

            <div className="focus-side-meta">
              <span>Intermediate</span>
              <span>15 min</span>
            </div>
          </div>
        </section>

        {/* ================= SKILL PROFILE ================= */}
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <p>SKILL PROFILE</p>
              <h2>Where you stand</h2>
            </div>

            <button onClick={() => navigate("/skill-analysis")}>
              View full profile →
            </button>
          </div>

          <div className="skill-profile">
            <div className="skill-group">
              <span className="skill-group-title">Programming</span>

              <div className="skill-profile-row">
                <span>Java</span>
                <div className="skill-profile-bar">
                  <div style={{ width: "65%" }} className="progress-bar-animated"></div>
                </div>
                <strong>
                  <AnimatedNumber value={65} />%
                </strong>
              </div>

              <div className="skill-profile-row">
                <span>Python</span>
                <div className="skill-profile-bar">
                  <div style={{ width: "75%" }} className="progress-bar-animated"></div>
                </div>
                <strong>
                  <AnimatedNumber value={75} />%
                </strong>
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-group-title">Web Development</span>

              <div className="skill-profile-row">
                <span>React</span>
                <div className="skill-profile-bar">
                  <div style={{ width: "65%" }} className="progress-bar-animated"></div>
                </div>
                <strong>
                  <AnimatedNumber value={65} />%
                </strong>
              </div>

              <div className="skill-profile-row">
                <span>JavaScript</span>
                <div className="skill-profile-bar">
                  <div style={{ width: "70%" }} className="progress-bar-animated"></div>
                </div>
                <strong>
                  <AnimatedNumber value={70} />%
                </strong>
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-group-title">Problem Solving</span>

              <div className="skill-profile-row">
                <span>DSA</span>
                <div className="skill-profile-bar">
                  <div style={{ width: "58%" }} className="progress-bar-animated"></div>
                </div>
                <strong>
                  <AnimatedNumber value={58} />%
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RECOMMENDED PRACTICE ================= */}
        <section id="practice" className="dashboard-section">
          <div className="section-heading">
            <div>
              <p>RECOMMENDED FOR YOU</p>
              <h2>Based on your practice</h2>
            </div>

            <span className="recommendation-note">Because you&apos;re practicing Java</span>
          </div>

          <div className="recommended-grid">
            <div className="recommended-card">
              <div className="recommended-top">
                <span>JAVA</span>
                <span className="difficulty easy">EASY</span>
              </div>

              <h3>Arrays Fundamentals</h3>
              <p>Practice the basics of arrays and improve your implementation skills.</p>

              <div className="recommended-bottom">
                <span>12 problems</span>
                <button onClick={() => navigate("/problems")}>Practice →</button>
              </div>
            </div>

            <div className="recommended-card">
              <div className="recommended-top">
                <span>JAVA · DSA</span>
                <span className="difficulty medium">MEDIUM</span>
              </div>

              <h3>Binary Search</h3>
              <p>Strengthen your understanding of searching in sorted arrays.</p>

              <div className="recommended-bottom">
                <span>8 problems</span>
                <button onClick={() => navigate("/problems")}>Practice →</button>
              </div>
            </div>

            <div className="recommended-card">
              <div className="recommended-top">
                <span>JAVA · DSA</span>
                <span className="difficulty medium">MEDIUM</span>
              </div>

              <h3>Sorting Algorithms</h3>
              <p>Practice common sorting techniques and compare their efficiency.</p>

              <div className="recommended-bottom">
                <span>10 problems</span>
                <button onClick={() => navigate("/problems")}>Practice →</button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROJECTS ================= */}
        <section id="projects" className="dashboard-section projects-section">
          <div className="projects-section-header">
            <div className="projects-brand-header-row">
              <div className="projects-heading-text">
                <p>PROJECTS</p>
                <h2>Build what you learn</h2>
                <span className="recommendation-note">Level up your engineering skills through hands-on quests</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <button
                className="projects-view-all-btn"
                style={{ background: "transparent", color: "var(--text-secondary)", borderColor: "var(--border)" }}
                onClick={() => navigate("/evidence-review")}
                title="Page 34: Evidence Upload & Review"
              >
                📤 Evidence & Review
              </button>
              <button
                className="projects-view-all-btn"
                onClick={() => navigate("/projects")}
              >
                View All Projects ({projectsData.length}) →
              </button>
            </div>
          </div>

          {/* Compact Summary Cards */}
          <div className="dash-projects-summary" aria-label="Projects summary metrics">
            <div className="dash-summary-item">
              <div className="dash-summary-icon total" aria-hidden="true">
                📁
              </div>
              <div className="dash-summary-text">
                <span className="dash-summary-number">
                  <AnimatedNumber value={projectsData.length} />
                </span>
                <span className="dash-summary-label">Total Projects</span>
              </div>
            </div>

            <div className="dash-summary-item">
              <div className="dash-summary-icon progress" aria-hidden="true">
                ⏳
              </div>
              <div className="dash-summary-text">
                <span className="dash-summary-number">
                  <AnimatedNumber
                    value={
                      projectsData.filter(
                        (p) => computeProjectStats(p).status === "In Progress"
                      ).length
                    }
                  />
                </span>
                <span className="dash-summary-label">In Progress</span>
              </div>
            </div>

            <div className="dash-summary-item">
              <div className="dash-summary-icon completed" aria-hidden="true">
                ✅
              </div>
              <div className="dash-summary-text">
                <span className="dash-summary-number">
                  <AnimatedNumber
                    value={
                      projectsData.filter(
                        (p) => computeProjectStats(p).status === "Completed"
                      ).length
                    }
                  />
                </span>
                <span className="dash-summary-label">Completed</span>
              </div>
            </div>
          </div>

          {/* Featured Projects Grid (Showing only 3 project cards) */}
          <div className="dash-projects-grid">
            {projectsData.slice(0, 3).map((project) => {
              const stats = computeProjectStats(project);
              const isCompleted = stats.status === "Completed";
              const isInProgress = stats.status === "In Progress";
              return (
                <article className="dash-project-card" key={project.id}>
                  <div className="dash-project-top">
                    <span className="dash-project-domain">{project.category}</span>
                    <span
                      className={`dash-project-status ${
                        isCompleted
                          ? "completed"
                          : isInProgress
                          ? "in-progress"
                          : "not-started"
                      }`}
                    >
                      {isInProgress && (
                        <span className="dash-status-dot" aria-hidden="true" />
                      )}
                      {isCompleted && "✓ "}
                      {stats.status}
                    </span>
                  </div>

                  <h3 className="dash-project-title">{project.title}</h3>
                  <p className="dash-project-desc">{project.description}</p>

                  <div className="dash-project-tags">
                    {project.tags.map((tag) => (
                      <span className="dash-tag-badge" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="dash-project-progress-wrap">
                    <div className="dash-progress-row">
                      <span className="dash-milestones-text">
                        Level {stats.currentLevelNumber} of {stats.totalLevels} · {stats.completedSubtasks}/{stats.totalSubtasks} tasks
                      </span>
                      <span className="dash-percent-text">{stats.percent}%</span>
                    </div>
                    <div className="dash-track">
                      <div
                        className={`dash-fill ${isCompleted ? "fill-completed" : ""}`}
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="dash-project-bottom">
                    <span className="dash-project-updated">⭐ {project.xpReward} XP</span>
                    <button
                      className="dash-workspace-btn"
                      onClick={() => navigate(`/project-workspace/${project.id}`)}
                      aria-label={`Open gamified workspace for ${project.title}`}
                    >
                      {isCompleted
                        ? "Review Project →"
                        : isInProgress
                        ? `Continue Level ${stats.currentLevelNumber} →`
                        : "Start Project →"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="dash-projects-footer-cta">
            <button onClick={() => navigate("/projects")}>
              View All {projectsData.length} Projects in the Projects Dashboard →
            </button>
          </div>
        </section>

        {/* ================= RECENT ACTIVITY ================= */}
        <section className="dashboard-section recent-section">
          <div className="section-heading">
            <div>
              <p>RECENT ACTIVITY</p>
              <h2>Keep going</h2>
            </div>

            <button onClick={() => navigate("/problems")}>View history →</button>
          </div>

          <div className="activity-list">
            <div className="activity-day">
              <span>TODAY</span>
            </div>

            <div className="activity-item">
              <div className="activity-status completed">✓</div>

              <div>
                <strong>Two Sum</strong>
                <span>Computer Science · Easy · Completed</span>
              </div>

              <small>2 hours ago</small>
            </div>

            <div className="activity-day">
              <span>YESTERDAY</span>
            </div>

            <div className="activity-item">
              <div className="activity-status completed">✓</div>

              <div>
                <strong>Java Arrays Quiz</strong>
                <span>Assessment · Score 8/10</span>
              </div>

              <small>8:15 PM</small>
            </div>

            <div className="activity-item">
              <div className="activity-status progress">→</div>

              <div>
                <strong>Sorting Algorithms</strong>
                <span>Java · Intermediate · 35% completed</span>
              </div>

              <small>7:50 PM</small>
            </div>
          </div>
        </section>

        {/* ================= WEEKLY PROGRESS ================= */}
        <section className="weekly-progress">
          <div>
            <p>THIS WEEK</p>
            <h2>Keep your learning streak going.</h2>
            <span>You&apos;ve been active for 5 of the last 7 days.</span>
          </div>

          <div className="week-days">
            <div className="day active">
              <span>M</span>
              <i>✓</i>
            </div>

            <div className="day active">
              <span>T</span>
              <i>✓</i>
            </div>

            <div className="day active">
              <span>W</span>
              <i>✓</i>
            </div>

            <div className="day active">
              <span>T</span>
              <i>✓</i>
            </div>

            <div className="day active">
              <span>F</span>
              <i>✓</i>
            </div>

            <div className="day">
              <span>S</span>
              <i></i>
            </div>

            <div className="day">
              <span>S</span>
              <i></i>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;