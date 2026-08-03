import { Router } from "express";
import { getList } from "./handlers/getList.handler.js";
import { create } from "./handlers/create.handler.js";
import { getUserById } from "./handlers/get.handler.js";
import { updateUserById } from "./handlers/update.handler.js";
import { deleteUserById } from "./handlers/delete.handler.js";

const adminMiddleware = (req, res, next) => {
    const authHeader = req.header("auth")
    if (authHeader === "authHeader") {
        next()
    }
    res.status(401).json({
        error: "Unauthorized user"
    })
}

export class UserRouter {
    constructor() {
        this.router = Router()
        this.path = "users"

        this.router.get("/", getList)
        this.router.post("/", adminMiddleware, create)
        this.router.get("/:id", getUserById)
        this.router.put("/:id", updateUserById)
        this.router.put("/:id", deleteUserById)
    }
}