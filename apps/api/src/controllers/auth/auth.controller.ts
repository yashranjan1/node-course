import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginBody } from "../../contracts/login.body";
import { login } from "./handlers/login.handler";
import { ApiOperation, ApiResponse} from "@nestjs/swagger";
import { AccessToken } from "../../contracts/access.token.view";


@Controller("auth")
export class AuthController {
    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Login using credentials", operationId: "login"})
    @ApiResponse({
        status: 200,
        description: "User logged in successfully",
        type: AccessToken
    })
    async login(@Body() body: LoginBody){
        return login(body)
    }
}