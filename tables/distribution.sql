CREATE TABLE `yyt`.`distribution` (
  `distribution_id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `name` VARCHAR(160) NOT NULL,
  `upload_path` VARCHAR(160) NOT NULL,
  `version` VARCHAR(32) NOT NULL,
  `description` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`distribution_id`))
  CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
