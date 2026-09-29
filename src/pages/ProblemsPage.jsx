import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "./DemoPages.css";

function ProblemsPage() {
  const navigate = useNavigate();

  const problems = [
    {
      domain: "Computer Science",
      difficulty: "Easy",
      title: "Smart Parking Allocation",
      description:
        "Design an algorithm to assign parking spaces based on vehicle type and availability.",
      topics: "Algorithms · Logic",
    },
    {
      domain: "Computer Science",
      difficulty: "Medium",
      title: "Campus Route Optimizer",
      description:
        "Find the most efficient route between important locations inside a large campus.",
      topics: "Graphs · Optimization",
    },
    {
      domain: "Mechanical",
      difficulty: "Medium",
      title: "Machine Load Analysis",
      description:
        "Analyze machine loads and identify operating conditions that may cause excessive stress.",
      topics: "Mechanics · Analysis",
    },
    {
      domain: "ECE",
      difficulty: "Easy",
      title: "Signal Noise Detection",
      description:
        "Identify unusual noise patterns in a sensor signal and determine possible causes.",
      topics: "Signals · Electronics",
    },
    {
      domain: "Civil",
      difficulty: "Medium",
      title: "Traffic Flow Planning",
      description:
        "Analyze traffic movement at a busy intersection and propose an efficient flow strategy.",
      topics: "Transportation · Planning",
    },
    {
      domain: "Civil",
      difficulty: "Hard",
      title: "Structural Load Scenario",
      description:
        "Evaluate a simplified structural scenario and determine how load distribution affects stability.",
      topics: "Structures · Engineering",
    },
  ];

  return (
    <div className="demo-page">

      <header className="demo-navbar">

        <button
          className="demo-logo"
          onClick={() => navigate("/")}
        >
          Zentrion<span>.</span>
        </button>

        <div className="demo-nav-actions">

          <ThemeToggle />

          <button
            className="demo-back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

        </div>

      </header>


      <main className="demo-main">

        <section className="demo-hero">

          <p className="demo-eyebrow">
            REAL-WORLD PRACTICE
          </p>

          <h1>
            Engineering problems.
            <span> Real challenges.</span>
          </h1>

          <p>
            Practice scenario-based challenges inspired by
            situations engineers face in the real world.
          </p>

        </section>


        <div className="demo-filters">

          <button className="demo-filter active">
            All Domains
          </button>

          <button className="demo-filter">
            Computer Science
          </button>

          <button className="demo-filter">
            Mechanical
          </button>

          <button className="demo-filter">
            ECE
          </button>

          <button className="demo-filter">
            Civil
          </button>

        </div>


        <section className="demo-grid">

          {problems.map((problem) => (

            <article
              className="demo-card"
              key={problem.title}
            >

              <div className="demo-card-top">

                <span className="demo-domain">
                  {problem.domain}
                </span>

                <span
                  className={`demo-difficulty ${problem.difficulty.toLowerCase()}`}
                >
                  {problem.difficulty}
                </span>

              </div>


              <h2>
                {problem.title}
              </h2>

              <p>
                {problem.description}
              </p>


              <div className="demo-card-bottom">

                <span>
                  {problem.topics}
                </span>

                <button
                  onClick={() => {
                    alert(
                      "Challenge preview — problem solving interface can be added here."
                    );
                  }}
                >
                  View Challenge →
                </button>

              </div>

            </article>

          ))}

        </section>

      </main>

    </div>
  );
}

export default ProblemsPage;