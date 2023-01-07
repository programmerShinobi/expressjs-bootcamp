import models, { sequelize } from "../models/init-models";
import bcrypt from 'bcrypt';

const CreateUsers = async (req, res) => {
    if (req.body.username == "") {
        return res.status(401).send({
            message: "FAILED! Username is not null"
        });
    } else if (req.body.password == "") {
        return res.status(401).send({
            message: "FAILED! Password is not null"
        });
    } else if (req.body.user_firstname == "") {
        return res.status(401).send({
            message: "FAILED! User_firstname is not null"
        });
    } else if (req.body.user_email == "") {
        return res.status(401).send({
            message: "FAILED! User_email is not null"
        });
    } else {
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
                message: "SUCCESS! Data inserted successfully",
                results: result
            });

        }).catch(err => {
            return res.status(500).send({
                error: err.name,
                message: err.message
            });
        });
    }

}

const findAllUsers = async (req, res) => {
    await models.users.findAll()
        .then(result => {
            if (result == 0 || result == null) {
                return res.status(404).send({
                    message: "Data not found"
                });
            } else {
                return res.send({
                    message: "Data displayed successfully",
                    results: result
                });
            }
        })
        .catch(err => {
            return res.status(500)
                .send({
                    error: err.name,
                    status: err.status,
                    message: err.message
                });
        });
}

const findUsersRowsById = async (req, res) => {
    await models.users.findByPk(req.params.id)
        .then(result => {
            if (result == 0 || result == null) {
                return res.status(404).send({
                    message: "Data not found"
                });
            } else {
                return res.send({
                    message: "Data displayed successfully",
                    results: result
                });
            }
        })
        .catch(err => {
            return res.status(500)
                .send({
                    error: err.name,
                    message: err.message
                });
        });
}

const UpdateUsers = async (req, res) => {
    if (req.body.username == "") {
        return res.status(401).send({
            message: "FAILED! Username is not null"
        });
    } else if (req.body.password == "") {
        return res.status(401).send({
            message: "FAILED! Password is not null"
        });
    } else if (req.body.user_firstname == "") {
        return res.status(401).send({
            message: "FAILED! User_firstname is not null"
        });
    } else if (req.body.user_email == "") {
        return res.status(401).send({
            message: "FAILED! User_email is not null"
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(req.body.password, salt);

        // const salt = bcrypt.genSaltSync(10);
        // const passHash = bcrypt.hashSync(req.body.password, salt);

        await models.users.update({
            username: req.body.username,
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
                return res.status(401)
                    .send({ message: 'FAILED! No data changed' });
            } else {
                return res.send({
                    message: "SUCCESS! Data updated successfully",
                    results: result[1][0]
                });
            }
        }).catch(err => {
            return res.status(500)
                .send({
                    error: err.name,
                    message: err.message
                });
        });
    }
}

const DeleteUsers = async (req, res) => {
    const userID = await models.users.findByPk(req.params.id);
    if (userID) {
        await models.users.destroy({
            where: { user_id: req.params.id }
        }).then(() => {
            return res.send({
                message: "SUCCESS! Data deleted successfully",
                user_id: req.params.id
            });
        }).catch(err => {
            return res.status(500)
                .send({
                    error: err.name,
                    message: err.message
                });
        });
    } else {
        return res.status(404).send({
            message: "FAILED! Data not found"
        });
    }
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

module.exports = {
    CreateUsers,
    findAllUsers,
    findUsersRowsById,
    UpdateUsers,
    DeleteUsers,
    findAllRowsByUsername
}
