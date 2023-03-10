export default class UserDto {
    email;
    id;
    firstName;
    lastName;
    phoneNumber;
    favorites;
    role;
    createdAt;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.phoneNumber = model.phoneNumber;
        this.favorites = model.favorites;
        this.createdAt = model.createdAt;
        this.role = model.role;
    }
}
