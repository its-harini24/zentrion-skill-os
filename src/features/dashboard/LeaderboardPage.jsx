import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import leaderboardQuotes from "../../data/leaderboardQuotes";
import "./LeaderboardPage.css";

const leaderboardData = [
  {
    id: 1,
    name: "Priya",
    initials: "P",
    domain: "Java",
    weeklyXP: 1240,
    monthlyXP: 4200,
    overallXP: 8200,
    solved: 48,
    previousRank: 1,
  },
  {
    id: 2,
    name: "Arjun",
    initials: "A",
    domain: "Python",
    weeklyXP: 1180,
    monthlyXP: 3900,
    overallXP: 7900,
    solved: 45,
    previousRank: 2,
  },
  {
    id: 3,
    name: "Harini",
    initials: "H",
    domain: "Web Development",
    weeklyXP: 1120,
    monthlyXP: 3650,
    overallXP: 7500,
    solved: 42,
    isCurrentUser: true,
    previousRank: 5,
  },
  {
    id: 4,
    name: "Rahul",
    initials: "R",
    domain: "Java",
    weeklyXP: 1050,
    monthlyXP: 3400,
    overallXP: 7100,
    solved: 39,
    previousRank: 4,
  },
  {
    id: 5,
    name: "Meera",
    initials: "M",
    domain: "Python",
    weeklyXP: 980,
    monthlyXP: 3200,
    overallXP: 6800,
    solved: 36,
    previousRank: 3,
  },
  {
    id: 6,
    name: "Karthik",
    initials: "K",
    domain: "Web Development",
    weeklyXP: 920,
    monthlyXP: 3000,
    overallXP: 6500,
    solved: 34,
    previousRank: 6,
  },
];

function LeaderboardPage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("weekly");
  const [domain, setDomain] = useState("All Domains");

  const xpKey = `${period}XP`;

  const filteredLeaders = useMemo(
    () =>
      leaderboardData
        .filter(
          (student) => domain === "All Domains" || student.domain === domain
        )
        .sort((a, b) => b[xpKey] - a[xpKey])
        .map((student, index) => ({
          ...student,
          rank: index + 1,
        })),
    [domain, xpKey]
  );

  const currentUser = filteredLeaders.find((student) => student.isCurrentUser) || null;

  // Genuine rank improvement notification (only when actual ranking data confirms improvement)
  const [showRankToast, setShowRankToast] = useState(false);
  const [toastData, setToastData] = useState(null);

  useEffect(() => {
    if (!currentUser || !currentUser.previousRank) {
      setShowRankToast(false);
      return;
    }

    const { rank, previousRank, id, name } = currentUser;
    // Genuine improvement: current rank is better/lower number than previous rank
    const hasImproved = previousRank > rank;

    if (hasImproved) {
      const userKey = id || name;
      const storageKey = `zentrion_rank_notified_${userKey}_${period}`;
      const lastNotified = localStorage.getItem(storageKey);

      // Only notify if this exact improved rank hasn't been acknowledged yet
      if (lastNotified !== String(rank)) {
        setToastData({
          previousRank,
          currentRank: rank,
          delta: previousRank - rank,
        });
        setShowRankToast(true);

        // Record in localStorage so opening or refreshing the page will never repeatedly pop up
        localStorage.setItem(storageKey, String(rank));

        const timer = setTimeout(() => {
          setShowRankToast(false);
        }, 6500);

        return () => clearTimeout(timer);
      }
    } else {
      setShowRankToast(false);
    }
  }, [currentUser, period]);

  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * leaderboardQuotes.length);
    return leaderboardQuotes[randomIndex];
  });

  const currentUserMovement =
    currentUser && currentUser.previousRank && currentUser.previousRank > currentUser.rank
      ? `↑ ${currentUser.previousRank - currentUser.rank} position${
          currentUser.previousRank - currentUser.rank > 1 ? "s" : ""
        }`
      : null;

  return (
    <main className="leaderboard-page">
      {/* Genuine Rank Improvement Achievement Pop-up */}
      {showRankToast && toastData && (
        <aside
          className="rank-achievement-toast"
          role="status"
          aria-live="polite"
        >
          <div className="rank-achievement-header">
            <div className="rank-achievement-title">
              <span className="rank-achievement-icon" aria-hidden="true">🚀</span>
              <strong>You&apos;re Moving Up!</strong>
            </div>
            <button
              type="button"
              className="rank-achievement-close"
              onClick={() => setShowRankToast(false)}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>

          <div className="rank-achievement-badges">
            <span className="rank-badge-pill rank-badge-prev">
              Rank #{toastData.previousRank}
            </span>
            <span className="rank-badge-arrow" aria-hidden="true">→</span>
            <span className="rank-badge-pill rank-badge-new">
              Rank #{toastData.currentRank}
            </span>
            <span className="rank-badge-gain">
              +{toastData.delta} {toastData.delta === 1 ? "spot" : "spots"}!
            </span>
          </div>

          <p className="rank-achievement-desc">
            Your hard work is paying off. Keep solving problems and reach the next milestone!
          </p>
        </aside>
      )}

      {/* Compact Header */}
      <header className="leaderboard-page-header">
        <div className="leaderboard-header-top">
          <button
            type="button"
            className="leaderboard-page-back"
            onClick={() => navigate("/student-dashboard")}
          >
            ← Back to Dashboard
          </button>

          {currentUser && (
            <div className="leaderboard-user-badge">
              <span className="user-badge-rank">Your Rank: <strong>#{currentUser.rank}</strong></span>
              <span className="user-badge-sep">•</span>
              <span className="user-badge-xp"><strong>{currentUser[xpKey].toLocaleString("en-IN")}</strong> XP</span>
              <span className="user-badge-sep">•</span>
              <span className="user-badge-solved"><strong>{currentUser.solved}</strong> Solved</span>
            </div>
          )}
        </div>

        <div className="leaderboard-page-intro">
          <div className="leaderboard-intro-content">
            <span className="leaderboard-page-kicker">COMPETE • LEARN • GROW</span>
            <h1>Leaderboard</h1>
            <p>
              Track your progress, compare your performance, and celebrate your
              learning achievements.
            </p>
          </div>
        </div>
      </header>

      {/* Main Leaderboard Rankings - Visible Immediately Without Scrolling */}
      <section className="leaderboard-page-content">
        <div className="leaderboard-page-toolbar">
          <div className="leaderboard-toolbar-title">
            <h2>Top Learners</h2>
            <p>Rankings update dynamically as you solve problems and earn XP.</p>
          </div>

          <div className="leaderboard-page-filters">
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              aria-label="Select ranking period"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="overall">Overall</option>
            </select>

            <select
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              aria-label="Filter by domain"
            >
              <option>All Domains</option>
              <option>Java</option>
              <option>Python</option>
              <option>Web Development</option>
            </select>
          </div>
        </div>

        <div className="leaderboard-page-table-wrapper">
          <table className="leaderboard-page-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>STUDENT</th>
                <th>DOMAIN</th>
                <th>PROBLEMS SOLVED</th>
                <th>XP EARNED</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaders.map((student) => {
                const isCurrent = student.isCurrentUser;

                return (
                  <tr
                    key={student.id}
                    className={[
                      "leaderboard-page-row",
                      isCurrent ? "leaderboard-page-current" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <td>
                      <div className="leaderboard-page-rank-stack">
                        <span className="leaderboard-page-rank">
                          {student.rank <= 3
                            ? ["🥇", "🥈", "🥉"][student.rank - 1]
                            : `#${student.rank}`}
                        </span>
                        {isCurrent && currentUserMovement ? (
                          <span className="leaderboard-page-rank-trend">
                            {currentUserMovement}
                          </span>
                        ) : null}
                      </div>
                    </td>

                    <td>
                      <div className="leaderboard-page-student">
                        <div className="leaderboard-page-avatar">{student.initials}</div>
                        <div className="leaderboard-page-name-wrap">
                          <strong>
                            {student.name}
                            {isCurrent && (
                              <span className="leaderboard-page-you">You</span>
                            )}
                          </strong>
                        </div>
                      </div>
                    </td>

                    <td>{student.domain}</td>
                    <td>{student.solved}</td>

                    <td>
                      <strong className="leaderboard-page-xp">
                        {student[xpKey].toLocaleString("en-IN")} XP
                      </strong>
                    </td>
                  </tr>
                );
              })}

              {filteredLeaders.length === 0 && (
                <tr>
                  <td colSpan="5" className="leaderboard-page-empty">
                    No students found for this domain.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Compact Motivational Quote - Positioned cleanly below the table */}
        <div className="leaderboard-page-quote-compact">
          <span className="quote-compact-icon" aria-hidden="true">💡</span>
          <span className="quote-compact-label">Daily Motivation:</span>
          <p className="quote-compact-text">“{quote}”</p>
        </div>

        <p className="leaderboard-page-note">
          Rankings shown here use sample data for frontend development.
        </p>
      </section>
    </main>
  );
}

export default LeaderboardPage;
