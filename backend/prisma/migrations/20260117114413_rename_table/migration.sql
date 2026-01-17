-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogCategory" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT,
    "id_slug" TEXT NOT NULL,
    "title_tibetan" TEXT,
    "title_english" TEXT NOT NULL,
    "description" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatalogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "tibetan_title" TEXT,
    "english_title" TEXT NOT NULL,
    "tibetan_description" TEXT,
    "english_description" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelinePeriod" (
    "id" TEXT NOT NULL,
    "id_slug" TEXT NOT NULL,
    "name_tibetan" TEXT,
    "name_english" TEXT NOT NULL,
    "description" TEXT,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimelinePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEvent" (
    "id" TEXT NOT NULL,
    "period_id" TEXT NOT NULL,
    "title_english" TEXT NOT NULL,
    "title_tibetan" TEXT,
    "title_sanskrit" TEXT,
    "description_english" TEXT,
    "description_tibetan" TEXT,
    "category" TEXT,
    "year" INTEGER NOT NULL,
    "century" INTEGER,
    "era" TEXT DEFAULT 'CE',
    "is_approximate" BOOLEAN NOT NULL DEFAULT false,
    "location_english" TEXT,
    "location_tibetan" TEXT,
    "significance" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEventFigure" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name_english" TEXT,
    "name_tibetan" TEXT,
    "role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimelineEventFigure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEventRelation" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "related_event_id" TEXT,
    "relation_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimelineEventRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEventSource" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "source_title" TEXT,
    "source_url" TEXT,
    "citation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimelineEventSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioRecording" (
    "id" TEXT NOT NULL,
    "tibetan_title" TEXT,
    "english_title" TEXT,
    "tibetan_description" TEXT,
    "english_description" TEXT,
    "audio_url" TEXT,
    "thumbnail_url" TEXT,
    "duration" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudioRecording_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "tibetan_title" TEXT,
    "english_title" TEXT,
    "tibetan_description" TEXT,
    "english_description" TEXT,
    "video_link" TEXT,
    "thumbnail_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KarchagMainCategory" (
    "id" TEXT NOT NULL,
    "name_english" TEXT NOT NULL,
    "name_tibetan" TEXT,
    "description_english" TEXT,
    "description_tibetan" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KarchagMainCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KarchagSubCategory" (
    "id" TEXT NOT NULL,
    "main_category_id" TEXT NOT NULL,
    "name_english" TEXT NOT NULL,
    "name_tibetan" TEXT,
    "description_english" TEXT,
    "description_tibetan" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KarchagSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Text" (
    "id" TEXT NOT NULL,
    "sub_category_id" TEXT NOT NULL,
    "tibetan_title" TEXT,
    "chinese_title" TEXT,
    "sanskrit_title" TEXT,
    "english_title" TEXT,
    "derge_id" TEXT,
    "yeshe_de_id" TEXT,
    "yeshe_de_volume_number" TEXT,
    "yeshe_de_page_start" TEXT,
    "yeshe_de_page_end" TEXT,
    "turning" TEXT,
    "yana" TEXT,
    "translation_period" TEXT,
    "pdf_url" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KarchagTextSummary" (
    "id" TEXT NOT NULL,
    "karchag_text_id" TEXT NOT NULL,
    "translation_homage_tibetan" TEXT,
    "translation_homage_english" TEXT,
    "purpose_tibetan" TEXT,
    "purpose_english" TEXT,
    "summary_text_tibetan" TEXT,
    "summary_text_english" TEXT,
    "word_meaning_tibetan" TEXT,
    "word_meaning_english" TEXT,
    "connection_tibetan" TEXT,
    "connection_english" TEXT,
    "question_answers_tibetan" TEXT,
    "question_answers_english" TEXT,
    "colophon_tibetan" TEXT,
    "colophon_english" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KarchagTextSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KarchagTextMetadata" (
    "id" TEXT NOT NULL,
    "karchag_text_id" TEXT NOT NULL,
    "metadata_key" TEXT NOT NULL,
    "metadata_value" TEXT NOT NULL,
    "metadata_group" TEXT NOT NULL,
    "label" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KarchagTextMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogCategory_id_slug_key" ON "CatalogCategory"("id_slug");

-- CreateIndex
CREATE UNIQUE INDEX "TimelinePeriod_id_slug_key" ON "TimelinePeriod"("id_slug");

-- CreateIndex
CREATE UNIQUE INDEX "KarchagTextSummary_karchag_text_id_key" ON "KarchagTextSummary"("karchag_text_id");

-- AddForeignKey
ALTER TABLE "CatalogCategory" ADD CONSTRAINT "CatalogCategory_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "CatalogCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimelineEvent" ADD CONSTRAINT "TimelineEvent_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "TimelinePeriod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimelineEventFigure" ADD CONSTRAINT "TimelineEventFigure_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "TimelineEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimelineEventRelation" ADD CONSTRAINT "TimelineEventRelation_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "TimelineEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimelineEventSource" ADD CONSTRAINT "TimelineEventSource_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "TimelineEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KarchagSubCategory" ADD CONSTRAINT "KarchagSubCategory_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "KarchagMainCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "KarchagSubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KarchagTextSummary" ADD CONSTRAINT "KarchagTextSummary_karchag_text_id_fkey" FOREIGN KEY ("karchag_text_id") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KarchagTextMetadata" ADD CONSTRAINT "KarchagTextMetadata_karchag_text_id_fkey" FOREIGN KEY ("karchag_text_id") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;
