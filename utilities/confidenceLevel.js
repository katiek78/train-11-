export const getConfidenceLevel = (timesCorrect, timesTested) => {
    const ratio = (timesCorrect === 0 && timesTested === 0) ? -1 : timesCorrect / timesTested;
  
    if (ratio === -1) {
        return 'untested'
    } else if (ratio <= 0.19) {
      return 'very-low';
    } else if (ratio <= 0.39) {
      return 'low';
    } else if (ratio <= 0.59) {
      return 'medium-low';
    } else if (ratio <= 0.79) {
      return 'medium';
    } else if (ratio <= 0.89) {
      return 'medium-high';
    } else {
      return 'high';
    }
  }
