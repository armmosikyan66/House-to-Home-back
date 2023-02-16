import UserRepositories from "../repositories/user.repositories.js";
import TokenService from "./token.service.js";
import {AuthError} from "../exceptions/index.js";
import UserDto from "../dto/UserDto.js";
import bcrypt from "bcrypt";

class UserService extends UserRepositories{
    constructor() {
        super();
    }

    async registration(email, password, phoneNumber, firstName, lastName, role) {
        const candidate = await this.checkCandidates(email);

        if (candidate) {
            throw new AuthError("email are already existing");
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await this.createUser(email, hashPassword, phoneNumber, firstName, lastName, role ?? "user");

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
}

export default new UserService();