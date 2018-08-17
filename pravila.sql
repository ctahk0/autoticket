-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 15, 2018 at 12:27 PM
-- Server version: 5.5.59-MariaDB-1ubuntu0.14.04.1
-- PHP Version: 7.0.28-1+ubuntu14.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `odds`
--

-- --------------------------------------------------------

--
-- Table structure for table `pravila`
--

DROP TABLE IF EXISTS `pravila`;
CREATE TABLE IF NOT EXISTS `pravila` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `igra` varchar(20) NOT NULL,
  `opis` varchar(20) NOT NULL,
  `kvota1` float NOT NULL,
  `kvota2` float NOT NULL,
  `razlika` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=59 ;

--
-- Dumping data for table `pravila`
--

INSERT INTO `pravila` (`id`, `igra`, `opis`, `kvota1`, `kvota2`, `razlika`) VALUES
(46, 'AH0', 'razlika', 1.79, 2, 0.15),
(47, 'AH0', 'razlika', 2, 2.2, 0.16),
(48, 'AH0', 'razlika', 2.2, 2.4, 0.2),
(49, 'AH0', 'razlika', 2.4, 2.7, 0.25),
(50, 'AH0', 'razlika', 2.7, 3, 0.27),
(51, 'AH0', 'razlika', 3, 3.5, 2.9),
(52, 'AH0', 'razlika', 3.5, 4, 3.4),
(53, 'AH0', 'razlika', 4, 5, 3.9),
(54, 'AH0', 'razlika', 5, 6, 4.9),
(55, '', 'procenat', 1.79, 2, 2),
(56, '', 'procenat', 2, 2.2, 2),
(57, '', 'procenat', 2.2, 2.5, 2),
(58, '', 'procenat', 2.5, 2.8, 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
