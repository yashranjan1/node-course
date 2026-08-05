import { NotFoundException } from "@nestjs/common";
import { PostBody } from "../../../contracts/post.body";
import { prisma } from "../../../lib/prisma";

export const getPostById = async (id: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })
    if (!post) {
        throw new NotFoundException("Post does not exist")
    }

    return post
}