import { NextFunction, Request, Response } from "express"
import { auth as betterAuth } from "../lib/auth";
import { UserStatus } from "../generated/enums";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: UserRole;
                emailVerified: boolean;
            }
        }
    }
}

export enum UserRole {
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    CUSTOMER = "CUSTOMER"
}


export const Auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any,
            });

            if (!session?.user) {
                return res.status(401).json({
                    success: false,
                    message: "unAuthorized!"
                })
            }

            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email Verification Required!. Please verify your Email."
                })
            }

            if (session.user.status === UserStatus.BAN) {
                return res.status(403).json({
                    success: false,
                    message: "You Don't have permission!. Please contact with the owner."
                })
            }

            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role as UserRole,
                emailVerified: session.user.emailVerified,
            }

            if (roles.length > 0 && !roles.includes(req.user.role as UserRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden!. You are not allowed!"
                })
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}





