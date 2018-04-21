import {Schema, model} from "mongoose";

const WashOderSchema = new Schema({
    name: {type: String},
    company: {type: String},
    customerNumber: {type: String},
    Trailer: {
        type: {type: String},
        identifyer: {type: String},
        cmr: {type: Array},
        chambers: [
            {
                coveramount: {type: String},
                coverposition: {type: String},
                surface: {type: String},
                walltype: {type: String},
                lastcontent: [
                    {
                        UnNumber: {type: String},
                        productName: {type: String}
                    }
                ],
                lastload: [
                    {
                        place: {type: String},
                        date: {type: Date}
                    }
                ],
                weatherSinceLastLoad: {type: Array},
                loadHistory: [
                    {
                        UNNumber: {type: String},
                        productName: {type: String}
                    }
                ],
                restContent: {type: Boolean},
                cleaning: {
                    special: {type: Array},
                    airvent: {type: Boolean},
                    airventAdapter: {
                        clean: {type: Boolean},
                        amount: {type: Number}
                    },
                    pump: {type: Boolean},
                    seals: {
                        clean: {type: Boolean},
                        amount: {type: Number}
                    }
                }
            }
        ],
    }
});

export const WashOderModel = model("WashOder", WashOderSchema);