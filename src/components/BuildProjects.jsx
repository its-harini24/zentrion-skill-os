import "./BuildProjects.css";

function BuildProjects() {
  return (
    <section className="projects-section">

      <div className="projects-heading">
        <p className="projects-label">BUILD REAL PROJECTS</p>

        <h2>
          Don't just learn it.
          <span> Build it.</span>
        </h2>

        <p>
          Turn your knowledge into something you can actually
          build, showcase, and be proud of.
        </p>
      </div>

      <div className="projects-workspace">

        {/* Left side */}

        <div className="project-info">

          <div className="project-number">
            PROJECT 01
          </div>

          <h3>
            Smart Engineering
            <br />
            Challenge
          </h3>

          <p>
            Take what you've learned and apply it to a
            real-world project with clear goals, milestones,
            and measurable outcomes.
          </p>

          <div className="project-meta">
            <span>CS</span>
            <span>Intermediate</span>
            <span>4 Weeks</span>
          </div>

          <button className="project-button">
            Explore Projects
            <span>→</span>
          </button>

        </div>

        {/* Right side workspace */}

        <div className="workspace-visual">

          <div className="workspace-window">

            <div className="workspace-topbar">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <p>zentrion / project</p>
            </div>

            <div className="workspace-body">

              <div className="workspace-sidebar">
                <div className="side-active"></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="workspace-main">

                <div className="workspace-title">
                  <div>
                    <small>PROJECT</small>
                    <h4>Smart Skill Tracker</h4>
                  </div>

                  <span className="status">
                    In Progress
                  </span>
                </div>

                <div className="workspace-progress">
                  <div className="progress-top">
                    <span>Project Progress</span>
                    <strong>68%</strong>
                  </div>

                  <div className="progress-bar">
                    <div></div>
                  </div>
                </div>

                <div className="workspace-tasks">

                  <div className="task completed">
                    <span>✓</span>
                    <p>Define project requirements</p>
                  </div>

                  <div className="task completed">
                    <span>✓</span>
                    <p>Design the application</p>
                  </div>

                  <div className="task active-task">
                    <span>→</span>
                    <p>Build the core features</p>
                  </div>

                  <div className="task">
                    <span></span>
                    <p>Test and deploy</p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="workspace-badge badge-one">
            <span>✓</span>
            Skills Applied
          </div>

          <div className="workspace-badge badge-two">
            <span>★</span>
            Project Ready
          </div>

        </div>

      </div>

    </section>
  );
}

export default BuildProjects;