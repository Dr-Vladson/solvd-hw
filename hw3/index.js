// task 1
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
