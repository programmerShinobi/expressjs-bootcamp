import usersController from "../controller/usersController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ResponseHelper from "../helpers/ResponseHelper";

const userLogin = async (req, res) => {
    let data = req.body;
    // let items = await usersController.findAllRowsByUsernameNew(data.username);
    await usersController.findAllRowsByUsernameNew(data.username).then((items) => {
        if (items.username) {
            if (bcrypt.compareSync(data.password, items.password)) {
                var token = jwt.sign({
                    user_id: items.user_id
                }, process.env.SECRET_KEY, {
                    expiresIn: '2m' // 2 minutes expired
                });
                delete items.password;
                let result = {
                    userdata: items,
                    accessToken: token
                };
                ResponseHelper.sendResponse(res, 200, result); // "Success logged in"
            } else {
                ResponseHelper.sendResponse(res, 401); // "Wrong Password" --- Authorization Required
            }
        } else {
            ResponseHelper.sendResponse(res, 404); // "User not found" --- Not Found
        }
    }).catch(err => { res.status(404).json(err) });
};

function verifyUser(req, res, next) {
    const bearer = req.headers.authorization;
    jwt.verify(bearer, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            console.info(err.message);
            return res.json(err);
        }
        req.body = data;
        next()
    });
}

export default {
    userLogin,
    verifyUser
};
