/*
  Warnings:

  - Added the required column `prompt` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPrompts" ADD COLUMN     "prompt" TEXT NOT NULL;
