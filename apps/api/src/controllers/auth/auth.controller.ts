import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginBody } from "../../contracts/login.body";
import { login } from "./handlers/login.handler";
import { ApiOperation } from "@nestjs/swagger";


@Controller("auth")
export class AuthController {
    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Login using credentials", operationId: "login"})
    async login(@Body() body: LoginBody){
        return login(body)
    }
}