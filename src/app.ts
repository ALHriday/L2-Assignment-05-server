import express, { Application, Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { medicinesRoutes } from "./modules/medicines/medicine.route";
import { orderRoutes } from "./modules/orders/order.route";
import { userRoutes } from "./modules/users/user.route";
import { auth } from "./lib/auth";

const app: Application = express();

app.set('trust proxy', 1);
app.use(
    cors({
        origin: ["https://medistore-frontend-livid.vercel.app", "http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        exposedHeaders: ["Set-Cookie"],
    }),
);

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));


app.use("/api", medicinesRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);

app.post("/api/payment/webhook", express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
    console.log("Webhook received", req.body);
    res.status(200).json({ success: true });
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'MediStore server is running...' });
});

export default app;