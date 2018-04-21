import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as http from "http";
import {PORT} from "./config/config";
import * as Bluebird from "bluebird";
import {logger} from "./utils/logger";

export const App = (() => {
    const app: express.Application = express();
    let server: http.Server;

    app.use((req: express.Request, res: express.Response, next: Function) => {
       req.headers["content-type"] = "application/json";
       next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());

    app.use((err: Error, req: express.Request, res: express.Response, next: Function) => {
       if (err) {
           res.status(422).send({message: "You have provided a non JSON Object to the API." +
               " This package will not be processed"});
           return;
       } else {
           next();
       }
    });

    app.use((req: express.Request, res: express.Response, next: Function) => {
        logger.info("New Request registered", {
            url: req.url,
            method: req.method,
        });
        next();
    });

    app.get("/status", (req: express.Request, res: express.Response) => {
        res.status(200).send({message: "Running"});
    });

    const shutdown = () => {
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
})();
