import { Router } from "express";
import regionsController from "../controller/regionsController";
import usersController from "../controller/usersController";
import auth from "../auth/login-new";
// import countriesController from "../controller/countriesController";
// import departmentsContoller from "../controller/departmentsContoller";
// import employeesController from "../controller/employeesController";
// import locationsController from "../controller/locationsController";

const router = new Router();
//auth
router.post('/login', auth.userLogin);

// users
router.post('/users', usersController.CreateUsers);
router.get('/users', usersController.findAllUsers);
router.get('/users/username', usersController.findAllRowsByUsername);


// regions
router.get('/regions/sql', regionsController.findAllRegions);
router.get('/regions/', regionsController.findAllRegionsRows);
router.get('/regions/:id', regionsController.findRegionRowsById);
router.post('/regions', regionsController.CreateRegions);
router.put('/regions/:id', regionsController.UpdateRegions);
router.delete('/regions/:id', regionsController.DeleteRegions);
router.get('/regions-countries/', regionsController.regionJoinCountries);

// // countries
// router.get('/countries/sql', countriesController.findAllCountries);
// router.get('/countries', countriesController.findAllCountriesRows);

// // deparments
// router.get('/departments/sql', departmentsContoller.findAllDepartments);
// router.get('/departments', departmentsContoller.findAllDepartmentsRows);

// employees
// router.get('/employees/sql', employeesController.findAllEmoloyees);
// router.get('/employees', employeesController.findAllEmoloyeesRows);
// router.get('/employees/:id', employeesController.findAllRowsById);
// router.post('/employees', employeesController.CreateEmployees);

// // locations
// router.get('/locations/sql', locationsController.findAllLocations);
// router.get('/locations', locationsController.findAllLocationsRows);

export default router 