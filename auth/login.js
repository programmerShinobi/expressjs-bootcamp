import usersController from "../controller/usersController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import ResponseHelper from "../helpers/ResponseHelper";

const userLogin = (req, res) => {
    let data = req.body;
    usersController.findAllRowsByUsername(function (items) {
        const payload = items[0];
        if (items.length > 0) {
            if (bcrypt.compareSync(data.password, payload.password)) {

                var token = 'Bearer ' + jwt.sign({
                    user_id: payload.user_id
                }, authConfig.secretkey, {
                    expiresIn: 86400 //24h expired
                });

                delete payload.password;
                let result = {
                    userdata: payload,
                    accessToken: token
                };
                ResponseHelper.sendResponse(res, 200, result); // "Success logged in"

            } else {
                ResponseHelper.sendResponse(res, 401); // "Wrong Password" --- Authorization Required

            }
        } else {
            ResponseHelper.sendResponse(res, 404); // "User not found" --- Not Found

        }
    }, data.username);
};

export default {
    userLogin
};
