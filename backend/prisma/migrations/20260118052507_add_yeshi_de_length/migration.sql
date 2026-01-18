/*
  Warnings:

  - You are about to drop the column `yeshe_de_page_end` on the `Text` table. All the data in the column will be lost.
  - You are about to drop the column `yeshe_de_page_start` on the `Text` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Text" DROP COLUMN "yeshe_de_page_end",
DROP COLUMN "yeshe_de_page_start",
ADD COLUMN     "yeshe_de_volume_length" TEXT;
