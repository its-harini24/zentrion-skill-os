import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Landing
import HomePage from "./features/landing/HomePage";

// Domains
import DomainPage from "./features/domains/DomainPage";

// Auth
import RoleSelection from "./features/auth/RoleSelection";
import StudentLogin from "./features/auth/StudentLogin";
import FacultyLogin from "./features/auth/FacultyLogin";
import StudentRegister from "./features/auth/StudentRegister";
import ForgotPassword from "./features/auth/ForgotPassword";

// Student Dashboard & Settings
import StudentDashboard from "./features/dashboard/StudentDashboard";
import StudentSettings from "./features/dashboard/StudentSettings";

// Leaderboard
import LeaderboardPage from "./features/dashboard/LeaderboardPage";
import GitHubIntegrationPage from "./features/dashboard/GitHubIntegrationPage";

// Circuit Simulator
import CircuitSimulator from "./features/circuit/CircuitSimulator";

// Practice, Projects & Skills
import ProblemsPage from "./features/practice/ProblemsPage";
import CodingWorkspacePage from "./features/practice/CodingWorkspacePage";
import SubmissionHistoryPage from "./features/practice/SubmissionHistoryPage";
import ProjectsPage from "./features/projects/ProjectsPage";
import ProjectWorkspacePage from "./features/projects/ProjectWorkspacePage";
import EvidenceReviewPage from "./features/projects/EvidenceReviewPage";
import SkillAnalysisPage from "./features/skills/SkillAnalysisPage";
import StudentPortfolioPage from "./features/portfolio/StudentPortfolioPage";
import SkillPassportPage from "./features/portfolio/SkillPassportPage";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <div key={location.pathname} className="page-transition-wrapper">
      <Routes location={location}>
        {/* LANDING PAGE */}
        <Route path="/" element={<HomePage />} />

        {/* DOMAIN */}
        <Route path="/domain/:domainName" element={<DomainPage />} />

        {/* AUTH */}
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* STUDENT DASHBOARD */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-settings" element={<StudentSettings />} />

        {/* LEADERBOARD */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* DEMO PRODUCT PAGES */}
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/coding-workspace" element={<CodingWorkspacePage />} />
        <Route path="/coding-workspace/:problemId" element={<CodingWorkspacePage />} />
        <Route path="/workspace/:problemId" element={<CodingWorkspacePage />} />
        <Route path="/submissions" element={<SubmissionHistoryPage />} />
        <Route path="/submission-history" element={<SubmissionHistoryPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectWorkspacePage />} />
        <Route path="/project-workspace/:projectId" element={<ProjectWorkspacePage />} />
        <Route path="/evidence-review" element={<EvidenceReviewPage />} />
        <Route path="/evidence-upload" element={<EvidenceReviewPage />} />
        <Route path="/projects/:projectId/evidence" element={<EvidenceReviewPage />} />
        <Route path="/project-workspace/:projectId/evidence" element={<EvidenceReviewPage />} />
        <Route path="/skill-analysis" element={<SkillAnalysisPage />} />
        <Route path="/portfolio" element={<StudentPortfolioPage />} />
        <Route path="/student-portfolio" element={<StudentPortfolioPage />} />
        <Route path="/skill-passport" element={<SkillPassportPage />} />
        <Route path="/passport" element={<SkillPassportPage />} />
        <Route path="/github-integration" element={<GitHubIntegrationPage />} />
        <Route path="/github" element={<GitHubIntegrationPage />} />

        {/* CIRCUIT SIMULATOR */}
        <Route path="/circuit-simulator" element={<CircuitSimulator />} />
        <Route path="/circuit-lab"       element={<CircuitSimulator />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;