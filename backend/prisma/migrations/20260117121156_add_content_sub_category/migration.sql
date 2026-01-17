-- AlterTable
ALTER TABLE "KarchagSubCategory" ADD COLUMN     "content" TEXT,
ADD COLUMN     "only_content" BOOLEAN NOT NULL DEFAULT false;
