import usersController from "../controller/usersController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import ResponseHelper from "../helpers/ResponseHelper";

const login = (req, res) => {
    let data = req.body

    usersController.findAllRowsByUsername(function (items) {
        console.info(items[0], data.username)
        if (items[0]) {
            if (bcrypt.compareSync(data.password, items[0].password)) {
                let token = jwt.sign(items[0], authConfig.secretkey)

                delete items[0].password
                let result = {
                    userdata: items[0],
                    token: token
                }
                // let result = "berhasil login";
                res.send(result)
                // ResponseHelper.sendResponse(res, 200, result);
            } else {
                let result = "Wrong Password"
                // ResponseHelper.sendResponse(res, 404, reslut);
                res.send(result);
            }
        }
    }, data.username)

}

export default {
    login
}