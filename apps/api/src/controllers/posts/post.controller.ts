import { Query, Param, Body, Controller, HttpCode, HttpStatus, Post, Patch, Get, Delete } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiSecurity} from "@nestjs/swagger";
import { PostView } from "../../contracts/post.view";
import { PostBody } from "../../contracts/post.body";
import { create } from "./handlers/create.handler";
import { updatePostById } from "./handlers/update.handler";
import { getPostById } from "./handlers/get.handler";
import { SearchQueryPosts } from "../../contracts/search.query.posts";
import { listPosts } from "./handlers/list.handler";
import { deletePostById } from "./handlers/delete.handler";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";


@Controller("posts")
export class PostController {
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    @ApiSecurity("x-auth")
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
    @UseGuards(JwtAuthGuard)
    @ApiSecurity("x-auth")
    @ApiOperation({summary: "Update a post", operationId: "updatePost"})
    @ApiResponse({
        status: 200,
        description: "Post updated successfully",
        type: PostView
    })
    async update(@Param("id") id: string, @Body() body: PostBody){
        return updatePostById(id, body)
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiSecurity("x-auth")
    @ApiOperation({summary: "Get a post by Id", operationId: "getPostById"})
    @ApiResponse({
        status: 200,
        description: "Post retrieved successfully",
        type: PostView
    })
    async getById(@Param("id") id: string){
        return getPostById(id)
    } 

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiSecurity("x-auth")
    @ApiOperation({ summary: "List all posts", operationId: "listPosts"})
        @ApiResponse({
        status: 200,
        description: "Posts retrieved successfully",
        type: [PostView]
    })
    async listPosts(@Query() query: SearchQueryPosts) {
        return listPosts(query.search)
    }
 

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    @ApiSecurity("x-auth")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Delete a post by Id", operationId: "deletePostById"})
    @ApiResponse({
        status: 204,
        description: "Post deleted successfully"
    })
    async delete(@Param("id") id: string) {
        return await deletePostById(id)
    }
}