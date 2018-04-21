import {Request, Response} from "express";

export interface loginController {
    login(req: Request, res: Response): void;
    register(req: Request, res: Response): void;
}