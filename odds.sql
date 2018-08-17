-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 15, 2018 at 11:43 AM
-- Server version: 5.5.59-MariaDB-1ubuntu0.14.04.1
-- PHP Version: 7.0.28-1+ubuntu14.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: 'odds'
--
CREATE DATABASE IF NOT EXISTS odds DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE odds;

-- --------------------------------------------------------

--
-- Table structure for table 'matches'
--

DROP TABLE IF EXISTS matches;
CREATE TABLE IF NOT EXISTS matches (
  oID varchar(15) NOT NULL DEFAULT '',
  league varchar(255) DEFAULT NULL,
  country varchar(255) DEFAULT NULL,
  dTime datetime DEFAULT NULL,
  HomeTeam varchar(255) DEFAULT NULL,
  AwayTeam varchar(255) DEFAULT NULL,
  played smallint(6) DEFAULT NULL,
  oah0_1 float NOT NULL,
  oah0_2 float NOT NULL,
  cah0_1 float NOT NULL,
  cah0_2 float NOT NULL,
  PRIMARY KEY (oID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table 'matches_temp'
--

DROP TABLE IF EXISTS matches_temp;
CREATE TABLE IF NOT EXISTS matches_temp (
  oID varchar(15) NOT NULL DEFAULT '',
  league varchar(255) DEFAULT NULL,
  country varchar(255) DEFAULT NULL,
  dTime datetime DEFAULT NULL,
  HomeTeam varchar(255) DEFAULT NULL,
  AwayTeam varchar(255) DEFAULT NULL,
  played smallint(6) DEFAULT NULL,
  oah0_1 float NOT NULL,
  oah0_2 float NOT NULL,
  cah0_1 float NOT NULL,
  cah0_2 float NOT NULL,
  PRIMARY KEY (oID),
  UNIQUE KEY oID (oID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table 'o_changes'
--

DROP TABLE IF EXISTS o_changes;
CREATE TABLE IF NOT EXISTS o_changes (
  id int(11) NOT NULL AUTO_INCREMENT,
  gameID varchar(15) DEFAULT NULL,
  oddstime datetime DEFAULT NULL,
  currtime datetime DEFAULT NULL,
  ft_1 float DEFAULT NULL,
  ft_x float DEFAULT NULL,
  ft_2 float DEFAULT NULL,
  uo15_1 float DEFAULT NULL,
  uo15_2 float DEFAULT NULL,
  uo25_1 float DEFAULT NULL,
  uo25_2 float DEFAULT NULL,
  uo35_1 float DEFAULT NULL,
  uo35_2 float DEFAULT NULL,
  ah0_1 float DEFAULT NULL,
  ah0_2 float DEFAULT NULL,
  `ah-05_1` float DEFAULT NULL,
  `ah-05_2` float DEFAULT NULL,
  ah05_1 float DEFAULT NULL,
  ah05_2 float DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table 'o_current'
--

DROP TABLE IF EXISTS o_current;
CREATE TABLE IF NOT EXISTS o_current (
  gameID varchar(15) NOT NULL DEFAULT '',
  oddstime datetime DEFAULT NULL,
  currtime datetime DEFAULT NULL,
  ft_1 float DEFAULT NULL,
  ft_x float DEFAULT NULL,
  ft_2 float DEFAULT NULL,
  uo15_1 float DEFAULT NULL,
  uo15_2 float DEFAULT NULL,
  uo25_1 float DEFAULT NULL,
  uo25_2 float DEFAULT NULL,
  uo35_1 float DEFAULT NULL,
  uo35_2 float DEFAULT NULL,
  ah0_1 float DEFAULT NULL,
  ah0_2 float DEFAULT NULL,
  `ah-05_1` float DEFAULT NULL,
  `ah-05_2` float DEFAULT NULL,
  ah05_1 float DEFAULT NULL,
  ah05_2 float DEFAULT NULL,
  PRIMARY KEY (gameID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table 'o_opening'
--

DROP TABLE IF EXISTS o_opening;
CREATE TABLE IF NOT EXISTS o_opening (
  gameID varchar(15) NOT NULL DEFAULT '',
  oddstime datetime DEFAULT NULL,
  currtime datetime DEFAULT NULL,
  ft_1 float DEFAULT NULL,
  ft_x float DEFAULT NULL,
  ft_2 float DEFAULT NULL,
  uo15_1 float DEFAULT NULL,
  uo15_2 float DEFAULT NULL,
  uo25_1 float DEFAULT NULL,
  uo25_2 float DEFAULT NULL,
  uo35_1 float DEFAULT NULL,
  uo35_2 float DEFAULT NULL,
  ah0_1 float DEFAULT NULL,
  ah0_2 float DEFAULT NULL,
  `ah-05_1` float DEFAULT NULL,
  `ah-05_2` float DEFAULT NULL,
  ah05_1 float DEFAULT NULL,
  ah05_2 float DEFAULT NULL,
  PRIMARY KEY (gameID),
  UNIQUE KEY gameID (gameID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table 'pravila'
--

DROP TABLE IF EXISTS pravila;
CREATE TABLE IF NOT EXISTS pravila (
  id int(11) NOT NULL AUTO_INCREMENT,
  igra varchar(20) NOT NULL,
  opis varchar(20) NOT NULL,
  kvota1 float NOT NULL,
  kvota2 float NOT NULL,
  razlika float NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=59 ;

-- --------------------------------------------------------

--
-- Stand-in structure for view 'qallodds'
--
DROP VIEW IF EXISTS `qallodds`;
CREATE TABLE IF NOT EXISTS `qallodds` (
`oID` varchar(15)
,`league` varchar(255)
,`country` varchar(255)
,`dTime` datetime
,`HomeTeam` varchar(255)
,`AwayTeam` varchar(255)
,`played` smallint(6)
,`op_currtime` datetime
,`o_ft1` float
,`o_ftx` float
,`o_ft2` float
,`cu_currtime` datetime
,`c_ft1` float
,`c_ftx` float
,`c_ft2` float
);
-- --------------------------------------------------------

--
-- Stand-in structure for view 'qtest'
--
DROP VIEW IF EXISTS `qtest`;
CREATE TABLE IF NOT EXISTS `qtest` (
`oID` varchar(15)
,`league` varchar(255)
,`country` varchar(255)
,`dTime` datetime
,`HomeTeam` varchar(255)
,`AwayTeam` varchar(255)
,`played` smallint(6)
,`oah0_1` float
,`oah0_2` float
,`cah0_1` float
,`cah0_2` float
,`gameID` varchar(255)
,`tip` varchar(255)
,`odds` float
,`razlika` float
,`currOdds` float
,`currtime` datetime
,`napomena` varchar(255)
,`rezultat` tinyint(4)
,`profit` double
);
-- --------------------------------------------------------

--
-- Stand-in structure for view 'qtiket'
--
DROP VIEW IF EXISTS `qtiket`;
CREATE TABLE IF NOT EXISTS `qtiket` (
`oID` varchar(15)
,`league` varchar(255)
,`country` varchar(255)
,`dTime` datetime
,`HomeTeam` varchar(255)
,`AwayTeam` varchar(255)
,`played` smallint(6)
,`oah0_1` float
,`oah0_2` float
,`cah0_1` float
,`cah0_2` float
,`gameID` varchar(255)
,`tip` varchar(255)
,`odds` float
,`razlika` float
,`currOdds` float
,`currtime` datetime
,`napomena` varchar(255)
,`rezultat` tinyint(4)
,`profit` double
);
-- --------------------------------------------------------

--
-- Table structure for table 'tiket'
--

DROP TABLE IF EXISTS tiket;
CREATE TABLE IF NOT EXISTS tiket (
  ID int(11) NOT NULL AUTO_INCREMENT,
  gameID varchar(255) DEFAULT NULL,
  tip varchar(255) DEFAULT NULL,
  odds float DEFAULT NULL,
  razlika float NOT NULL,
  currOdds float DEFAULT NULL,
  currtime datetime DEFAULT NULL,
  napomena varchar(255) DEFAULT NULL,
  rezultat tinyint(4) NOT NULL DEFAULT '3',
  PRIMARY KEY (ID),
  UNIQUE KEY ID (ID),
  UNIQUE KEY gameIDnapomena (gameID,napomena)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=160500751 ;

-- --------------------------------------------------------

--
-- Structure for view 'qallodds'
--
DROP TABLE IF EXISTS `qallodds`;

CREATE ALGORITHM=UNDEFINED DEFINER=clockwel_japauto@`%` SQL SECURITY DEFINER VIEW qallodds AS select matches.oID AS oID,matches.league AS league,matches.country AS country,matches.dTime AS dTime,matches.HomeTeam AS HomeTeam,matches.AwayTeam AS AwayTeam,matches.played AS played,o_opening.currtime AS op_currtime,o_opening.ft_1 AS o_ft1,o_opening.ft_x AS o_ftx,o_opening.ft_2 AS o_ft2,o_current.currtime AS cu_currtime,o_current.ft_1 AS c_ft1,o_current.ft_x AS c_ftx,o_current.ft_2 AS c_ft2 from ((matches left join o_opening on((matches.oID = o_opening.gameID))) left join o_current on((matches.oID = o_current.gameID))) where (matches.dTime > now());

-- --------------------------------------------------------

--
-- Structure for view 'qtest'
--
DROP TABLE IF EXISTS `qtest`;

CREATE ALGORITHM=UNDEFINED DEFINER=root@localhost SQL SECURITY DEFINER VIEW qtest AS select matches.oID AS oID,matches.league AS league,matches.country AS country,matches.dTime AS dTime,matches.HomeTeam AS HomeTeam,matches.AwayTeam AS AwayTeam,matches.played AS played,matches.oah0_1 AS oah0_1,matches.oah0_2 AS oah0_2,matches.cah0_1 AS cah0_1,matches.cah0_2 AS cah0_2,tiket.gameID AS gameID,tiket.tip AS tip,tiket.odds AS odds,tiket.razlika AS razlika,tiket.currOdds AS currOdds,tiket.currtime AS currtime,tiket.napomena AS napomena,tiket.rezultat AS rezultat,if((tiket.rezultat = 1),(tiket.odds - 1),if((tiket.rezultat = -(1)),-(1),0)) AS profit from (matches join tiket on((matches.oID = tiket.gameID)));

-- --------------------------------------------------------

--
-- Structure for view 'qtiket'
--
DROP TABLE IF EXISTS `qtiket`;

CREATE ALGORITHM=UNDEFINED DEFINER=root@localhost SQL SECURITY DEFINER VIEW qtiket AS select matches.oID AS oID,matches.league AS league,matches.country AS country,matches.dTime AS dTime,matches.HomeTeam AS HomeTeam,matches.AwayTeam AS AwayTeam,matches.played AS played,matches.oah0_1 AS oah0_1,matches.oah0_2 AS oah0_2,matches.cah0_1 AS cah0_1,matches.cah0_2 AS cah0_2,tiket.gameID AS gameID,tiket.tip AS tip,tiket.odds AS odds,tiket.razlika AS razlika,tiket.currOdds AS currOdds,tiket.currtime AS currtime,tiket.napomena AS napomena,tiket.rezultat AS rezultat,if((tiket.rezultat = 1),(tiket.odds - 1),if((tiket.rezultat = -(1)),-(1),0)) AS profit from (matches join tiket on((matches.oID = tiket.gameID)));

--
-- Constraints for dumped tables
--

--
-- Constraints for table tiket
--
ALTER TABLE tiket
  ADD CONSTRAINT tiket_ibfk_1 FOREIGN KEY (gameID) REFERENCES matches (oID) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
