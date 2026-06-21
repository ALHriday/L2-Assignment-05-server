import express from "express"

// import multer from "multer";
import { Auth, UserRole } from "../../middlewares/auth";
import { medicinesController } from "./medicine.controller";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });

//Seller
// router.post('/seller/medicines', upload.single("image"), Auth(UserRole.SELLER, UserRole.ADMIN), medicinesController.createMedicine);
router.post('/seller/medicines', Auth(UserRole.SELLER, UserRole.ADMIN), medicinesController.createMedicine);
router.patch('/seller/medicines/:id', Auth(UserRole.SELLER), medicinesController.updateMedicine);
router.delete('/seller/medicines/:id', Auth(UserRole.SELLER), medicinesController.deleteMedicine);
router.get('/stats', Auth(UserRole.ADMIN, UserRole.SELLER), medicinesController.getStats);
router.get('/getMedicineByUser', Auth(UserRole.ADMIN, UserRole.SELLER), medicinesController.getMedicineByUser);


// All user can get all medicines, medicine categories and also get medicine by medicineId.
router.get('/medicines', medicinesController.getMedicines);
router.get('/medicines/:id', medicinesController.getMedicineById);
router.get('/categories', medicinesController.getMedicinesCategories);
router.get('/getMedicinesLen', medicinesController.getMedicinesLen);
router.get('/getAllCategory', medicinesController.getAllCategory);
router.get('/getAllManufacturer', medicinesController.getAllMedicineManufacturer);


export const medicinesRoutes = router;