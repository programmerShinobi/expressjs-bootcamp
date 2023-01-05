import { sequelize } from "../models/init-models"

const findAllRegions = async (req, res) => {
    const result = await sequelize.query('SELECT * FROM regions', {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.regions,
        mapToModel: true
    })
    return res.send(result);
}

const findAllRegionsRows = async (req, res) => {
    const result = await req.context.models.regions.findAll();
    return res.send(result);
}

export default {
    findAllRegions,
    findAllRegionsRows
}