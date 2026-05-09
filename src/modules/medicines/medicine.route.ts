import express from "express"
import { Auth, UserRole } from "../../middlewares/auth";
import { medicinesController } from "./medicine.controller";

const router = express.Router();

//Seller
router.post('/seller/medicines', Auth(UserRole.SELLER, UserRole.ADMIN), medicinesController.createMedicine);
router.put('/seller/medicines/:id', Auth(UserRole.SELLER), medicinesController.updateMedicine);
router.delete('/seller/medicines/:id', Auth(UserRole.SELLER), medicinesController.deleteMedicine);
router.get('/medicines/stats', medicinesController.getStats);


// All user can get all medicines, medicine categories and also get medicine by medicineId.
router.get('/medicines', medicinesController.getMedicines);
router.get('/medicines/:id', medicinesController.getMedicineById);
router.get('/categories', medicinesController.getMedicinesCategories);


export const medicinesRoutes = router;