
import { useNavigate, useParams } from "react-router-dom";
import domains from "../../data/domains";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import "../practice/DemoPages.css";

const departmentContent = {
  cs: {
    tagline: "CODE. CREATE. SOLVE.",
    title: "Build your future in",
    highlight: "Computer Science.",
    intro:
      "Strengthen your programming skills, solve real-world problems, and turn your ideas into working projects.",
    tracks: [
      { icon: "☕", title: "Java Programming", text: "OOP, classes, inheritance and clean coding." },
      { icon: "🧩", title: "Data Structures", text: "Arrays, linked lists, trees and algorithms." },
      { icon: "🌐", title: "Web Development", text: "Build responsive interfaces and web applications." },
      { icon: "🤖", title: "AI & Machine Learning", text: "Explore intelligent systems and practical AI." },
    ],
    challenges: [
      { level: "EASY", title: "Student Record Manager", text: "Practice classes, objects and data handling.", tag: "Java" },
      { level: "MEDIUM", title: "Campus Route Optimizer", text: "Apply graph concepts to find efficient routes.", tag: "DSA" },
      { level: "MEDIUM", title: "Smart Campus Dashboard", text: "Create a useful interface for campus life.", tag: "Web" },
    ],
    projects: [
      { icon: "📊", title: "Student Skill Tracker", text: "Track learning goals and skill progress." },
      { icon: "💡", title: "AI Project Recommender", text: "Recommend projects based on student interests." },
    ],
  },

  mech: {
    tagline: "DESIGN. BUILD. IMPROVE.",
    title: "Build your future in",
    highlight: "Mechanical Engineering.",
    intro:
      "Explore engineering design, manufacturing concepts, mechanical systems and practical problem-solving.",
    tracks: [
      { icon: "📐", title: "CAD & Design", text: "Explore technical drawing and 3D modelling." },
      { icon: "⚙️", title: "Machine Design", text: "Understand mechanisms and machine components." },
      { icon: "🏭", title: "Manufacturing", text: "Learn production methods and process planning." },
      { icon: "🔩", title: "Thermal Systems", text: "Explore heat transfer and thermodynamics." },
    ],
    challenges: [
      { level: "EASY", title: "Workshop Tool Planner", text: "Organise tools for a small workshop.", tag: "Design" },
      { level: "MEDIUM", title: "Machine Load Analysis", text: "Explore loads and mechanical performance.", tag: "Mechanics" },
      { level: "HARD", title: "Production Flow Planner", text: "Improve a sample manufacturing workflow.", tag: "Manufacturing" },
    ],
    projects: [
      { icon: "⚙️", title: "Mechanical Parts Catalogue", text: "Organise components and their specifications." },
      { icon: "🏭", title: "Workshop Planner", text: "Design a tool and workspace planning interface." },
    ],
  },

  ece: {
    tagline: "CONNECT. DESIGN. INNOVATE.",
    title: "Build your future in",
    highlight: "Electronics & Communication.",
    intro:
      "Explore circuits, digital systems, embedded technology and communication through practical challenges.",
    tracks: [
      { icon: "🔌", title: "Circuit Fundamentals", text: "Understand components and circuit behaviour." },
      { icon: "💡", title: "Digital Electronics", text: "Explore logic gates and digital systems." },
      { icon: "📡", title: "Communication Systems", text: "Learn signal and communication fundamentals." },
      { icon: "🔧", title: "Embedded Systems", text: "Discover microcontrollers and connected devices." },
    ],
    challenges: [
      { level: "EASY", title: "Logic Gate Explorer", text: "Practise digital logic and truth tables.", tag: "Digital" },
      { level: "MEDIUM", title: "Signal Noise Detection", text: "Explore a sample signal analysis problem.", tag: "Signals" },
      { level: "HARD", title: "Smart Sensor Monitor", text: "Plan a sensor-based monitoring system.", tag: "Embedded" },
    ],
    projects: [
      { icon: "📡", title: "Signal Visualiser", text: "Create a visual guide to sample signals." },
      { icon: "🌱", title: "Smart Sensor Dashboard", text: "Design a dashboard for sensor readings." },
    ],
  },

  civil: {
    tagline: "PLAN. DESIGN. BUILD.",
    title: "Build your future in",
    highlight: "Civil Engineering.",
    intro:
      "Explore structural concepts, construction planning, materials and practical infrastructure challenges.",
    tracks: [
      { icon: "🏗️", title: "Structural Engineering", text: "Understand loads and structural behaviour." },
      { icon: "📏", title: "Surveying", text: "Explore measurement and site planning." },
      { icon: "🧱", title: "Construction Materials", text: "Learn about materials and their applications." },
      { icon: "🌍", title: "Sustainable Infrastructure", text: "Discover practical approaches to better infrastructure." },
    ],
    challenges: [
      { level: "EASY", title: "Material Estimator", text: "Estimate materials for a sample project.", tag: "Materials" },
      { level: "MEDIUM", title: "Structural Load Scenario", text: "Explore loads in a sample structure.", tag: "Structures" },
      { level: "HARD", title: "Site Planning Challenge", text: "Plan an efficient layout for a sample site.", tag: "Planning" },
    ],
    projects: [
      { icon: "🏗️", title: "Construction Cost Planner", text: "Organise sample quantities and cost estimates." },
      { icon: "🌿", title: "Sustainable Campus Plan", text: "Design an eco-friendly campus concept." },
    ],
  },
};

function DepartmentArtwork({ departmentId, departmentNumber }) {
  return (
    <div
      className={`department-hero-art department-art-${departmentId}`}
      aria-hidden="true"
    >
      <div className="department-art-orbit orbit-one" />
      <div className="department-art-orbit orbit-two" />

      {departmentId === "cs" && (
        <div className="art-visual art-cs">
          <div className="cs-window">
            <div className="art-window-dots">
              <i />
              <i />
              <i />
            </div>

            <div className="cs-code">
              <span><b>01</b> <i>class</i> <strong>Future</strong> {"{"}</span>
              <span><b>02</b> &nbsp; buildSkills();</span>
              <span><b>03</b> &nbsp; solveProblems();</span>
              <span><b>04</b> &nbsp; createIdeas();</span>
              <span><b>05</b> {"}"}</span>
              <span className="cs-cursor">_</span>
            </div>
          </div>

          <div className="art-float-chip cs-chip-one">{"</>"}</div>
          <div className="art-float-chip cs-chip-two">AI ✦</div>
          <div className="art-data-node node-one" />
          <div className="art-data-node node-two" />
        </div>
      )}

      {departmentId === "mech" && (
        <div className="art-visual art-mech">
          <div className="mech-blueprint">
            <span className="mech-cross cross-one" />
            <span className="mech-cross cross-two" />
            <div className="mech-gear gear-large">⚙</div>
            <div className="mech-gear gear-small">⚙</div>
            <div className="mech-ring" />
            <span className="mech-dimension dimension-top" />
            <span className="mech-dimension dimension-side" />
          </div>

          <div className="art-float-chip mech-chip">PRECISION / 01</div>
          <div className="art-data-node node-one" />
        </div>
      )}

      {departmentId === "ece" && (
        <div className="art-visual art-ece">
          <div className="ece-chip">
            <span className="ece-chip-pin pin-top" />
            <span className="ece-chip-pin pin-bottom" />
            <span className="ece-chip-pin pin-left" />
            <span className="ece-chip-pin pin-right" />

            <div className="ece-chip-core">µ</div>
            <span className="ece-chip-label">SIGNAL / 01</span>
          </div>

          <svg
            className="ece-wave"
            viewBox="0 0 300 100"
            fill="none"
          >
            <path
              className="ece-wave-track"
              d="M0 50 H45 L60 50 L75 18 L95 82 L115 30 L135 68 L150 50 H190 L205 15 L225 85 L245 50 H300"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="art-float-chip ece-chip-label-float">
            LIVE SIGNAL
          </div>
          <div className="art-data-node node-one" />
          <div className="art-data-node node-two" />
        </div>
      )}

      {departmentId === "civil" && (
        <div className="art-visual art-civil">
          <div className="civil-ground" />

          <div className="civil-building building-back">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="civil-building building-front">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="civil-measure measure-horizontal" />
          <div className="civil-measure measure-vertical" />
          <div className="art-float-chip civil-chip">STRUCTURE / 01</div>
          <div className="art-data-node node-one" />
        </div>
      )}

      <div className="department-art-label label-top">
        <span className="department-status-dot" />
        LEARN BY DOING
      </div>

      <div className="department-art-label label-bottom">
        <span>✦</span> Skills into practice
      </div>

      <div className="department-art-number">{departmentNumber}</div>
    </div>
  );
}

function DomainPage() {
  const { domainName } = useParams();
  const navigate = useNavigate();

  const domain = domains.find((item) => item.id === domainName);
  const content = departmentContent[domainName];

  if (!domain || !content) {
    return (
      <main className="department-not-found">
        <h1>Department not found</h1>
        <p>Choose a department from the Zentrion Skill OS homepage.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </main>
    );
  }

  const departmentNumber = String(
    domains.findIndex((item) => item.id === domain.id) + 1
  ).padStart(2, "0");

  return (
    <div className="demo-page department-page">
      <header className="demo-navbar">
        <button
          className="department-logo-button"
          onClick={() => navigate("/")}
          aria-label="Zentrion home"
        >
          <img
            src="/src/assets/zentrion-logo.png"
            alt="Zentrion Learntech"
            className="department-logo"
          />
        </button>

        <div className="department-nav-actions">
          <ThemeToggle />
          <button
            className="demo-back-button"
            onClick={() => navigate("/")}
          >
            ← Home
          </button>
        </div>
      </header>

      <main className="department-main">
        <section className="department-hero">
          <div className="department-hero-copy">
            <p className="demo-eyebrow">{content.tagline}</p>

            <div className="department-breadcrumb">
              <span>Domains</span>
              <span>/</span>
              <span>{domain.name}</span>
            </div>

            <h1>
              {content.title}
              <span>{content.highlight}</span>
            </h1>

            <p className="department-intro">{content.intro}</p>

            <div className="department-hero-actions">
              <button
                className="department-primary-button"
                onClick={() => navigate(domain.id === "ece" ? "/circuit-simulator" : "/problems")}
              >
                {domain.id === "ece" ? "Open Circuit Lab ⚡" : "Start Practicing"} <span>→</span>
              </button>

              <button
                className="department-secondary-button"
                onClick={() => navigate(domain.id === "ece" ? "/circuit-simulator" : "/projects")}
              >
                {domain.id === "ece" ? "Circuit Simulator" : "Explore Projects"}
              </button>
            </div>

            <div className="department-hero-meta">
              <span>{domain.problemCount}</span>
              <span>4 skill tracks</span>
              <span>Project-based learning</span>
            </div>
          </div>

          <DepartmentArtwork
            departmentId={domain.id}
            departmentNumber={departmentNumber}
          />
        </section>

        <section className="department-overview">
          <div>
            <span>YOUR DOMAIN</span>
            <strong>{domain.name}</strong>
            <p>Explore skills that matter for your field.</p>
          </div>

          <div>
            <span>PRACTICE LIBRARY</span>
            <strong>{domain.problemCount}</strong>
            <p>Sample challenges to build confidence.</p>
          </div>

          <div>
            <span>LEARNING APPROACH</span>
            <strong>Learn → Build</strong>
            <p>Connect concepts with practical work.</p>
          </div>
        </section>

        <section className="department-section">
          <div className="department-section-heading">
            <div>
              <p className="demo-eyebrow">BUILD YOUR FOUNDATION</p>
              <h2>Explore skill tracks</h2>
              <span>
                Choose an area and start strengthening your skills.
              </span>
            </div>

            <button
              className="department-text-button"
              onClick={() => navigate("/skill-analysis")}
            >
              View skill analysis →
            </button>
          </div>

          <div className="department-track-grid">
            {content.tracks.map((track, index) => (
              <article className="department-track-card" key={track.title}>
                <div className="department-track-top">
                  <span className="department-track-icon">{track.icon}</span>
                  <span className="department-track-number">
                    0{index + 1}
                  </span>
                </div>

                <h3>{track.title}</h3>
                <p>{track.text}</p>

                <button onClick={() => navigate("/problems")}>
                  Explore track <span>↗</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="department-section">
          <div className="department-section-heading">
            <div>
              <p className="demo-eyebrow">PUT YOUR KNOWLEDGE TO WORK</p>
              <h2>Practice real-world challenges</h2>
              <span>
                Try these sample challenges for your department.
              </span>
            </div>

            <button
              className="department-text-button"
              onClick={() => navigate("/problems")}
            >
              View all challenges →
            </button>
          </div>

          <div className="department-challenge-list">
            {content.challenges.map((challenge, index) => (
              <article
                className="department-challenge-card"
                key={challenge.title}
              >
                <div className="department-challenge-index">
                  0{index + 1}
                </div>

                <div className="department-challenge-copy">
                  <div className="department-challenge-meta">
                    <span>{challenge.tag}</span>
                    <span
                      className={`department-level ${challenge.level.toLowerCase()}`}
                    >
                      {challenge.level}
                    </span>
                  </div>

                  <h3>{challenge.title}</h3>
                  <p>{challenge.text}</p>
                </div>

                <button
                  className="department-open-button"
                  aria-label={`Explore ${challenge.title}`}
                  onClick={() => navigate(domain.id === "ece" ? "/circuit-simulator" : "/problems")}
                >
                  →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="department-section department-project-section">
          <div className="department-section-heading">
            <div>
              <p className="demo-eyebrow">LEARN THROUGH BUILDING</p>
              <h2>Project ideas for you</h2>
              <span>
                Turn what you learn into something you can showcase.
              </span>
            </div>

            <button
              className="department-text-button"
              onClick={() => navigate("/projects")}
            >
              Explore projects →
            </button>
          </div>

          <div className="department-project-grid">
            {content.projects.map((project) => (
              <article
                className="department-project-card"
                key={project.title}
              >
                <div className="department-project-icon">{project.icon}</div>

                <div className="department-project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </div>

                <button
                  onClick={() => navigate("/projects")}
                  aria-label={`Explore ${project.title}`}
                >
                  ↗
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="department-cta">
          <div>
            <p className="demo-eyebrow">YOUR NEXT STEP STARTS HERE</p>
            <h2>Ready to put your skills into practice?</h2>
            <p>Pick a challenge, explore a project, and keep building.</p>
          </div>

          <button
            className="department-primary-button"
            onClick={() => navigate("/problems")}
          >
            Explore Challenges <span>→</span>
          </button>
        </section>

        <footer className="department-footer">
          <button
            className="department-logo-button"
            onClick={() => navigate("/")}
            aria-label="Zentrion home"
          >
            <img
              src="/src/assets/zentrion-logo.png"
              alt="Zentrion Learntech"
              className="department-logo"
            />
          </button>

          <span>Learn. Practice. Build. Grow.</span>
        </footer>
      </main>
    </div>
  );
}

export default DomainPage;
