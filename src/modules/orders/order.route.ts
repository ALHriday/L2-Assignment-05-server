import express from "express";
import { Auth, UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router = express.Router();
// Customer
router.post('/orders', orderController.createOrder);
router.get('/orders', Auth(UserRole.CUSTOMER, UserRole.ADMIN), orderController.getUserOrders);
router.get('/orders/:id', orderController.getOrderById);

// Seller
router.get('/seller/orders', Auth(UserRole.SELLER), orderController.getAllOrders);
router.put('/seller/orders/:id', Auth(UserRole.SELLER), orderController.updateOrderStatusById);


export const orderRoutes = router;