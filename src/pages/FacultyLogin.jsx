import "./Auth.css";

function FacultyLogin() {
  return (
    <div className="auth-page faculty-auth">
      <div className="auth-card">
        <p className="auth-label">Zentrion · Faculty</p>

        <h1>Welcome back</h1>

        <p className="auth-description">
          Login to manage learning, assessments and student progress.
        </p>

        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p className="auth-switch">
          Don't have an account? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default FacultyLogin;