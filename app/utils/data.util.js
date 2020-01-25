export const data = {
    filterProducts: products => {
        const productsWithQuantities = products.map(product =>
            ({
                variations_quantity: product.variations
                    ? product.variations.reduce((acc, variation) => acc + variation.quantity, 0)
                    : 0,
                ...product
            })
        ).filter(item => item.variations_quantity !== 0);

        return productsWithQuantities;
    }
}