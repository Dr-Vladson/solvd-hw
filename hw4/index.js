// Task 1: Object Property Manipulation

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    updateInfo(obj = {}) {
        if (!obj || typeof obj !== "object") throw new Error("Incorect args");
        if (obj.firstName)
            Object.defineProperty(person, "firstName", {
                value: obj.firstName,
            });
        if (obj.lastName)
            Object.defineProperty(person, "lastName", {
                value: obj.lastName,
            });
        if (obj.age)
            Object.defineProperty(person, "age", {
                value: obj.age,
            });
        if (obj.email)
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
