// export const getConfidenceLevel = (recentAttempts) => {
    
//     if (!recentAttempts) recentAttempts = [];
//     const ratio = recentAttempts.length ? recentAttempts.reduce((acc, val) => acc + val, 0) : -1;

//     if (ratio === -1) {
//         return 'untested'
//     } else if (ratio === 0) {
//         return 'very-low'
//     } else if (ratio === 1) {
//         return 'low';
//     } else if (ratio === 2) {
//         return 'medium-low'
//     } else if (ratio === 3) {
//         return 'medium'
//     } else if (ratio > 3 && ratio < 6) {
//         return 'medium-high'
//     } else return 'high';
//   }
  

  //Obviously more sophisticated would take into account 'ageing' of attempts but that's probably unnecessary for this app and would take time

  export const getConfidenceLevel = (recentAttempts) => {
    if (!recentAttempts) recentAttempts = [];
    return recentAttempts.length > 0 ? recentAttempts.reduce((acc, val) => acc + val, 0) + 1 : 0;
  }
  

//now return a score, have some labels in here as a const, and then 8 colours
//export const confidenceLabels = ['Untested ❓', 'Very tricky 🤯', 'Tricky 😓', 'A little tricky 🙁', 'Medium 😑', 'Fairly easy 🙂', 'Easy 😊', 'Very easy 😁', 'Perfect 🤩'];
export const confidenceLabels = ['Untested ❓', 'Very tricky 🤯', 'Tricky 😓', 'A little tricky 🙁', 'Medium 😑', 'Fairly easy 🙂', 'Easy 😊'];

//export const confidenceColours = ['#a2a2a2', 'red', 'orangered', 'orange', 'yellow', 'greenyellow', 'limegreen', 'green', '#ed0caa']
export const confidenceColours = ['#a2a2a2', 'red', 'orangered', 'orange', 'yellow', 'greenyellow', 'limegreen']