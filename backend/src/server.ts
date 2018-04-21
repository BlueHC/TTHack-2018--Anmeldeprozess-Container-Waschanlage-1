import {App} from "./app";
import {logger} from "./utils/logger";
import {PORT} from "./config/config";
import {MongoService} from "./service/mongoService";
import {mongoService} from "./types/services/mongoService";
import {app} from "./types/App";

let app: app;
const startServer = () => {
    global.Promise = require("bluebird");
    MongoService.init().then((mongoServicee: mongoService) => {
        logger.debug("Mongo Connection Established");
        app = App(mongoServicee);
        return app.listen();
    }).then(() => {
        logger.info("App is running!", {PORT});
    }).catch((err: Error) => {
        logger.error("There was an error starting up the server", {error: err});
        process.exit(-1);
    });
};

startServer();

process.on("SIGINT", () => {
    app.shutdown();
    MongoService.close();
});
