-- AlterTable
ALTER TABLE `User` ADD COLUMN `current_login_at` DATETIME(3) NULL,
    ADD COLUMN `last_login_at` DATETIME(3) NULL;
