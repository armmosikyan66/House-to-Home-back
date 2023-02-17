import ProductRepositories from "../repositories/product.repositories.js";
import ProductDto from "../dto/ProductDto.js";
import getFilteredData from "../utils/helpers/getFilter.js";

class ProductService extends ProductRepositories {
    async getAll(lang, page = 1, filterBy = {}, sortBy = null) {
        const filters = await getFilteredData(filterBy, lang);

        const {founded, products} = await this.getProducts(page, 10, filters, sortBy);

        return {
            founded,
            products: products.map(prd => new ProductDto(prd)),
        }
    }

    async getOne(id) {
        const product = await this.getOneByPrdId(id);

        return new ProductDto(product);
    }

    async getRecommended(status, lang) {
        const products = await this.getRecommendedPrd(status, lang);

        return products.map(prd => new ProductDto(prd));
    }

    async getSavedPrd(ids) {
        const products = await this.getSavedByIds(ids);

        return products.map(prd => new ProductDto(prd));
    }
}

export default new ProductService();