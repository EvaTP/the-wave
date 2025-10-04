-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Like" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hashtag" (
    "id" SERIAL NOT NULL,
    "tagname" TEXT NOT NULL,

    CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Spot_hashtag" (
    "id" SERIAL NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "hashtag_id" INTEGER NOT NULL,

    CONSTRAINT "Spot_hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_spot_id_key" ON "public"."Like"("user_id", "spot_id");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_tagname_key" ON "public"."Hashtag"("tagname");

-- CreateIndex
CREATE UNIQUE INDEX "Spot_hashtag_spot_id_hashtag_id_key" ON "public"."Spot_hashtag"("spot_id", "hashtag_id");

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Spot_hashtag" ADD CONSTRAINT "Spot_hashtag_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "public"."Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Spot_hashtag" ADD CONSTRAINT "Spot_hashtag_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
