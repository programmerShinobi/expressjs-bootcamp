import models, { sequelize } from "../models/init-models";

const CreateRegions = async (req, res) => {
    if (req.body.region_id == "") {
        return res.status(401).send({
            message: "region_id is not null"
        });
    } else if (req.body.region_name == "") {
        return res.status(401).send({
            message: "region_name is not null"
        });
    } else {
        await models.regions.create({
            region_id: req.body.region_id,
            region_name: req.body.region_name
        }).then(result => {
            if (result.length === 0) {
                return res.status(401)
                    .send({ message: 'No data changed' });
            } else {
                return res.send({
                    message: "Data inserted successfully",
                    results: result
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

const findAllRegions = async (req, res) => {
    await sequelize.query('SELECT * FROM regions', {
        type: sequelize.QueryTypes.SELECT,
        model: models.regions,
        mapToModel: true
    }).then(result => {
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
    }).catch(err => {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    });
}

const findAllRegionsRows = async (req, res) => {
    await models.regions.findAll()
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
        }).catch(err => {
            return res.status(500)
                .send({
                    error: err.name,
                    message: err.message
                });
        });
}

const findRegionRowsById = async (req, res) => {
    await models.regions.findByPk(req.params.id, {
        attributes: ['region_id', 'region_name']
    }).then(result => {
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
    }).catch(err => {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    });
}

const regionJoinCountries = async (req, res) => {
    await models.regions.findAll({
        include: [{
            model: models.countries,
            as: "countries"
        }]
    }).then(result => {
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
    }).catch(err => {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    });
}

const UpdateRegions = async (req, res) => {
    if (req.body.region_id == "") {
        return res.status(401).send({
            message: "region_id is not null"
        });
    } else if (req.body.region_name == "") {
        return res.status(401).send({
            message: "region_name is not null"
        });
    } else {
        await models.regions.update({
            region_name: req.body.region_name
        }, {
            returning: true,
            where: { region_id: req.params.id }
        }).then(result => {
            if (result[1][0].length === 0) {
                return res.status(401)
                    .send({ message: 'No data changed' });
            } else {
                return res.send({
                    message: "Data updated successfully",
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

const DeleteRegions = async (req, res) => {
    const id = req.params.id;
    const regionID = models.regions.findByPk(id);
    if (regionID === 1) {
        return res.status(404).send({
            message: "Data not found"
        });
    } else {
        await models.regions.destroy({
            where: { region_id: id }
        }).then(id => {
            return res.send({
                message: "Data deleted successfully",
                region_id: id
            });
        }).catch(err => {
            return res.status(500)
                .send({
                    error: err.name,
                    message: err.message
                });
        });
    }
}

export default {
    CreateRegions,
    findAllRegions,
    findAllRegionsRows,
    regionJoinCountries,
    findRegionRowsById,
    UpdateRegions,
    DeleteRegions,
}