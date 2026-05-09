import { Request, Response } from "express";
import { medicinesServices } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    try {
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

type Sort = 'asc' | 'desc';

const getMedicines = async (req: Request, res: Response) => {

    const { search, manufacturer, sort, categoryId, skip } = req.query;
    const skipItem = skip ? Number(skip) : 0;

    try {
        const result = await medicinesServices.getMedicines(search as string, manufacturer as string, sort as Sort, categoryId as string, skipItem);

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
const getStats = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getStats();
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

}