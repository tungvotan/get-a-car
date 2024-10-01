const pluralize = (word: string, count: number): string => {
  return count === 1 ? `${count} ${word}` : `${count} ${word}s`;
};

export default pluralize;
