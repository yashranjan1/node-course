import { NotFoundException } from "@nestjs/common"
import { prisma } from "../../../lib/prisma"


export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
        throw new NotFoundException("User not found")
    }

	return {
		name: user.name,
		id: user.id,
		email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
	};
}