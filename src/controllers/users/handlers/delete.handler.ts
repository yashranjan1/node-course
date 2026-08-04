import { UserStore } from "./user.store"
import { NotFoundException } from "@nestjs/common"

export const deleteUserById = (id: number) => {
	const user = UserStore.get(id)
	if (!user) {
		throw new NotFoundException("User not found")
	}
    UserStore.delete(id)
}