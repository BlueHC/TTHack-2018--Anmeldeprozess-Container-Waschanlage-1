import {App} from "./app";
import {logger} from "./utils/logger";
import {PORT} from "./config/config";

const startServer = () => {
    global.Promise = require("bluebird");
    App.listen().then(() => {
        logger.info("App is running!", {PORT});
    }).catch((err: Error) => {
        logger.error("There was an error starting up the server", {error: err});
        process.exit(-1);
    });
};

startServer();
