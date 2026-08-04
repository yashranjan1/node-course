import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginBody } from "../../contracts/login.body";
import { login } from "./handlers/login.handler";


@Controller("auth")
export class AuthController {
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginBody){
        return login(body)
    }
}