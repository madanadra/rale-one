-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "complete" DROP NOT NULL,
ALTER COLUMN "complete" SET DEFAULT false;
