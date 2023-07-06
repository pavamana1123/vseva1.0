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
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dates`
--

LOCK TABLES `dates` WRITE;
/*!40000 ALTER TABLE `dates` DISABLE KEYS */;
INSERT INTO `dates` VALUES ('SBJ23','2023-08-31','Balarama Purnima','4AM - 7AM, 7AM - 1PM, 1PM - 4PM, 4PM - 10PM'),('SKJ23','2023-09-06','Sri Krishna Janmashtami - Day 1','4AM - 7AM, 7AM - 1PM, 1PM - 4PM, 4PM - 10PM'),('SKJ23','2023-09-07','Sri Krishna Janmashtami - Day 2','4AM - 7AM, 7AM - 1PM, 1PM - 4PM, 4PM - 10PM, 10PM - 12AM'),('SVP23','2023-09-08','Sri Vyasa Puja','4AM - 7AM, 7AM - 1PM, 1PM - 4PM, 4PM - 10PM');
/*!40000 ALTER TABLE `dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `festivalgroups`
--

LOCK TABLES `festivalgroups` WRITE;
/*!40000 ALTER TABLE `festivalgroups` DISABLE KEYS */;
INSERT INTO `festivalgroups` VALUES ('SKJ23','SKJ23Group'),('SVP23','SKJ23Group');
/*!40000 ALTER TABLE `festivalgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `festivals`
--

LOCK TABLES `festivals` WRITE;
/*!40000 ALTER TABLE `festivals` DISABLE KEYS */;
INSERT INTO `festivals` VALUES ('SBJ23','Sri Balarama Purnima 2023','SBJ'),('SKJ23','Sri Krishna Janmastami 2023','SKJ'),('SVP23','Sri Vyasa Puja 2023','SVP');
/*!40000 ALTER TABLE `festivals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ftms`
--

LOCK TABLES `ftms` WRITE;
/*!40000 ALTER TABLE `ftms` DISABLE KEYS */;
INSERT INTO `ftms` VALUES ('agld','Amogha Lila Dasa','9379850565','agld@iskconmysore.org'),('alnd','Alarnath Dasa','6366975627','alnd@iskconmysore.org'),('hrvd','Hiranyavarna Dasa','6364903723','hrvd@iskconmysore.org'),('krkd','Krishna Keshav Dasa','9945284334','krkd@iskconmysore.org'),('ksd','Karunya Sagar Dasa','9880544450','ksd@iskconmysore.org'),('mhpd','Mahapurana Dasa','9611102365','mhpd@iskconmysore.org'),('pkjd','Pankajanghri Dasa','9343078210','pkjd@iskconmysore.org'),('pvpd','Pavan Prana Dasa','6364903722','pvpd@iskconmysore.org'),('rkkd','Rakal Krishna Dasa','8147654556','rkkd@iskconmysore.org'),('skkd','Sanaka Kumar Dasa','6364903726','skkd@iskconmysore.org'),('sks','Stoka Krishna Swami','9789033021','sks@iskconmysore.org'),('smrd','Saumya Rupa Krishna Dasa','9902141099','smrd@iskconmysore.org'),('sukd','Sudhama Krishna Dasa','8147654558','sukd@iskconmysore.org'),('vscd','Vishnu Charan Dasa','6364903721','vscd@iskconmysore.org'),('vvbd','Vishva Bhavana Dasa','6364903724','vvbd@iskconmysore.org');
/*!40000 ALTER TABLE `ftms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `servicegroups`
--

LOCK TABLES `servicegroups` WRITE;
/*!40000 ALTER TABLE `servicegroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicegroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `serviceheads`
--

LOCK TABLES `serviceheads` WRITE;
/*!40000 ALTER TABLE `serviceheads` DISABLE KEYS */;
/*!40000 ALTER TABLE `serviceheads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `servicelist`
--

LOCK TABLES `servicelist` WRITE;
/*!40000 ALTER TABLE `servicelist` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicelist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2023-07-06 19:19:55
