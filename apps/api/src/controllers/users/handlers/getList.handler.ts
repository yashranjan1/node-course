import { prisma } from "../../../lib/prisma";

export const getList = async (query: string) => {
	if (!query) {
		query = ""
	}
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
