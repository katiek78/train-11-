const ConfidenceLevel = ({ timesCorrect, timesTested }) => {
    const ratio = (timesCorrect === 0 && timesTested === 0) ? -1 : timesCorrect / timesTested;
  
    let className = 'confidence-level';
    if (ratio === -1) {
        className += ' confidence-untested'
    } else if (ratio <= 0.19) {
      className += ' confidence-very-low';
    } else if (ratio <= 0.39) {
      className += ' confidence-low';
    } else if (ratio <= 0.59) {
      className += ' confidence-medium-low';
    } else if (ratio <= 0.79) {
      className += ' confidence-medium';
    } else if (ratio <= 0.89) {
      className += ' confidence-medium-high';
    } else {
      className += ' confidence-high';
    }
  
    return <div className={className} />;
  }

export default ConfidenceLevel