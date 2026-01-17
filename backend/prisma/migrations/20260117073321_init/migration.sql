-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog_categories" (
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

    CONSTRAINT "catalog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "texts" (
    "id" TEXT NOT NULL,
    "id_slug" TEXT,
    "category_id" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "texts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_sections" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "section_type" TEXT NOT NULL,
    "title_tibetan" TEXT,
    "title_english" TEXT,
    "content_tibetan" TEXT,
    "content_english" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "text_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_summaries" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
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

    CONSTRAINT "text_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_collated_content" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "collated_text" TEXT,
    "english_translation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "text_collated_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_metadata" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "metadata_key" TEXT NOT NULL,
    "metadata_value" TEXT NOT NULL,
    "metadata_group" TEXT NOT NULL,
    "label" TEXT,
    "tibetan_title" TEXT,
    "english_title" TEXT,
    "sanskrit_title" TEXT,
    "chinese_title" TEXT,
    "derge_text_id" TEXT,
    "yeshe_text_id" TEXT,
    "derge_vol_number" INTEGER,
    "derge_start_page" INTEGER,
    "derge_end_page" INTEGER,
    "turning" TEXT,
    "yana" TEXT,
    "translation_period" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "text_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editions" (
    "id" TEXT NOT NULL,
    "name_english" TEXT NOT NULL,
    "name_tibetan" TEXT,
    "description_english" TEXT,
    "description_tibetan" TEXT,
    "year" TEXT,
    "location" TEXT,
    "total_volumes" INTEGER,
    "total_texts" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_editions" (
    "id" TEXT NOT NULL,
    "text_id" TEXT NOT NULL,
    "edition_id" TEXT NOT NULL,
    "source_id" TEXT,
    "volume_number" INTEGER,
    "start_page" INTEGER,
    "end_page" INTEGER,
    "availability" TEXT,
    "link_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "text_editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
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

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_periods" (
    "id" TEXT NOT NULL,
    "id_slug" TEXT NOT NULL,
    "name_tibetan" TEXT,
    "name_english" TEXT NOT NULL,
    "description" TEXT,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_events" (
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

    CONSTRAINT "timeline_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_event_figures" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name_english" TEXT,
    "name_tibetan" TEXT,
    "role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_event_figures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_event_relations" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "related_event_id" TEXT,
    "relation_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_event_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_event_sources" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "source_title" TEXT,
    "source_url" TEXT,
    "citation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_event_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audio_recordings" (
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

    CONSTRAINT "audio_recordings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
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

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "karchag_main_categories" (
    "id" TEXT NOT NULL,
    "name_english" TEXT NOT NULL,
    "name_tibetan" TEXT,
    "description_english" TEXT,
    "description_tibetan" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "karchag_main_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "karchag_sub_categories" (
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

    CONSTRAINT "karchag_sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "karchag_texts" (
    "id" TEXT NOT NULL,
    "sub_category_id" TEXT NOT NULL,
    "derge_id" TEXT,
    "yeshe_de_id" TEXT,
    "tibetan_title" TEXT,
    "chinese_title" TEXT,
    "sanskrit_title" TEXT,
    "english_title" TEXT,
    "turning_id" INTEGER,
    "yana_id" INTEGER,
    "translation_period_id" INTEGER,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "karchag_texts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "catalog_categories_id_slug_key" ON "catalog_categories"("id_slug");

-- CreateIndex
CREATE UNIQUE INDEX "texts_id_slug_key" ON "texts"("id_slug");

-- CreateIndex
CREATE UNIQUE INDEX "text_summaries_text_id_key" ON "text_summaries"("text_id");

-- CreateIndex
CREATE UNIQUE INDEX "text_collated_content_text_id_key" ON "text_collated_content"("text_id");

-- CreateIndex
CREATE UNIQUE INDEX "timeline_periods_id_slug_key" ON "timeline_periods"("id_slug");

-- AddForeignKey
ALTER TABLE "catalog_categories" ADD CONSTRAINT "catalog_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "catalog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "texts" ADD CONSTRAINT "texts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "catalog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_sections" ADD CONSTRAINT "text_sections_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_summaries" ADD CONSTRAINT "text_summaries_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_collated_content" ADD CONSTRAINT "text_collated_content_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_metadata" ADD CONSTRAINT "text_metadata_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_editions" ADD CONSTRAINT "text_editions_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_editions" ADD CONSTRAINT "text_editions_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "timeline_periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_event_figures" ADD CONSTRAINT "timeline_event_figures_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "timeline_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_event_relations" ADD CONSTRAINT "timeline_event_relations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "timeline_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_event_sources" ADD CONSTRAINT "timeline_event_sources_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "timeline_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karchag_sub_categories" ADD CONSTRAINT "karchag_sub_categories_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "karchag_main_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karchag_texts" ADD CONSTRAINT "karchag_texts_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "karchag_sub_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
