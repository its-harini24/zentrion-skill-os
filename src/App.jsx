import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DomainSelector from "./components/DomainSelector";
import Stats from "./components/Stats";
import PlatformJourney from "./components/PlatformJourney";
import AIMentor from "./components/AIMentor";
import RealWorldProblems from "./components/RealWorldProblems";
import SkillProgress from "./components/SkillProgress";
import BuildProjects from "./components/BuildProjects";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Leaderboard from "./components/Leaderboard";

import DomainPage from "./pages/DomainPage";
import ForgotPassword from "./pages/ForgotPassword";
import RoleSelection from "./pages/RoleSelection";
import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/FacultyLogin";
import StudentDashboard from "./pages/StudentDashboard";
import StudentRegister from "./pages/StudentRegister";

import ProblemsPage from "./pages/ProblemsPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillAnalysisPage from "./pages/SkillAnalysisPage";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <DomainSelector />
      <Stats />
      <PlatformJourney />
      <AIMentor />
      <RealWorldProblems />
      <SkillProgress />
      <BuildProjects />
      <Leaderboard />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* DOMAIN */}
        <Route
          path="/domain/:domainName"
          element={<DomainPage />}
        />

        {/* AUTH */}
        <Route
          path="/role-selection"
          element={<RoleSelection />}
        />

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        <Route
          path="/faculty-login"
          element={<FacultyLogin />}
        />

        <Route
          path="/student-register"
          element={<StudentRegister />}
        />

        {/* STUDENT DASHBOARD */}
        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        {/* DEMO PRODUCT PAGES */}
        <Route
          path="/problems"
          element={<ProblemsPage />}
        />

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />

        <Route
          path="/skill-analysis"
          element={<SkillAnalysisPage />}
        />
        <Route
         path="/forgot-password"
         element={<ForgotPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;