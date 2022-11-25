/*
  Warnings:

  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "amount" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
