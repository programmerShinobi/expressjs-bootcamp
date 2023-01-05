import { sequelize } from "../models/init-models";

const findAllEmoloyees = async (req, res) => {
    const result = await sequelize.query('SELECT * FROM employees', {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.employees,
        mapToModel: true
    })
    return res.send(result);
}

const findAllEmoloyeesRows = async (req, res) => {
    const result = await req.context.models.employees.findAll();
    return res.send(result);
}

export default {
    findAllEmoloyees,
    findAllEmoloyeesRows
}
