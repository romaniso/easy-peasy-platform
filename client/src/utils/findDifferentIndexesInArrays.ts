function findDifferentIndexes(arr1: string[], arr2: string[]): number[] {
    const differentIndexes = [];

    for (let i: number = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            differentIndexes.push(i);
        }
    }
    return differentIndexes;
}

export default findDifferentIndexes;