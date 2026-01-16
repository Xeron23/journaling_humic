-- AlterTable
ALTER TABLE `Journal` ADD COLUMN `quoteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Journal` ADD CONSTRAINT `Journal_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`quote_id`) ON DELETE SET NULL ON UPDATE CASCADE;
