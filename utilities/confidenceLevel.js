export const getConfidenceLevel = (recentAttempts) => {
    //const ratio = (timesCorrect === 0 && timesTested === 0) ? -1 : timesCorrect / timesTested;
    console.log(recentAttempts)
    if (!recentAttempts) recentAttempts = [];
    const ratio = recentAttempts.length ? recentAttempts.reduce((acc, val) => acc + val, 0) : -1;

    // if (ratio === -1) {
    //     return 'untested'
    // } else if (ratio <= 0.19) {
    //   return 'very-low';
    // } else if (ratio <= 0.39) {
    //   return 'low';
    // } else if (ratio <= 0.59) {
    //   return 'medium-low';
    // } else if (ratio <= 0.79) {
    //   return 'medium';
    // } else if (ratio <= 0.89) {
    //   return 'medium-high';
    // } else {
    //   return 'high';
    // }

    if (ratio === -1) {
        return 'untested'
    } else if (ratio === 0) {
        return 'very-low'
    } else if (ratio === 1) {
        return 'low';
    } else if (ratio === 2) {
        return 'medium-low'
    } else if (ratio === 3) {
        return 'medium'
    } else if (ratio > 3 && ratio < 6) {
        return 'medium-high'
    } else return 'high';
  }
  

  //Thinking of changing this to a formula based on last 6 attempts
  // We could actually keep the code mostly the way it is but just cap the number of times tested and correct at 6 and keep replacing
  // But actually you need to know which one to replace so need to keep array of last 6 attempts [1, 0, 1, 1, 1, 0]
  // In the training page show 6 traffic lights (white for not tested, green for correct, red for incorrect)

  //Obviously more sophisticated would take into account 'ageing' of attempts but that's probably unnecessary for this app and would take time