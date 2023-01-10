import { Router } from "express";
import regionsController from "../controller/regionsController";
import usersController from "../controller/usersController";
import auth from "../auth/login-new"; //-- type is : "../auth/login"|"../auth/login-new"

const router = new Router();

//auth
router.post('/login', auth.userLogin);

// users
router.post('/users', auth.verifyUser, usersController.CreateUsers);
router.get('/users', auth.verifyUser, usersController.findAllUsers);
router.get('/users/:id', auth.verifyUser, usersController.findUsersRowsById);
router.put('/users/:id', auth.verifyUser, usersController.UpdateUsers);
router.delete('/users/:id', auth.verifyUser, usersController.DeleteUsers);

// regions
router.post('/regions', auth.verifyUser, regionsController.CreateRegions);
router.get('/regions/sql', auth.verifyUser, regionsController.findAllRegions);
router.get('/regions/', auth.verifyUser, regionsController.findAllRegionsRows);
router.get('/regions/:id', auth.verifyUser, regionsController.findRegionRowsById);
router.get('/regions-countries/', auth.verifyUser, regionsController.regionJoinCountries);
router.put('/regions/:id', auth.verifyUser, regionsController.UpdateRegions);
router.delete('/regions/:id', auth.verifyUser, regionsController.DeleteRegions);

export default router 