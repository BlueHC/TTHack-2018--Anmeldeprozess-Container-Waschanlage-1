import {Request, Response} from "express";
import {mongoService} from "../types/services/mongoService";
import {loginController} from "../types/controller/loginController";
import {User} from "../types/models/User";
import {logger} from "../utils/logger";
import * as Bluebird from "bluebird";
import * as bcr from "bcrypt";

export const LoginController = (mongoService: mongoService): loginController => {
    const bcrypt: any = Bluebird.promisifyAll(bcr);

    const login = (req: Request, res: Response) => {
        if (!req.body.email && req.body.password) {
            logger.warn("A login attempt was made without any credentials");
            res.status(403).send({message: "You are not authorized!"});
        }
        mongoService.getUser(req.body.email).then((user: User) => {
            bcrypt.compareAsync(req.body.password, user.password).then((result: boolean) => {
                if (result) {
                    logger.info("User was logged in", {user: req.body.email});
                    res.status(200).send({message: "Success"});
                    return;
                }
                logger.warn("There was an invalid login attempt", {email: req.body.email});
                res.status(403).send({message: "You are not authorized!"});
            }).catch((err: Error) => {
                logger.error("There was an error comparing passwords", {error: err});
                res.status(500).send({message: "Internal Server Error"});
            });
        });
    };

    const register = (req: Request, res: Response) => {
        if (!(req.body.name && req.body.surname && req.body.email && req.body.password)) {
            logger.warn("Registration without all information", {body: req.body});
            res.status(400).send({message: "You have not provided all information that is required for signing up"});
            return;
        }
        bcrypt.hashAsync(req.body.password, 10).then((password: string) => {
            return mongoService.registerUser(req.body.surname, req.body.name, req.body.email, password);
        }).then(() => {
            logger.info("User was registered and saved");
            res.status(200).send({message: "Success"});
        }).catch((err: Error) => {
            logger.error("There was an error saving the user", {error: err});
            res.status(500).send({message: "Internal Server Error"});
        });
    };

    return {
        login,
        register,
    };
};