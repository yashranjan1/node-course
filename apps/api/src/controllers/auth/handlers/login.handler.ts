import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AccessToken } from "../../../contracts/access.token.view";
import { LoginBody } from "../../../contracts/login.body";
import jwt from "jsonwebtoken"
import config from "../../../config";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export const login = async (body: LoginBody) : Promise<AccessToken> => {
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })
    if (!user) {
        throw new NotFoundException("User does not exist")
    }
    const isMatch = await bcrypt.compare(body.password, user.password)

    if (isMatch) {
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
    throw new UnauthorizedException("Unauthorized action")
}