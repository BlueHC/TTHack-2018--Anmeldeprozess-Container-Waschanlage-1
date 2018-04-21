import {Request, Response} from "express";

export interface washOrderController {
    saveWashOrder(req: Request, res: Response): void;
}