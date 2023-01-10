//----------------------------------------- # config connect to database
import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

//------------------------------------------------ # declaration table name
var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");
var _regions = require("./regions");
//---------------------------------------------- # not use
// var _countries = require("./countries");
// var _departments = require("./departments");
// var _employees = require("./employees");
// var _job_history = require("./job_history");
// var _jobs = require("./jobs");
// var _locations = require("./locations");

//------------------------------------------------ # user sequelize package
const initModels = (sequelize) => { // type is default : function initModels (sequelize) {
  var regions = _regions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  //------------------------------------------------------- # not use
  // var countries = _countries(sequelize, DataTypes);
  // var departments = _departments(sequelize, DataTypes);
  // var employees = _employees(sequelize, DataTypes);
  // var job_history = _job_history(sequelize, DataTypes);
  // var jobs = _jobs(sequelize, DataTypes);
  // var locations = _locations(sequelize, DataTypes);

  //------------------------------------------------------ # join table
  regions.hasMany(countries, { as: "countries", foreignKey: "region_id" });
  //---------------------------------------------------------------------------------------- # not use
  // job_history.belongsTo(jobs, { as: "job", foreignKey: "job_id" });
  // locations.belongsTo(countries, { as: "country", foreignKey: "country_id" });
  // countries.hasMany(locations, { as: "locations", foreignKey: "country_id" });
  // employees.belongsTo(departments, { as: "department", foreignKey: "department_id" });
  // departments.hasMany(employees, { as: "employees", foreignKey: "department_id" });
  // job_history.belongsTo(departments, { as: "department", foreignKey: "department_id" });
  // departments.hasMany(job_history, { as: "job_histories", foreignKey: "department_id" });
  // employees.belongsTo(jobs, { as: "job", foreignKey: "job_id" });
  // jobs.hasMany(employees, { as: "employees", foreignKey: "job_id" });
  // jobs.hasMany(job_history, { as: "job_histories", foreignKey: "job_id" });
  // departments.belongsTo(locations, { as: "location", foreignKey: "location_id" });
  // locations.hasMany(departments, { as: "departments", foreignKey: "location_id" });
  // countries.belongsTo(regions, { as: "region", foreignKey: "region_id" });

  //---------- return table name
  return {
    users,
    regions,
    // countries,
    // departments,
    // employees,
    // job_history,
    // jobs,
    // locations,
  };
}

//---------------------------------------- default
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;

//---------------------------------------- new
const models = initModels(sequelize)
export default models
export { sequelize }
