import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">
          <h3>Zentrion<span>.</span></h3>

          <p>
            Learn. Practice. Prove. Improve.
          </p>

          <p className="footer-tagline">
            Building the next generation of
            industry-ready engineers.
          </p>

          <a
            className="footer-company-link"
            href="https://zentriontechnologies.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zentrion Technologies ↗
          </a>
        </div>

        {/* Platform */}
        <div className="footer-column">
          <h4>Platform</h4>

          <a href="/">Home</a>
          <a href="/problems">Problems</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/domain/cs">Domains</a>
          <a href="/projects">Projects</a>
        </div>

        {/* Learn */}
        <div className="footer-column">
          <h4>Learn</h4>

          <a href="/learn">Learn</a>
          <a href="/practice">Practice</a>
          <a href="/assess">Assess</a>
          <a href="/ai-mentor">AI Mentor</a>
          <a href="/skill-progress">Skill Progress</a>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h4>Company</h4>

          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/careers">Careers</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Zentrion Technologies. All rights reserved.
        </p>

        <div className="footer-socials">
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="GitHub">GH</a>
          <a href="#" aria-label="Instagram">ig</a>
        </div>

      </div>

    </footer>
  );
}

export default Footer;