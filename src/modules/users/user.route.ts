import express from "express";
import { Auth, UserRole } from "../../middlewares/auth";
import { userController } from "./user.controller";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });


router.get('/admin/users', Auth(UserRole.ADMIN), userController.getAllUsers);
router.patch('/admin/users/:id', Auth(UserRole.ADMIN), userController.updateUserStatusById);

router.put('/users/profile', Auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER), upload.single("image"), userController.updateUserProfile);

export const userRoutes = router;