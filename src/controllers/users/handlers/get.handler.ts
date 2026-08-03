import { UserStore } from "./user.store"
import { NextFunction, Request, Response } from "express"


export const getUserById = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const results = UserStore.get(parseInt(id.toString()))
    if (!results) {
        return res.status(404).json({
            error: "User not found"
        })
    }
    return res.json(results)
}