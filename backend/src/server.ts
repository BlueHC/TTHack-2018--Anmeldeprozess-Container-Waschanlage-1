import {App} from "./app";
import {logger} from "./utils/logger";
import {PORT} from "./config/config";
import {MongoService} from "./service/mongoService";
import {mongoService} from "./types/services/mongoService";

const startServer = () => {
    global.Promise = require("bluebird");
    MongoService.init().then((mongoServicee: mongoService) => {
        logger.debug("Mongo Connection Established");
        const app = App(mongoServicee);
        return app.listen();
    }).then(() => {
        logger.info("App is running!", {PORT});
    }).catch((err: Error) => {
        logger.error("There was an error starting up the server", {error: err});
        process.exit(-1);
    });
};

startServer();
