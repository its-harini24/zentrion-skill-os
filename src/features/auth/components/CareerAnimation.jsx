import "./CareerAnimation.css";
import zentrionLogo from "../../../assets/zentrion-logo.png";

function CareerAnimation() {
  return (
    <div className="career-animation">
      {/* Zentrion Logo */}
      <div className="career-logo">
        <img
          src={zentrionLogo}
          alt="Zentrion Learntech"
          style={{
            width: "190px",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>

      <div className="career-copy">
        <span>ENGINEERING SKILL PLATFORM</span>
        <h1>
          Build skills.
          <br />
          <strong>Build your future.</strong>
        </h1>
        <p>
          Learn. Practice. Build projects.
          <br />
          Turn your skills into opportunities.
        </p>
      </div>

      <div className="career-scene">
        <svg
          className="career-svg"
          viewBox="0 0 720 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="screenGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#123E46" />
              <stop offset="100%" stopColor="#071F26" />
            </linearGradient>

            <linearGradient
              id="tealGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#7BE1D4" />
              <stop offset="100%" stopColor="#18B8AA" />
            </linearGradient>

            <filter id="softGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ambient glow */}
          <circle
            cx="345"
            cy="240"
            r="175"
            fill="#51D8CA"
            opacity="0.055"
            className="scene-glow"
          />

          {/* Floating coding symbols */}
          <g className="floating-symbol symbol-one">
            <text x="95" y="165">
              {"</>"}
            </text>
          </g>

          <g className="floating-symbol symbol-two">
            <text x="565" y="120">
              {"{}"}
            </text>
          </g>

          <g className="floating-symbol symbol-three">
            <text x="590" y="335">
              {"<>"}
            </text>
          </g>

          {/* Desk */}
          <path
            d="M85 407C85 397 93 390 103 390H610C620 390 628 397 628 407V421H85V407Z"
            fill="#08282F"
            stroke="#2C7374"
            strokeWidth="1"
          />

          <path
            d="M120 421L105 475"
            stroke="#0A3037"
            strokeWidth="12"
            strokeLinecap="round"
          />

          <path
            d="M590 421L605 475"
            stroke="#0A3037"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Laptop */}
          <g className="laptop">
            <rect
              x="305"
              y="158"
              width="255"
              height="175"
              rx="12"
              fill="#0A242B"
              stroke="#61D5CB"
              strokeWidth="2"
            />

            <rect
              x="316"
              y="169"
              width="233"
              height="153"
              rx="7"
              fill="url(#screenGradient)"
            />

            <rect
              x="316"
              y="169"
              width="233"
              height="153"
              rx="7"
              fill="#4BD8CB"
              opacity="0.035"
              filter="url(#softGlow)"
            />

            {/* Browser dots */}
            <circle cx="330" cy="183" r="3" fill="#5AD2C7" />
            <circle
              cx="341"
              cy="183"
              r="3"
              fill="#5AD2C7"
              opacity="0.6"
            />
            <circle
              cx="352"
              cy="183"
              r="3"
              fill="#5AD2C7"
              opacity="0.35"
            />

            {/* Code */}
            <g className="code-lines">
              <rect x="333" y="202" width="54" height="5" rx="2.5" />
              <rect x="394" y="202" width="83" height="5" rx="2.5" />

              <rect x="333" y="219" width="32" height="5" rx="2.5" />
              <rect x="372" y="219" width="105" height="5" rx="2.5" />

              <rect x="348" y="236" width="70" height="5" rx="2.5" />
              <rect x="425" y="236" width="47" height="5" rx="2.5" />

              <rect x="348" y="253" width="43" height="5" rx="2.5" />
              <rect x="398" y="253" width="76" height="5" rx="2.5" />

              <rect x="333" y="270" width="90" height="5" rx="2.5" />
              <rect x="430" y="270" width="43" height="5" rx="2.5" />

              <rect x="333" y="287" width="48" height="5" rx="2.5" />
              <rect x="388" y="287" width="92" height="5" rx="2.5" />
            </g>

            {/* Cursor */}
            <rect
              className="code-cursor"
              x="486"
              y="287"
              width="2"
              height="8"
              rx="1"
            />

            {/* Laptop base */}
            <path
              d="M282 333H583L605 347C610 351 607 357 601 357H264C258 357 255 351 260 347L282 333Z"
              fill="#0B3038"
              stroke="#438E8E"
              strokeWidth="1"
            />

            <rect
              x="365"
              y="340"
              width="105"
              height="5"
              rx="2.5"
              fill="#1C555B"
            />
          </g>

          {/* Student */}
          <g className="student">
            {/* Chair */}
            <path
              d="M130 260C116 260 107 270 107 284V395H135V292C135 282 143 276 153 276H166V260H130Z"
              fill="#071F26"
            />

            <path
              d="M118 394H145"
              stroke="#071F26"
              strokeWidth="11"
              strokeLinecap="round"
            />

            {/* Hoodie */}
            <path
              d="M173 256C148 264 133 288 132 320L128 389H280L272 315C268 286 250 265 225 256L201 250L173 256Z"
              fill="#092B33"
              stroke="#2D7275"
              strokeWidth="1.5"
            />

            <path
              d="M194 261L201 288L208 261"
              stroke="#55D4C8"
              strokeWidth="2"
              opacity="0.8"
            />

            <text
              x="184"
              y="331"
              className="hoodie-z"
            >
              Z
            </text>

            {/* Head */}
            <ellipse
              cx="199"
              cy="212"
              rx="49"
              ry="55"
              fill="#C98261"
            />

            {/* Hair */}
            <path
              d="M151 212C146 183 155 153 182 143C209 132 243 144 251 171C256 188 249 202 242 211C239 191 226 183 210 181C190 179 175 188 165 207L158 223L151 212Z"
              fill="#17242B"
            />

            <path
              d="M159 180C166 157 188 145 211 148"
              stroke="#30434A"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Face */}
            <circle
              cx="222"
              cy="214"
              r="3"
              fill="#17242B"
            />

            <path
              d="M230 230C235 233 239 232 242 229"
              stroke="#733F3C"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Neck */}
            <path
              d="M190 256V273"
              stroke="#B87055"
              strokeWidth="13"
              strokeLinecap="round"
            />

            {/* Arm */}
            <path
              d="M235 278C258 286 275 307 296 331"
              stroke="#092B33"
              strokeWidth="28"
              strokeLinecap="round"
            />

            {/* Forearm */}
            <path
              d="M286 330C307 337 330 345 354 349"
              stroke="#C98261"
              strokeWidth="17"
              strokeLinecap="round"
              className="typing-arm"
            />

            {/* Hand */}
            <g className="typing-hand">
              <ellipse
                cx="357"
                cy="349"
                rx="14"
                ry="9"
                fill="#C98261"
              />

              <path
                d="M350 347L343 340M355 346L350 337M361 347L358 338"
                stroke="#B87055"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Second arm */}
            <path
              d="M160 283C146 301 145 323 151 344"
              stroke="#092B33"
              strokeWidth="27"
              strokeLinecap="round"
            />

            <path
              d="M151 340C174 344 195 347 218 350"
              stroke="#C98261"
              strokeWidth="17"
              strokeLinecap="round"
            />

            <g className="typing-hand hand-two">
              <ellipse
                cx="221"
                cy="350"
                rx="14"
                ry="9"
                fill="#C98261"
              />
            </g>
          </g>

          {/* Skill progress */}
          <g className="skill-panel">
            <rect
              x="525"
              y="185"
              width="145"
              height="122"
              rx="13"
              fill="#0B3037"
              stroke="#3D9997"
              strokeWidth="1"
            />

            <text x="542" y="210" className="panel-title">
              SKILLS GROWING
            </text>

            <text x="542" y="234" className="skill-label">
              Java
            </text>

            <rect
              x="542"
              y="241"
              width="104"
              height="5"
              rx="2.5"
              className="skill-track"
            />

            <rect
              x="542"
              y="241"
              width="74"
              height="5"
              rx="2.5"
              className="skill-progress progress-one"
            />

            <text x="542" y="264" className="skill-label">
              React
            </text>

            <rect
              x="542"
              y="271"
              width="104"
              height="5"
              rx="2.5"
              className="skill-track"
            />

            <rect
              x="542"
              y="271"
              width="64"
              height="5"
              rx="2.5"
              className="skill-progress progress-two"
            />

            <text x="542" y="294" className="skill-label">
              DSA
            </text>

            <rect
              x="542"
              y="301"
              width="104"
              height="5"
              rx="2.5"
              className="skill-track"
            />

            <rect
              x="542"
              y="301"
              width="51"
              height="5"
              rx="2.5"
              className="skill-progress progress-three"
            />
          </g>

          {/* Project result */}
          <g className="career-result">
            <rect
              x="485"
              y="365"
              width="160"
              height="72"
              rx="14"
              fill="#0A3037"
              stroke="#42BDB3"
              strokeWidth="1.5"
            />

            <circle
              cx="514"
              cy="401"
              r="17"
              fill="#163F42"
              stroke="#5DD8CC"
              strokeWidth="1"
            />

            <path
              d="M506 401L511 406L522 394"
              stroke="#75E3D8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text x="540" y="394" className="result-small">
              PROJECT
            </text>

            <text x="540" y="415" className="result-main">
              BUILT ✓
            </text>
          </g>

          {/* Hired result */}
          <g className="hired-result">
            <rect
              x="65"
              y="105"
              width="130"
              height="58"
              rx="13"
              fill="#0A3037"
              stroke="#55D6CA"
              strokeWidth="1.5"
            />

            <circle
              cx="91"
              cy="134"
              r="15"
              fill="#163F42"
            />

            <path
              d="M84 134L89 139L99 128"
              stroke="#76E4D9"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text x="113" y="130" className="result-small">
              CAREER
            </text>

            <text x="113" y="148" className="result-main">
              HIRED
            </text>
          </g>

          {/* Connection path */}
          <path
            className="career-path"
            d="M470 350C500 337 520 328 555 320C590 312 618 296 642 275"
          />

          <circle
            className="path-dot"
            cx="470"
            cy="350"
            r="4"
          />

          <circle
            className="path-dot"
            cx="642"
            cy="275"
            r="4"
          />
        </svg>
      </div>

      <div className="career-footer">
        <span>LEARN</span>
        <i />
        <span>PRACTICE</span>
        <i />
        <span>BUILD</span>
        <i />
        <span>GET HIRED</span>
      </div>
    </div>
  );
}

export default CareerAnimation;