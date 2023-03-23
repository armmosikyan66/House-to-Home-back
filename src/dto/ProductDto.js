export default class ProductDto {
    title;
    price;
    desc;
    floorArea;
    rooms;
    furniture;
    baths;
    elevator;
    address;
    city;
    region;
    newBuilding;
    floorsCount;
    currentFloor;
    ceilingHeight;
    balcony;
    plotArea;
    buildingType;
    type;
    imageUrl;
    status;
    prdId;
    id;

    constructor(model) {
        this.id = model._id;
        this.type = model.type;
        this.title = model.title;
        this.prdId = model.prdId;
        this.price = model.price;
        this.desc = model.desc;
        this.floorArea = model.floorArea;
        this.rooms = model.rooms;
        this.furniture = model.furniture;
        this.baths = model.baths;
        this.elevator = model.elevator;
        this.address = model.address;
        this.city = model.city;
        this.region = model.region;
        this.newBuilding = model.newBuilding;
        this.floorsCount = model.floorsCount;
        this.currentFloor = model.currentFloor;
        this.ceilingHeight = model.ceilingHeight;
        this.balcony = model.balcony;
        this.plotArea = model.plotArea;
        this.buildingType = model.buildingType;
        this.imageUrl = model.imageUrl;
        this.status = model.status;
    }
}