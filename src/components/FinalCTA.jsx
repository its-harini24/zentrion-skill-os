import { useNavigate } from "react-router-dom";
import "./FinalCTA.css";

function FinalCTA() {
  const navigate = useNavigate();

  const handleExploreDomains = () => {
    navigate("/");

    setTimeout(() => {
      const domainSection = document.getElementById("domains");

      if (domainSection) {
        domainSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <section className="final-cta">
      <div className="final-cta-content">
        <p className="final-cta-label">YOUR JOURNEY STARTS HERE</p>

        <h2>Ready to build your skills?</h2>

        <p className="final-cta-description">
          Learn something new. Solve a challenge. Build a project.
          Take the next step toward becoming career ready.
        </p>

        <div className="final-cta-actions">
          <button
            className="final-cta-primary"
            onClick={() => navigate("/role-selection")}
          >
            Start Practicing
            <span>→</span>
          </button>

          <button
            className="final-cta-secondary"
            onClick={handleExploreDomains}
          >
            Explore Domains
          </button>
        </div>

        <div className="final-cta-journey">
          <span>Learn</span>
          <span>·</span>
          <span>Practice</span>
          <span>·</span>
          <span>Prove</span>
          <span>·</span>
          <span>Improve</span>
          <span>·</span>
          <span>Get Hired</span>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;