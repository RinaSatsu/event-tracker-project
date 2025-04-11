/*
  Warnings:

  - Added the required column `passhash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passsalt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passhash" TEXT NOT NULL,
ADD COLUMN     "passsalt" TEXT NOT NULL;
