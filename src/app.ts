import express, { Request, Response, NextFunction } from "express"
import { UserRouter } from "./controllers/users/user.route"

export class App {
    public host
    constructor() {
        this.host = express()
        this.host.use(express.json())

        this.host.get("/", (req, res, next) => {
            return res.send("Hello world")
        })

        this.host.use((req, res, next) => {
            console.log(req.method, req.url);
            next();
        });

        const usersRoute = new UserRouter()
        this.host.use(`/api/${usersRoute.path}`, usersRoute.router)

        this.host.use((error, req, res, next) => {
            if (res.headersSent) {
                return next(error);
            }

            res.status(400).json(error);        
        })

        this.host.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).send("No Endpoint found");
        });

    }

    listen() {
        this.host.listen(3000, () => {
            console.info("listening on http://localhost:3000")
            console.info("===============")
        })
    }
}
