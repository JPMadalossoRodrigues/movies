/*
  Warnings:

  - The `genres` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "genres",
ADD COLUMN     "genres" TEXT[];

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "runAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
