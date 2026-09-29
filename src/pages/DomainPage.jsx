import { useParams } from "react-router-dom";
import domains from "../data/domains";

function DomainPage() {
  const { domainName } = useParams();

  const domain = domains.find((item) => item.id === domainName);

  if (!domain) {
    return <h1>Domain not found</h1>;
  }

  return (
    <div>
      <div>{domain.icon}</div>

      <h1>{domain.name}</h1>

      <p>{domain.description}</p>

      <p>{domain.problemCount}</p>

      <button>Start Practicing</button>
    </div>
  );
}

export default DomainPage;