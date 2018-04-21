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
        req.headers["content-type"] = "application/json";
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());

    app.use((err: Error, req: express.Request, res: express.Response, next: Function) => {
        if (err) {
            res.status(422).send({
                message: "You have provided a non JSON Object to the API." +
                " This package will not be processed"
            });
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

    app.get("/malte", (req: express.Request, res: express.Response) => {
        res.status(200).send(JSON.stringify({"coord":{"lon":10,"lat":53.55},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":18.03,"pressure":1021,"humidity":45,"temp_min":17,"temp_max":19},"visibility":10000,"wind":{"speed":5.7,"deg":290},"clouds":{"all":0},"dt":1524316800,"sys":{"type":1,"id":4883,"message":0.0053,"country":"DE","sunrise":1524283537,"sunset":1524335567},"id":2911298,"name":"Hamburg","cod":200}));
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
