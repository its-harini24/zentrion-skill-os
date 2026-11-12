import Navbar from "../../components/common/Navbar/Navbar";
import Hero from "./components/Hero";
import DomainSelector from "../domains/DomainSelector";
import Stats from "./components/Stats";
import PlatformJourney from "./components/PlatformJourney";
import AIMentor from "./components/AIMentor";
import RealWorldProblems from "./components/RealWorldProblems";
import SkillProgress from "../skills/SkillProgress";
import BuildProjects from "../projects/BuildProjects";
import Leaderboard from "../dashboard/Leaderboard";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "../../components/common/Footer/Footer";

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

export default HomePage;
