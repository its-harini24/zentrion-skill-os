
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import zentrionLogo from "../../assets/zentrion-logo.png";
import { problemsData } from "../../data/problemsData";
import "./DemoPages.css";

function ProblemsPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");

  // Derive unique topics from all problems
  const uniqueTopics = useMemo(() => {
    const topicSet = new Set();
    problemsData.forEach((p) => {
      p.topics.split(" · ").forEach((t) => topicSet.add(t.trim()));
    });
    return Array.from(topicSet).sort();
  }, []);

  const domains = ["All Domains", "Computer Science", "Mechanical", "ECE", "Civil"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filteredProblems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return problemsData.filter((p) => {
      const topicsArr = p.topics.split(" · ").map((t) => t.trim());
      const matchesDifficulty =
        selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const matchesTopic =
        selectedTopic === "All Topics" || topicsArr.includes(selectedTopic);
      const matchesDomain =
        selectedDomain === "All Domains" || p.domain === selectedDomain;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.summary && p.summary.toLowerCase().includes(q)) ||
        p.topics.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q);
      return matchesDifficulty && matchesTopic && matchesDomain && matchesSearch;
    });
  }, [searchQuery, selectedDifficulty, selectedTopic, selectedDomain]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedDifficulty !== "All" ||
    selectedTopic !== "All Topics" ||
    selectedDomain !== "All Domains";

  function clearAllFilters() {
    setSearchQuery("");
    setSelectedDifficulty("All");
    setSelectedTopic("All Topics");
    setSelectedDomain("All Domains");
  }

  return (
    <div className="demo-page problems-page">
      {/* ── NAVBAR ── */}
      <header className="demo-navbar">
        <button
          className="demo-logo-button"
          onClick={() => navigate("/")}
          aria-label="Go to Zentrion home"
        >
          <img
            src={zentrionLogo}
            alt="Zentrion Learntech"
            className="demo-logo-image"
          />
        </button>

        <div className="demo-nav-actions">
          <ThemeToggle />
          <button
            className="demo-back-button"
            onClick={() => navigate("/submissions")}
            title="View submission history"
          >
            📋 Submissions
          </button>
          <button
            className="demo-back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="demo-main">
        {/* Hero */}
        <section className="demo-hero">
          <p className="demo-eyebrow">DSA PRACTICE ARENA</p>
          <h1>
            Practice problems.
            <span> Master algorithms.</span>
          </h1>
          <p>
            Sharpen your skills with handpicked Data Structures &amp; Algorithms
            problems — from arrays and strings to trees, graphs and dynamic
            programming.
          </p>
        </section>

        {/* ── SEARCH BAR ── */}
        <div className="demo-search-wrapper" role="search">
          <span className="demo-search-icon" aria-hidden="true">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            type="search"
            className="demo-search-input"
            placeholder="Search problems by title, topic or keyword…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search problems"
          />

          {searchQuery && (
            <button
              className="demo-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* ── FILTER BAR ── */}
        <div className="problems-filter-bar">
          {/* Difficulty row */}
          <div className="problems-filter-group">
            <span className="problems-filter-label">Difficulty</span>
            <div className="demo-filters">
              {difficulties.map((d) => (
                <button
                  key={d}
                  className={`demo-filter${selectedDifficulty === d ? " active" : ""}`}
                  onClick={() => setSelectedDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Topic row */}
          <div className="problems-filter-group">
            <span className="problems-filter-label">Topic</span>
            <div className="demo-filters">
              <button
                className={`demo-filter${selectedTopic === "All Topics" ? " active" : ""}`}
                onClick={() => setSelectedTopic("All Topics")}
              >
                All Topics
              </button>
              {uniqueTopics.map((t) => (
                <button
                  key={t}
                  className={`demo-filter${selectedTopic === t ? " active" : ""}`}
                  onClick={() => setSelectedTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Domain row */}
          <div className="problems-filter-group">
            <span className="problems-filter-label">Domain</span>
            <div className="demo-filters">
              {domains.map((d) => (
                <button
                  key={d}
                  className={`demo-filter${selectedDomain === d ? " active" : ""}`}
                  onClick={() => setSelectedDomain(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RESULTS INFO ── */}
        <div className="demo-results-info">
          <p>
            Showing <strong>{filteredProblems.length}</strong>{" "}
            {filteredProblems.length === 1 ? "problem" : "problems"}
            {hasActiveFilters && " matching your filters"}
          </p>
          {hasActiveFilters && (
            <button className="problems-clear-filters" onClick={clearAllFilters}>
              Clear all filters
            </button>
          )}
        </div>

        {/* ── PROBLEM CARDS ── */}
        <section className="demo-grid problems-grid" aria-label="Problem list">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, index) => (
              <article className="demo-card problem-card" key={problem.id}>
                <div className="demo-card-top">
                  <span className="problem-number">#{index + 1}</span>
                  <span
                    className={`demo-difficulty ${problem.difficulty.toLowerCase()}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <h2>{problem.title}</h2>

                <p>{problem.summary}</p>

                <div className="problem-topics">
                  {problem.topics.split(" · ").map((t) => (
                    <span className="problem-topic-tag" key={t}>
                      {t.trim()}
                    </span>
                  ))}
                </div>

                <div className="demo-card-bottom">
                  {problem.domain === "ECE" ? (
                    <button
                      className="problem-solve-btn"
                      onClick={() => navigate("/circuit-simulator")}
                      title="Open Interactive Visual Circuit Simulator"
                    >
                      Design Circuit ⚡
                    </button>
                  ) : (
                    <button
                      className="problem-solve-btn"
                      onClick={() =>
                        navigate(`/coding-workspace/${problem.id}`)
                      }
                    >
                      Solve →
                    </button>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="demo-empty-state">
              <span>⌕</span>
              <h2>No problems found</h2>
              <p>
                Try a different search term, difficulty, or topic filter.
              </p>
              <button onClick={clearAllFilters}>Clear all filters</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ProblemsPage;
