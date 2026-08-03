import { Router } from "express";
import { getList } from "./handlers/getList.handler";
import { create } from "./handlers/create.handler";
import { getUserById } from "./handlers/get.handler";
import { updateUserById } from "./handlers/update.handler";
import { deleteUserById } from "./handlers/delete.handler";

const adminMiddleware = (req, res, next) => {
    const authHeader = req.header("auth")
    if (authHeader) {
       return next()
    }
    return res.status(401).json({
        error: "Unauthorized user"
    })
}

export class UserRouter {
    public router
    public path
    constructor() {
        this.router = Router()
        this.path = "users"

        this.router.get("/", getList)
        this.router.post("/", adminMiddleware, create)
        this.router.get("/:id", getUserById)
        this.router.patch("/:id", updateUserById)
        this.router.delete("/:id", deleteUserById)
    }
}