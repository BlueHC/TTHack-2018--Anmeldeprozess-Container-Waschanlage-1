import * as Bluebird from "bluebird";
import {washOrder} from "../models/WashOrder";

export interface mongoService {
    saveWashOrder(washOrder: washOrder): Bluebird<any>;
    getUser(email: string): Bluebird<any>;
    registerUser(account: string, surname: string, name: string, email: string, password: string): Bluebird<any>;
}