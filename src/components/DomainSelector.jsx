import domains from "../data/domains";
import DomainCard from "./DomainCard";
import "./DomainSelector.css";

function DomainSelector() {
  return (
   <section className="domain-section" id="domains">
      <h2>Explore Engineering Domains</h2>

      <div className="domain-grid">
        {domains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </div>
    </section>
  );
}

export default DomainSelector;