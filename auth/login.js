import usersController from "../controller/usersController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ResponseHelper from "../helpers/ResponseHelper";

const userLogin = async (req, res) => {
    let data = req.body;
    // let items = await usersController.findAllRowsByUsername2(data.username);
    await usersController.findAllRowsByUsername2(data.username).then(async items => {
        const payload = items;
        if (items.username) {
            if (bcrypt.compareSync(data.password, payload.password)) {

                var token = jwt.sign({
                    user_id: payload.user_id
                }, process.env.SECRET_KEY, {
                    // expiresIn: '2s' // 2 second expired
                    expiresIn: '2m' // 2 minutes expired
                    // expiresIn: '2h' // 2 hour expired
                    // expiresIn: 86400 //24h expired
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
    }).catch(err => { res.status(404).json(err) });
};

function verifyUser(req, res, next) {
    const bearer = req.headers.authorization;
    jwt.verify(bearer, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            console.info(err.message);
            res.json(err);
            return
        }
        req.body = data;
        next()
    });
}

export default {
    userLogin,
    verifyUser
};
