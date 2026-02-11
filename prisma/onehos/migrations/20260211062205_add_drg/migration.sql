-- CreateTable
CREATE TABLE "drg" (
    "id" SERIAL NOT NULL,
    "hoscode" VARCHAR(5) NOT NULL,
    "hosname" VARCHAR(200) NOT NULL,
    "year" INTEGER NOT NULL,
    "mon" INTEGER NOT NULL,
    "sum_adjrw" DOUBLE PRECISION NOT NULL,
    "cmi" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "drg_pkey" PRIMARY KEY ("id")
);
