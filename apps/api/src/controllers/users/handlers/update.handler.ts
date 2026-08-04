

import { UserBody } from "../../../contracts/user.body";
import { NotFoundException } from "@nestjs/common";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export const updateUserById = async (id: string, body: UserBody) => {
	const user = await prisma.user.findFirst({
		where: {
			id: id
		}
	});
	if (!user) {
		throw new NotFoundException("User not found")
	}
	return await prisma.user.update({
		where: {
			id: id,
		},
		data: {
			...body, 
			password: await bcrypt.hash(body.password, 10)
		}
	});
};