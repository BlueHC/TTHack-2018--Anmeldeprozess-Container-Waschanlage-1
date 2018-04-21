import {Router} from "express";
import {washOrderController} from "../types/controller/washOrderController";
export const WashOrderRegistration = (() => {
    const getRouter = (washOrderController: washOrderController) => {
        const router = Router();

        router.post("/washorder", washOrderController.saveWashOrder);

        return router;
    };

    return {getRouter};
})();
