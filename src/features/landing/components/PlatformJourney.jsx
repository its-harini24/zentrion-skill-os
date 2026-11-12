import "./PlatformJourney.css";

function PlatformJourney() {
  const steps = [
    {
      number: "01",
      title: "Learn",
      description: "Build strong foundations with structured learning.",
      icon: "📚",
    },
    {
      number: "02",
      title: "Practice",
      description: "Solve problems and apply what you have learned.",
      icon: "💻",
    },
    {
      number: "03",
      title: "Prove",
      description: "Test your skills through assessments and challenges.",
      icon: "🎯",
    },
    {
      number: "04",
      title: "Improve",
      description: "Identify skill gaps and strengthen your weak areas.",
      icon: "📈",
    },
    {
      number: "05",
      title: "Career",
      description: "Turn your skills into real career opportunities.",
      icon: "🚀",
    },
  ];

  return (
    <section className="journey-section">

      <div className="journey-heading">
        <p className="journey-label">THE ZENTRION JOURNEY</p>

        <h2>
          From learning skills
          <span> to building your career.</span>
        </h2>

        <p className="journey-description">
          One platform to learn, practice, prove your skills,
          and become career ready.
        </p>
      </div>

      <div className="journey-flow">
        {steps.map((step, index) => (
          <div className="journey-step" key={step.number}>

            <div className="journey-number">
              {step.number}
            </div>

            <div className="journey-icon">
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

            {index !== steps.length - 1 && (
              <div className="journey-arrow">→</div>
            )}

          </div>
        ))}
      </div>

    </section>
  );
}

export default PlatformJourney;