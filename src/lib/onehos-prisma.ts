import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/onehos";

const globalForPrisma = globalThis as unknown as {
  onehosClient: PrismaClient | undefined;
};

function createOnehosClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.ONEHOS_DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

export const onehosClient =
  globalForPrisma.onehosClient ?? createOnehosClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.onehosClient = onehosClient;
}
