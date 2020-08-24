function analysis(txt) {
  let totalScore = 0;
  let words = txt.split(/\W/);
  for (word of words) {
    word = word.toLowerCase();
    if (afinn.hasOwnProperty(word)) {
      let score = afinn[word];
      totalScore += Number(score);
    }
  }
  return totalScore;
}
