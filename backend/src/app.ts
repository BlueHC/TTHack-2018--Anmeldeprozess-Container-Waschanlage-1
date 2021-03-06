import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as http from "http";
import {PORT} from "./config/config";
import * as Bluebird from "bluebird";
import {logger} from "./utils/logger";
import {WashOrderRegistration} from "./routes/washOrderRegistration";
import {WashOrderController} from "./controller/WashOrderController";
import {mongoService} from "./types/services/mongoService";
import {LoginRouter} from "./routes/login";
import {LoginController} from "./controller/LoginController";

export const App = (mongoService: mongoService) => {
    const app: express.Application = express();
    let server: http.Server;

    const washOrdercontroller = WashOrderController(mongoService);
    const logincontroller = LoginController(mongoService);

    const loginrouting = LoginRouter.getRouter(logincontroller);
    const washOrderRegist = WashOrderRegistration.getRouter(washOrdercontroller);

    app.use((req: express.Request, res: express.Response, next: Function) => {
        logger.info("New Request registered", {
            url: req.url,
            method: req.method,
        });
        res.removeHeader("X-Powered-By");
        next();
    });

    app.use((req: express.Request, res: express.Response, next: Function) => {
        req.headers["content-type"] = "application/json";
        next();
    });

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors());

    app.use((err: Error, req: express.Request, res: express.Response, next: Function) => {
        if (err) {
            logger.error("Unprocessable entity", {error: err});
            res.status(422).send({
                message: "You have provided a non JSON Object to the API." +
                " This package will not be processed"
            });
            return;
        } else {
            next();
        }
    });

    app.get("/status", (req: express.Request, res: express.Response) => {
        res.status(200).send({message: "Running"});
    });

    app.use(loginrouting);
    app.use(washOrderRegist);


    const shutdown = () => {
        logger.info("Server is shutting down!");
        server.close();
    };

    const listen = (): Bluebird<any> => {
        return new Bluebird<any>((resolve: Function, reject: Function) => {
            server = app.listen(PORT, (err: Error) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    return {
        app,
        shutdown,
        listen,
    }
};
