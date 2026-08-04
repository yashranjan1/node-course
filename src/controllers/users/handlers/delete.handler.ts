import { prisma } from "../../../lib/prisma"
import { NotFoundException } from "@nestjs/common"

export const deleteUserById = async (id: string) => {
	const user = await prisma.user.findFirst({
		where: {
			id: id
		}
	})
	if (!user) {
		throw new NotFoundException("User not found")
	}
    await prisma.user.delete({
		where: {
			id: id
		}
	})
}