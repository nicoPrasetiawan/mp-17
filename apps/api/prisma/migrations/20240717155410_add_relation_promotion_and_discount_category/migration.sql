-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_discount_category_id_fkey` FOREIGN KEY (`discount_category_id`) REFERENCES `DiscountCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
