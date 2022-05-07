CREATE TABLE `yyt`.`project` (
  `project_id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
  `codename` VARCHAR(80) NOT NULL,
  `name` VARCHAR(160) NOT NULL,
  `description` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  UNIQUE INDEX `codename_UNIQUE` (`codename` ASC) VISIBLE)
  CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';
