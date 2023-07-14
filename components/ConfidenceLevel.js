import { getConfidenceLevel } from "../utilities/confidenceLevel";7

const ConfidenceLevel = ({ recentAttempts }) => {
   // const ratio = (timesCorrect === 0 && timesTested === 0) ? -1 : timesCorrect / timesTested;
    let className = 'confidence-level confidence-' + getConfidenceLevel(recentAttempts);   
    return <div className={className} />;
  }

export default ConfidenceLevel