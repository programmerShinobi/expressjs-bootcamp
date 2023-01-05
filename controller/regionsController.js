import { sequelize } from "../models/init-models";

const findAllRegions = async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM regions', {
            type: sequelize.QueryTypes.SELECT,
            model: req.context.models.regions,
            mapToModel: true
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

const findAllRegionsRows = async (req, res) => {
    try {
        const result = await req.context.models.regions.findAll();
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

const findRegionRowsById = async (req, res) => {
    try {
        const result = await req.context.models.regions.findByPk(req.params.id, {
            attributes: ['region_id', 'region_name']
        });

        if (result.length === 0) {
            return res.status(400).send('No data changed');
        }

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

const CreateRegions = async (req, res) => {
    try {
        const result = await req.context.models.regions.create({
            region_id: req.body.region_id,
            region_name: req.body.region_name
        });

        return res.send({
            message: "Data inserted successfully",
            result
        });
    } catch (err) {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    }

}

const UpdateRegions = async (req, res) => {
    try {
        const result = await req.context.models.regions.update({
            region_name: req.body.region_name
        }, {
            returning: true,
            where: { region_id: req.params.id }
        });

        if (result[1][0].length === 0) {
            return res.status(400).send('No data changed');
        }

        // return res.send(result);
        return res.send({
            message: "Data updated successfully",
            results: result[1][0]
        });
    } catch (err) {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    }

}

const DeleteRegions = async (req, res) => {
    try {
        const id = req.params.id;

        await req.context.models.regions.destroy({
            where: { region_id: id }
        });

        return res.send({
            message: "Data deleted successfully",
            region_id: id
        });
    } catch (err) {
        return res.status(500)
            .send({
                error: err.name,
                message: err.message
            });
    }
}


const regionJoinCountries = async (req, res) => {
    try {
        const result = await req.context.models.regions.findAll({
            include: [{
                model: req.context.models.countries,
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