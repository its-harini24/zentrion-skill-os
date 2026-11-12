import { useNavigate } from "react-router-dom";

function DomainCard({ domain }) {
  const navigate = useNavigate();

  return (
    <div className="domain-card">
      <div className="domain-icon">{domain.icon}</div>

      <h3>{domain.name}</h3>

      <p>{domain.description}</p>

      <span>{domain.problemCount}</span>

      <button onClick={() => navigate(`/domain/${domain.id}`)}>
        Explore
      </button>
    </div>
  );
}

export default DomainCard;
