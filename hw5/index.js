// Task 1: Advanced Array Filtering

function customFilterUnique(array, callback = (element) => element) {
    if (!Array.isArray(array) || typeof callback !== "function")
        throw new Error("Incorrect args");
    const result = [];
    loop1: for (let element1 of array) {
        for (let element2 of result) {
            if (callback(element1) === callback(element2)) {
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
const getAreFromOneFamily = (human) => human.surname;
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

// Task 5: Array Performance Analysis

function measureArrayPerformance(
    func = (callback, array) => {},
    callback = (el) => {},
    array
) {
    const startTime = performance.now();
    func(callback, array || undefined);
    const endTime = performance.now();
    return endTime - startTime;
}

function myMap(callback = () => {}, array) {
    const result = [];
    for (let el of array) result.push(callback(el));
    return result;
}

function myFilter(callback = () => {}, array) {
    const result = [];
    for (let el of array) {
        if (callback(el)) result.push(el);
    }
    return result;
}

function myReduce(callback = (acc, value) => {}, array, initialValue) {
    let result = initialValue || 0;
    for (let el of array) {
        result = callback(result, el);
    }
    return result;
}

// tests
const arr = [];
for (let i = 0; i < 10000; i++) arr.push(i);
const mapCallback = (el) => el + 1;
const filterCallback = (el) => el % 2 === 0;
const reduceCallback = (acc, value) => acc + value;

console.log(
    measureArrayPerformance(Array.prototype.map.bind(arr), mapCallback)
);
console.log(measureArrayPerformance(myMap, mapCallback, arr));

console.log(
    measureArrayPerformance(Array.prototype.filter.bind(arr), filterCallback)
);
console.log(measureArrayPerformance(myFilter, filterCallback, arr));

console.log(
    measureArrayPerformance(Array.prototype.reduce.bind(arr), reduceCallback)
);
console.log(measureArrayPerformance(myReduce, reduceCallback, arr));
