/*
  Warnings:

  - Made the column `category` on table `MenuItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MenuItem" ALTER COLUMN "category" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentMethodId" INTEGER;

-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cardNum" TEXT NOT NULL,
    "expDate" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethods" ADD CONSTRAINT "PaymentMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
