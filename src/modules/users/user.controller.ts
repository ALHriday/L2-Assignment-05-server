import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "All users retrieved successfully.",
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const updateUserStatusById = async (req: Request, res: Response) => {
    try {
        const result = await userService.updateUserStatusById(req.body, req.params?.id as string);
        res.status(200).json({
            success: true,
            message: "User status updated successfully.",
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const updateUserProfile = async (req: Request, res: Response) => {

    try {
        // const result = await userService.updateUserProfile(req.body, req.user?.id as string, req.file?.path);
        const result = await userService.updateUserProfile(req.body, req.user?.id as string);
        res.status(200).json({
            success: true,
            message: "User Profile updated successfully.",
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const userController = {
    getAllUsers,
    updateUserStatusById,
    updateUserProfile
} 