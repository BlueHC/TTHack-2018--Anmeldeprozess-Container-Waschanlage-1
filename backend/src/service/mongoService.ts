import * as mongoose from "mongoose";
import {MONGO_CONNECTION_STRING} from "../config/config";
import {logger} from "../utils/logger";
import {mongoService} from "../types/services/mongoService";
import {WashOderModel} from "../models/WashOrderModel";
import {washOrder} from "../types/models/WashOrder";
import {UserModel} from "../models/User";

export const MongoService = (() => {

    (<any>mongoose).Promise = require("bluebird");

    const saveWashOrder = (washOrder: washOrder): any => {
        return new WashOderModel(washOrder).save();
    };

    const getUser = (email: string): any => {
        return UserModel.findOne({email: email}).exec();
    };

    const mongoService: mongoService = {
        saveWashOrder,
        getUser,
    };

    const init = () => {
        return mongoose.connect(MONGO_CONNECTION_STRING).then(() => {
            return mongoService;
        }).catch((err: Error) => {
            logger.error("Error connecting to mongo", {error: err});
        });
    };

    const close = (): any => {
        logger.info("Closing database connection");
        return mongoose.connection.close();
    };

    return {
        init,
        close,
    }

})();