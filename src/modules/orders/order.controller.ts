import { Request, Response } from "express"
import { orderService } from "./order.service"


const createOrder = async (req: Request, res: Response) => {

    try {
        const result = await orderService.createOrder(req.body);

        res.status(201).json({
            success: true,
            message: "Order created successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const getUserOrders = async (req: Request, res: Response) => {
    try {
        const result = await orderService.getUserOrders(req.user?.id as string);

        res.status(200).json({
            success: true,
            message: "All orders retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}
const getAllOrders = async (req: Request, res: Response) => {

    try {
        const result = await orderService.getAllOrders();

        res.status(200).json({
            success: true,
            message: "All orders retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}
const getSellerOrders = async (req: Request, res: Response) => {

    try {
        const result = await orderService.getSellerOrders(req.user?.id as string);
        res.status(200).json({
            success: true,
            message: "All orders retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try {
        const result = await orderService.getOrderById(req.params?.id as string);

        res.status(200).json({
            success: true,
            message: "order retrieved successfully.",
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const updateOrderStatusById = async (req: Request, res: Response) => {
    try {
        const result = await orderService.updateOrderStatusById(req.params?.id as string, req.body);

        res.status(200).json({
            success: true,
            message: "Order status Updated successfully.",
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}
export const orderController = {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatusById,
    // getOrderByUserId,
    getSellerOrders,
}