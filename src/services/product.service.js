import ProductRepositories from "../repositories/product.repositories.js";
import ProductDto from "../dto/ProductDto.js";

class ProductService extends ProductRepositories {
    async getAll(lang, page = 1, filterBy = {}, sortBy = null) {
        const filters = [];

        const {founded, products} = await this.GetProducts(page, 10, filters, sortBy);

        return {
            founded,
            products: products.map(prd => new ProductDto(prd)),
        }
    }
}

export default new ProductService();