import "./CareerSection.css";

function CareerSection() {
  return (
    <section className="career-section">

      <div className="career-visual">

        <div className="career-card">

          <div className="career-card-header">
            <div>
              <span>CAREER READINESS</span>
              <h3>You're getting closer.</h3>
            </div>

            <div className="career-score">
              78%
            </div>
          </div>

          <div className="career-progress">
            <div></div>
          </div>

          <div className="career-checklist">

            <div className="career-check completed">
              <span>✓</span>
              <p>Core skills</p>
              <strong>Ready</strong>
            </div>

            <div className="career-check completed">
              <span>✓</span>
              <p>Problem solving</p>
              <strong>Ready</strong>
            </div>

            <div className="career-check">
              <span>→</span>
              <p>Technical interview</p>
              <strong>Practice</strong>
            </div>

            <div className="career-check">
              <span>○</span>
              <p>Projects & portfolio</p>
              <strong>Build</strong>
            </div>

          </div>

        </div>

        <div className="career-floating-card">
          <span>🎯</span>
          <div>
            <strong>Next focus</strong>
            <small>Technical Interview</small>
          </div>
        </div>

      </div>


      <div className="career-content">

        <p className="career-label">
          FROM SKILLS TO CAREER
        </p>

        <h2>
          Build skills that
          <span> open doors.</span>
        </h2>

        <p className="career-description">
          Zentrion connects your learning journey with the
          skills, projects, assessments, and interview practice
          you need to become career ready.
        </p>

        <div className="career-points">

          <div>
            <span>01</span>
            <div>
              <h3>Build your profile</h3>
              <p>
                Showcase your skills, projects, and achievements.
              </p>
            </div>
          </div>

          <div>
            <span>02</span>
            <div>
              <h3>Practice interviews</h3>
              <p>
                Prepare for technical and role-based interviews.
              </p>
            </div>
          </div>

          <div>
            <span>03</span>
            <div>
              <h3>Discover opportunities</h3>
              <p>
                Connect your verified skills with career opportunities.
              </p>
            </div>
          </div>

        </div>

        <button className="career-button">
          Explore Career Path
          <span>→</span>
        </button>

      </div>

    </section>
  );
}

export default CareerSection;