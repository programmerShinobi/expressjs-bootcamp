import { sequelize } from "../models/init-models";

const findAllDepartments = async (req, res) => {
    const result = await sequelize.query(`
        SELECT * FROM departments
    `, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.departments,
        mapToModel: true
    });
    return res.send(result);
}

const findAllDepartmentsRows = async (req, res) => {
    const result = await req.context.models.departments.findAll();
    return res.send(result);
}

export default {
    findAllDepartments,
    findAllDepartmentsRows
}