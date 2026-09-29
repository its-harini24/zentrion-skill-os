import { useNavigate } from "react-router-dom";
import "./SkillProgress.css";

function SkillProgress() {
  const navigate = useNavigate();

  const skills = [
    {
      name: "Problem Solving",
      value: 82,
      level: "Strong",
    },
    {
      name: "Programming",
      value: 68,
      level: "Growing",
    },
    {
      name: "Data Structures",
      value: 54,
      level: "Needs Practice",
    },
    {
      name: "Algorithms",
      value: 42,
      level: "Needs Practice",
    },
  ];

  return (
    <section className="skill-progress-section">

      <div className="skill-progress-content">

        <p className="skill-progress-label">
          KNOW YOUR SKILLS
        </p>

        <h2>
          See where you stand.
          <span> Know what to improve.</span>
        </h2>

        <p className="skill-progress-description">
          Zentrion turns your practice activity into a clear
          picture of your strengths, weak areas, and next steps.
        </p>

        <div className="skill-points">
          <div>
            <span>01</span>
            <p>Track your skill growth</p>
          </div>

          <div>
            <span>02</span>
            <p>Identify your skill gaps</p>
          </div>

          <div>
            <span>03</span>
            <p>Get recommendations to improve</p>
          </div>
        </div>

        <button
          className="skill-progress-button"
          onClick={() => navigate("/skill-analysis")}
        >
          View Skill Analysis
          <span>→</span>
        </button>

      </div>

      <div className="skill-dashboard">

        <div className="skill-dashboard-header">

          <div>
            <p>YOUR SKILL PROFILE</p>
            <h3>Computer Science</h3>
          </div>

          <span className="skill-level">
            Developing
          </span>

        </div>

        <div className="overall-skill">

          <div className="skill-circle">
            <div>
              <strong>68</strong>
              <span>/100</span>
            </div>
          </div>

          <div>
            <h4>Overall Skill Score</h4>
            <p>
              Keep practicing to strengthen your core skills.
            </p>
          </div>

        </div>

        <div className="skill-list">

          {skills.map((skill) => (
            <div className="skill-item" key={skill.name}>

              <div className="skill-item-top">

                <span>{skill.name}</span>

                <div>
                  <strong>{skill.value}%</strong>
                  <small>{skill.level}</small>
                </div>

              </div>

              <div className="skill-bar">
                <div
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default SkillProgress;