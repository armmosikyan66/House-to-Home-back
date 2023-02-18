import ProductModel from "../models/ProductModel.js";
import isObjectEmpty from "../utils/helpers/isObjectEmpty.js";
import {ReadPreference as ObjectID} from "mongodb";

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

    async createPrd(data) {
        return await this.model.create(data).exec();
    }

    async deletePrdById(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async isIdValid(id) {
        if (!ObjectID.isValid(id)) {
            return false
        }

        return true;
    }

    async deleteOneImg(dirId, filename, prdId) {
        return await this.model.findOneAndUpdate(
            {_id: prdId},
            {$pull: {imageUrl: `/${dirId}/${filename}`}},
            {new: true},
        ).exec()
    }

    async addOneImg(dirId, file) {
        return await this.model.findOneAndUpdate(
            {_id: dirId},
            {$addToSet: {imageUrl: `/uploads/${file.filename}`}},
            {new: true},
        ).exec()
    }
}

export default ProductRepositories;