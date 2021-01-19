import uniq from 'lodash.uniq';

const wordsToArray = (str: string) =>
  uniq(
    str.split(',').reduce<string[]>((acc, word) => {
      const trimed = word.trim();
      return trimed ? [...acc, trimed] : acc;
    }, []),
  );

export default wordsToArray;
