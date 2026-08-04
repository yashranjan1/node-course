import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AccessToken } from "../../../contracts/access.token.view";
import { LoginBody } from "../../../contracts/login.body";
import { UserStore } from "../../users/handlers/user.store";
import jwt from "jsonwebtoken"
import config from "../../../config";

export const login = (body: LoginBody) : AccessToken => {
    const user = UserStore.getByEmail(body.email)
    if (!user) {
        throw new NotFoundException("User does not exist")
    }
    if (user.password === body.password) {
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
        }, config.jwtSecret, {
            expiresIn: "1h",
        })
        return {
            token: token,
            expiresIn: 3600
        }
    }
    console.log(user, body.password)
    throw new UnauthorizedException("Unauthorized action")
}