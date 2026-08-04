import { SearchQuery } from "../../../contracts/search.query"
import { User, UserStore } from "./user.store"

export const getList = (query: string): User[] => {
    const users = UserStore.find(query)

    users.forEach( user => delete user.password )

    return users
}