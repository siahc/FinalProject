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
  `password` VARCHAR(2000) NOT NULL,
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
  `medical_history_id` INT NULL,
  `verified` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_medications_patient1_idx` (`patient_id` ASC),
  INDEX `fk_medication_medical_history1_idx` (`medical_history_id` ASC),
  CONSTRAINT `fk_medications_patient1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medication_medical_history1`
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
  `title` VARCHAR(45) NULL,
  `creation_date` DATETIME NULL,
  `reviewed` TINYINT NULL,
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
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (1, 'admin', '$2a$10$IlnXxhorq9uTuBY3JkHSD.noPEYSdWMe2q8hHsHv9tpohz7PwkzRS', 1, 'admin');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (2, 'patient', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'patient');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (3, 'provider', '$2a$10$ao6ZMZ/BsDpzJqMQ.wSfQeoOOm.HTrHirMeIgwL8yw/YJXD070qxy', 1, 'provider');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (4, 'rben', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'provider');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (5, 'lshep', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'provider');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (6, 'tcross', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'provider');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (7, 'mcornelius', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'provider');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (8, 'apow', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'provider');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (9, 'winisand', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'patient');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (10, 'magicmike', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'patient');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (11, 'samadams', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'patient');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (12, 'brenpop', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'patient');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (13, 'bettyrivers', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'patient');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (14, 'aprilchan', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'patient');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (15, 'ddickies', '$2a$10$NLAuqqi/2axdV7KaO1Ic9.UniGiN5PEJGiSORY5IpHMDjDoja1wZW', 1, 'patient');

COMMIT;


-- -----------------------------------------------------
-- Data for table `patient`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `patient` (`id`, `first_name`, `last_name`, `date_of_birth`, `img`, `user_id`) VALUES (1, 'Winifred', 'Sanderson', 'October 31, 1759', 'https://pbs.twimg.com/profile_images/517608236783263744/OnfUnthO_400x400.jpeg', 2);
INSERT INTO `patient` (`id`, `first_name`, `last_name`, `date_of_birth`, `img`, `user_id`) VALUES (2, 'Magic', 'Mike', '7/12/1960', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPef4KPk-0QekdQ3cBE7DgoWcMcw7tJHXlQ&usqp=CAU', 10);
INSERT INTO `patient` (`id`, `first_name`, `last_name`, `date_of_birth`, `img`, `user_id`) VALUES (3, 'Samuel', 'Adams', '1-16-1900', 'https://www.biography.com/.image/t_share/MTE1ODA0OTcxNTMzNDM2NDI5/samuel-adams-9176129-1-402.jpg', 11);
INSERT INTO `patient` (`id`, `first_name`, `last_name`, `date_of_birth`, `img`, `user_id`) VALUES (4, 'Brennon', 'Pop', '9-9-1999', 'https://members.baseballfactory.com/player/bm/06bfa9a9fdec4bd0bcdf7906cad3b947.jpg', 12);
INSERT INTO `patient` (`id`, `first_name`, `last_name`, `date_of_birth`, `img`, `user_id`) VALUES (5, 'Betty', 'Rivers', '10-1-1928', 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE1ODA0OTcxODg1ODIzNTAx/betty-white-9542614-1-402.jpg', 13);
INSERT INTO `patient` (`id`, `first_name`, `last_name`, `date_of_birth`, `img`, `user_id`) VALUES (6, 'April', 'Chandler', '4-1-1982', 'https://m.media-amazon.com/images/M/MV5BYTBhZDg4N2YtYzlhMy00NzgzLWI3NGItMGVlM2U0NWVjNmMwXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg', 14);
INSERT INTO `patient` (`id`, `first_name`, `last_name`, `date_of_birth`, `img`, `user_id`) VALUES (7, 'Richard', 'Dickies', '6-19-1958', 'https://doximity-res.cloudinary.com/image/upload/t_public_profile_photo_320x320/lm7mlawhrvq0wag6pjdp.jpg', 15);

COMMIT;


-- -----------------------------------------------------
-- Data for table `medical_history`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `medical_history` (`id`, `diagnosis`, `active`, `onset`, `treatment`, `patient_id`) VALUES (1, 'CHF', 1, '1800', 'Lasix', 1);
INSERT INTO `medical_history` (`id`, `diagnosis`, `active`, `onset`, `treatment`, `patient_id`) VALUES (2, 'Eczema', 1, '1999', 'lotion', 5);
INSERT INTO `medical_history` (`id`, `diagnosis`, `active`, `onset`, `treatment`, `patient_id`) VALUES (3, 'High Blood Pressure', 1, '1990\'s?', 'diet and exercise', 7);
INSERT INTO `medical_history` (`id`, `diagnosis`, `active`, `onset`, `treatment`, `patient_id`) VALUES (4, 'Contraception', 1, 'early 2000\'s', 'condoms', 6);
INSERT INTO `medical_history` (`id`, `diagnosis`, `active`, `onset`, `treatment`, `patient_id`) VALUES (5, 'Asthma', 1, '2006ish', 'ProAir', 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `medication`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `medication` (`id`, `medication_name`, `description`, `dose`, `frequency`, `provider`, `comment`, `patient_id`, `active`, `medical_history_id`, `verified`) VALUES (1, 'Botox', 'youth', '1 child', 'daily', 'Billy', 'I hate Max Dennison', 1, 1, NULL, 1);
INSERT INTO `medication` (`id`, `medication_name`, `description`, `dose`, `frequency`, `provider`, `comment`, `patient_id`, `active`, `medical_history_id`, `verified`) VALUES (2, 'Hydrocortisone', 'itch cream', '2.5%', '2-3X daily', 'Lane', 'I like this cream', 5, 1, NULL, NULL);
INSERT INTO `medication` (`id`, `medication_name`, `description`, `dose`, `frequency`, `provider`, `comment`, `patient_id`, `active`, `medical_history_id`, `verified`) VALUES (3, 'Lisinopril', 'my blood pressure pill', '20mg', '1 tab daily', 'Tommy', 'i get a cough with this.', 7, 1, NULL, NULL);
INSERT INTO `medication` (`id`, `medication_name`, `description`, `dose`, `frequency`, `provider`, `comment`, `patient_id`, `active`, `medical_history_id`, `verified`) VALUES (4, 'Avianne', 'birth control', '0.1 mg', '1 tab daily', 'Robert', 'do not forget. to broke for a baby', 6, 1, NULL, NULL);
INSERT INTO `medication` (`id`, `medication_name`, `description`, `dose`, `frequency`, `provider`, `comment`, `patient_id`, `active`, `medical_history_id`, `verified`) VALUES (5, 'Ventolin HFA', 'inhaler', '90 mcg', '2 puffs every 4 hrs', 'Samuel', 'makes me jittery', 4, 1, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `provider`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `provider` (`id`, `first_name`, `last_name`, `location`, `title`, `user_id`) VALUES (1, 'Lane', 'Shepard', 'walkin', 'PA-C', 5);
INSERT INTO `provider` (`id`, `first_name`, `last_name`, `location`, `title`, `user_id`) VALUES (2, 'Robert', 'Benjamin', 'Cortez', 'PA-c', 4);
INSERT INTO `provider` (`id`, `first_name`, `last_name`, `location`, `title`, `user_id`) VALUES (3, 'Tommy', 'Cross', 'Denver', 'MD', 6);
INSERT INTO `provider` (`id`, `first_name`, `last_name`, `location`, `title`, `user_id`) VALUES (4, 'Maria', 'Cornelius', 'Shiprock', 'MD', 7);
INSERT INTO `provider` (`id`, `first_name`, `last_name`, `location`, `title`, `user_id`) VALUES (5, 'Amy', 'Powers', 'Las Vegas', 'DO', 8);

COMMIT;


-- -----------------------------------------------------
-- Data for table `provider_has_patient`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `provider_has_patient` (`provider_id`, `patient_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `message`
-- -----------------------------------------------------
START TRANSACTION;
USE `medicaltrackerdb`;
INSERT INTO `message` (`id`, `content`, `patient_id`, `provider_id`, `title`, `creation_date`, `reviewed`) VALUES (1, 'Hello World', 1, 1, 'This Is My First Message', NULL, NULL);
INSERT INTO `message` (`id`, `content`, `patient_id`, `provider_id`, `title`, `creation_date`, `reviewed`) VALUES (2, 'Hey Doc', 2, 2, 'Second Message', NULL, NULL);
INSERT INTO `message` (`id`, `content`, `patient_id`, `provider_id`, `title`, `creation_date`, `reviewed`) VALUES (3, 'I love this App', 3, 4, 'I am new here', NULL, NULL);

COMMIT;

