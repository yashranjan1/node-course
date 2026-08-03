import { UserStore } from "./user.store.js"

export const updateUserById = (req, res, next) => {
    const id = req.params.id
    const user = UserStore.get(user)
    if (!user) {
        res.status(404).json({
            error: "User not found"
        })
    }
    const body = req.body
    const newUser = UserStore.update(id, body)
    res.json(newUser)
}