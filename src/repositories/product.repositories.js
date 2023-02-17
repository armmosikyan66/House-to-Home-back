import ProductModel from "../models/ProductModel.js";
import isObjectEmpty from "../utils/helpers/isObjectEmpty.js";

class ProductRepositories {
    constructor() {
        this.model = ProductModel;
    }

    async getProducts(page, size, filters, sortBy) {
        const skip = (page - 1) * size;

        const [products, totalProducts] = await Promise.all([
            this.model
                .find(!isObjectEmpty(filters) ? filters : {})
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

    async getOneByPrdId(prdId) {
        return await this.model.findOne({prdId}).exec();
    }

    async getRecommendedPrd(status, lang) {
        return await this.model.find({$and: [{[`status.${lang}`]: status}, {public: 1}]}).exec();
    }

    async getSavedByIds(ids) {
        return await this.model.find({$in: ids}).exec();
    }
}

export default ProductRepositories;