-- CreateTable
CREATE TABLE "hospital" (
    "id" SERIAL NOT NULL,
    "hoscode" VARCHAR(5) NOT NULL,
    "hosname" VARCHAR(200) NOT NULL,
    "hostype" VARCHAR(2),
    "orgtype" VARCHAR(2),
    "tmb" VARCHAR(6),
    "amp" VARCHAR(4),
    "prov" VARCHAR(2),
    "activated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "hospital_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hospital_hoscode_key" ON "hospital"("hoscode");
