import prisma from "../src/config/db.js";
import { hashPassword } from "../src/utils/passwordConfig.js";
import quotes from "./constant.js";

async function main() {
console.log('🌱 Starting database seed...');
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE QuoteLog;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE Quote;`);
  console.log("✅ Delete tables Quote and QuoteLog successfully!");
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);
  await prisma.user.deleteMany({
    where: {
      username: "admin"
    }
  });
  console.log("✅ Delete admin user successfully!");

  await prisma.user.create({
    data: {
      fullName: "Admin User",
      username: "admin",
      email: "admin@example.com",
      password: await hashPassword("Admin@123"),
      role: "admin",
      verifiedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      birthDate: new Date('1990-01-01'),
    }
  });

  await prisma.quote.createMany({
    data: quotes
  });


  console.log("✅ Seed quotes data inserted successfully!");
}

main()
  .catch((e) => console.error("❌ Error seeding quotes data:", e))
  .finally(async () => await prisma.$disconnect());
