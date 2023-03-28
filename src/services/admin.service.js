import ProductRepositories from "../repositories/product.repositories.js";
import {ValidationError} from "../exceptions/index.js";
import parseObjectValues from "../utils/helpers/parseObjectValues.js";
import generateUniqueNumber from "../utils/helpers/generateUniqueNumber.js";
import UserRepositories from "../repositories/user.repositories.js";
import UserDto from "../dto/UserDto.js";
import aggregation from "../utils/helpers/aggregation.js";

class AdminService extends aggregation(ProductRepositories, UserRepositories) {
    constructor() {
        super();
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

    async deleteUser(id) {
        const removedUser = await this.deleteById(id);

        return removedUser;
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

    async updateUser(data, userId) {
        const updatedUser = await this.updateUserData(data, userId);

        return new UserDto(updatedUser);
    }

    async getAllUsers(page = 1) {
        const data  = await this.getUsers(page);

        return {
            ...data,
            users: data.users.map(user => new UserDto(user))
        }
    }
}

export default new AdminService();