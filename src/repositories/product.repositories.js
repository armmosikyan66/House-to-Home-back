import ProductModel from "../models/ProductModel.js";

class ProductRepositories {
    constructor() {
        this.model = ProductModel;
    }

    async GetProducts(page, size, filters, sortBy) {
        const skip = (page - 1) * size;

        const [products, totalProducts] = await Promise.all([
            this.model
                .find(filters.length ? {$and: filters} : {})
                .sort(sortBy ? {"price": sortBy} : {})
                .skip(skip)
                .limit(size),
            this.model.countDocuments()
        ]);

        const totalPages = Math.ceil(totalProducts / page);

        return {
            products,
            founded: totalProducts,
            currentPage: page,
            pageSize: size,
            totalPages
        };
    }
}

export default ProductRepositories;