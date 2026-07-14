/*
  Warnings:

  - A unique constraint covering the columns `[userId,reviewId]` on the table `ReviewHelpful` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReviewHelpful_userId_reviewId_key" ON "ReviewHelpful"("userId", "reviewId");
