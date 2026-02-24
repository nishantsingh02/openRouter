/*
  Warnings:

  - You are about to drop the `OnrampTranseaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `slug` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OnrampTranseaction" DROP CONSTRAINT "OnrampTranseaction_userId_fkey";

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "OnrampTranseaction";

-- CreateTable
CREATE TABLE "OnrampTransaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "OnrampTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OnrampTransaction" ADD CONSTRAINT "OnrampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
