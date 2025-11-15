import prisma from "../src/config/db.js";
import quotes from "./constant.js";

async function main() {
console.log('🌱 Starting database seed...');
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE Quote;`);
  
  
  await prisma.quote.createMany({
    data: quotes
  });
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);


  console.log("✅ Seed quotes data inserted successfully!");
}

main()
  .catch((e) => console.error("❌ Error seeding quotes data:", e))
  .finally(async () => await prisma.$disconnect());
