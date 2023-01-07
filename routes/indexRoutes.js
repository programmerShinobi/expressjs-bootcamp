import { Router } from "express";
import regionsController from "../controller/regionsController";
import usersController from "../controller/usersController";
import auth from "../auth/login";

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
router.get('/users/:id', usersController.findUsersRowsById)
router.put('/users/:id', usersController.UpdateUsers)

// regions
router.post('/regions', regionsController.CreateRegions);
router.get('/regions/sql', regionsController.findAllRegions);
router.get('/regions/', regionsController.findAllRegionsRows);
router.get('/regions/:id', regionsController.findRegionRowsById);
router.put('/regions/:id', regionsController.UpdateRegions);
router.delete('/regions/:id', regionsController.DeleteRegions);
router.get('/regions-countries/', regionsController.regionJoinCountries);


export default router 