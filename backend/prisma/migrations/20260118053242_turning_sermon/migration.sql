/*
  Warnings:

  - You are about to drop the column `turning` on the `Text` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Text" DROP COLUMN "turning",
ADD COLUMN     "sermon" TEXT;
