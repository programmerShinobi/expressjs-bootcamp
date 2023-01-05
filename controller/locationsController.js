import { sequelize } from "../models/init-models";

const findAllLocations = async (req, res) => {
    const result = await sequelize.query(`
        SELECT * FROM locations
    `, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.locations,
        mapToModel: true
    });
    return res.send(result);
}

const findAllLocationsRows = async (res, req) => {
    const result = await req.context.models.locations.findByPk();
    return res.send(result);
}

export default {
    findAllLocations,
    findAllLocationsRows
}