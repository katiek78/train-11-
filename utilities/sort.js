export const sortAlpha = (a, b) => {
    if (a.word > b.word) {
      return 1
    } else if (b.word > a.word) {
      return -1 
    } else return 0;
  }