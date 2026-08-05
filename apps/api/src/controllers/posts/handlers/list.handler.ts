import { prisma } from "../../../lib/prisma"

export const listPosts = async (filter: string) => {
    if (!filter) {
        filter = ""
    }
    return await prisma.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: filter
                    }
                },
                {
                    content: {
                        contains: filter
                    }
                },

                {
                    description : {
                        contains: filter
                    }
                }
            ]
        }
    })
}