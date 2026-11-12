import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import zentrionLogo from "../../assets/zentrion-logo.png";
import { problemsData, getProblemById } from "../../data/problemsData";
import { runCode, submitSolution } from "../../services/codeExecutionService";
import "./CodingWorkspace.css";

const SUPPORTED_LANGUAGES = [
  { id: "python", label: "Python 3", monaco: "python" },
  { id: "javascript", label: "JavaScript (Node.js)", monaco: "javascript" },
  { id: "java", label: "Java (OpenJDK 17)", monaco: "java" },
  { id: "cpp", label: "C++ (C++20)", monaco: "cpp" },
  { id: "c", label: "C (C17)", monaco: "c" },
];

function CodingWorkspacePage() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  // Find problem or default to first
  const currentProblem = getProblemById(problemId);

  // Layout & Navigation State
  const [problemDropdownOpen, setProblemDropdownOpen] = useState(false);
  const [leftTab, setLeftTab] = useState("description"); // "description" | "constraints" | "samples"
  const [mobileView, setMobileView] = useState("editor"); // "problem" | "editor" | "console"
  const [bottomPanelState, setBottomPanelState] = useState("normal"); // "normal" | "collapsed" | "expanded"
  const [bottomTab, setBottomTab] = useState("testcases"); // "testcases" | "custom" | "output" | "verdict"

  // Code & Language State
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [codeDrafts, setCodeDrafts] = useState({});
  const [isCopied, setIsCopied] = useState(false);

  // Test Case & Custom Input State
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
  const [customInputText, setCustomInputText] = useState("");

  // Execution & Submission State
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Theme tracking for Monaco Editor
  const [currentTheme, setCurrentTheme] = useState(() => {
    return document.documentElement.getAttribute("data-theme") || "light";
  });

  const dropdownRef = useRef(null);

  // Synchronize theme attribute changes with Monaco Editor
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const active = document.documentElement.getAttribute("data-theme") || "light";
      setCurrentTheme(active);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProblemDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When problem or language changes, ensure starter code is loaded into drafts
  const currentCode =
    codeDrafts[`${currentProblem.id}_${selectedLanguage}`] ??
    currentProblem.starterCode[selectedLanguage] ??
    "";

  const handleCodeChange = (newCode) => {
    setCodeDrafts((prev) => ({
      ...prev,
      [`${currentProblem.id}_${selectedLanguage}`]: newCode ?? "",
    }));
  };

  const handleResetCode = () => {
    const defaultCode = currentProblem.starterCode[selectedLanguage] || "";
    setCodeDrafts((prev) => ({
      ...prev,
      [`${currentProblem.id}_${selectedLanguage}`]: defaultCode,
    }));
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopySnippet = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Run Code Action
  const handleRunCode = async () => {
    setIsRunning(true);
    if (bottomPanelState === "collapsed") {
      setBottomPanelState("normal");
    }
    setBottomTab("output");

    try {
      const res = await runCode({
        problemId: currentProblem.id,
        language: selectedLanguage,
        code: currentCode,
        customInput: bottomTab === "custom" ? customInputText : "",
        sampleCases: currentProblem.sampleTestCases,
      });
      setRunResult(res);
      setBottomTab(res.isCustomRun ? "output" : "testcases");
    } catch (err) {
      setRunResult({
        status: "RUNTIME_ERROR",
        exitCode: 1,
        executionTimeMs: 12,
        memoryKb: 4096,
        stdout: "",
        stderr: err.message || "Unknown execution error.",
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Solution Action
  const handleSubmitSolution = async () => {
    setIsSubmitting(true);
    if (bottomPanelState === "collapsed") {
      setBottomPanelState("normal");
    }
    setBottomTab("verdict");

    try {
      const res = await submitSolution({
        problemId: currentProblem.id,
        language: selectedLanguage,
        code: currentCode,
        sampleCases: currentProblem.sampleTestCases,
      });
      setSubmissionResult(res);
    } catch (err) {
      setSubmissionResult({
        verdict: "FAILED",
        verdictLabel: "Submission Failed",
        message: err.message || "Could not reach evaluation service.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const monacoLanguage =
    SUPPORTED_LANGUAGES.find((lang) => lang.id === selectedLanguage)?.monaco || "plaintext";

  return (
    <div className="coding-workspace">
      {/* ================= WORKSPACE NAVBAR ================= */}
      <header className="workspace-navbar">
        <div className="workspace-nav-left">
          <button
            className="workspace-logo-btn"
            onClick={() => navigate("/")}
            aria-label="Zentrion Home"
          >
            <img src={zentrionLogo} alt="Zentrion" className="workspace-logo-img" />
          </button>

          <div className="workspace-nav-divider" />

          {/* Problem Selector Breadcrumb */}
          <div className="workspace-problem-selector" ref={dropdownRef}>
            <div className="workspace-breadcrumb">
              <button
                className="breadcrumb-parent"
                onClick={() => navigate("/problems")}
              >
                Engineering Problems
              </button>
              <span className="breadcrumb-separator">/</span>
            </div>

            <button
              className="problem-dropdown-btn"
              onClick={() => setProblemDropdownOpen((prev) => !prev)}
              aria-label="Select Problem"
            >
              <span>{currentProblem.title}</span>
              <span style={{ fontSize: "0.65rem", opacity: 0.7 }}>▼</span>
            </button>

            {problemDropdownOpen && (
              <div className="problem-dropdown-menu">
                {problemsData.map((prob) => (
                  <button
                    key={prob.id}
                    className={`problem-menu-item ${
                      prob.id === currentProblem.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setProblemDropdownOpen(false);
                      navigate(`/coding-workspace/${prob.id}`);
                    }}
                  >
                    <span className="menu-item-title">{prob.title}</span>
                    <span className="menu-item-meta">
                      <span>{prob.domain}</span>
                      <span>•</span>
                      <span>{prob.difficulty}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="workspace-nav-right">
          <ThemeToggle />

          <button
            className="workspace-back-btn"
            onClick={() => navigate("/submissions")}
            title="View all past submissions"
          >
            📋 Submissions
          </button>

          <button
            className="workspace-back-btn"
            onClick={() => navigate("/problems")}
          >
            ← All Problems
          </button>
        </div>
      </header>

      {/* ================= MOBILE VIEW TABS (Screens <= 1024px) ================= */}
      <div className="mobile-view-tabs">
        <button
          className={`mobile-view-tab ${mobileView === "problem" ? "active" : ""}`}
          onClick={() => setMobileView("problem")}
        >
          Description
        </button>
        <button
          className={`mobile-view-tab ${mobileView === "editor" ? "active" : ""}`}
          onClick={() => setMobileView("editor")}
        >
          Code Editor
        </button>
        <button
          className={`mobile-view-tab ${mobileView === "console" ? "active" : ""}`}
          onClick={() => setMobileView("console")}
        >
          Console & Tests
        </button>
      </div>

      {/* ================= MAIN TWO-PANEL WORKSPACE ================= */}
      <div className="workspace-container">
        {/* ================= LEFT PANEL: PROBLEM SPECIFICATIONS ================= */}
        <section
          className={`problem-panel ${mobileView === "problem" ? "mobile-active" : ""}`}
        >
          <div className="problem-header">
            <div className="problem-badges">
              <span className="problem-domain-badge">{currentProblem.domain}</span>
              <span
                className={`problem-difficulty-badge ${currentProblem.difficulty.toLowerCase()}`}
              >
                {currentProblem.difficulty}
              </span>
              <span className="problem-topics-badge">{currentProblem.topics}</span>
            </div>

            <h1>{currentProblem.title}</h1>

            {currentProblem.domain === "ECE" && (
              <div style={{
                margin: "12px 0 0",
                padding: "10px 14px",
                background: "var(--primary-light)",
                border: "1px solid var(--primary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px"
              }}>
                <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700 }}>
                  ⚡ Visual Circuit Simulator: Design and test this circuit visually
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/circuit-simulator")}
                  style={{
                    padding: "6px 12px",
                    background: "var(--primary)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  Open Circuit Lab →
                </button>
              </div>
            )}
          </div>

          <div className="problem-tabs">
            <button
              className={`problem-tab-btn ${leftTab === "description" ? "active" : ""}`}
              onClick={() => setLeftTab("description")}
            >
              Description
            </button>
            <button
              className={`problem-tab-btn ${leftTab === "constraints" ? "active" : ""}`}
              onClick={() => setLeftTab("constraints")}
            >
              Constraints & I/O
            </button>
            <button
              className={`problem-tab-btn ${leftTab === "samples" ? "active" : ""}`}
              onClick={() => setLeftTab("samples")}
            >
              Sample Cases ({currentProblem.sampleTestCases.length})
            </button>
          </div>

          <div className="problem-body-scrollable">
            {leftTab === "description" && (
              <>
                <div>
                  <h3 className="problem-section-title">Problem Scenario</h3>
                  <div className="problem-description-text">
                    {currentProblem.description}
                  </div>
                </div>

                <div>
                  <h3 className="problem-section-title">Input Format</h3>
                  <div className="format-card">{currentProblem.inputFormat}</div>
                </div>

                <div>
                  <h3 className="problem-section-title">Output Format</h3>
                  <div className="format-card">{currentProblem.outputFormat}</div>
                </div>

                <div>
                  <h3 className="problem-section-title">Engineering Constraints</h3>
                  <div className="constraints-list">
                    {currentProblem.constraints.map((c, i) => (
                      <div key={i} className="constraint-item">
                        <span className="constraint-dot">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {leftTab === "constraints" && (
              <>
                <div>
                  <h3 className="problem-section-title">Technical Constraints</h3>
                  <div className="constraints-list">
                    {currentProblem.constraints.map((c, i) => (
                      <div key={i} className="constraint-item">
                        <span className="constraint-dot">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="problem-section-title">Stream Specifications</h3>
                  <div className="format-card">
                    <strong>Input:</strong>
                    {"\n"}
                    {currentProblem.inputFormat}
                    {"\n\n"}
                    <strong>Output:</strong>
                    {"\n"}
                    {currentProblem.outputFormat}
                  </div>
                </div>
              </>
            )}

            {leftTab === "samples" && (
              <div>
                <h3 className="problem-section-title">Sample Test Cases</h3>
                {currentProblem.sampleTestCases.map((tc, idx) => (
                  <article key={tc.id || idx} className="sample-case-card">
                    <div className="sample-case-header">
                      <span className="sample-case-title">
                        Sample #{idx + 1}: {tc.name}
                      </span>
                    </div>

                    <div className="sample-case-body">
                      <div>
                        <div className="code-block-header">
                          <span className="code-block-label">Input</span>
                          <button
                            className="copy-mini-btn"
                            onClick={() => handleCopySnippet(tc.input)}
                          >
                            Copy Input
                          </button>
                        </div>
                        <div className="code-snippet-box">{tc.input}</div>
                      </div>

                      <div>
                        <div className="code-block-header">
                          <span className="code-block-label">Expected Output</span>
                          <button
                            className="copy-mini-btn"
                            onClick={() => handleCopySnippet(tc.expectedOutput)}
                          >
                            Copy Output
                          </button>
                        </div>
                        <div className="code-snippet-box">{tc.expectedOutput}</div>
                      </div>

                      {tc.explanation && (
                        <div>
                          <div className="code-block-label" style={{ marginBottom: "4px" }}>
                            Explanation
                          </div>
                          <div className="sample-explanation">{tc.explanation}</div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= RIGHT PANEL: CODE EDITOR & BOTTOM CONSOLE ================= */}
        <section
          className={`editor-panel ${
            mobileView === "editor" || mobileView === "console" ? "mobile-active" : ""
          }`}
        >
          {/* EDITOR TOOLBAR */}
          <div className="editor-toolbar">
            <div className="editor-toolbar-left">
              <div className="language-selector-wrapper">
                <span className="language-label">Language:</span>
                <select
                  className="language-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  aria-label="Programming Language"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="editor-toolbar-right">
              <button
                className={`toolbar-action-btn ${isCopied ? "copied" : ""}`}
                onClick={handleCopyCode}
                title="Copy current code to clipboard"
              >
                {isCopied ? "✓ Copied" : "Copy Code"}
              </button>

              <button
                className="toolbar-action-btn"
                onClick={handleResetCode}
                title="Reset to starter code"
              >
                ↺ Reset
              </button>
            </div>
          </div>

          {/* MONACO CODE EDITOR */}
          <div className="monaco-container">
            <Editor
              height="100%"
              language={monacoLanguage}
              theme={currentTheme === "dark" ? "vs-dark" : "light"}
              value={currentCode}
              onChange={handleCodeChange}
              options={{
                fontSize: 14,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                roundedSelection: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                smoothScrolling: true,
                padding: { top: 12, bottom: 12 },
              }}
              loading={
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    height: "100%",
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                  }}
                >
                  Initializing Monaco Editor...
                </div>
              }
            />
          </div>

          {/* ================= BOTTOM PANEL: CONSOLE, TEST CASES & RESULTS ================= */}
          <div
            className={`bottom-panel ${
              bottomPanelState === "collapsed"
                ? "collapsed"
                : bottomPanelState === "expanded"
                ? "expanded"
                : ""
            }`}
          >
            {/* PANEL HEADER WITH TABS */}
            <div className="bottom-panel-header">
              <div className="bottom-tabs">
                <button
                  className={`bottom-tab-btn ${bottomTab === "testcases" ? "active" : ""}`}
                  onClick={() => setBottomTab("testcases")}
                >
                  <span>Test Cases</span>
                  <span className="tab-badge">
                    {currentProblem.sampleTestCases.length}
                  </span>
                </button>

                <button
                  className={`bottom-tab-btn ${bottomTab === "custom" ? "active" : ""}`}
                  onClick={() => setBottomTab("custom")}
                >
                  <span>Custom Input</span>
                </button>

                <button
                  className={`bottom-tab-btn ${bottomTab === "output" ? "active" : ""}`}
                  onClick={() => setBottomTab("output")}
                >
                  <span>Console Output</span>
                </button>

                {submissionResult && (
                  <button
                    className={`bottom-tab-btn ${bottomTab === "verdict" ? "active" : ""}`}
                    onClick={() => setBottomTab("verdict")}
                  >
                    <span>Verdict</span>
                    <span
                      className="tab-badge"
                      style={{
                        background:
                          submissionResult.verdict === "ACCEPTED"
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(239, 68, 68, 0.2)",
                        color:
                          submissionResult.verdict === "ACCEPTED" ? "#059669" : "#dc2626",
                      }}
                    >
                      {submissionResult.verdictLabel || "Result"}
                    </span>
                  </button>
                )}
              </div>

              <div className="bottom-panel-controls">
                <button
                  className="panel-resize-btn"
                  onClick={() =>
                    setBottomPanelState((prev) =>
                      prev === "collapsed"
                        ? "normal"
                        : prev === "normal"
                        ? "expanded"
                        : "collapsed"
                    )
                  }
                  title="Toggle panel height"
                >
                  {bottomPanelState === "collapsed"
                    ? "▲"
                    : bottomPanelState === "expanded"
                    ? "▼"
                    : "⤢"}
                </button>
              </div>
            </div>

            {/* PANEL BODY CONTENT */}
            {bottomPanelState !== "collapsed" && (
              <div className="bottom-panel-content">
                {/* 1. TEST CASES TAB */}
                {bottomTab === "testcases" && (
                  <div className="testcases-view">
                    <div className="case-selectors">
                      {currentProblem.sampleTestCases.map((tc, idx) => {
                        const evaluated = runResult?.testCases?.find(
                          (c) => c.id === tc.id || c.id === idx + 1
                        );
                        return (
                          <button
                            key={tc.id || idx}
                            className={`case-pill ${
                              activeTestCaseIndex === idx ? "active" : ""
                            }`}
                            onClick={() => setActiveTestCaseIndex(idx)}
                          >
                            <span
                              className={`case-status-dot ${
                                evaluated?.passed ? "passed" : ""
                              }`}
                            />
                            <span>Case {idx + 1}</span>
                          </button>
                        );
                      })}
                    </div>

                    {currentProblem.sampleTestCases[activeTestCaseIndex] && (
                      <div className="case-detail-grid">
                        <div>
                          <div className="case-field-label">Sample Input</div>
                          <div className="code-snippet-box">
                            {currentProblem.sampleTestCases[activeTestCaseIndex].input}
                          </div>
                        </div>

                        <div>
                          <div className="case-field-label">Expected Output</div>
                          <div className="code-snippet-box">
                            {
                              currentProblem.sampleTestCases[activeTestCaseIndex]
                                .expectedOutput
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CUSTOM INPUT TAB */}
                {bottomTab === "custom" && (
                  <div className="custom-input-view">
                    <div className="case-field-label">
                      Provide Custom Test Input Parameters:
                    </div>
                    <textarea
                      className="custom-input-textarea"
                      placeholder="Enter raw input data (e.g. array sizes, query operations)..."
                      value={customInputText}
                      onChange={(e) => setCustomInputText(e.target.value)}
                    />
                  </div>
                )}

                {/* 3. CONSOLE OUTPUT TAB */}
                {bottomTab === "output" && (
                  <div className="console-view">
                    {runResult ? (
                      <>
                        <div className="console-meta-strip">
                          <span
                            className={`console-status-pill ${
                              runResult.status === "SUCCESS" ? "success" : "error"
                            }`}
                          >
                            {runResult.status}
                          </span>
                          <span className="console-meta-item">
                            Runtime: <strong>{runResult.executionTimeMs} ms</strong>
                          </span>
                          <span className="console-meta-item">
                            Memory: <strong>{runResult.memoryKb} KB</strong>
                          </span>
                          <span className="console-meta-item">
                            Exit Code: <strong>{runResult.exitCode ?? 0}</strong>
                          </span>
                        </div>

                        <div className="console-terminal">
                          {runResult.stdout || runResult.stderr || "No stdout output produced."}
                        </div>

                        <div className="backend-ready-notice">
                          <span>ℹ</span>
                          <span>
                            Interface ready for backend execution service integration.
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="console-empty">
                        Click <strong>Run Code</strong> to execute your solution against test cases.
                      </div>
                    )}
                  </div>
                )}

                {/* 4. SUBMISSION VERDICT TAB */}
                {bottomTab === "verdict" && submissionResult && (
                  <div className="submission-view">
                    <div className="verdict-banner">
                      <div>
                        <div className="verdict-title">
                          ✓ {submissionResult.verdictLabel}
                        </div>
                        <div className="verdict-subtitle">
                          Submission ID: {submissionResult.submissionId} • Tested on{" "}
                          {submissionResult.submittedAt}
                        </div>
                      </div>

                      <div className="verdict-stats">
                        <span>
                          Test Cases:{" "}
                          <strong>
                            {submissionResult.passedCount} / {submissionResult.totalCount}
                          </strong>
                        </span>
                        <span>
                          Total Time:{" "}
                          <strong>{submissionResult.totalRuntimeMs} ms</strong>
                        </span>
                      </div>
                    </div>

                    <div className="verdict-cases-list">
                      {submissionResult.testCases?.map((tc) => (
                        <div key={tc.id} className="verdict-case-item">
                          <span>
                            <strong>{tc.name}</strong>
                          </span>
                          <span className="verdict-case-status">
                            ✓ {tc.status} ({tc.runtimeMs} ms)
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="backend-ready-notice">
                      <span>ℹ</span>
                      <span>
                        Frontend demonstration verdict. Backend submission endpoint ready for API connection.
                      </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <button
                        className="toolbar-action-btn"
                        onClick={() => navigate("/submissions")}
                        style={{ fontSize: "0.72rem" }}
                      >
                        View in Submission History →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= WORKSPACE FOOTER ACTIONS ================= */}
            <div className="workspace-footer">
              <div className="footer-status-text">
                <span className="footer-status-dot" />
                <span>
                  {isRunning
                    ? "Compiling and running..."
                    : isSubmitting
                    ? "Submitting solution..."
                    : "Ready for execution"}
                </span>
              </div>

              <div className="footer-action-buttons">
                <button
                  className="run-code-btn"
                  onClick={handleRunCode}
                  disabled={isRunning || isSubmitting}
                  title="Run code against sample test cases"
                >
                  {isRunning ? (
                    <>
                      <span className="spinner-icon" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <span>▶</span>
                      <span>Run Code</span>
                    </>
                  )}
                </button>

                <button
                  className="submit-code-btn"
                  onClick={handleSubmitSolution}
                  disabled={isRunning || isSubmitting}
                  title="Submit code for full evaluation"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-icon" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>✓</span>
                      <span>Submit Solution</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CodingWorkspacePage;

