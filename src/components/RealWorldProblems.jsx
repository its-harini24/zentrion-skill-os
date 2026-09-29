import { useNavigate } from "react-router-dom";
import "./RealWorldProblems.css";

function RealWorldProblems() {
  const navigate = useNavigate();

  return (
    <section className="real-world-section">

      <div className="real-world-visual">
        <div className="problem-window">

          <div className="window-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="problem-content">

            <div className="problem-badge">
              ECE · INTERMEDIATE
            </div>

            <h3>Design a Smart Traffic Signal</h3>

            <p>
              Design a system that dynamically controls
              traffic signals based on vehicle density.
            </p>

            <div className="problem-tags">
              <span>Logic Design</span>
              <span>Problem Solving</span>
            </div>

            <div className="problem-progress">
              <div></div>
            </div>

            <div className="problem-footer">
              <span>42 attempts</span>
              <strong>→</strong>
            </div>

          </div>
        </div>

        <div className="floating-code">
          <span>&lt;/&gt;</span>
        </div>

        <div className="floating-node node-one"></div>
        <div className="floating-node node-two"></div>
      </div>

      <div className="real-world-content">

        <p className="real-world-label">
          REAL-WORLD PROBLEMS
        </p>

        <h2>
          Practice problems
          <span> that feel like real work.</span>
        </h2>

        <p className="real-world-description">
          Go beyond textbook questions. Solve engineering
          challenges inspired by real-world situations and
          develop the problem-solving skills companies look for.
        </p>

        <div className="real-world-points">

          <div>
            <span>01</span>
            <p>Scenario-based challenges</p>
          </div>

          <div>
            <span>02</span>
            <p>Multiple difficulty levels</p>
          </div>

          <div>
            <span>03</span>
            <p>Domain-specific practice</p>
          </div>

        </div>

        <button
          className="real-world-button"
          onClick={() => navigate("/problems")}
        >
          Explore Problems
          <span>→</span>
        </button>

      </div>

    </section>
  );
}

export default RealWorldProblems;