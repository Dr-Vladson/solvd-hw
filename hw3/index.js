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

function getFullName(person) {
    if (!(person instanceof Person)) throw new Error("Incorrect arguments");
    return `${person.firstName} ${person.lastName}`;
}