import { prisma } from "../../../lib/prisma"

export interface Orders {
    name: string;
    phone: string;
    shippingAddress: string;
    cashOnDelivery: boolean;
    orderItems: OrderItemsData[];
}

export interface OrderItemsData {
    orderId: string;
    medicineId: string;
    quantity: number;
    price: number;
}

type OrderStatus = "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface Status {
    status: OrderStatus;
}
// Create order by customer.
const createOrder = async (payload: Orders, currentUserId?: string) => {
    const { orderItems, name, phone, cashOnDelivery, shippingAddress } = payload;

    try {


        if (!orderItems || orderItems.length === 0) {
            throw new Error('Your Cart is Empty!');
        }
        const medicineIds = orderItems.map((i: any) => i.medicineId);

        const medicines = await prisma.medicines.findMany({ where: { id: { in: medicineIds } } });

        let totalPrice: number = 0;

        const orderItemsData = orderItems.map((items: OrderItemsData) => {
            const medicine = medicines.find((m) => m.id === items.medicineId);

            if (!medicine) {
                throw new Error("Medicine not found!");
            };

            if (medicine.stock < items.quantity) {
                throw new Error(`${medicine.title} is out of stock!`);
            }

            const subTotal: number = medicine.price * items.quantity;
            totalPrice += subTotal;

            return {
                medicineId: medicine.id,
                title: medicine.title,
                price: medicine.price,
                quantity: items.quantity,
            }
        });

        return prisma.$transaction(async (tx) => {

            const order = await tx.orders.create({
                data: {
                    name,
                    phone,
                    shippingAddress,
                    totalAmount: totalPrice,
                    cashOnDelivery,
                    orderItems: { create: orderItemsData },
                    ...(currentUserId && { user: { connect: { id: currentUserId } } })
                },
                include: { orderItems: true }
            });

            await Promise.all(
                orderItems.map(async (item) => {
                    await tx.medicines.update({
                        where: { id: item.medicineId },
                        data: {
                            stock: {
                                decrement: item.quantity
                            }
                        }
                    })
                })
            );

            return order;
        }, { timeout: 20000 });
    } catch (err: any) {
        return { status: false, message: err.message || 'Something went wrong!' };
    }
}

// Get customer own orders.
const getUserOrders = async (currentUserId: string) => {
    return await prisma.orders.findMany({
        where: { userId: currentUserId },
        select: { name: true, phone: true, orderItems: true }
    })
}


// Get all orders by Seller
const getAllOrders = async (currentUserId: string) => {
    return await prisma.orders.findMany({
        where: { orderItems: { some: { medicine: { userId: currentUserId } } } },
        include: { orderItems: { include: { medicine: true } } },
        orderBy: { createdAt: "desc" }
    });
};

// Get order by orderId => Seller
const getOrderById = async (orderId: string) => {
    return await prisma.orders.findUnique({
        where: { id: orderId },
        include: { orderItems: true }
    })
}
// Update order status by Seller.
const updateOrderStatusById = async (orderId: string, payload: Status) => {
    const { status } = payload;

    return await prisma.orders.update({ where: { id: orderId }, data: { status } });
};

export const orderService = {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatusById,
}