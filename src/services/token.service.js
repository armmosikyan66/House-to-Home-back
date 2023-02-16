import jwt from "jsonwebtoken";
import TokenRepositories from "../repositories/token.repositories.js";

class TokenService extends TokenRepositories {
    constructor() {
        super();
    }

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(user, refreshToken) {
        const tokenData = await this.findOne(user);
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await this.create(user, refreshToken)

        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await this.deleteOne(refreshToken);

        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await this.findOne(refreshToken);

        return tokenData;
    }
}

export default new TokenService();
