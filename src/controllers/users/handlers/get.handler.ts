import { NotFoundException } from "@nestjs/common"
import { UserStore } from "./user.store"


export const getUserById = (id: number) => {
    const user = UserStore.get(id)
    if (!user) {
        throw new NotFoundException("User not found")
    }

    delete user.password
    return user
}