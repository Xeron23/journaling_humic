-- AlterTable
ALTER TABLE `quotelog` MODIFY `action` ENUM('click', 'like', 'journal_assigned') NOT NULL;
