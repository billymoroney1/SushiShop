/*
  Warnings:

  - You are about to drop the `PaymentMethods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentMethods" DROP CONSTRAINT "PaymentMethods_userId_fkey";

-- DropTable
DROP TABLE "PaymentMethods";

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cardNum" TEXT NOT NULL,
    "expDate" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
