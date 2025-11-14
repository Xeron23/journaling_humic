/*
  Warnings:

  - The values [HAPPY,SAD,ANGRY,MOTIVATED] on the enum `Quote_category` will be removed. If these variants are still used in the database, this will fail.
  - The values [HAPPY,SAD,ANGRY,MOTIVATED] on the enum `Quote_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `journal` MODIFY `mood` ENUM('ADMIRATION', 'AMUSEMENT', 'ANGER', 'ANNOYANCE', 'APPROVAL', 'CARING', 'CONFUSION', 'CURIOSITY', 'DESIRE', 'DISAPPOINTMENT', 'DISAPPROVAL', 'DISGUST', 'EMBARRASSMENT', 'EXCITEMENT', 'FEAR', 'GRATITUDE', 'GRIEF', 'JOY', 'LOVE', 'NERVOUSNESS', 'OPTIMISM', 'PRIDE', 'REALIZATION', 'RELIEF', 'REMORSE', 'SADNESS', 'SURPRISE', 'NEUTRAL') NOT NULL;

-- AlterTable
ALTER TABLE `quote` MODIFY `category` ENUM('ADMIRATION', 'AMUSEMENT', 'ANGER', 'ANNOYANCE', 'APPROVAL', 'CARING', 'CONFUSION', 'CURIOSITY', 'DESIRE', 'DISAPPOINTMENT', 'DISAPPROVAL', 'DISGUST', 'EMBARRASSMENT', 'EXCITEMENT', 'FEAR', 'GRATITUDE', 'GRIEF', 'JOY', 'LOVE', 'NERVOUSNESS', 'OPTIMISM', 'PRIDE', 'REALIZATION', 'RELIEF', 'REMORSE', 'SADNESS', 'SURPRISE', 'NEUTRAL') NOT NULL;
