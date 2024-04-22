-- CreateTable
CREATE TABLE "ExtraItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ExtraItem_pkey" PRIMARY KEY ("id")
);
