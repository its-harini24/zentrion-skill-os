import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Keep.
              <br />
              Learning.
              <br />
              <span>Growing.</span>
            </h1>

            <p className="auth-visual-description">
              Your skill journey continues.
              Get back to learning and building.
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
            onClick={() => navigate("/student-login")}
          >
            ← Back to login
          </button>

          {!submitted ? (
            <>
              <div className="auth-heading">

                <p>RESET PASSWORD</p>

                <h2>
                  Forgot your password?
                </h2>

                <span>
                  Enter your email and we'll help you get back in.
                </span>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-group">

                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                  />

                </div>

                <button
                  className="auth-submit"
                  type="submit"
                >
                  Send Reset Link
                  <span>→</span>
                </button>

              </form>
            </>
          ) : (
            <div className="auth-heading">

              <p>EMAIL SENT</p>

              <h2>
                Check your inbox.
              </h2>

              <span>
                If an account exists with that email,
                you'll receive a password reset link.
              </span>

              <button
                className="auth-submit"
                type="button"
                onClick={() => navigate("/student-login")}
              >
                Back to Login
                <span>→</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;