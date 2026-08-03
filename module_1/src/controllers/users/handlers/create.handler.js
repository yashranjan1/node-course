import { UserStore } from "./user.store.js"

export const create = (req, res, next) => {
    const body = req.body
    if (!body.name) {
        return next({
            error: "name is required"
        })
    }
    const user = UserStore.add(req.body)
    res.json(user)
}