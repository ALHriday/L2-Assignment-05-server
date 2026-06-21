import express from "express";
// import multer from "multer";
import { Auth, UserRole } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = express.Router();

// const upload = multer({ dest: "uploads/" });


router.get('/admin/users', Auth(UserRole.ADMIN), userController.getAllUsers);
router.patch('/admin/users/:id', Auth(UserRole.ADMIN), userController.updateUserStatusById);

router.put('/users/profile', Auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER), userController.updateUserProfile);
// router.put('/users/profile', Auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER), upload.single("image"), userController.updateUserProfile);

export const userRoutes = router;