import findDifferentIndexesInArrays from "./findDifferentIndexesInArrays";

//@fixme as a type I should use enum
function generateUserResults (results: string[], keys: string[], type: string) {
    return results.map((answer: string, index: number) => {
        const arrAnswer: string[] = answer.split("");
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