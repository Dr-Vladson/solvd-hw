// Task 1: Advanced Array Filtering

function customFilterUnique(array, getAreSame = (element1, element2) => false) {
    if (!Array.isArray(array) || typeof getAreSame !== "function")
        throw new Error("Incorrect args");
    const result = [];
    loop1: for (let element1 of array) {
        for (let element2 of result) {
            if (getAreSame(element1, element2)) {
                continue loop1;
            }
        }
        result.push(element1);
    }
    return result;
}

const humans = [
    {
        name: "Valera",
        surname: "Gai",
    },
    {
        name: "Galyna",
        surname: "Shmel",
    },
    {
        name: "Ivan",
        surname: "Gai",
    },
    {
        name: "Nastasia",
        surname: "Shmel",
    },
    {
        name: "Nastasia",
        surname: "Joui",
    },
];
const getAreFromOneFamily = (human1, human2) => {
    if (human1.surname === human2.surname) return true;
    return false;
};
const familyRepresentatives = customFilterUnique(humans, getAreFromOneFamily);
console.log(familyRepresentatives);

// Task 2: Array Chunking

function chunkArray(array = [], chunkSize = 0) {
    if (
        !Array.isArray(array) ||
        typeof chunkSize !== "number" ||
        isNaN(chunkSize) ||
        !isFinite(chunkSize)
    )
        throw new Error("Incorrect args");
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

function customShuffle(array) {
    if (!Array.isArray(array)) throw new Error("Incorrect args");
    const n = array.length;
    const result = [...array];
    for (let i = 0; i <= n - 2; i++) {
        let j = Math.floor(Math.random() * (n - i) + i);
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
    }
    return result;
}

// Task 4: Array Intersection and Union

function getArrayIntersection(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2))
        throw new Error("Incorrect args");
    const result = [];
    for (let el1 of array1) {
        if (array2.includes(el1)) result.push(el1);
    }
    return result;
}

function getArrayUnion(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2))
        throw new Error("Incorrect args");
    const result = [];
    for (let el1 of array1) {
        if (array2.includes(el1)) continue;
        result.push(el1);
    }
    for (let el2 of array2) {
        if (array1.includes(el2)) continue;
        result.push(el2);
    }
    return result;
}