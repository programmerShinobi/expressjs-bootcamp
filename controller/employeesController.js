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

const findEmployeeRowsById = async (res, req) => {
    const result = await req.context.models.employees.findByPk(req.params.id);
    return res.send(result);
}

const CreateEmployees = async (res, req) => {
    const result = await req.context.models.employees.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        hire_date: req.body.hire_date,
        salary: req.body.salary,
        commission_pct: req.body.commission_pct,
        job_id: req.body.job_id,
        department_id: req.body.department_id,
        manager_id: req.body.manager_id
    });
    return res.send(result);
}

export default {
    findAllEmoloyees,
    findAllEmoloyeesRows,
    findEmployeeRowsById,
    CreateEmployees
}
