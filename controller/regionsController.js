import models, { sequelize } from "../models/init-models";

const CreateRegions = async (req, res) => {
    const findAllRowsByRegionName = await models.regions.findAll(
        { attributes: ['region_name'] }
    ).then(result => {
        return result;
    });

    let regionName;
    findAllRowsByRegionName.forEach(function (row) {
        if (row.region_name == req.body.region_name) {
            regionName = row.region_name;
        }
    });

    if (regionName) {
        return res.status(401).send({
            message: regionName + `FAILED! ${req.body.region_name} (region_name) has been used`
        })
    } else if (req.body.region_id == "") {
        return res.status(401).send({
            message: "FAILED! region_id is not null"
        });
    } else if (req.body.region_name == "") {
        return res.status(401).send({
            message: "FAILED! region_name is not null"
        });
    } else {
        await models.regions.create({
            region_id: req.body.region_id,
            region_name: req.body.region_name
        }).then(result => {
            return res.send({
                message: "SUCCESS! Data inserted successfully",
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
            message: "FAILED! region_id is not null"
        });
    } else if (req.body.region_name == "") {
        return res.status(401).send({
            message: "FAILED! region_name is not null"
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

const DeleteRegions = async (req, res) => {
    const regionID = await models.regions.findByPk(req.params.id);
    if (regionID) {
        await models.regions.destroy({
            where: { region_id: req.params.id }
        }).then(() => {
            return res.send({
                message: "SUCCESS! Data deleted successfully",
                region_id: req.params.id
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

export default {
    CreateRegions,
    findAllRegions,
    findAllRegionsRows,
    regionJoinCountries,
    findRegionRowsById,
    UpdateRegions,
    DeleteRegions,
}