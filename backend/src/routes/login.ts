import {Router} from "express";
import {loginController} from "../types/controller/loginController";

export const LoginRouter = (() => {
    const getRouter = (loginController: loginController) => {
        const router = Router();

        router.post("/register", loginController.register);
        router.post("/login", loginController.login);

        return router;
    };

    return {getRouter};
})();