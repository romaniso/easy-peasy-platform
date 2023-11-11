function findDifferentIndexes(arr1, arr2) {
    console.log(arr1, arr2);
    const differentIndexes = [];

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            differentIndexes.push(i);
        }
    }
    return differentIndexes;
}

export default findDifferentIndexes;