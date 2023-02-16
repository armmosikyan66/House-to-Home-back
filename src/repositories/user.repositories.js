import UserModel from "../models/UserModel.js";

class UserRepositories {
    constructor() {
        this.model = UserModel;
    }

    async checkCandidates(email) {
        return await this.model.findOne({email}).exec();
    }

    async createUser(email, password, phoneNumber, firstName, lastName, role) {
        return await this.model.create({email, password, phoneNumber, firstName, lastName, role});
    }
}

export default UserRepositories;