import { prisma } from "../../../lib/prisma";
import { User } from "./user.store";

export const getList = async (query: string): Promise<User[]> => {
	const users = await prisma.user.findMany({
		where: {
			OR: [
				{
					name: {
						contains: query,
					},
				},
				{
					email: {
						contains: query,
					},
				},
			],
		},
	});

	let passwordless = [];

	users.forEach((user) => {
		passwordless.push({
			name: user.name,
			id: user.id,
			email: user.email,
		});
	});
	return passwordless;
};
