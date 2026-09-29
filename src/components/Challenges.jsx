import "./Challenges.css";

function Challenges() {
  return (
    <section className="challenges-section">

      <div className="challenges-heading">
        <p>CHALLENGE YOURSELF</p>

        <h2>
          Practice. Compete.
          <span> Improve.</span>
        </h2>

        <p>
          Take weekly challenges, track your progress,
          and see how you grow alongside other learners.
        </p>
      </div>

      <div className="challenge-layout">

        {/* Challenge card */}

        <div className="challenge-card">

          <div className="challenge-top">
            <span className="challenge-badge">
              WEEKLY CHALLENGE
            </span>

            <span className="challenge-time">
              3D 12H LEFT
            </span>
          </div>

          <h3>
            Engineering Logic Challenge
          </h3>

          <p>
            Solve a collection of domain-based problems
            and test your problem-solving skills.
          </p>

          <div className="challenge-details">
            <div>
              <strong>20</strong>
              <span>Problems</span>
            </div>

            <div>
              <strong>60</strong>
              <span>Minutes</span>
            </div>

            <div>
              <strong>500</strong>
              <span>Points</span>
            </div>
          </div>

          <button>
            Join Challenge
            <span>→</span>
          </button>

        </div>

        {/* Leaderboard */}

        <div className="leaderboard-card">

          <div className="leaderboard-header">
            <div>
              <p>THIS WEEK</p>
              <h3>Leaderboard</h3>
            </div>

            <span>View all →</span>
          </div>

          <div className="leaderboard-list">

            <div className="leader-row first">
              <span className="rank">01</span>

              <div className="leader-avatar">
                A
              </div>

              <div className="leader-name">
                <strong>Ananya</strong>
                <small>Computer Science</small>
              </div>

              <strong className="leader-score">
                980
              </strong>
            </div>

            <div className="leader-row">
              <span className="rank">02</span>

              <div className="leader-avatar">
                R
              </div>

              <div className="leader-name">
                <strong>Rahul</strong>
                <small>ECE</small>
              </div>

              <strong className="leader-score">
                945
              </strong>
            </div>

            <div className="leader-row current-user">
              <span className="rank">03</span>

              <div className="leader-avatar">
                H
              </div>

              <div className="leader-name">
                <strong>You</strong>
                <small>Computer Science</small>
              </div>

              <strong className="leader-score">
                920
              </strong>
            </div>

            <div className="leader-row">
              <span className="rank">04</span>

              <div className="leader-avatar">
                S
              </div>

              <div className="leader-name">
                <strong>Sanjay</strong>
                <small>Mechanical</small>
              </div>

              <strong className="leader-score">
                890
              </strong>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Challenges;