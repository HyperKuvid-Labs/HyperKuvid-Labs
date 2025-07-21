-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('ADMIN', 'GENERAL', 'CORE_GENERAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" "UserLevel" NOT NULL DEFAULT 'GENERAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuilderProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "skills" TEXT[],
    "linkedin" TEXT,
    "x" TEXT,
    "githubUsername" TEXT,
    "hasPortfolio" BOOLEAN NOT NULL DEFAULT false,
    "portfolioSite" TEXT,
    "profileImage" TEXT,

    CONSTRAINT "BuilderProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "githubLink" TEXT NOT NULL,
    "story" TEXT,
    "documentation" TEXT,
    "techstack" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuilderProject" (
    "id" TEXT NOT NULL,
    "builderId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "githubLink" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuilderProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderProfile_userId_key" ON "BuilderProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderProfile_linkedin_key" ON "BuilderProfile"("linkedin");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderProfile_x_key" ON "BuilderProfile"("x");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderProfile_githubUsername_key" ON "BuilderProfile"("githubUsername");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderProject_builderId_projectId_key" ON "BuilderProject"("builderId", "projectId");

-- AddForeignKey
ALTER TABLE "BuilderProfile" ADD CONSTRAINT "BuilderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuilderProject" ADD CONSTRAINT "BuilderProject_builderId_fkey" FOREIGN KEY ("builderId") REFERENCES "BuilderProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuilderProject" ADD CONSTRAINT "BuilderProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
