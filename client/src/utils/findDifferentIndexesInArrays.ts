function findDifferentIndexes(key: string[], arr: string[]): number[] {
    const differentIndexes: number[] = [];

    for (let i = 0; i < key.length; i++) {
        if (key[i] !== arr[i]) {
            differentIndexes.push(i);
        }
    }
    return differentIndexes;
}

export default findDifferentIndexes;