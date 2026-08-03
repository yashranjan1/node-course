import { NextFunction, Request, Response } from "express"
import { UserStore } from "./user.store"

export const deleteUserById = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
	const user = UserStore.get(parseInt(id!.toString()))
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}
    UserStore.delete(parseInt(id!.toString()))
	res.status(204).send()
}