/*
  Warnings:

  - You are about to drop the column `promptId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `role` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Made the column `projectId` on table `Chat` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('USER', 'AI', 'SYSTEM');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "role" "ChatRole" NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "promptId";
