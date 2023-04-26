import UserModel from "../models/UserModel.js";
import UserDto from "../dto/UserDto.js";
import isObjectEmpty from "../utils/helpers/isObjectEmpty.js";

class UserRepositories {
    constructor() {
        this.userModel = UserModel;
    }

    async checkCandidates(email) {
        return await this.userModel.findOne({email}).exec();
    }
    async checkActivationLink(activationLink) {
        return await this.model.findOne({activationLink}).exec();
    }
    async createUser(email, password, phoneNumber, firstName, lastName, role) {
        return await this.userModel.create({email, password, phoneNumber, firstName, lastName, role});
    }

    async getById(id) {
        return await this.userModel.findById(id).exec();
    }

    async addToFavorites(user, prd) {
        return await this.userModel.findOneAndUpdate(
            {_id: user},
            {$addToSet: {favorites: prd}},
            {new: true},
        ).exec()
    }

    async removeFromFavorites(user, prd) {
        return await this.userModel.findOneAndUpdate(
            {_id: user},
            {$pull: {favorites: prd}},
            {new: true},
        ).exec()
    }

    async getUsers(page, size, search) {
        const skip = (page - 1) * size;

        const [users, totalUsers] = await Promise.all([
            this.userModel
                .find(!isObjectEmpty(search) ? search : {})
                .sort({})
                .skip(skip)
                .limit(size),
            this.userModel.countDocuments(!isObjectEmpty(search) ? search : {})
        ]);

        const totalPages = Math.ceil(totalUsers / page);

        return {
            users,
            founded: totalUsers,
            currentPage: page,
            pageSize: size,
            totalPages
        };
    }

    async updateUserData(data, id) {
        return await this.userModel.findByIdAndUpdate(
            id,
            {$set: data},
            {new: true},
        ).exec()
    }

    async deleteById(id) {
        return await this.userModel.findByIdAndDelete(id);
    }
}

export default UserRepositories;