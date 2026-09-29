import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "./DemoPages.css";

function SkillAnalysisPage() {
  const navigate = useNavigate();

  const skills = [
    {
      name: "Java",
      category: "Programming",
      value: 65,
    },
    {
      name: "Python",
      category: "Programming",
      value: 75,
    },
    {
      name: "React",
      category: "Web Development",
      value: 65,
    },
    {
      name: "JavaScript",
      category: "Web Development",
      value: 70,
    },
    {
      name: "DSA",
      category: "Problem Solving",
      value: 58,
    },
  ];

  return (
    <div className="demo-page">

      <header className="demo-navbar">

        <button
          className="demo-logo"
          onClick={() => navigate("/")}
        >
          Zentrion<span>.</span>
        </button>

        <div className="demo-nav-actions">

          <ThemeToggle />

          <button
            className="demo-back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

        </div>

      </header>


      <main className="demo-main">

        <section className="demo-hero">

          <p className="demo-eyebrow">
            SKILL INTELLIGENCE
          </p>

          <h1>
            Understand where
            <span> you stand.</span>
          </h1>

          <p>
            Get a simple view of your current skills and
            identify where you can focus next.
          </p>

        </section>


        <section className="skill-overview">

          <div className="skill-overview-main">

            <span>
              OVERALL SKILL PROGRESS
            </span>

            <strong>
              67%
            </strong>

            <p>
              Keep practicing consistently to strengthen
              your technical foundation.
            </p>

          </div>


          <div className="skill-overview-item">

            <span>
              STRONGEST AREA
            </span>

            <strong>
              Python
            </strong>

            <small>
              75% progress
            </small>

          </div>


          <div className="skill-overview-item">

            <span>
              FOCUS AREA
            </span>

            <strong>
              DSA
            </strong>

            <small>
              58% progress
            </small>

          </div>

        </section>


        <section className="skill-analysis-list">

          <div className="demo-section-heading">

            <div>

              <p>
                SKILL BREAKDOWN
              </p>

              <h2>
                Your current progress
              </h2>

            </div>

          </div>


          {skills.map((skill) => (

            <div
              className="skill-analysis-row"
              key={skill.name}
            >

              <div className="skill-analysis-label">

                <strong>
                  {skill.name}
                </strong>

                <span>
                  {skill.category}
                </span>

              </div>


              <div className="skill-analysis-track">

                <div
                  style={{
                    width: `${skill.value}%`,
                  }}
                ></div>

              </div>


              <strong className="skill-analysis-value">
                {skill.value}%
              </strong>

            </div>

          ))}

        </section>


        <section className="skill-next-step">

          <div>

            <p>
              RECOMMENDED NEXT STEP
            </p>

            <h2>
              Strengthen your DSA foundation.
            </h2>

            <span>
              Practice arrays, searching and sorting problems
              to improve your problem-solving confidence.
            </span>

          </div>

          <button
            onClick={() => navigate("/problems")}
          >
            Practice Problems →
          </button>

        </section>

      </main>

    </div>
  );
}

export default SkillAnalysisPage;