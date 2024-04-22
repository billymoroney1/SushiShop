/*
  Warnings:

  - You are about to drop the `ExtraItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "category" TEXT;

-- DropTable
DROP TABLE "ExtraItem";
