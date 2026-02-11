import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/pm25";

const globalForPrisma = globalThis as unknown as {
  pm25Client: PrismaClient | undefined;
};

function createPm25Client() {
  const adapter = new PrismaPg({
    connectionString: process.env.PM25_DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

export const pm25Client =
  globalForPrisma.pm25Client ?? createPm25Client();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pm25Client = pm25Client;
}
