import { getList } from "./handlers/getList.handler";
import { create } from "./handlers/create.handler";
import { getUserById } from "./handlers/get.handler";
import { updateUserById } from "./handlers/update.handler";
import { deleteUserById } from "./handlers/delete.handler";
import { HttpCode, Query, Param, Body, Controller, Delete, Get, Patch, Post, HttpStatus, UseGuards } from "@nestjs/common";
import { UserBody } from "../../contracts/user.body";
import { SearchQuery } from "../../contracts/search.query";
import { Serialize } from "../../decorators/serialize.decorators";
import { UserView } from "../../contracts/user.view";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import {ApiTags, ApiOperation, ApiResponse, ApiSecurity } from "@nestjs/swagger"

@ApiTags("users")
@Controller("users")
export class UserController {
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Serialize(UserView)
    @ApiOperation({ summary: "Create a new user"})
    @ApiResponse({
        status: 201,
        description: "User created successfully",
        type: UserView
    })
    async create(@Body() body: UserBody) {
        return create(body)
    }

    @Get(":id")
    @Serialize(UserView)
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiSecurity("x-auth")
    @ApiOperation({ summary: "Get a user by id"})
    @ApiResponse({
        status: 200,
        description: "User retrieved successfully",
        type: UserView
    })
    async get(@Param("id") id: string) {
        return getUserById(id)
    }

    @Get()
    @Serialize(UserView)
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiSecurity("x-auth")
    @ApiOperation({ summary: "Get all users"})
    @ApiResponse({
        status: 200,
        description: "Users retrieved successfully",
        type: [UserView]
    })
    async getList(@Query() query: SearchQuery): Promise<UserView[]>{
        return getList(query.search)
    }

    @Patch(":id")    
    @Serialize(UserView)
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)    
    @ApiSecurity("x-auth")
    @ApiOperation({ summary: "Update a user"})
    @ApiResponse({
        status: 200,
        description: "User updated successfully",
        type: UserView
    })
    async update(@Param("id") id: string, @Body() body: UserBody) {
        return updateUserById(id, body)
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiSecurity("x-auth")
    @ApiOperation({ summary: "Delete a user"})
    @ApiResponse({
        status: 204,
        description: "User deleted successfully"
    })
    async delete(@Param("id") id: string) {
        return deleteUserById(id)
    }
}