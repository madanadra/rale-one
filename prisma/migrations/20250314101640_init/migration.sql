/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Material` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Module` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Material_number_key" ON "Material"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Module_number_key" ON "Module"("number");
