import models, { sequelize } from "../models/init-models";
import bcrypt from 'bcrypt';

const CreateUsers = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(req.body.user_password, salt);

    // const salt = bcrypt.genSaltSync(10);
    // const passHash = bcrypt.hashSync(req.body.user_password, salt);

    await models.users.create({
        user_username: req.body.user_username,
        user_password: passHash,
        user_firstname: req.body.user_firstname,
        user_middlename: req.body.user_middlename,
        user_lastname: req.body.user_lastname,
        user_email: req.body.user_email
    }).then(result => {
        return res.send({
            message: "Data inserted successfully",
            results: result
        });
    }).catch(err => {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    });
}

const findAllUsers = async (req, res) => {
    try {
        const result = await models.users.findAll({
            attributes: [
                'user_id',
                'user_username',
                'user_password',
                'user_email',
                'user_firstname',
                'user_middlename',
                'user_lastname'
            ]
        });
        return res.send({
            message: "Data displayed successfully",
            results: result
        });

    } catch (err) {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    }
}

export default {
    CreateUsers,
    findAllUsers
}