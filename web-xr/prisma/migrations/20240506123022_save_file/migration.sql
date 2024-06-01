-- CreateTable
CREATE TABLE "AudioFile" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AudioFile_fileUrl_key" ON "AudioFile"("fileUrl");
