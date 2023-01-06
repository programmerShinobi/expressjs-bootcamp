import models, { sequelize } from "../models/init-models";
import bcrypt from 'bcrypt';

const CreateUsers = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(req.body.password, salt);

    // const salt = bcrypt.genSaltSync(10);
    // const passHash = bcrypt.hashSync(req.body.user_password, salt);

    await models.users.create({
        username: req.body.username,
        password: passHash,
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
    await models.users.findAll()
        .then(result => {
            return res.send({
                message: "Data displayed successfully",
                results: result
            })
        })
        .catch(err => {
            return res.status(500)
                .send({
                    error: err.name,
                    message: err.message
                });
        });
}

const findUsersRowsById = async (req, res) => {
    await models.users.findByPk(req.params.id)
        .then(result => {
            return res.send({
                message: "Data displayed successfully",
                results: result
            })
        })
        .catch(err => {
            return res.status(500)
                .send({
                    error: err.name,
                    message: err.message
                });
        });
}

const findAllRowsByUsername = async (callback, users) => {
    await models.users.findAll({
        where: { username: users }
    }).then((result) => {
        return callback(result);
    }).catch(err => {
        return console.info(err);
    });
}

const UpdateUsers = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(req.body.password, salt);

    // const salt = bcrypt.genSaltSync(10);
    // const passHash = bcrypt.hashSync(req.body.user_password, salt);

    await models.users.update({
        usersname: req.body.username,
        password: passHash,
        user_firstname: req.body.user_firstname,
        user_middlename: req.body.user_middlename,
        user_lastname: req.body.user_lastname,
        user_email: req.body.user_email
    }, {
        returning: true,
        where: { user_id: req.params.id }
    }).then(result => {
        if (result[1][0].length === 0) {
            return res.status(400).send('No data changed');
        }
        return res.send({
            message: "Data updated successfully",
            results: result[1][0]
        })
    }).catch(err => {
        return err.message
    })
}

// export default {
//     CreateUsers,
//     findAllUsers,
//     findAllRowsByUsername
// }

module.exports = {
    CreateUsers,
    findAllUsers,
    findUsersRowsById,
    UpdateUsers,
    findAllRowsByUsername
}