-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryAddressId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "deliveryAddressId" DROP NOT NULL,
ALTER COLUMN "deliveryAddressId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryAddressId_fkey" FOREIGN KEY ("deliveryAddressId") REFERENCES "DeliveryAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
