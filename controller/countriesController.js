import { sequelize } from "../models/init-models";

const findAllCountries = async (req, res) => {
    const result = await sequelize.query(`
        SELECT * FROM countries
    `, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.countries,
        mapToModel: true
    })
    return res.send(result);
}

const findAllCountriesRows = async (req, res) => {
    const result = await req.context.models.countries.findAll();
    return res.send(result);
}

export default {
    findAllCountries,
    findAllCountriesRows
}
