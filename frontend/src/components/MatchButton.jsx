import { useNavigate } from "react-router-dom";

function MatchButton() {
  const navigate = useNavigate();

  const changeToMatchingPage = () => {
    navigate("/matching");
  };

  return (
    <div>
      <button id="connect" onClick={changeToMatchingPage}>
        Match
      </button>
    </div>
  );
}

export default MatchButton;
