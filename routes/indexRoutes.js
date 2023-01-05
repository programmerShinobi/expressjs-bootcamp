import { Router } from "express";
import regionsController from "../controller/regionsController";
import employeesController from "../controller/employeesController";
import departmentsContoller from "../controller/departmentsContoller";
import countriesController from "../controller/countriesController";

const router = new Router();
router.get('/regions/sql', regionsController.findAllRegions);
router.get('/regions', regionsController.findAllRegionsRows);
router.get('/employees/sql', employeesController.findAllEmoloyees);
router.get('/employees', employeesController.findAllEmoloyeesRows);
router.get('/departments/sql', departmentsContoller.findAllDepartments);
router.get('/departments', departmentsContoller.findAllDepartmentsRows);
router.get('/countries/sql', countriesController.findAllCountries);
router.get('/countries', countriesController.findAllCountriesRows);


export default router 