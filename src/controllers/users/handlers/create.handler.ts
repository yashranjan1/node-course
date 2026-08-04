import { UserBody } from "../../../contracts/user.body";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";


export const create = async (body: UserBody) => {
	const user = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
			password: await bcrypt.hash(body.password, 10)
		}
	});
	
	return {
		name: user.name,
		id: user.id,
		email: user.email,
		createdAt: user.createdAt,
		updateAt: user.updatedAt
	};
};