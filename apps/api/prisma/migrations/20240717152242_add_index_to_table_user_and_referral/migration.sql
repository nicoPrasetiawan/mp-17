-- CreateIndex
CREATE INDEX `Referral_referral_code_idx` ON `Referral`(`referral_code`);

-- CreateIndex
CREATE INDEX `Referral_referrer_id_idx` ON `Referral`(`referrer_id`);

-- CreateIndex
CREATE INDEX `User_username_idx` ON `User`(`username`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `User_own_referral_code_idx` ON `User`(`own_referral_code`);

-- RenameIndex
ALTER TABLE `Referral` RENAME INDEX `Referral_referred_id_fkey` TO `Referral_referred_id_idx`;
