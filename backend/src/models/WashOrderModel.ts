import {Schema, model} from "mongoose";

const WashOderSchema = new Schema({
   name: {type: String},
   Trailer: {
       type: {type: String},
       identifyer: {type: String},
       chambers: [
           {
               coveramount: {type: String},
               coverposition: {type: String},
               surface: {type: String},
               walltype: {type: String},
               lastcontent: {type: Array},
           }
       ],
   }
});

export const WashOderModel = model("WashOder", WashOderSchema);