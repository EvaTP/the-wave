import { PrismaClient } from "@prisma/client";

// On crée une seule instance de PrismaClient
export const prisma = new PrismaClient();
