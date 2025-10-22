/*
  Warnings:

  - The values [happy,sad,neutral,angry,motivated] on the enum `Journal_mood` will be removed. If these variants are still used in the database, this will fail.
  - The values [happy,sad,neutral,angry,motivated] on the enum `Quote_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `journal` MODIFY `mood` ENUM('HAPPY', 'SAD', 'NEUTRAL', 'ANGRY', 'MOTIVATED') NOT NULL;

-- AlterTable
ALTER TABLE `quote` MODIFY `category` ENUM('HAPPY', 'SAD', 'NEUTRAL', 'ANGRY', 'MOTIVATED') NOT NULL;
