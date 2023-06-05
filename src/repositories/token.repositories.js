import TokenModel from "../models/TokenModel.js";

class TokenRepositories {
    constructor() {
        this.model = TokenModel;
    }

    async create(userId, refreshToken) {
        return this.model.create({user: userId, refreshToken})
    }

    async findOne(par) {
        return this.model.findOne(par);
    }
    async deleteOne(refreshToken) {
        return this.model.deleteOne({refreshToken});
    }

    async findAndModify(options, data) {
        return await this.model.findOneAndUpdate(options, data, {
            new: true
        })
    }
}

export default TokenRepositories;