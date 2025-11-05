export const shuffleWord = (word: string) => {
  if (word.length < 2) return word;

  const punctMatch = word.match(/[.,!?;:]$/);
  const punct = punctMatch ? punctMatch[0] : "";
  const coreWord = punct ? word.slice(0, -1) : word;

  const firstLetter = coreWord[0];
  const lastLetter = coreWord[coreWord.length - 1];
  const middle = coreWord.slice(1, -1).split("");

  for (let i = middle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [middle[i], middle[j]] = [middle[j], middle[i]];
  }

  let shuffledWord = firstLetter + middle.join("") + lastLetter + punct;

  if (firstLetter === firstLetter.toUpperCase()) {
    shuffledWord = shuffledWord[0].toUpperCase() + shuffledWord.slice(1);
  } else {
    shuffledWord = shuffledWord[0].toLowerCase() + shuffledWord.slice(1);
  }

  return shuffledWord;
};

export const shuffleText = (text: string) => {
  return text.replace(/\S+/g, (word) => shuffleWord(word));
};
