import "./AIMentor.css";

function AIMentor() {
  return (
    <section className="ai-mentor-section">

      <div className="ai-mentor-content">

        <p className="ai-mentor-label">
          YOUR PERSONAL AI MENTOR
        </p>

        <h2>
          Stuck?
          <span> Ask Zentrion.</span>
        </h2>

        <p className="ai-mentor-description">
          Get guidance when you need it. Understand concepts,
          debug your mistakes, get hints, and discover what
          to learn next.
        </p>

        <div className="ai-mentor-features">

          <div className="ai-feature">
            <span>💡</span>
            <div>
              <h3>Get hints</h3>
              <p>Move forward without giving away the answer.</p>
            </div>
          </div>

          <div className="ai-feature">
            <span>🔍</span>
            <div>
              <h3>Understand mistakes</h3>
              <p>Find out what went wrong and why.</p>
            </div>
          </div>

          <div className="ai-feature">
            <span>🎯</span>
            <div>
              <h3>Personalized guidance</h3>
              <p>Get suggestions based on your skill journey.</p>
            </div>
          </div>

        </div>

        <button className="ai-mentor-button">
          Ask Zentrion
          <span>→</span>
        </button>

      </div>

      <div className="ai-mentor-visual">

        <div className="ai-glow"></div>

        <div className="ai-robot">

          <div className="robot-antenna">
            <span></span>
          </div>

          <div className="robot-head">
            <div className="robot-eyes">
              <span></span>
              <span></span>
            </div>

            <div className="robot-mouth"></div>
          </div>

          <div className="robot-body">

            <div className="robot-screen">
              <span>&lt;/&gt;</span>
            </div>

            <div className="robot-lines">
              <i></i>
              <i></i>
              <i></i>
            </div>

          </div>

          <div className="robot-arm left"></div>
          <div className="robot-arm right"></div>

        </div>

        <div className="ai-chat-bubble bubble-one">
          Why is my code failing?
        </div>

        <div className="ai-chat-bubble bubble-two">
          Let's find the problem together.
        </div>

      </div>

    </section>
  );
}

export default AIMentor;