export default class ProductDto {
    price;
    id;
    type;
    imageUrl;
    public;
    status;
    prdId;
    info;

    constructor(model) {
        this.type = model.type;
        this.id = model._id;
        this.price = model.price;
        this.imageUrl = model.imageUrl;
        this.public = model.public;
        this.prdId = model.prdId;
        const info = structuredClone(model.info);
        delete info["address"];
        this.info = info;
    }
}