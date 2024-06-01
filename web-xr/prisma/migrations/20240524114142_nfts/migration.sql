-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "external_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "locked_features" BOOLEAN NOT NULL,
    "gender" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
