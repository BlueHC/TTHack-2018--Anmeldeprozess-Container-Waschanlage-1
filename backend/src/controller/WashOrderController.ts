import {Request, Response} from "express";
import {mongoService} from "../types/services/mongoService";
import {logger} from "../utils/logger";
import {washOrderController} from "../types/controller/washOrderController";

export const WashOrderController = (mongoService: mongoService): washOrderController => {
    const saveWashOrder = (req: Request, res: Response): void => {
        if (!req.body) {
            res.status(400).send({message: "You did not provide a body"});
            return;
        }
        mongoService.saveWashOrder(req.body).then(() => {
            logger.info("Wash Order was saved successfully");
            res.status(200).send({message: "Success"});
        }).catch((err: Error) => {
            logger.error("There was an error writing a wash order", {error: err});
            res.status(500).send({message: "Internal Server Error"});
        });
    };

    return {
        saveWashOrder,
    }
};