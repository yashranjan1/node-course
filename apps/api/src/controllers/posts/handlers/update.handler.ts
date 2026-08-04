import { NotFoundException } from "@nestjs/common";
import { PostBody } from "../../../contracts/post.body";
import { prisma } from "../../../lib/prisma";

export const updatePostById = async (id: string, body: PostBody) => {
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })

    if (!post) {
        throw new NotFoundException
    }

    return await prisma.post.update({
        where: {
            id: id
        },
        data: {
            ...body,
            id: id,
            authorId: post.authorId
        }
    })
}