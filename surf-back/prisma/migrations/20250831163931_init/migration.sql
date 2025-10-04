-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "role_description" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "country_user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "url_userpicture" TEXT,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Level" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Spot_level" (
    "id" SERIAL NOT NULL,
    "level_id" INTEGER NOT NULL,
    "spot_id" INTEGER NOT NULL,

    CONSTRAINT "Spot_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Spot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country_spot" TEXT NOT NULL,
    "lat" DECIMAL(65,30),
    "lng" DECIMAL(65,30),
    "url_spotpicture" TEXT,
    "description" TEXT,
    "best_season" TEXT,
    "wave_type" TEXT,
    "tide" TEXT,
    "water_temperature" TEXT,
    "crowd" TEXT,
    "dangers" TEXT,
    "facilities" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "public"."User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Spot_level_level_id_spot_id_key" ON "public"."Spot_level"("level_id", "spot_id");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Spot_level" ADD CONSTRAINT "Spot_level_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "public"."Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Spot_level" ADD CONSTRAINT "Spot_level_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
