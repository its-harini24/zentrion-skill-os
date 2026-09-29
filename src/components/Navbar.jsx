import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

function Navbar() {
  const [domainsOpen, setDomainsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDomainsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeDomains = () => {
    setDomainsOpen(false);
  };

  return (
    <nav className="navbar">

      {/* =========================
          LEFT — LOGO
      ========================= */}
      <Link to="/" className="navbar-logo">
        <div className="navbar-logo-mark">Z</div>

        <span className="navbar-logo-name">
          Zentrion
        </span>
      </Link>


      {/* =========================
          CENTER — DOMAINS
      ========================= */}
      <div className="navbar-center">

        <div
          className={`nav-dropdown ${
            domainsOpen ? "dropdown-open" : ""
          }`}
          ref={dropdownRef}
        >
          <button
            type="button"
            className="dropdown-trigger"
            onClick={() => setDomainsOpen((previous) => !previous)}
            aria-expanded={domainsOpen}
          >
            <span>Domains</span>

            <span className="dropdown-arrow"></span>
          </button>


          {domainsOpen && (
            <div className="dropdown-menu">

              <Link
                to="/domain/cs"
                onClick={closeDomains}
              >
                <span className="domain-menu-icon">
                  💻
                </span>

                <div>
                  <strong>Computer Science</strong>
                  <small>
                    Programming & Software
                  </small>
                </div>
              </Link>


              <Link
                to="/domain/mech"
                onClick={closeDomains}
              >
                <span className="domain-menu-icon">
                  ⚙️
                </span>

                <div>
                  <strong>Mechanical</strong>
                  <small>
                    Design & Manufacturing
                  </small>
                </div>
              </Link>


              <Link
                to="/domain/ece"
                onClick={closeDomains}
              >
                <span className="domain-menu-icon">
                  📡
                </span>

                <div>
                  <strong>ECE</strong>
                  <small>
                    Electronics & Communication
                  </small>
                </div>
              </Link>


              <Link
                to="/domain/civil"
                onClick={closeDomains}
              >
                <span className="domain-menu-icon">
                  🏗️
                </span>

                <div>
                  <strong>Civil</strong>
                  <small>
                    Structures & Construction
                  </small>
                </div>
              </Link>

            </div>
          )}
        </div>

      </div>


      {/* =========================
          RIGHT — SETTINGS + AUTH
      ========================= */}
      <div className="navbar-right">

        <ThemeToggle />

        <div className="auth-switch">

          <Link
            to="/student-login"
            className="auth-option auth-login"
          >
            Login
          </Link>

          <Link
            to="/role-selection"
            className="auth-option auth-signup"
          >
            Get Started
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;