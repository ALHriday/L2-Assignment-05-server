import express from "express";
import { Auth, UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router = express.Router();

// ALL
router.post('/orders', orderController.createOrder);
router.get('/user/orders', Auth(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER), orderController.getUserOrders);
router.get('/orders/:id', orderController.getOrderById);

// Admin
router.get('/admin/orders', Auth(UserRole.ADMIN), orderController.getAllOrders);

// Seller
router.get('/seller/orders', Auth(UserRole.SELLER), orderController.getSellerOrders);
router.patch('/seller/orders/:id', Auth(UserRole.SELLER), orderController.updateOrderStatusById);


export const orderRoutes = router;