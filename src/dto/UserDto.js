export default class UserDto {
    email;
    id;
    firstName;
    lastName;
    phoneNumber;
    favorites;
    role;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.phoneNumber = model.phoneNumber;
        this.favorites = model.favorites;
        this.role = model.role;
    }
}
