import findDifferentIndexesInArrays from "./findDifferentIndexesInArrays.";

function generateUserResults (results, keys, type) {
    return results.map((answer, index) => {
        const arrAnswer = answer.split("");
        if (type === "fill-box") {
            return answer.toLowerCase().trim() === keys[index][0].toLowerCase()
                ? "Same"
                : "Different";
        } else if (type === "fill-in-letter") {
            const results = findDifferentIndexesInArrays(
                keys[index],
                arrAnswer
            );
            return results.length ? results : "Same";
        }
        return answer.toLowerCase() === keys[index].toLowerCase()
            ? "Same"
            : "Different";
    });
}

export default generateUserResults;