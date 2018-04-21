import {Request, Response} from "express";
import {mongoService} from "../types/services/mongoService";
import {loginController} from "../types/controller/loginController";
import {User} from "../types/models/User";
import {logger} from "../utils/logger";

export const LoginController = (mongoService: mongoService): loginController => {
    const login = (req: Request, res: Response) => {
        if (!req.body.email && req.body.password) {
            logger.warn("A login attempt was made without any credentials");
            res.status(403).send({message: "You are not authorized!"});
        }
        mongoService.getUser(req.body.email).then((user: User) => {
            if (user.password === req.body.password) {
                logger.info("User was logged in", {user: req.body.email});
                res.status(200).send({message: "Success"});
                return;
            }
            logger.warn("There was an invalid login attempt", {email: req.body.email});
            res.status(403).send({message: "You are not authorized!"});
        });
    };

    return {login};
};