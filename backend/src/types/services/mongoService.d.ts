import * as Bluebird from "bluebird";
import {washOrder} from "../models/WashOrder";

export interface mongoService {
    saveWashOrder(washOrder: washOrder): Bluebird<any>;
}