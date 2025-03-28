/*
  Warnings:

  - You are about to drop the `MaterialsOnModules` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `complete` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleId` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MaterialsOnModules" DROP CONSTRAINT "MaterialsOnModules_materialId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialsOnModules" DROP CONSTRAINT "MaterialsOnModules_moduleId_fkey";

-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "complete" BOOLEAN NOT NULL,
ADD COLUMN     "moduleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MaterialsOnModules";

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
