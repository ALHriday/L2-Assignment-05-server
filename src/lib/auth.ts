import { betterAuth } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma';
import nodemailer from "nodemailer"
import { prisma } from "./prisma";
import { emailTemplate } from "../template/emailTemplate";
import { oAuthProxy } from "better-auth/plugins";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_APP_USER!,
        pass: process.env.GOOGLE_APP_PASSWORD!,
    },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: process.env.FRONTEND_URL!,
    trustedOrigins: [process.env.FRONTEND_URL!],
    secret: process.env.BETTER_AUTH_SECRET!,
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "CUSTOMER"
            },
            status: {
                type: "string",
                required: true,
                defaultValue: "ACTIVE"
            },
            phone: {
                type: "string",
                required: false,
            },
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            try {
                await transporter.sendMail({
                    from: `"MediStore" <${process.env.GOOGLE_APP_USER!}>`,
                    to: user?.email,
                    subject: "Verify Your Email!",
                    html: emailTemplate(url),
                });

            } catch (err) {
                console.error(err);
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    advanced: {
        cookies: {
            session_token: {
                name: "session_token",
                attributes: {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    partitioned: true,
                },
            },
            state: {
                name: "session_token",
                attributes: {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    partitioned: true,
                },
            },
        },
    },

    plugins: [oAuthProxy()],
});

