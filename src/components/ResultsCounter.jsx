import "./ResultsCounter.css";

function ResultsCounter({ count, total }) {
  return (
    <div className="results-counter">
      <span className="count-highlight">{count}</span>
      <span className="count-text">
        {count === 1 ? "song" : "songs"} {count < total && `of ${total}`}
      </span>
    </div>
  );
}

export default ResultsCounter;
