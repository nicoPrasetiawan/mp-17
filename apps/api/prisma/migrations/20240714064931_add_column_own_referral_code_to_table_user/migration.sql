/*
  Warnings:

  - A unique constraint covering the columns `[own_referral_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `own_referral_code` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_own_referral_code_key` ON `User`(`own_referral_code`);
