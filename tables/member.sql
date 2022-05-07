CREATE TABLE `yyt`.`member` (
  `member_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
  CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
