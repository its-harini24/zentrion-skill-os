import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const scrollToSection = (sectionId) => {
    setProfileMenuOpen(false);
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
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
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

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

        <div className="student-logo">
          Zentrion<span>.</span>
        </div>

        <nav className="student-nav">

          <a
            href="#dashboard"
            className={
              activeSection === "dashboard"
                ? "active"
                : ""
            }
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("dashboard");
            }}
          >
            Dashboard
          </a>

          <a
            href="#practice"
            className={
              activeSection === "practice"
                ? "active"
                : ""
            }
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("practice");
            }}
          >
            Practice
          </a>

          <a
            href="#learn"
            className={
              activeSection === "learn"
                ? "active"
                : ""
            }
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("learn");
            }}
          >
            Learn
          </a>

          <a
            href="#projects"
            className={
              activeSection === "projects"
                ? "active"
                : ""
            }
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("projects");
            }}
          >
            Projects
          </a>

        </nav>

        <div className="student-nav-right">

          <ThemeToggle />

          <button
            className="notification-btn"
            aria-label="Notifications"
            title="Notifications"
          >
            🔔
          </button>

          <button
            type="button"
            className={`student-profile ${
              profileMenuOpen
                ? "profile-menu-open"
                : ""
            }`}
            onClick={() =>
              setProfileMenuOpen(
                (previous) => !previous
              )
            }
            aria-label="Open profile menu"
            aria-expanded={profileMenuOpen}
          >

            <div className="profile-avatar">
              H
            </div>

            <div className="profile-info">
              <strong>Harini</strong>
              <span>CSBS · 3rd Sem</span>
            </div>

            <span
              className="profile-menu-arrow"
              aria-hidden="true"
            >
              ▾
            </span>

          </button>

          {profileMenuOpen && (
            <div className="profile-dropdown">

              <button
                type="button"
                onClick={() =>
                  scrollToSection("dashboard")
                }
              >
                Dashboard
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("practice")
                }
              >
                Practice
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("learn")
                }
              >
                Learn
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("projects")
                }
              >
                Projects
              </button>

              <div className="profile-dropdown-divider"></div>

              <button
                type="button"
                onClick={() => navigate("/")}
              >
                Logout
              </button>

            </div>
          )}

          <button
            className="logout-btn"
            onClick={() => navigate("/")}
          >
            Logout
          </button>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="student-main">

        {/* ================= INTRO ================= */}

        <section
          id="dashboard"
          className="dashboard-intro"
        >

          <div>

            <p className="dashboard-eyebrow">
              YOUR LEARNING SPACE
            </p>

            <h1>
              Good evening, <span>Harini.</span>
            </h1>

            <p className="dashboard-description">
              You're on a 5-day learning streak. Keep
              building your skills today.
            </p>

          </div>

          <div className="dashboard-date">

            <span>
              YOUR PROGRESS
            </span>

            <strong>
              5 DAY STREAK 🔥
            </strong>

          </div>

        </section>


        {/* ================= TODAY'S FOCUS ================= */}

        <section
          id="learn"
          className="today-focus"
        >

          <div className="focus-content">

            <div className="focus-heading">

              <p>
                TODAY'S FOCUS
              </p>

              <span>
                CONTINUE WHERE YOU LEFT OFF
              </span>

            </div>

            <div className="focus-course">

              <div className="focus-icon">
                &lt;/&gt;
              </div>

              <div>

                <span>
                  JAVA · DSA
                </span>

                <h2>
                  Arrays & Binary Search
                </h2>

                <p>
                  Lesson 6 of 10 · Last studied yesterday
                </p>

              </div>

            </div>

            <div className="focus-progress">

              <div className="focus-progress-top">

                <span>
                  Course progress
                </span>

                <strong>
                  68%
                </strong>

              </div>

              <div className="focus-progress-track">
                <div></div>
              </div>

            </div>

            <div className="focus-footer">

              <span>
                Estimated time · 25 min
              </span>

              <button>
                Continue <span>→</span>
              </button>

            </div>

          </div>


          <div className="focus-side">

            <span>
              NEXT UP
            </span>

            <h3>
              Binary Search
            </h3>

            <p>
              Learn how to search efficiently through
              sorted data.
            </p>

            <div className="focus-side-meta">

              <span>
                Intermediate
              </span>

              <span>
                15 min
              </span>

            </div>

          </div>

        </section>


        {/* ================= SKILL PROFILE ================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>

              <p>
                SKILL PROFILE
              </p>

              <h2>
                Where you stand
              </h2>

            </div>

            <button>
              View full profile →
            </button>

          </div>


          <div className="skill-profile">

            <div className="skill-group">

              <span className="skill-group-title">
                Programming
              </span>

              <div className="skill-profile-row">

                <span>
                  Java
                </span>

                <div className="skill-profile-bar">
                  <div style={{ width: "65%" }}></div>
                </div>

                <strong>
                  65%
                </strong>

              </div>

              <div className="skill-profile-row">

                <span>
                  Python
                </span>

                <div className="skill-profile-bar">
                  <div style={{ width: "75%" }}></div>
                </div>

                <strong>
                  75%
                </strong>

              </div>

            </div>


            <div className="skill-group">

              <span className="skill-group-title">
                Web Development
              </span>

              <div className="skill-profile-row">

                <span>
                  React
                </span>

                <div className="skill-profile-bar">
                  <div style={{ width: "65%" }}></div>
                </div>

                <strong>
                  65%
                </strong>

              </div>

              <div className="skill-profile-row">

                <span>
                  JavaScript
                </span>

                <div className="skill-profile-bar">
                  <div style={{ width: "70%" }}></div>
                </div>

                <strong>
                  70%
                </strong>

              </div>

            </div>


            <div className="skill-group">

              <span className="skill-group-title">
                Problem Solving
              </span>

              <div className="skill-profile-row">

                <span>
                  DSA
                </span>

                <div className="skill-profile-bar">
                  <div style={{ width: "58%" }}></div>
                </div>

                <strong>
                  58%
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* ================= RECOMMENDED ================= */}

        <section
          id="practice"
          className="dashboard-section"
        >

          <div className="section-heading">

            <div>

              <p>
                RECOMMENDED FOR YOU
              </p>

              <h2>
                Based on your practice
              </h2>

            </div>

            <span className="recommendation-note">
              Because you're practicing Java
            </span>

          </div>


          <div className="recommended-grid">

            <div className="recommended-card">

              <div className="recommended-top">

                <span>
                  JAVA
                </span>

                <span className="difficulty easy">
                  EASY
                </span>

              </div>

              <h3>
                Arrays Fundamentals
              </h3>

              <p>
                Practice the basics of arrays and improve
                your implementation skills.
              </p>

              <div className="recommended-bottom">

                <span>
                  12 problems
                </span>

                <button>
                  Practice →
                </button>

              </div>

            </div>


            <div className="recommended-card">

              <div className="recommended-top">

                <span>
                  JAVA · DSA
                </span>

                <span className="difficulty medium">
                  MEDIUM
                </span>

              </div>

              <h3>
                Binary Search
              </h3>

              <p>
                Strengthen your understanding of searching
                in sorted arrays.
              </p>

              <div className="recommended-bottom">

                <span>
                  8 problems
                </span>

                <button>
                  Practice →
                </button>

              </div>

            </div>


            <div className="recommended-card">

              <div className="recommended-top">

                <span>
                  JAVA · DSA
                </span>

                <span className="difficulty medium">
                  MEDIUM
                </span>

              </div>

              <h3>
                Sorting Algorithms
              </h3>

              <p>
                Practice common sorting techniques and
                compare their efficiency.
              </p>

              <div className="recommended-bottom">

                <span>
                  10 problems
                </span>

                <button>
                  Practice →
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* ================= PROJECTS ================= */}

        <section
          id="projects"
          className="dashboard-section"
        >

          <div className="section-heading">

            <div>

              <p>
                PROJECTS
              </p>

              <h2>
                Build what you learn
              </h2>

            </div>

            <span className="recommendation-note">
              Apply your skills through projects
            </span>

          </div>


          <div className="recommended-grid">

            <div className="recommended-card">

              <div className="recommended-top">

                <span>
                  JAVA
                </span>

                <span className="difficulty easy">
                  STARTER
                </span>

              </div>

              <h3>
                Java DSA Practice Project
              </h3>

              <p>
                Apply arrays, searching and sorting concepts
                in a small practical project.
              </p>

              <div className="recommended-bottom">

                <span>
                  Beginner
                </span>

                <button>
                  View Project →
                </button>

              </div>

            </div>


            <div className="recommended-card">

              <div className="recommended-top">

                <span>
                  WEB DEVELOPMENT
                </span>

                <span className="difficulty medium">
                  INTERMEDIATE
                </span>

              </div>

              <h3>
                Skill Tracker
              </h3>

              <p>
                Build a simple application to track learning
                progress and completed skills.
              </p>

              <div className="recommended-bottom">

                <span>
                  React
                </span>

                <button>
                  View Project →
                </button>

              </div>

            </div>


            <div className="recommended-card">

              <div className="recommended-top">

                <span>
                  REAL WORLD
                </span>

                <span className="difficulty medium">
                  CHALLENGE
                </span>

              </div>

              <h3>
                Campus Problem Solver
              </h3>

              <p>
                Choose a real campus problem and design a
                practical technology-based solution.
              </p>

              <div className="recommended-bottom">

                <span>
                  Open ended
                </span>

                <button>
                  Explore →
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* ================= RECENT ACTIVITY ================= */}

        <section className="dashboard-section recent-section">

          <div className="section-heading">

            <div>

              <p>
                RECENT ACTIVITY
              </p>

              <h2>
                Keep going
              </h2>

            </div>

            <button>
              View history →
            </button>

          </div>


          <div className="activity-list">

            <div className="activity-day">
              <span>
                TODAY
              </span>
            </div>

            <div className="activity-item">

              <div className="activity-status completed">
                ✓
              </div>

              <div>
                <strong>
                  Two Sum
                </strong>

                <span>
                  Computer Science · Easy · Completed
                </span>
              </div>

              <small>
                2 hours ago
              </small>

            </div>


            <div className="activity-day">
              <span>
                YESTERDAY
              </span>
            </div>


            <div className="activity-item">

              <div className="activity-status completed">
                ✓
              </div>

              <div>
                <strong>
                  Java Arrays Quiz
                </strong>

                <span>
                  Assessment · Score 8/10
                </span>
              </div>

              <small>
                8:15 PM
              </small>

            </div>


            <div className="activity-item">

              <div className="activity-status progress">
                →
              </div>

              <div>
                <strong>
                  Sorting Algorithms
                </strong>

                <span>
                  Java · Intermediate · 35% completed
                </span>
              </div>

              <small>
                7:50 PM
              </small>

            </div>

          </div>

        </section>


        {/* ================= WEEKLY PROGRESS ================= */}

        <section className="weekly-progress">

          <div>

            <p>
              THIS WEEK
            </p>

            <h2>
              Keep your learning streak going.
            </h2>

            <span>
              You've been active for 5 of the last 7 days.
            </span>

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