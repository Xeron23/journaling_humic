/*
  Warnings:

  - You are about to drop the column `clickCount` on the `quote` table. All the data in the column will be lost.
  - The values [motivation] on the enum `Quote_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `quote` DROP COLUMN `clickCount`,
    MODIFY `category` ENUM('happy', 'sad', 'neutral', 'angry', 'motivated') NOT NULL;
