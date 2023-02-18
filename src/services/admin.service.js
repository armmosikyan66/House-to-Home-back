import ProductRepositories from "../repositories/product.repositories.js";
import {ValidationError} from "../exceptions/index.js";

class AdminService extends ProductRepositories {
    async createNewProduct(data, files) {
        const imageUrl = files.map((file) => `/uploads/${file.filename}`);

        const newProduct = await this.createPrd({...data, imageUrl});

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

    async addImg(prdId, file) {
        const newProduct = await this.addOneImg(prdId, file)

        return newProduct;
    }
}

export default new AdminService();