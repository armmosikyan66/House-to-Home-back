import ProductModel from "../models/ProductModel.js";
import isObjectEmpty from "../utils/helpers/isObjectEmpty.js";
import {ReadPreference as ObjectID} from "mongodb";

class ProductRepositories {
    constructor() {
        this.prdModel = ProductModel;
    }

    async getProducts(page, size, filters, sortBy, search) {
        const skip = (page - 1) * size;

        const [products, totalProducts] = await Promise.all([
            this.prdModel
                .find({
                    ...(!isObjectEmpty(search) ? search : {}),
                    ...(!isObjectEmpty(filters) ? filters : {})
                })
                .sort(sortBy ? {"price": sortBy} : {})
                .skip(skip)
                .limit(size),
            this.prdModel.countDocuments({
                ...(!isObjectEmpty(search) ? search : {}),
                ...(!isObjectEmpty(filters) ? filters : {})
            })
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
        return await this.prdModel.findOne({prdId});
    }

    async getRecommendedPrd(status, lang) {
        return await this.prdModel.find({$and: [{[`status.${lang}`]: status}, {public: 1}]}).exec();
    }

    async getSavedByIds(ids) {
        return await this.prdModel.find({ _id: { $in: ids }}).exec();
    }

    async createPrd(data) {
        return await this.prdModel.create(data);
    }

    async deletePrdById(id) {
        return await this.prdModel.deleteOne({prdId: id}).exec();
    }

    async isIdValid(id) {
        const checkPrd = await this.prdModel.findOne({prdId: id}).exec();
        if (!checkPrd) {
            return false
        }

        return true;
    }


    async deleteOneImg(dirId, filename, prdId) {
        return await this.prdModel.findOneAndUpdate(
            {prdId: Number(prdId)},
            {$pull: {imageUrl: `/uploads/${dirId}/${filename}`}},
            {new: true},
        ).exec()
    }

    async addOneImg(prdId, imageUrl) {
        return await this.prdModel.findOneAndUpdate(
            {prdId: Number(prdId)},
            {$addToSet: {imageUrl}},
            {new: true},
        ).exec()
    }

    async updatePrdData(data, prdId) {
        return await this.prdModel.findOneAndUpdate(
            {prdId: Number(prdId)},
            {$set: data},
            {new: true},
        ).exec()
    }
}

export default ProductRepositories;