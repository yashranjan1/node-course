import { prisma } from "../../../lib/prisma";
import { User } from "./user.store";

export const getList = async (query: string) => {
	return await prisma.user.findMany({
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

};
