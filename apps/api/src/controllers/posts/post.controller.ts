import { Param, Body, Controller, HttpCode, HttpStatus, Post, Patch } from "@nestjs/common";
import { ApiOperation, ApiResponse} from "@nestjs/swagger";
import { PostView } from "../../contracts/post.view";
import { PostBody } from "../../contracts/post.body";
import { create } from "./handlers/create.handler";
import { updatePostById } from "./handlers/update.handler";


@Controller("posts")
export class PostController {
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: "Create a post", operationId: "createPost"})
    @ApiResponse({
        status: 201,
        description: "Post created successfully",
        type: PostView
    })
    async create(@Body() body: PostBody){
        return create(body)
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Create a post", operationId: "createPost"})
    @ApiResponse({
        status: 201,
        description: "Post created successfully",
        type: PostView
    })
    async update(@Param("id") id: string, @Body() body: PostBody){
        return updatePostById(id, body)
    }
}