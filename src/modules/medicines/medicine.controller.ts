import { Request, Response } from "express";
import { medicinesServices } from "./medicine.service";
import { UserRole } from "../../middlewares/auth";


const createMedicine = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    try {
        // const result = await medicinesServices.createMedicine(req.body, userId as string, req.file?.path);
        const result = await medicinesServices.createMedicine(req.body, userId as string);

        res.status(201).json({
            success: true,
            message: "Medicine created successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


const updateMedicine = async (req: Request, res: Response) => {
    const id = req.params?.id;
    const currentUserId = req.user?.id;
    try {
        const result = await medicinesServices.updateMedicine(req.body?.stock, id as string, currentUserId as string);

        res.status(201).json({
            success: true,
            message: "Medicine stock updated successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const deleteMedicine = async (req: Request, res: Response) => {
    const id = req.params?.id;
    const currentUserId = req.user?.id;
    try {
        const result = await medicinesServices.deleteMedicine(id as string, currentUserId as string);

        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const getMedicines = async (req: Request, res: Response) => {

    const { search, manufacturer, sortField, sortOrder, categoryId, skip } = req.query;
    const skipItem = skip ? Number(skip) : 0;

    try {
        const result = await medicinesServices.getMedicines(search as string, manufacturer as string, sortField as any, sortOrder as any, categoryId as string, skipItem);

        res.status(200).json({
            success: true,
            message: "Medicines retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const getMedicineById = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getMedicineById(req.params?.id as string);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Medicine Not Found!.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Medicine retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicinesCategories = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getMedicinesCategories();
        res.status(200).json({
            success: true,
            message: "All Medicines categories retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getAllCategory = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getAllCategory();
        res.status(200).json({
            success: true,
            message: "All Medicines category retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getAllMedicineManufacturer = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getAllMedicineManufacturer();
        res.status(200).json({
            success: true,
            message: "All Medicines manufacturer retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const getMedicineByUser = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getMedicineByUser(req.user?.id as string);
        res.status(200).json({
            success: true,
            message: "All Medicines retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

type User = {
    id: string;
    role: UserRole;
}

const getStats = async (req: Request, res: Response) => {
    const { id, role } = req.user as User;
    try {
        const result = await medicinesServices.getStats(id, role);
        res.status(200).json({
            success: true,
            message: "success.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicinesLen = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getMedicinesLen();
        res.status(200).json({
            success: true,
            message: "success.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


export const medicinesController = {
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicines,
    getMedicineById,
    getMedicinesCategories,
    getStats,
    getMedicinesLen,
    getAllCategory,
    getMedicineByUser,
    getAllMedicineManufacturer
}