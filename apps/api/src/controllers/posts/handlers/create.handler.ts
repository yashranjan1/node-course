import { PostBody } from "../../../contracts/post.body";
import { prisma } from "../../../lib/prisma";

export const create = async (body: PostBody) => {
    return await prisma.post.create({
        data: body
    })
}