/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Material` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_moduleId_fkey";

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "moduleId";
