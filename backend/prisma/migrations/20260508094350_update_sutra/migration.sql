-- AlterTable
ALTER TABLE "CatalogCategory" ALTER COLUMN "title_english" DROP NOT NULL;

-- AlterTable
ALTER TABLE "KarchagMainCategory" ALTER COLUMN "name_english" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "alternative_title" TEXT,
ADD COLUMN     "bampo_number" INTEGER,
ADD COLUMN     "chapter_number" INTEGER,
ADD COLUMN     "interpretation" TEXT,
ADD COLUMN     "page_count" INTEGER,
ADD COLUMN     "pedurma_volume_number" TEXT,
ADD COLUMN     "pitaka_type" TEXT;

-- AlterTable
ALTER TABLE "TimelineEvent" ALTER COLUMN "title_english" DROP NOT NULL;
