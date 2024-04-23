// Task 1: Object Property Manipulation

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    updateInfo(obj = {}) {
        if (!obj || typeof obj !== "object") throw new Error("Incorect args");
        if ("firstName" in obj)
            Object.defineProperty(person, "firstName", {
                value: obj.firstName,
            });
        if ("lastName" in obj)
            Object.defineProperty(person, "lastName", {
                value: obj.lastName,
            });
        if ("age" in obj)
            Object.defineProperty(person, "age", {
                value: obj.age,
            });
        if ("email" in obj)
            Object.defineProperty(person, "email", {
                value: obj.email,
            });
    },
};

for (let key in person) {
    Object.defineProperty(person, key, {
        writable: false,
    });
}

person.address = {};
Object.defineProperty(person, "address", {
    configurable: false,
    enumerable: false,
});

// Task 2: Object Property Enumeration and Deletion

const product = {
    name: "Laptop",
    price: 1000,
    quantity: 5,
};

Object.defineProperties(product, {
    price: {
        enumerable: false,
        writable: false,
    },
    quantity: {
        enumerable: false,
        writable: false,
    },
});

function getTotalPrice(product = {}) {
    if (!product || typeof product !== "object")
        throw new Error("Incorect args");
    const price = Object.getOwnPropertyDescriptor(product, "price")?.value;
    const quantity = Object.getOwnPropertyDescriptor(
        product,
        "quantity"
    )?.value;
    if (
        typeof price !== "number" ||
        typeof quantity !== "number" ||
        isNaN(price) ||
        isNaN(quantity)
    ) {
        throw new Error("Incorect product properties");
    }

    return price * quantity;
}

function deleteNonConfigurable(obj = {}, key = "") {
    if (!product || typeof product !== "object" || typeof key !== "string")
        throw new Error("Incorect args");
    if (!(key in obj)) throw new Error("No such key in object provided");
    if (!Object.getOwnPropertyDescriptor(obj, key).configurable)
        throw new Error("The provided property is non-configurable");
    delete obj[key];
}

// Task 3: Object Property Getters and Setters

class BankAccount {
    constructor(balance) {
        typeof balance === "number" && !isNaN(balance) && isFinite(balance)
            ? (this._balance = balance)
            : (this._balance = 1000);
    }
    get formattedBalance() {
        return `$${this._balance}`;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        if (typeof value === "number" && !isNaN(value) && isFinite(value))
            this._balance = value;
    }
    transfer(targetBankAcc, amount) {
        if (
            !(targetBankAcc instanceof BankAccount) ||
            targetBankAcc === this ||
            typeof amount !== "number" ||
            isNaN(amount) ||
            !isFinite(amount)
        )
            throw new Error("Incorrect args");
        this.balance = this.balance - amount;
        targetBankAcc.balance = targetBankAcc.balance + amount;
    }
}