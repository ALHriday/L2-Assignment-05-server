// import { uploadImage } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";


const getAllUsers = async () => {
    return await prisma.user.findMany();
}

interface updateUserStatus {
    status: "ACTIVE" | "BAN";
}

const updateUserStatusById = async (payload: updateUserStatus, userId: string) => {
    const { status } = payload;
    return await prisma.user.update({ where: { id: userId }, data: { status } })
}

interface UserProfile {
    name: string;
    image: string;
    phone: string;
}

// const updateUserProfile = async (payload: UserProfile, currentUserId: string, filePath: any) => {
const updateUserProfile = async (payload: UserProfile, currentUserId: string) => {
    const { name, phone } = payload;

    try {
        // if (!filePath) {
        //     throw new Error("No file");
        // }
        // const imageURL = await uploadImage(filePath);
        const imageURL = "https://img.icons8.com/?size=100&id=108296&format=png&color=000000";


        await prisma.user.update({ where: { id: currentUserId }, data: { name, image: String(imageURL), phone } });

        return { name, image: String(imageURL), phone };

    } catch (err) {
        return err;
    }
}

export const userService = {
    getAllUsers,
    updateUserStatusById,
    updateUserProfile
}