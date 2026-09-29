import { useNavigate } from "react-router-dom";
import "../pages/Auth.css";

function StudentRegister() {
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

            <p>START YOUR JOURNEY</p>

            <h1>
              Learn.
              <br />
              Build.
              <br />
              <span>Grow.</span>
            </h1>

            <p className="auth-visual-description">
              Create your profile and start building
              skills that matter beyond the classroom.
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

            <p>STUDENT REGISTRATION</p>

            <h2>Create your account.</h2>

            <span>
              Start your skill journey with Zentrion.
            </span>

          </div>


          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/student-dashboard");
            }}
          >

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>


            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>


            <div className="form-group">
              <label>Department</label>

              <select required defaultValue="">
                <option value="" disabled>
                  Select your department
                </option>

                <option>Computer Science</option>
                <option>Computer Science & Business Systems</option>
                <option>ECE</option>
                <option>Mechanical</option>
                <option>Civil</option>
                <option>AI & Data Science</option>
                <option>AI & Machine Learning</option>
              </select>
            </div>


            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                required
              />
            </div>


            <button
              className="auth-submit"
              type="submit"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          <p className="auth-signup">

            Already have an account?

            <button
              type="button"
              onClick={() => navigate("/student-login")}
            >
              Login
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default StudentRegister;