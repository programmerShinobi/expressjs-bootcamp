import usersController from "../controller/usersController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import ResponseHelper from "../helpers/ResponseHelper";
import models, { sequelize } from "../models/users";

const userLogin = (req, res) => {
    let data = req.body;

    usersController.findAllRowsByUsername(function (items) {
        if (items.length > 0) {
            if (bcrypt.compareSync(data.password, items[0].password)) {
                let token = jwt.sign(items[0], authConfig.secretkey);

                delete items[0].password;
                let result = {
                    userdata: items[0],
                    token: token
                };
                ResponseHelper.sendResponse(res, 200, result);
            } else {
                let result = "Wrong Password";
                ResponseHelper.sendResponse(res, 404, result);
            }
        } else {
            let result = "User not found";
            ResponseHelper.sendResponse(res, 404, result);
        }
    }, data.username);
};

export default {
    userLogin
};
