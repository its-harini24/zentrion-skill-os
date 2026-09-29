import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "./DemoPages.css";

function ProjectsPage() {
  const navigate = useNavigate();

  const projects = [
    {
      category: "Computer Science",
      level: "Starter",
      title: "Campus Skill Tracker",
      description:
        "Build a simple application that helps students track their skills, practice progress and learning goals.",
      stack: "React · JavaScript",
    },
    {
      category: "Computer Science",
      level: "Intermediate",
      title: "Smart Problem Recommender",
      description:
        "Design a recommendation interface that suggests practice problems based on a learner's progress.",
      stack: "React · Python",
    },
    {
      category: "Cross Domain",
      level: "Challenge",
      title: "Campus Problem Solver",
      description:
        "Identify a real campus problem and design a technology-based solution from idea to prototype.",
      stack: "Open ended",
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
            BUILD YOUR PORTFOLIO
          </p>

          <h1>
            Turn skills into
            <span> something real.</span>
          </h1>

          <p>
            Build practical projects that help you apply what
            you learn and create work you can showcase.
          </p>

        </section>


        <div className="demo-project-banner">

          <div>

            <span>
              PROJECT-BASED LEARNING
            </span>

            <h2>
              Learn → Build → Showcase
            </h2>

          </div>

          <div className="demo-banner-mark">
            ✦
          </div>

        </div>


        <section className="demo-grid">

          {projects.map((project) => (

            <article
              className="demo-card"
              key={project.title}
            >

              <div className="demo-card-top">

                <span className="demo-domain">
                  {project.category}
                </span>

                <span className="demo-difficulty medium">
                  {project.level}
                </span>

              </div>


              <h2>
                {project.title}
              </h2>

              <p>
                {project.description}
              </p>


              <div className="demo-card-bottom">

                <span>
                  {project.stack}
                </span>

                <button
                  onClick={() => {
                    alert(
                      "Project preview — project workspace can be added here."
                    );
                  }}
                >
                  View Project →
                </button>

              </div>

            </article>

          ))}

        </section>

      </main>

    </div>
  );
}

export default ProjectsPage;