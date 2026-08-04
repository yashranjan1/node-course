

import { UserBody } from "../../../contracts/user.body";
import { NotFoundException } from "@nestjs/common";
import { prisma } from "../../../lib/prisma";

export const updateUserById = async (id: string, body: UserBody) => {
	const user = await prisma.user.findFirst({
		where: {
			id: id
		}
	});
	if (!user) {
		throw new NotFoundException("User not found")
	}
	const updated = await prisma.user.update({
		where: {
			id: id,
		},
		data: body
	});

	return {
		name: updated.name,
		id: updated.id,
		email: updated.email
	};
};