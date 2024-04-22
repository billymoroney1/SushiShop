/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ExtraItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExtraItem_name_key" ON "ExtraItem"("name");
