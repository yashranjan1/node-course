

import { UserBody } from "../../../contracts/user.body";
import { UserStore } from "./user.store";
import { NotFoundException } from "@nestjs/common";

export const updateUserById = async (id: number, body: UserBody) => {
	const user = UserStore.get(id);
	if (!user) {
		throw new NotFoundException("User not found")
	}
	const updated = UserStore.update(id, { ...user, ...body });

	delete updated.password

	return updated
};