import { NotFoundException } from "@nestjs/common"
import { prisma } from "../../../lib/prisma"

export const deletePostById = async (id: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })

    if (!post) {
        throw new NotFoundException("Post not found")
    }

    await prisma.post.delete({
        where: {
            id: id
        }
    })
}