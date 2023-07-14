import { getConfidenceLevel } from "../utilities/confidenceLevel";7

const ConfidenceLevel = ({ timesCorrect, timesTested }) => {
   // const ratio = (timesCorrect === 0 && timesTested === 0) ? -1 : timesCorrect / timesTested;
    let className = 'confidence-level confidence-' + getConfidenceLevel(timesCorrect, timesTested);   
    return <div className={className} />;
  }

export default ConfidenceLevel