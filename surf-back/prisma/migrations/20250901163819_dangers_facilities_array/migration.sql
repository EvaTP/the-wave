/*
  Warnings:

  - The `dangers` column on the `Spot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `facilities` column on the `Spot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Spot" DROP COLUMN "dangers",
ADD COLUMN     "dangers" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "facilities",
ADD COLUMN     "facilities" TEXT[] DEFAULT ARRAY[]::TEXT[];
