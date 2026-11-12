import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

function RoleSelection() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const isStudent = role === "student";

  const changeRole = (newRole) => {
    setRole(newRole);
  };

  const handleContinue = () => {
    navigate(
      isStudent ? "/student-login" : "/faculty-login"
    );
  };

  return (
    <div className="role-page">

      <div className="role-content">

        <button
          className="role-back"
          onClick={() => navigate("/")}
        >
          ← Back to Zentrion
        </button>

        <div className="role-brand">
          Zentrion<span>.</span>
        </div>

        <div className="role-heading">
          <p className="role-label">
            CHOOSE YOUR EXPERIENCE
          </p>

          <h1>
            How do you want
            <br />
            to <span>continue?</span>
          </h1>

          <p className="role-description">
            Select your role and continue with
            the Zentrion experience built for you.
          </p>
        </div>

        {/* ROLE SWITCH */}

        <div className="role-switch">

          <button
            className={isStudent ? "active" : ""}
            onClick={() => changeRole("student")}
          >
            Student
          </button>

          <button
            className={!isStudent ? "active" : ""}
            onClick={() => changeRole("faculty")}
          >
            Faculty
          </button>

        </div>

        {/* SLIDING CARD */}

        <div className="role-card-window">

          <div
            className={`role-card-track ${
              !isStudent ? "faculty-card" : ""
            }`}
          >

            {/* STUDENT CARD */}

            <div className="role-card student-card">

              <div className="role-card-top">
                <span className="role-card-number">
                  01
                </span>

                <span className="role-card-icon">
                  🎓
                </span>
              </div>

              <div className="role-card-main">
                <p className="role-card-label">
                  STUDENT EXPERIENCE
                </p>

                <h2>
                  Build skills.
                  <br />
                  <span>Build your future.</span>
                </h2>

                <p>
                  Practice problems, learn new concepts,
                  assess your skills and prepare for
                  real-world opportunities.
                </p>
              </div>

              <div className="role-card-bottom">
                <span>
                  Learn · Practice · Prove
                </span>

                <button onClick={handleContinue}>
                  Continue <span>→</span>
                </button>
              </div>

            </div>

            {/* FACULTY CARD */}

            <div className="role-card faculty-card-content">

              <div className="role-card-top">
                <span className="role-card-number">
                  02
                </span>

                <span className="role-card-icon">
                  👨‍🏫
                </span>
              </div>

              <div className="role-card-main">
                <p className="role-card-label">
                  FACULTY EXPERIENCE
                </p>

                <h2>
                  Guide skills.
                  <br />
                  <span>Track progress.</span>
                </h2>

                <p>
                  Manage learning, assessments and
                  monitor student skill development
                  from one platform.
                </p>
              </div>

              <div className="role-card-bottom">
                <span>
                  Manage · Assess · Track
                </span>

                <button onClick={handleContinue}>
                  Continue <span>→</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        <p className="role-footer">
          Learn · Practice · Prove · Improve · Get Hired
        </p>

      </div>

    </div>
  );
}

export default RoleSelection;