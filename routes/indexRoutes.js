import { Router } from "express";
import regionsController from "../controller/regionsController";
import usersController from "../controller/usersController";
import auth from "../auth/login";

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
router.get('/regions-countries/', regionsController.regionJoinCountries);
router.put('/regions/:id', regionsController.UpdateRegions);
router.delete('/regions/:id', regionsController.DeleteRegions);


export default router 