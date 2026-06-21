import { prisma } from "./lib/prisma";

async function main() {
    try {
        await prisma.$connect();
        console.log("DB Connected");

    } catch {
        console.log("DB Disconnected!");
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();

