import models, { sequelize } from "../models/init-models";

const CreateRegions = async (req, res) => {
    await models.regions.create({
        region_id: req.body.region_id,
        region_name: req.body.region_name
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

const findAllRegions = async (req, res) => {
    await sequelize.query('SELECT * FROM regions', {
        type: sequelize.QueryTypes.SELECT,
        model: models.regions,
        mapToModel: true
    }).then(result => {
        return res.send({
            message: "Data displayed successfully",
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

const findAllRegionsRows = async (req, res) => {
    await models.regions.findAll()
        .then(result => {
            return res.send({
                message: "Data displayed successfully",
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

const findRegionRowsById = async (req, res) => {
    await models.regions.findByPk(req.params.id, {
        attributes: ['region_id', 'region_name']
    }).then(result => {
        if (result == 0 || result == null) {
            return res.status(404).send({
                message: "Data not found"
            });
        }

        return res.send({
            message: "Data displayed successfully",
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

const UpdateRegions = async (req, res) => {
    await models.regions.update({
        region_name: req.body.region_name
    }, {
        returning: true,
        where: { region_id: req.params.id }
    }).then(result => {
        if (result[1][0].length === 0) {
            return res.status(401)
                .send({ message: 'No data changed' });
        }
        return res.send({
            message: "Data updated successfully",
            results: result[1][0]
        });
    }).catch(err => {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    });

}

const DeleteRegions = async (req, res) => {
    const id = req.params.id;
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


const regionJoinCountries = async (req, res) => {
    try {
        const result = await models.regions.findAll({
            include: [{
                model: models.countries,
                as: "countries"
            }]
        });

        return res.send({
            message: "Succeed displays all data join to countries",
            results: result[0]
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
    findAllRegions,
    findAllRegionsRows,
    CreateRegions,
    UpdateRegions,
    findRegionRowsById,
    DeleteRegions,
    regionJoinCountries
}