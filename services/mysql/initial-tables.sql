-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `slug` varchar(40) DEFAULT NULL,
  `short_description` text,
  `address` JSON,
  `avatar` JSON,
  `specialize_one`: varchar(10) DEFAULT NULL,
  `specialize_two`: varchar(10) DEFAULT NULL,
  `showcase_layout` varchar(10) DEFAULT NULL,
  `social_links` JSON,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE UNIQUE INDEX USER_INDEX ON `users` (`id`);


DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `user_id` int(11) NOT NULL,
  `token` varchar(225) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `ip` varchar(40) DEFAULT NULL,
  `activate_account` tinyint(1) DEFAULT '0',
  `activate_account_code` char(32) DEFAULT NULL,
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `attempt_sign_in` int(11) DEFAULT NULL,
  `attempt_sign_in_timestamp` varchar(100) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE UNIQUE INDEX AUTH_INDEX ON `auth` (`user_id`);


DROP TABLE IF EXISTS `showcase`;
CREATE TABLE `showcase` (
  `user_id` int(11) NOT NULL,
  `description` text,
  `services_and_price` JSON,
  `baner` varchar(100) DEFAULT '',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE UNIQUE INDEX SHOWCASE_INDEX ON `showcase` (`user_id`);


DROP TABLE IF EXISTS `specialization`;
CREATE TABLE `specialization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE UNIQUE INDEX SHOWCASE_INDEX ON `specialization` (`user_id`);


-- 2019-05-23 18:44:48
