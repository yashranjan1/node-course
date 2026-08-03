import { UserStore } from "./user.store.js"

export const getUserById = (req, res, next) => {
    const id = req.params.id
    const results = UserStore.get(id)
    if (!results) {
        res.status(404)
    }
    res.json(results)
}