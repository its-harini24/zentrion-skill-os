import "./Hero.css";

function Hero() {
  const handleChooseBranch = () => {
    const domainSection = document.getElementById("domains");

    if (domainSection) {
      domainSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero">
      <p className="hero-label">Engineering Skill Platform</p>

      <h1>Practice beyond coding.</h1>

      <p className="hero-description">
        Solve problems, build skills, and practice across
        multiple engineering domains.
      </p>

      <button className="hero-button" onClick={handleChooseBranch}>
        Choose Your Branch
      </button>
    </section>
  );
}

export default Hero;