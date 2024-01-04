-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "base_stat" INTEGER NOT NULL,
    "effort" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "statDetailId" INTEGER NOT NULL,
    CONSTRAINT "Stat_statDetailId_fkey" FOREIGN KEY ("statDetailId") REFERENCES "StatDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stat_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StatDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slot" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "typeDetailId" INTEGER NOT NULL,
    CONSTRAINT "Type_typeDetailId_fkey" FOREIGN KEY ("typeDetailId") REFERENCES "TypeDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Type_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TypeDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
