import { UserStore } from "./user.store.js"

export const deleteUserById = (req, res, next) => {
    const id = req.params.id
    UserStore.delete(id)
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}
	UserStore.delete(req.params.id);
	res.status(204);
	res.send();
}