export const hasPunctuation = (word: string, regEx?: RegExp): boolean => {
    const punctuationRegex: RegExp = /[.,;:"?!()\\[\]{}-]/;
    return (regEx ? regEx : punctuationRegex).test(word);
};