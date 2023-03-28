import UserRepositories from "../repositories/user.repositories.js";
import TokenService from "./token.service.js";
import MailService from "./mail.service.js";
import {AuthError, BadRequest, NotFound} from "../exceptions/index.js";
import UserDto from "../dto/UserDto.js";
import bcrypt from "bcrypt";
import {ALREADY_EXISTS, IS_INVALID, NOT_EXISTS} from "../utils/constants.js";
import {v4} from 'uuid'

class UserService extends UserRepositories{
    constructor() {
        super();
    }

    async registration(email, password, phoneNumber, firstName, lastName, role) {
        const candidate = await this.checkCandidates(email);

        if (candidate) {
            throw new BadRequest(ALREADY_EXISTS(email));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = v4();

        const user = await this.createUser(email, hashPassword, phoneNumber, firstName, lastName, role ?? "user");
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await this.checkActivationLink(activationLink);
        if(!user) {
            throw new BadRequest(IS_INVALID(activationLink))
        }
        user.isActivated = true;
        await user.save();
    }
    async sendReport(firstName, lastName, email, phoneNumber, message) {
        await MailService.sendReport(firstName, lastName, email, phoneNumber, message)
        return
    }
    async login(email, password) {
        const candidate = await this.checkCandidates(email);

        if (!candidate) {
            throw new NotFound(NOT_EXISTS("email"));
        }

        const isPassEquals = await bcrypt.compare(password, candidate.password);

        if (!isPassEquals) {
            throw new BadRequest(IS_INVALID('password'));
        }

        const userDto = new UserDto(candidate);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new AuthError("not Authorized to refresh");
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw new AuthError("not Authorized to refresh");
        }

        const user = await this.getById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async addFavorite(userId, prdId) {
        const user = await this.addToFavorites(userId, prdId);

        return new UserDto(user);
    }

    async removeFavorite(userId, prdId) {
        const user = await this.removeFromFavorites(userId, prdId);

        return new UserDto(user);
    }
}

export default new UserService();