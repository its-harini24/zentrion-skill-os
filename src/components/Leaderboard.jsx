import { useNavigate } from "react-router-dom";
import "./Leaderboard.css";

function Leaderboard() {
  const navigate = useNavigate();

  const leaders = [
    {
      rank: 1,
      name: "Priya",
      initials: "P",
      xp: "1,240",
      solved: 48,
    },
    {
      rank: 2,
      name: "Arjun",
      initials: "A",
      xp: "1,180",
      solved: 45,
    },
    {
      rank: 3,
      name: "Harini",
      initials: "H",
      xp: "1,120",
      solved: 42,
    },
    {
      rank: 4,
      name: "Rahul",
      initials: "R",
      xp: "1,050",
      solved: 39,
    },
    {
      rank: 5,
      name: "Meera",
      initials: "M",
      xp: "980",
      solved: 36,
    },
  ];

  return (
    <section className="leaderboard-section">

      <div className="leaderboard-heading">

        <p className="leaderboard-label">
          COMPETE & GROW
        </p>

        <h2>
          Learn together.
          <span> Grow together.</span>
        </h2>

        <p>
          Challenge yourself, track your progress, and see how
          your skills grow alongside other learners.
        </p>

      </div>

      <div className="leaderboard-layout">

        <div className="leaderboard-content">

          <div className="leaderboard-intro">

            <span className="leaderboard-badge">
              WEEKLY
            </span>

            <h3>
              Engineering
              <br />
              Leaderboard
            </h3>

            <p>
              Earn XP by solving problems, completing learning
              activities, and building projects.
            </p>

          </div>

          <div className="leaderboard-stats">

            <div>
              <strong>42</strong>
              <span>Problems Solved</span>
            </div>

            <div>
              <strong>1,120</strong>
              <span>XP Earned</span>
            </div>

            <div>
              <strong>#3</strong>
              <span>Current Rank</span>
            </div>

          </div>

          <button
            className="leaderboard-button"
            onClick={() => navigate("/student-dashboard")}
          >
            View Leaderboard
            <span>→</span>
          </button>

        </div>

        <div className="leaderboard-card">

          <div className="leaderboard-card-header">
            <div>
              <span>THIS WEEK</span>
              <h3>Top Learners</h3>
            </div>

            <span className="leaderboard-trophy">
              🏆
            </span>
          </div>

          <div className="leaderboard-list">

            {leaders.map((leader) => (
              <div
                className={`leaderboard-row ${
                  leader.rank <= 3 ? "top-rank" : ""
                }`}
                key={leader.rank}
              >

                <div className="leaderboard-rank">
                  {leader.rank <= 3
                    ? ["🥇", "🥈", "🥉"][leader.rank - 1]
                    : leader.rank}
                </div>

                <div className="leaderboard-avatar">
                  {leader.initials}
                </div>

                <div className="leaderboard-user">
                  <strong>{leader.name}</strong>
                  <span>{leader.solved} problems solved</span>
                </div>

                <div className="leaderboard-xp">
                  <strong>{leader.xp}</strong>
                  <span>XP</span>
                </div>

              </div>
            ))}

          </div>

          <div className="leaderboard-footer">
            <span>Your current position</span>
            <strong>#3 · 1,120 XP</strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Leaderboard;