/*
  Warnings:

  - Added the required column `available_seats` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_seats` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `available_seats` INTEGER NOT NULL,
    ADD COLUMN `total_seats` INTEGER NOT NULL;
