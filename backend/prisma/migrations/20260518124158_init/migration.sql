-- CreateEnum
CREATE TYPE "BusinessAgeRange" AS ENUM ('LESS_THAN_1_YEAR', 'ONE_TO_TWO_YEARS', 'THREE_TO_FIVE_YEARS', 'MORE_THAN_5_YEARS');

-- CreateEnum
CREATE TYPE "TransactionRange" AS ENUM ('LESS_THAN_10', 'TEN_TO_FIFTY', 'FIFTY_TO_TWO_HUNDRED', 'TWO_HUNDRED_TO_FIVE_HUNDRED', 'MORE_THAN_FIVE_HUNDRED');

-- CreateEnum
CREATE TYPE "PlatformProvider" AS ENUM ('SHOPEE', 'TOKOPEDIA', 'GOJEK', 'GRAB', 'TIKTOK_SHOP', 'LAZADA', 'GOPAY', 'OVO', 'DANA', 'BANK', 'OFFLINE_STORE', 'OTHER');

-- CreateEnum
CREATE TYPE "PlatformCategory" AS ENUM ('MARKETPLACE', 'EWALLET', 'BANK', 'OFFLINE', 'OTHER');

-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('CONNECTED', 'DISCONNECTED');

-- CreateEnum
CREATE TYPE "CreditScoreStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "FiveCDimension" AS ENUM ('CHARACTER', 'CAPACITY', 'CONDITION', 'CAPITAL', 'COLLATERAL');

-- CreateEnum
CREATE TYPE "ImpactType" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "RecommendationPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "RecommendationStatus" AS ENUM ('OPEN', 'DONE', 'SKIPPED');

-- CreateEnum
CREATE TYPE "ImportStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "businessAge" "BusinessAgeRange" NOT NULL,
    "address" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monthlyRevenue" DECIMAL(14,2) NOT NULL,
    "monthlyExpense" DECIMAL(14,2) NOT NULL,
    "estimatedAssets" DECIMAL(14,2) NOT NULL,
    "declaredDebt" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "transactionRange" "TransactionRange" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectedPlatform" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "PlatformProvider" NOT NULL,
    "category" "PlatformCategory" NOT NULL,
    "status" "ConnectionStatus" NOT NULL DEFAULT 'DISCONNECTED',
    "accountName" TEXT,
    "accountUrl" TEXT,
    "rating" DECIMAL(3,2),
    "metadata" JSONB,
    "connectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConnectedPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER,
    "category" TEXT,
    "status" "CreditScoreStatus" NOT NULL DEFAULT 'PENDING',
    "modelVersion" TEXT,
    "calculatedAt" TIMESTAMP(3),
    "failedReason" TEXT,
    "rawAiResponse" JSONB,
    "inputSnapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreBreakdown" (
    "id" TEXT NOT NULL,
    "creditScoreId" TEXT NOT NULL,
    "character" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "condition" INTEGER NOT NULL,
    "capital" INTEGER NOT NULL,
    "collateral" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScoreBreakdown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreFactor" (
    "id" TEXT NOT NULL,
    "creditScoreId" TEXT NOT NULL,
    "dimension" "FiveCDimension" NOT NULL,
    "impactType" "ImpactType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "impactPoints" INTEGER NOT NULL,
    "weight" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScoreFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "creditScoreId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dimension" "FiveCDimension",
    "priority" "RecommendationPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "RecommendationStatus" NOT NULL DEFAULT 'OPEN',
    "estimatedPoints" INTEGER,
    "actionLabel" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialImport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "periodLabel" TEXT,
    "storagePath" TEXT,
    "status" "ImportStatus" NOT NULL DEFAULT 'PENDING',
    "impactPoints" INTEGER,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "importedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialImport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_userId_key" ON "BusinessProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialProfile_userId_key" ON "FinancialProfile"("userId");

-- CreateIndex
CREATE INDEX "ConnectedPlatform_userId_category_idx" ON "ConnectedPlatform"("userId", "category");

-- CreateIndex
CREATE INDEX "ConnectedPlatform_status_idx" ON "ConnectedPlatform"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ConnectedPlatform_userId_provider_key" ON "ConnectedPlatform"("userId", "provider");

-- CreateIndex
CREATE INDEX "CreditScore_userId_createdAt_idx" ON "CreditScore"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "CreditScore_status_idx" ON "CreditScore"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ScoreBreakdown_creditScoreId_key" ON "ScoreBreakdown"("creditScoreId");

-- CreateIndex
CREATE INDEX "ScoreFactor_creditScoreId_impactType_idx" ON "ScoreFactor"("creditScoreId", "impactType");

-- CreateIndex
CREATE INDEX "ScoreFactor_dimension_idx" ON "ScoreFactor"("dimension");

-- CreateIndex
CREATE INDEX "Recommendation_creditScoreId_status_idx" ON "Recommendation"("creditScoreId", "status");

-- CreateIndex
CREATE INDEX "Recommendation_priority_idx" ON "Recommendation"("priority");

-- CreateIndex
CREATE INDEX "FinancialImport_userId_createdAt_idx" ON "FinancialImport"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "FinancialImport_status_idx" ON "FinancialImport"("status");

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialProfile" ADD CONSTRAINT "FinancialProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectedPlatform" ADD CONSTRAINT "ConnectedPlatform_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditScore" ADD CONSTRAINT "CreditScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreBreakdown" ADD CONSTRAINT "ScoreBreakdown_creditScoreId_fkey" FOREIGN KEY ("creditScoreId") REFERENCES "CreditScore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreFactor" ADD CONSTRAINT "ScoreFactor_creditScoreId_fkey" FOREIGN KEY ("creditScoreId") REFERENCES "CreditScore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_creditScoreId_fkey" FOREIGN KEY ("creditScoreId") REFERENCES "CreditScore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialImport" ADD CONSTRAINT "FinancialImport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
