import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    name: {type: String},
    surname: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    account: {type: String}
});

export const UserModel = model("User", UserSchema);