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

    async getById(id) {
        return await this.model.findById(id).exec();
    }

    async addToFavorites(user, prd) {
        return await this.model.findOneAndUpdate(
            {_id: user},
            {$addToSet: {favorites: prd}},
            {new: true},
        ).exec()
    }

    async removeFromFavorites(user, prd) {
        return await this.model.findOneAndUpdate(
            {_id: user},
            {$pull: {favorites: prd}},
            {new: true},
        ).exec()
    }
}

export default UserRepositories;