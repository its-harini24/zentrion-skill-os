import { useEffect, useRef, useState } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("zentrion-theme") || "light"
  );

  const [open, setOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    localStorage.setItem("zentrion-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setOpen(false);
  };

  return (
    <div className="theme-settings" ref={settingsRef}>
      <button
        className="theme-settings-button"
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label="Theme settings"
        title="Theme settings"
      >
        <span className="settings-icon">⚙</span>
        <span>Settings</span>
      </button>

      {open && (
        <div className="theme-settings-menu">
          <div className="theme-menu-heading">
            <span>Appearance</span>
            <small>Choose your theme</small>
          </div>

          <button
            type="button"
            className={`theme-option ${
              theme === "light" ? "selected" : ""
            }`}
            onClick={() => changeTheme("light")}
          >
            <span className="theme-option-icon">☀</span>

            <div>
              <strong>Light</strong>
              <small>Bright interface</small>
            </div>

            {theme === "light" && (
              <span className="theme-check">✓</span>
            )}
          </button>

          <button
            type="button"
            className={`theme-option ${
              theme === "dark" ? "selected" : ""
            }`}
            onClick={() => changeTheme("dark")}
          >
            <span className="theme-option-icon">☾</span>

            <div>
              <strong>Dark</strong>
              <small>Easy on the eyes</small>
            </div>

            {theme === "dark" && (
              <span className="theme-check">✓</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ThemeToggle;