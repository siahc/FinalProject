-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema medicaltrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `medicaltrackerdb` ;

-- -----------------------------------------------------
-- Schema medicaltrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `medicaltrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `medicaltrackerdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `enabled` TINYINT(1) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `patient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `patient` ;

CREATE TABLE IF NOT EXISTS `patient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `date_of_birth` VARCHAR(45) NULL,
  `img` VARCHAR(2000) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_patient_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_patient_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medical_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `medical_history` ;

CREATE TABLE IF NOT EXISTS `medical_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `diagnosis` VARCHAR(100) NOT NULL,
  `active` TINYINT NULL,
  `onset` VARCHAR(100) NULL,
  `treatment` VARCHAR(2000) NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_medical_history_patient1_idx` (`patient_id` ASC),
  CONSTRAINT `fk_medical_history_patient1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `medication` ;

CREATE TABLE IF NOT EXISTS `medication` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `medication_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(300) NULL,
  `dose` VARCHAR(200) NULL,
  `frequency` VARCHAR(200) NULL,
  `provider` VARCHAR(100) NULL,
  `comment` VARCHAR(2000) NULL,
  `patient_id` INT NOT NULL,
  `active` TINYINT NULL,
  `medical_history_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_medications_patient1_idx` (`patient_id` ASC),
  INDEX `fk_medications_medical_history1_idx` (`medical_history_id` ASC),
  CONSTRAINT `fk_medications_patient1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medications_medical_history1`
    FOREIGN KEY (`medical_history_id`)
    REFERENCES `medical_history` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `provider` ;

CREATE TABLE IF NOT EXISTS `provider` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(200) NULL,
  `title` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_provider_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_provider_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `provider_has_patient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `provider_has_patient` ;

CREATE TABLE IF NOT EXISTS `provider_has_patient` (
  `provider_id` INT NOT NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`provider_id`, `patient_id`),
  INDEX `fk_provider_has_patient_patient1_idx` (`patient_id` ASC),
  INDEX `fk_provider_has_patient_provider1_idx` (`provider_id` ASC),
  CONSTRAINT `fk_provider_has_patient_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_provider_has_patient_patient1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(250) NULL,
  `patient_id` INT NOT NULL,
  `provider_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_message_patient1_idx` (`patient_id` ASC),
  INDEX `fk_message_provider1_idx` (`provider_id` ASC),
  CONSTRAINT `fk_message_patient1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `provider` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS medicaltracker@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'medicaltracker'@'localhost' IDENTIFIED BY 'medicaltracker';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'medicaltracker'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (1, 'admin', 'admin', 1, 'admin');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (2, 'patient', 'patient', 1, 'patient');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (3, 'provider', 'provider', 1, 'provider');

COMMIT;


-- -----------------------------------------------------
-- Data for table `patient`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `patient` (`id`, `first_name`, `last_name`, `date_of_birth`, `img`, `user_id`) VALUES (1, 'Winifred', 'Sanderson', 'October 31, 1759', 'https://pbs.twimg.com/profile_images/517608236783263744/OnfUnthO_400x400.jpeg', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `medical_history`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `medical_history` (`id`, `diagnosis`, `active`, `onset`, `treatment`, `patient_id`) VALUES (1, 'CHF', 1, '1800', 'Lasix', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `medication`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `medication` (`id`, `medication_name`, `description`, `dose`, `frequency`, `provider`, `comment`, `patient_id`, `active`, `medical_history_id`) VALUES (1, 'Botox', 'youth', '1 child', 'daily', 'Billy', 'I hate Max Dennison', 1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `provider`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `provider` (`id`, `first_name`, `last_name`, `location`, `title`, `user_id`) VALUES (1, 'Lane', 'Shepard', 'walkin', 'PA-C', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `message`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `message` (`id`, `content`, `patient_id`, `provider_id`) VALUES (1, 'Hello World', 1, 1);

COMMIT;
