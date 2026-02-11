-- CreateTable
CREATE TABLE "area" (
    "id" SERIAL NOT NULL,
    "area_code" VARCHAR(10) NOT NULL,
    "area_name" VARCHAR(200) NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "area_area_code_key" ON "area"("area_code");
