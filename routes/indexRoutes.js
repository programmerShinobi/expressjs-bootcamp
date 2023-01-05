import { Router } from "express";
import regionsController from "../controller/regionsController";
import employeesController from "../controller/employeesController";

const router = new Router();
router.get('/regions/sql', regionsController.findAllRegions);
router.get('/regions', regionsController.findAllRegionsRows);
router.get('/employees/sql', employeesController.findAllEmoloyees);
router.get('/employees', employeesController.findAllEmoloyeesRows);

export default router 