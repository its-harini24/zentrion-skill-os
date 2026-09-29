import { useNavigate } from "react-router-dom";
import "./Auth.css";

function StudentLogin() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="auth-visual">

        <div className="auth-visual-content">

          <div className="auth-logo">
            Zentrion<span>.</span>
          </div>

          <div className="auth-visual-text">

            <p>ENGINEERING SKILL PLATFORM</p>

            <h1>
              Learn.
              <br />
              Practice.
              <br />
              <span>Prove.</span>
            </h1>

            <p className="auth-visual-description">
              Build skills that go beyond textbooks
              and prepare for the real world.
            </p>

          </div>

          <div className="auth-journey">
            <span>01</span>
            <div></div>
            <span>02</span>
            <div></div>
            <span>03</span>
          </div>

          <small>
            Learn · Practice · Improve · Get Hired
          </small>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="auth-form-side">

        <div className="auth-form-container">

          <button
            className="auth-back"
            onClick={() => navigate("/")}
          >
            ← Back to Zentrion
          </button>

          <div className="auth-heading">

            <p>STUDENT LOGIN</p>

            <h2>
              Welcome back.
            </h2>

            <span>
              Continue your skill journey.
            </span>

          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/student-dashboard");
            }}
          >

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />

            </div>

            <div className="form-group">

              <div className="password-label">

                <label>Password</label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                placeholder="Enter your password"
                required
              />

            </div>

            <button
              className="auth-submit"
              type="submit"
            >
              Continue
              <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-signup">
            New to Zentrion?
            <button
              type="button"
              onClick={() => navigate("/student-register")}
            >
              Create an account
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}

export default StudentLogin;