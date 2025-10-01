-- CreateTable
CREATE TABLE "ThemeSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "config" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ThemeSetting_name_key" ON "ThemeSetting"("name");

-- CreateIndex
CREATE INDEX "ThemeSetting_name_idx" ON "ThemeSetting"("name");

-- CreateIndex
CREATE INDEX "ThemeSetting_isActive_idx" ON "ThemeSetting"("isActive");
