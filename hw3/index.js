// Task 1: Immutability and Pure Functions
class Product {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

function calculateDiscountedPrice(products, discount) {
    if (
        !Array.isArray(products) ||
        typeof discount !== "number" ||
        isNaN(discount) ||
        discount > 100
    )
        throw new Error("Incorrect arguments");
    return products.map((product) => {
        if (!(product instanceof Product))
            throw new Error("Incorrect arguments");
        const price = product.price;
        return {
            ...product,
            price:
                typeof price === "number" && !isNaN(price) && price >= 0
                    ? (price * (100 - discount)) / 100
                    : null,
        };
    });
}

function calculateTotalPrice(products) {
    if (!Array.isArray(products)) throw new Error("Incorrect arguments");

    return products.reduce((totalPrice, product) => {
        if (!(product instanceof Product))
            throw new Error("Incorrect arguments");
        const price = product.price;
        if (typeof price !== "number" || isNaN(price) || price < 0)
            return totalPrice;
        return totalPrice + price;
    }, 0);
}

// Task 2: Function Composition and Point-Free Style
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Student {
    constructor(name, grades) {
        this.name = name;
        this.grades = grades;
    }
}

function getFullName(person) {
    if (!(person instanceof Person)) throw new Error("Incorrect arguments");
    return `${person.firstName} ${person.lastName}`;
}

function getWordsOfText(text) {
    if (typeof text !== "string") throw new Error("Incorrect arguments");
    return text.trim().split(" ");
}

function filterUniqueValues(values) {
    if (!Array.isArray(values)) throw new Error("Incorrect arguments");
    return [...new Set(values)];
}

function sortAlphabetically(values) {
    if (!Array.isArray(values)) throw new Error("Incorrect arguments");
    const sortingAlphabetically = (value1, value2) => {
        if (typeof value1 !== "string" || typeof value2 !== "string")
            throw new Error("Incorrect arguments");
        return value1.localeCompare(value2);
    };
    return values.sort(sortingAlphabetically);
}

function filterUniqueWords(text) {
    if (typeof text !== "string") throw new Error("Incorrect arguments");
    return sortAlphabetically(filterUniqueValues(getWordsOfText(text)));
}

function getSum(values) {
    if (!Array.isArray(values)) throw new Error("Incorrect arguments");
    const gettingSum = (sum, value) => {
        if (typeof value !== "number" || isNaN(value))
            throw new Error("Incorrect arguments");
        return sum + value;
    };
    return values.reduce(gettingSum, 0);
}

function devide(devident, devisor) {
    if (
        typeof devident !== "number" ||
        isNaN(devident) ||
        typeof devisor !== "number" ||
        isNaN(devisor)
    )
        throw new Error("Incorrect arguments");
    return devident / devisor;
}

function getAvg(values) {
    if (!Array.isArray(values)) throw new Error("Incorrect arguments");
    return devide(getSum(values), values.length);
}

function getAverageGrade(students) {
    if (!Array.isArray(students)) throw new Error("Incorrect arguments");
    const gettingStudentAvg = (student) => {
        if (!(student instanceof Student))
            throw new Error("Incorrect arguments");
        return getAvg(student.grades);
    };
    return getAvg(students.map(gettingStudentAvg));
}

// Task 3: Closures and Higher-Order Functions

function createCounter() {
    let count = 0;
    return () => ++count;
}

function repeatFunction(func, repeatsAmount) {
    if (
        typeof func !== "function" ||
        typeof repeatsAmount !== "number" ||
        isNaN(repeatsAmount) ||
        !isFinite(repeatsAmount)
    )
        throw new Error("Incorrect arguments");
    if (repeatsAmount < 0) {
        return (...args) => {
            while (true) func(...args);
        };
    }
    return (...args) => {
        for (let i = 0; i < repeatsAmount; i++) func(...args);
    };
}

// Task 4: Recursion and Tail Call Optimization

function calculateFactorial(n = 1, result = 1) {
    if (n <= 1) return result;
    else return calculateFactorial(n - 1, n * result);
}

function power(base = 1, exponent = 1, result = 1) {
    if (base === 1) return 1;
    if (base === 0) return 0;

    if (exponent <= 0) return result;
    else return power(base, exponent - 1, result * base);
}

// Task 5: Lazy Evaluation and Generators

function lazyMap(array = [], mapper = () => {}) {
    if (!Array.isArray(array) || typeof mapper !== "function")
        throw new Error("Incorrect arguments");
    let lazyCount = 0;
    return {
        next() {
            if (lazyCount >= array.length) return { value: array };
            array[lazyCount] = mapper(array[lazyCount]);
            lazyCount++;
            return { value: array };
        },
    };
}

function fibonacciGenerator() {
    let first;
    let second;
    return {
        next() {
            const value = (first || 0) + (second || 1);
            first = second;
            second = value;
            return { value };
        },
    };
}
