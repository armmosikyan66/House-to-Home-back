import ProductRepositories from "../repositories/product.repositories.js";
import {ValidationError} from "../exceptions/index.js";
import parseObjectValues from "../utils/helpers/parseObjectValues.js";
import generateUniqueNumber from "../utils/helpers/generateUniqueNumber.js";
import UserRepositories from "../repositories/user.repositories.js";


class AdminService extends ProductRepositories {
    constructor() {
        super();

        this.userClass = new UserRepositories();
    }

    async createNewProduct(data, imageUrl, user) {

        const newData = parseObjectValues(data);
        let prdId = generateUniqueNumber(0, 10000);
        const foundItm = await this.getOneByPrdId(prdId);

        do {
            prdId = generateUniqueNumber(0, 10000)
        } while (foundItm);

        const newProduct = await this.createPrd({...newData, imageUrl, author: `${user.firstName} ${user.lastName}`, prdId});

        return newProduct;
    }

    async deletePrd(id) {
        if (!await this.isIdValid(id)) {
            throw new ValidationError("id not valid")
        }

        const removedProduct = await this.deletePrdById(id);

        return removedProduct;
    }

    async deleteImg(dirId, filename, prdId) {
        const removedProduct = await this.deleteOneImg(dirId, filename, prdId);

        return removedProduct;
    }

    async addImg(prdId, img) {
        const newProduct = await this.addOneImg(prdId, img)

        return newProduct;
    }

    async getAdminPrd(page) {
        return await this.getProducts(page, 10, {}, null);
    }

    async updatePrd(data, prdId) {
        return await this.updatePrdData(data, prdId);
    }

    async getUsers(page = 1) {
        return await this.userClass.getUsers(page);
    }
}

export default new AdminService();