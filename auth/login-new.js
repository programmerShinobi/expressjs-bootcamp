import usersController from "../controller/usersController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import ResponseHelper from "../helpers/ResponseHelper";

const userLogin = (req, res) => {
    let data = req.body;
    usersController.findAllRowsByUsername(function (items) {
        if (items.length > 0) {
            if (bcrypt.compareSync(data.password, items[0].password)) {

                // let token = jwt.sign(items[0], authConfig.secretkey);

                // delete items[0].password;
                let result = {
                    userdata: items[0],
                    // token: token
                };

                ResponseHelper.sendResponse(res, 200, result); // "Success logged in"

            } else {
                ResponseHelper.sendResponse(res, 401); // "Wrong Password" --- Authorization Required

            }
        } else {
            ResponseHelper.sendResponse(res, 404); // "User not found" --- Not Found

        }
    }, data.uname);
};

export default {
    userLogin
};
