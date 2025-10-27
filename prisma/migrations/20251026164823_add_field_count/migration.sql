/*
  Warnings:

  - A unique constraint covering the columns `[userId,quoteId,action]` on the table `QuoteLog` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `quotelog` ADD COLUMN `count` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `QuoteLog_userId_quoteId_action_key` ON `QuoteLog`(`userId`, `quoteId`, `action`);
