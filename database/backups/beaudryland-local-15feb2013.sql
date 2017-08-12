-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 13, 2013 at 12:20 AM
-- Server version: 5.5.9
-- PHP Version: 5.3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `beaudryland_feb15`
--

-- --------------------------------------------------------

--
-- Table structure for table `beaudryland_maps`
--

CREATE TABLE `beaudryland_maps` (
  `mapid` int(11) NOT NULL AUTO_INCREMENT,
  `mapdata` longtext NOT NULL,
  `user` text NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `maptype` text NOT NULL,
  PRIMARY KEY (`mapid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=445 ;

--
-- Dumping data for table `beaudryland_maps`
--


-- --------------------------------------------------------

--
-- Table structure for table `beaudryland_users`
--

CREATE TABLE `beaudryland_users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `inventory` longtext NOT NULL,
  `playerdiv` mediumtext NOT NULL,
  `selecteditem` mediumtext NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=283 ;

--
-- Dumping data for table `beaudryland_users`
--

