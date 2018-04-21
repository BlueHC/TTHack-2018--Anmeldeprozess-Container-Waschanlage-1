import {Request, Response} from "express";
import {mongoService} from "../types/services/mongoService";
import {loginController} from "../types/controller/loginController";
import {User} from "../types/models/User";

export const LoginController = (mongoService: mongoService): loginController => {
    const login = (req: Request, res: Response) => {
        mongoService.getUser(req.body.email).then((user: User) => {
            if (user.password === req.body.password) {
                res.status(200).send({message: "Success"});
                return;
            }
            res.status(403).send({message: "You are not authorized!"});
        });
    };

    return {login};
};