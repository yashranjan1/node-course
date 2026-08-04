import { Router } from "express";
import { getList } from "./handlers/getList.handler";
import { create } from "./handlers/create.handler";
import { getUserById } from "./handlers/get.handler";
import { updateUserById } from "./handlers/update.handler";
import { deleteUserById } from "./handlers/delete.handler";
import { HttpCode, Query, Param, Body, Controller, Delete, Get, Patch, Post, HttpStatus } from "@nestjs/common";
import { UserBody } from "../../contracts/user.body";
import { SearchQuery } from "../../contracts/search.query";
import { Serialize } from "../../decorators/serialize.decorators";
import { UserView } from "../../contracts/user.view";


const adminMiddleware = (req, res, next) => {
    const authHeader = req.header("auth")
    if (authHeader) {
       return next()
    }
    return res.status(401).json({
        error: "Unauthorized user"
    })
}


@Controller("users")
export class UserController {
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Serialize(UserView)
    async create(@Body() body: UserBody) {
        return create(body)
    }

    @Get(":id")
    @Serialize(UserView)
    @HttpCode(HttpStatus.OK)
    async get(@Param("id") id: string) {
        return getUserById(parseInt(id))
    }

    @Get()
    @Serialize(UserView)
    @HttpCode(HttpStatus.OK)
    async getList(@Query() query: SearchQuery): Promise<UserView[]>{
        return getList(query.search)
    }

    @Patch(":id")    
    @Serialize(UserView)
    @HttpCode(HttpStatus.OK)
    async update(@Param("id") id: string, @Body() body: UserBody) {
        return updateUserById(parseInt(id), body)
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param("id") id: string) {
        return deleteUserById(parseInt(id))
    }
}