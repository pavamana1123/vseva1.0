CREATE DATABASE  IF NOT EXISTS `iskconmy_vseva` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `iskconmy_vseva`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: iskconmy_vseva
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability` (
  `eventId` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `availability` varchar(50) DEFAULT NULL,
  UNIQUE KEY `unique_availability` (`eventId`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dates`
--

DROP TABLE IF EXISTS `dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dates` (
  `eventId` varchar(45) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `slots` mediumtext,
  UNIQUE KEY `unique_event` (`date`,`eventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dates`
--

LOCK TABLES `dates` WRITE;
/*!40000 ALTER TABLE `dates` DISABLE KEYS */;
INSERT INTO `dates` VALUES ('SBJ23','2023-08-31','Balarama Purnima','4AM - 7AM, 7AM - 1PM, 1PM - 4PM, 4PM - 10PM'),('SKJ23','2023-09-06','Sri Krishna Janmashtami - Day 1','4AM - 7AM, 7AM - 1PM, 1PM - 4PM, 4PM - 10PM'),('SKJ23','2023-09-07','Sri Krishna Janmashtami - Day 2','4AM - 7AM, 7AM - 1PM, 1PM - 4PM, 4PM - 10PM, 10PM - 12AM'),('SVP23','2023-09-08','Sri Vyasa Puja','4AM - 7AM, 7AM - 1PM, 1PM - 4PM, 4PM - 10PM');
/*!40000 ALTER TABLE `dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventgroups`
--

DROP TABLE IF EXISTS `eventgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventgroups` (
  `groupId` varchar(255) NOT NULL,
  `formDesc` longtext,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`groupId`),
  UNIQUE KEY `unique_group` (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventgroups`
--

LOCK TABLES `eventgroups` WRITE;
/*!40000 ALTER TABLE `eventgroups` DISABLE KEYS */;
INSERT INTO `eventgroups` VALUES ('skj23','Hare Krishna ? ','Sri Krishna Janmashtami & Vyasa Puja 2023');
/*!40000 ALTER TABLE `eventgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` varchar(45) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `formDesc` varchar(45) DEFAULT NULL,
  `groupId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES ('sbj23','Sri Balarama Purnima 2023','SBJ',NULL,NULL),('skj23','Sri Krishna Janmastami 2023','SKJ',NULL,'skj23'),('svp23','Sri Vyasa Puja 2023','SVP',NULL,'skj23');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ftms`
--

DROP TABLE IF EXISTS `ftms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ftms` (
  `username` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ftms`
--

LOCK TABLES `ftms` WRITE;
/*!40000 ALTER TABLE `ftms` DISABLE KEYS */;
INSERT INTO `ftms` VALUES ('agld','Amogha Lila Dasa','9379850565','agld@iskconmysore.org'),('alnd','Alarnath Dasa','6366975627','alnd@iskconmysore.org'),('hrvd','Hiranyavarna Dasa','6364903723','hrvd@iskconmysore.org'),('krkd','Krishna Keshav Dasa','9945284334','krkd@iskconmysore.org'),('ksd','Karunya Sagar Dasa','9880544450','ksd@iskconmysore.org'),('mhpd','Mahapurana Dasa','9611102365','mhpd@iskconmysore.org'),('pkjd','Pankajanghri Dasa','9343078210','pkjd@iskconmysore.org'),('pvpd','Pavan Prana Dasa','6364903722','pvpd@iskconmysore.org'),('rkkd','Rakal Krishna Dasa','8147654556','rkkd@iskconmysore.org'),('skkd','Sanaka Kumar Dasa','6364903726','skkd@iskconmysore.org'),('sks','Stoka Krishna Swami','9789033021','sks@iskconmysore.org'),('smrd','Saumya Rupa Krishna Dasa','9902141099','smrd@iskconmysore.org'),('sukd','Sudhama Krishna Dasa','8147654558','sukd@iskconmysore.org'),('vscd','Vishnu Charan Dasa','6364903721','vscd@iskconmysore.org'),('vvbd','Vishva Bhavana Dasa','6364903724','vvbd@iskconmysore.org');
/*!40000 ALTER TABLE `ftms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicelist`
--

DROP TABLE IF EXISTS `servicelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicelist` (
  `serviceId` varchar(45) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  UNIQUE KEY `unique_service_username` (`serviceId`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicelist`
--

LOCK TABLES `servicelist` WRITE;
/*!40000 ALTER TABLE `servicelist` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicelist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceorganizers`
--

DROP TABLE IF EXISTS `serviceorganizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceorganizers` (
  `serviceId` varchar(45) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  UNIQUE KEY `unique_servicehead` (`serviceId`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceorganizers`
--

LOCK TABLES `serviceorganizers` WRITE;
/*!40000 ALTER TABLE `serviceorganizers` DISABLE KEYS */;
/*!40000 ALTER TABLE `serviceorganizers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `serviceId` varchar(45) NOT NULL,
  `eventId` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `serviceName` varchar(255) DEFAULT NULL,
  `serviceDescription` text,
  `timings` varchar(100) DEFAULT NULL,
  `requirement` int DEFAULT NULL,
  `parent` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`serviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteers`
--

DROP TABLE IF EXISTS `volunteers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteers` (
  `username` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `dob` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `japaRounds` int DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `preacher` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteers`
--

LOCK TABLES `volunteers` WRITE;
/*!40000 ALTER TABLE `volunteers` DISABLE KEYS */;
/*!40000 ALTER TABLE `volunteers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-07 18:11:55
