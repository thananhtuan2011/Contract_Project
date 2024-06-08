CREATE DATABASE  IF NOT EXISTS `cashflowmana` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cashflowmana`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: cashflowmana
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `fullname` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `role_deparment` varchar(45) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `accounts_ibfk_1` (`department_id`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'admin','123','thananhtuan1111@gmail.com','777777',1,'2024-02-26 03:57:13',NULL,'Admin  ','all','http://localhost:3000/uploads/icon.png'),(2,'staff','123','thananhtuan23@gmail.com','123231321',3,'2023-11-30 04:14:28',NULL,'Long','',NULL),(3,'test','123','thananhtua23n@gmail.com','111',2,'2024-02-26 03:57:34',NULL,'Tuấn','',NULL),(4,'tuanta','123','than@gmail.com','1321321312',2,'2023-11-24 07:59:48',NULL,'Thân Anh Tuấn','admin',NULL),(7,'cc','123','123','123',3,'2023-11-30 04:57:56',NULL,'cc','admin',NULL),(8,'gg','123','ggggggggggggg','32131444',17,'2024-02-26 04:02:35',NULL,'test','admin',NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id_bill` int NOT NULL AUTO_INCREMENT,
  `type` varchar(500) DEFAULT NULL,
  `Total_amount` bigint DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `Date_bill` datetime DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `id_code` varchar(1000) DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `Img` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_bill`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (21,'Tiền mặt',99999,'2024-03-12 04:15:46',NULL,'2024-04-01 00:00:00',1,'HH sửa ',3,'http://localhost:3000/uploads/undefined');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection_categorys`
--

DROP TABLE IF EXISTS `collection_categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection_categorys` (
  `groupname` varchar(1000) NOT NULL,
  `id_code` varchar(1000) NOT NULL,
  `name_code` varchar(1000) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_categorys`
--

LOCK TABLES `collection_categorys` WRITE;
/*!40000 ALTER TABLE `collection_categorys` DISABLE KEYS */;
INSERT INTO `collection_categorys` VALUES ('','HH sửa ','33 sửa','355 sửa'),('TMDV','THUHD','Bán hàng thu tiền ngay, thu theo tiến độ hợp đồng','Thương mại, dịch vụ, bán hang'),('THUNO','THUNO','Thu từ thu hồi nợ phải thu của khách hàng, đối tác, tạm ứng NV','Thu hồi nợ'),('TMDV','UNGHD','Thu ứng trước hợp đồng bán hàng hóa, TP, dịch vụ','Thương mại, dịch vụ, bán hang');
/*!40000 ALTER TABLE `collection_categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `contract_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `note` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `date_complete` datetime DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `contract_name` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `idtype_suppliers` int DEFAULT NULL,
  `partner_name` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `value_contract` int DEFAULT NULL,
  `account_id_reviewer` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`contract_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (2,1,'2023-12-13 06:26:51',NULL,'cxmax5','2023-12-12 17:00:00',1,'ccc',1,'DPS',1000000,4,NULL),(3,1,'2023-12-13 06:30:15',NULL,'213',NULL,1,'con mẹ nó',2,'DPS',200000,4,NULL),(4,1,'2023-12-13 06:34:07',NULL,'honad','2023-12-13 17:00:00',1,'mua bán xe máy',3,'DPS',400000,4,NULL),(5,1,'2023-12-14 02:22:20',NULL,'mu giá rẻ','2023-12-15 17:00:00',1,'Mua đồ chơi',1,NULL,NULL,4,NULL),(6,1,'2023-12-14 02:26:15',NULL,'chán','2023-12-29 17:00:00',1,'Nghỉ',2,'DPS',5444333,4,NULL),(11,1,'2023-12-14 04:54:25',NULL,'note new excel','2023-12-29 17:00:00',2,'Test 1',2,'Thanh Buoi ',100000,4,NULL),(12,1,'2023-12-18 03:19:13',NULL,'22','2023-12-17 17:00:00',NULL,'vvv',1,'312gg',121,4,NULL),(14,1,'2023-12-18 04:06:26',NULL,'ccc22','2023-12-17 17:00:00',2,'ccc111',1,'ffff',444444444,1,NULL),(15,1,'2023-12-19 04:42:09',NULL,'note new excel','2023-12-25 00:00:00',1,'Test 1',2,'Thanh Buoi',100000,NULL,NULL),(17,1,'2023-12-19 06:04:42',NULL,'test thêm','2023-12-18 17:00:00',2,'thêm hợp đồng',1,'Thị nghẹ',55555,4,12),(18,1,'2023-12-19 06:06:32',NULL,'note new excel','2023-12-25 00:00:00',1,'Test 1',2,'Thanh Buoi',100000,NULL,2),(19,1,'2023-12-27 06:01:57',NULL,'11','2023-12-26 17:00:00',2,'test tuấn tạo',1,'222',455555,4,12);
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customerName` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `idtype_customers` int DEFAULT NULL,
  `id_level` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `idsuppliers` int DEFAULT NULL,
  `account_id_update` int DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (2,'1 sửa lần 23','tttt@gmail.com','032131','hhhhhh',2,2,NULL,'2024-04-10 09:53:27',1,NULL,1),(3,'123 sửa test 111','123@gmail.com','123','123',2,2,NULL,NULL,1,3,NULL),(7,'123','123@gmail.com','123','33333',2,1,NULL,NULL,1,NULL,NULL),(8,'DPS test','dps@gmail.com','32132132131','Nguyễn thế truyện',NULL,2,'2023-12-04 08:59:03','2024-04-10 09:50:09',1,NULL,1),(9,'TTC','ttc@gmail.com','123','123',NULL,NULL,'2023-12-05 03:29:37',NULL,1,1,NULL),(12,'Thị Nghè','thinghe@gmail.com','321','123',1,1,'2023-12-06 02:51:54',NULL,1,1,NULL),(23,'Tuấn test 123 sửa','22222442@gmail.com','4344','434343',1,1,'2024-02-26 04:37:56',NULL,1,NULL,NULL),(24,'Test import excel','11','332131','HCM ',NULL,NULL,'2024-02-26 04:39:56',NULL,1,NULL,NULL),(25,'test customer 2','tt@gmail.com','3213213','HN',NULL,NULL,'2024-02-26 04:39:56',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debt_bills`
--

DROP TABLE IF EXISTS `debt_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debt_bills` (
  `idDebt_bills` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `contract_id` int DEFAULT NULL,
  `date_debt` datetime DEFAULT NULL,
  `Img` varchar(1000) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idDebt_bills`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debt_bills`
--

LOCK TABLES `debt_bills` WRITE;
/*!40000 ALTER TABLE `debt_bills` DISABLE KEYS */;
INSERT INTO `debt_bills` VALUES (1,1,8,6,'2024-04-09 17:00:00','http://localhost:3000/uploads/hihi.jpg',99999911,'2024-01-08 09:16:16',NULL),(3,1,2,3,'2024-02-11 17:00:00','http://localhost:3000/uploads/vnpay.png',5555555,'2024-01-10 01:54:30',NULL);
/*!40000 ALTER TABLE `debt_bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debts`
--

DROP TABLE IF EXISTS `debts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debts` (
  `iddebts` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `contract_id` int DEFAULT NULL,
  `month` varchar(1000) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `pay_month` int DEFAULT NULL,
  `idDebt_bills` int DEFAULT NULL,
  `Debt_pay` int DEFAULT NULL,
  `Debt_amount` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `Note` varchar(1000) DEFAULT NULL,
  `type` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`iddebts`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debts`
--

LOCK TABLES `debts` WRITE;
/*!40000 ALTER TABLE `debts` DISABLE KEYS */;
INSERT INTO `debts` VALUES (1,1,'2024-02-08 17:00:00','2024-02-09 17:00:00',3,3,'3 tháng',200000,100000,1,100000,100000,'2024-01-09 07:06:23',NULL,'test thêm ','Phải thu');
/*!40000 ALTER TABLE `debts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'ceo ',NULL,'2023-11-30 03:11:16'),(2,'Nhân sự sửa',NULL,'2023-11-30 04:50:59'),(3,'Kĩ thuật',NULL,NULL),(11,'cccwww','2023-11-24 05:55:27','2023-11-24 05:55:27'),(14,'kkk dd','2023-11-24 06:00:53','2023-11-24 06:39:42'),(15,'quần què sửa','2023-11-24 06:08:16','2023-11-24 06:36:02'),(17,'Kế toán','2023-11-27 03:30:40',NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `idexpenses` varchar(500) NOT NULL,
  `group_name` varchar(500) DEFAULT NULL,
  `type` varchar(1000) DEFAULT NULL,
  `name_expenses` varchar(1000) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idexpenses`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES ('ccc','','33','22','nite'),('CONGTACPHI ','HOATDONG','Các chi tiêu tối thiểu cho hoạt động ','Các khoản chi hoa hồng, chiết khấu thanh toán ','note'),('DICHUYEN','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Chi các khoản phí, giao dịch hành chính kinh doanh',NULL),('DIENNUOC','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Công tác phí, lưu trú cho BQL, nhân viên',NULL),('DVONLINE','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Chi phí di chuyển, phương tiện cho nhân sự, đối tác',NULL),('GIAOTE','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Chi trả hóa đơn điện nước phục vụ sản xuất kinh doanh',NULL),('HANHCHINH','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Chi các khoản phí, giao dịch hành chính kinh doanh',NULL),('HOATDONG','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Các khoản chi hoa hồng, chiết khấu thanh toán',NULL),('MEDIA','MKT','Các khoản chi tiêu quảng cáo, MKT, xúc tiến bán hàng','Chi cho quảng cáo',NULL),('MUANGOAI','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Chi cho dịch vụ mua ngoài, thuê ngoài khác',NULL),('PHINGANHANG','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Chi sửa chữa, nâng cấp trang thiết bị, máy, phương tiện',NULL),('PM-CONGNGHE','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Thù lao Hội đồng quản trị, chi phí điều hành',NULL),('PRTT','MKT','Các khoản chi tiêu quảng cáo, MKT, xúc tiến bán hàng','Chi các hoạt động truyền thông, PR, sự kiện',NULL),('QUANGCAO','MKT','Các khoản chi tiêu quảng cáo, MKT, xúc tiến bán hàng','Phí Ngân Hàng',NULL),('QUANTRI','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Chi giao tế, khánh tiết, tiếp khách',NULL),('SUACHUA','HOATDONG','Các chi tiêu tối thiểu cho hoạt động','Chi sửa chữa, nâng cấp trang thiết bị, máy, phương tiện',NULL),('VANPP','HOATDONG','Các chi tiêu tối thiểu cho hoạt động',NULL,NULL),('VIENTHONG','HOATDONG','Các chi tiêu tối thiểu cho hoạt động',NULL,NULL),('VS-ANNINH','HOATDONG','Các chi tiêu tối thiểu cho hoạt động',NULL,NULL);
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functions`
--

DROP TABLE IF EXISTS `functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `functions` (
  `func_id` int NOT NULL AUTO_INCREMENT,
  `func_Name` varchar(50) DEFAULT NULL,
  `func_view` varchar(2) DEFAULT NULL,
  `func_add` varchar(2) DEFAULT NULL,
  `func_update` varchar(2) DEFAULT NULL,
  `func_delete` varchar(2) DEFAULT NULL,
  `func_import` varchar(2) DEFAULT NULL,
  `func_export` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`func_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functions`
--

LOCK TABLES `functions` WRITE;
/*!40000 ALTER TABLE `functions` DISABLE KEYS */;
INSERT INTO `functions` VALUES (1,'Admin','1','1','1','1','1','1'),(2,'employ','0','1','1','1','0','0');
/*!40000 ALTER TABLE `functions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `id_level` int NOT NULL AUTO_INCREMENT,
  `name_level` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_level`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,'Mới'),(2,'Thân Thiết');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int unsigned NOT NULL AUTO_INCREMENT,
  `name_menu` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `icon` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `page` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `roles` int DEFAULT NULL,
  PRIMARY KEY (`id_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (2,'Employee Manager',NULL,NULL,'flaticon-users','/EmployeeManager',2),(3,'Customer',NULL,NULL,'flaticon-user-settings','/Customer',3),(4,'Supplier',NULL,NULL,'flaticon-folder-1','/Supplier',4),(5,'Partner Management ',NULL,NULL,'flaticon-layers','/Partner',5),(6,'Cashflow  Management',NULL,NULL,'flaticon-calendar-1','/Planning',6),(7,'Calendar Management',NULL,NULL,'flaticon-calendar-1','/Calender ',7);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_menu` int DEFAULT NULL,
  `name_menu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `partner_id` int NOT NULL AUTO_INCREMENT,
  `partnerName` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`partner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `idexpenses` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `type_pay` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `amount` bigint DEFAULT NULL,
  `Pay_date` datetime DEFAULT NULL,
  `Img` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  `approved_by` int DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `idsuppliers` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `account_id_update` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (8,'DVONLINE','Tiền mặt',444444,'2024-02-26 00:00:00','http://localhost:3000/uploads/icon.png',1,1,1,3,'2024-04-11 04:03:03','2024-02-27 03:39:34',1),(9,'DICHUYEN','Tiền mặt',77777,'2024-03-15 00:00:00','http://localhost:3000/uploads/undefined',0,NULL,4,3,'2024-04-11 04:15:01','2024-03-12 04:20:43',4),(10,'DIENNUOC','Tiền mặt',321321,'2024-03-17 00:00:00','http://localhost:3000/uploads/undefined',2,NULL,1,NULL,NULL,'2024-03-17 06:57:27',NULL),(11,'DICHUYEN','Tiền mặt',111111111111,'2024-03-18 00:00:00','http://localhost:3000/uploads/undefined',0,NULL,1,NULL,NULL,'2024-03-18 02:18:28',NULL),(12,'DIENNUOC','Tiền mặt',55555,'2024-03-08 00:00:00','http://localhost:3000/uploads/undefined',0,NULL,1,NULL,NULL,'2024-03-18 03:17:52',NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_users`
--

DROP TABLE IF EXISTS `permission_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_users` (
  `account_id` int NOT NULL,
  `permiss_group` int DEFAULT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_users`
--

LOCK TABLES `permission_users` WRITE;
/*!40000 ALTER TABLE `permission_users` DISABLE KEYS */;
INSERT INTO `permission_users` VALUES (1,1),(2,2),(3,2),(4,2),(7,2),(8,12);
/*!40000 ALTER TABLE `permission_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `permission_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,1),(2,1),(12,1),(13,1),(14,1),(1,2),(12,2),(13,2),(1,3),(1,4),(1,5),(2,5),(1,6),(2,6),(1,7),(2,7);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisson_group`
--

DROP TABLE IF EXISTS `permisson_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisson_group` (
  `permiss_group` int NOT NULL AUTO_INCREMENT,
  `GroupName` varchar(45) DEFAULT NULL,
  `permission_id` int DEFAULT NULL,
  PRIMARY KEY (`permiss_group`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisson_group`
--

LOCK TABLES `permisson_group` WRITE;
/*!40000 ALTER TABLE `permisson_group` DISABLE KEYS */;
INSERT INTO `permisson_group` VALUES (1,'Amin',1),(2,'User',2),(3,'test group',NULL),(7,'gggsasa',NULL),(8,'8888',8),(12,'Manager',12);
/*!40000 ALTER TABLE `permisson_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personalprofile`
--

DROP TABLE IF EXISTS `personalprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personalprofile` (
  `pp_id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  PRIMARY KEY (`pp_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `personalprofile_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalprofile`
--

LOCK TABLES `personalprofile` WRITE;
/*!40000 ALTER TABLE `personalprofile` DISABLE KEYS */;
INSERT INTO `personalprofile` VALUES (1,'13','13','2023-10-13',1),(3,'13','13','2023-10-12',1);
/*!40000 ALTER TABLE `personalprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_chis`
--

DROP TABLE IF EXISTS `plan_chis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_chis` (
  `idplan_` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `pay` int DEFAULT NULL,
  `pay_date` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `idsuppliers` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `idexpenses` varchar(500) DEFAULT NULL,
  `account_id_update` int DEFAULT NULL,
  PRIMARY KEY (`idplan_`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_chis`
--

LOCK TABLES `plan_chis` WRITE;
/*!40000 ALTER TABLE `plan_chis` DISABLE KEYS */;
INSERT INTO `plan_chis` VALUES (2,1,555577,'2024-07-01 00:00:00','2024-04-11 03:02:49',3,'2024-01-22 07:32:36','DICHUYEN',1),(3,1,666,'2024-01-29 17:00:00',NULL,1,'2024-01-22 07:32:56','DVONLINE',NULL),(4,1,666,'2024-01-25 17:00:00',NULL,7,'2024-01-22 07:33:06','DIENNUOC',NULL),(5,1,6662,'2024-01-21 00:00:00','2024-04-11 03:06:10',3,'2024-01-22 07:33:25','DICHUYEN',1),(6,1,666222,'2024-01-22 17:00:00',NULL,8,'2024-01-22 07:33:39','HANHCHINH',NULL),(7,1,666222,'2024-01-24 17:00:00',NULL,9,'2024-01-22 07:33:48','DVONLINE',NULL),(8,1,666222,'2024-01-24 17:00:00',NULL,19,'2024-01-22 07:33:57','PHINGANHANG',NULL),(9,1,666222,'2024-01-24 17:00:00',NULL,12,'2024-01-22 07:34:07','GIAOTE',NULL),(12,1,2222,'2024-02-25 00:00:00','2024-04-11 03:12:09',5,'2024-02-27 02:58:51','CONGTACPHI ',1),(13,1,5555555,'2024-04-10 00:00:00',NULL,3,'2024-04-10 10:13:02','CONGTACPHI ',NULL);
/*!40000 ALTER TABLE `plan_chis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_thus`
--

DROP TABLE IF EXISTS `plan_thus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_thus` (
  `idplan_` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `pay` bigint DEFAULT NULL,
  `pay_date` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `id_code` varchar(500) DEFAULT NULL,
  `account_id_update` int DEFAULT NULL,
  PRIMARY KEY (`idplan_`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_thus`
--

LOCK TABLES `plan_thus` WRITE;
/*!40000 ALTER TABLE `plan_thus` DISABLE KEYS */;
INSERT INTO `plan_thus` VALUES (5,1,1600000,'2024-07-01 00:00:00','2024-04-11 02:42:36',8,'2024-01-23 08:25:55','THUHD',1),(6,1,777777,'2024-08-17 17:00:00',NULL,9,'2024-01-24 04:41:05','HH',NULL),(7,1,100000,'2030-02-27 17:00:00',NULL,9,'2024-02-01 03:47:26','THUHD',NULL),(8,1,34324,'2024-02-12 17:00:00',NULL,3,'2024-02-13 09:23:39','THUHD',NULL),(9,1,444444,'2024-04-01 00:00:00',NULL,7,'2024-03-12 04:06:09','HH sửa ',NULL),(10,1,4444443,'2024-04-10 00:00:00',NULL,7,'2024-04-10 10:11:14','THUHD',NULL);
/*!40000 ALTER TABLE `plan_thus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `idPlan` int NOT NULL AUTO_INCREMENT,
  `reason` varchar(500) DEFAULT NULL,
  `type` varchar(500) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `type_pay` varchar(100) DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `contract_id` int DEFAULT NULL,
  PRIMARY KEY (`idPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (1,'test thêm ','Phiếu thu','2024-01-03','2024-01-07','Tiền mặt',2,1,NULL,'2024-01-04 07:57:29',5),(2,'dự án mua nhà','Phiếu chi','2023-12-31','2024-01-30','Chuyển khoản',2,1,NULL,'2024-01-04 08:49:26',4);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `reportDate` datetime DEFAULT NULL,
  `content` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,1,'2023-10-19 12:30:00','1231');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `requestDate` datetime DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `des` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `sta` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,2,'2023-10-18 12:30:00',23.00,'23','23'),(2,1,'2023-10-19 12:30:00',1.00,'1','1');
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(1005) DEFAULT NULL,
  `description` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,' Dashboard',' Dashboard'),(2,'Employee manager','Employee manager'),(3,'Customer','Customer'),(4,'Supplier','Supplier'),(5,'Partner Management ','Partner Management '),(6,'Planning Management','Planning Management'),(7,'Calendar ','Calendar ');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Đã hoàn thành'),(2,'Chưa hoàn thành');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_menu`
--

DROP TABLE IF EXISTS `sub_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_menu` (
  `idsub_menu` int unsigned NOT NULL AUTO_INCREMENT,
  `name_submenu` varchar(500) DEFAULT NULL,
  `id_menu` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `page` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idsub_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_menu`
--

LOCK TABLES `sub_menu` WRITE;
/*!40000 ALTER TABLE `sub_menu` DISABLE KEYS */;
INSERT INTO `sub_menu` VALUES (1,'Debts receivable and payable',1,NULL,NULL,'dashboard/beb'),(2,'Cash flow Plan, reality',1,NULL,NULL,'dashboard/cash'),(3,'The list of Employee',2,NULL,NULL,'EmployeeManager/dsnhanvien'),(4,'Decentralization',2,NULL,NULL,'EmployeeManager/phanquyen'),(5,'Department',2,NULL,NULL,'EmployeeManager/phongban'),(7,'Customer List',3,NULL,NULL,'Customer/list'),(8,'Supplier',4,NULL,NULL,'Supplier/list'),(10,'Partner',5,NULL,NULL,'Partner/listPartner'),(14,'Revenue & Expenditure ',6,NULL,NULL,'Planning/RE'),(15,'Revenue & Expenditure Plan ',6,NULL,NULL,'Planning/plan'),(16,'CalenderPlan',7,NULL,NULL,'Calender/plan'),(17,'CalenderReality',7,NULL,NULL,'Calender/reality'),(19,'Debts payable and receivable',8,NULL,NULL,NULL),(20,'Norms and policies',9,NULL,NULL,NULL),(21,'Category Revenue / Expenditure',9,NULL,NULL,NULL),(22,'Make regular payments',10,NULL,NULL,NULL),(23,'Compare actual and planned ',10,NULL,NULL,NULL),(24,'Debts payable and receivable',10,NULL,NULL,NULL),(25,'PL - business activities',10,NULL,NULL,NULL),(27,'Revenue list',6,NULL,NULL,'Planning/Collection'),(28,'Expense list',6,NULL,NULL,'Planning/Expense');
/*!40000 ALTER TABLE `sub_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_menus`
--

DROP TABLE IF EXISTS `sub_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idsub_menu` int DEFAULT NULL,
  `name_submenu` varchar(255) DEFAULT NULL,
  `id_menu` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_menu` (`id_menu`),
  CONSTRAINT `sub_menus_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menus` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_menus`
--

LOCK TABLES `sub_menus` WRITE;
/*!40000 ALTER TABLE `sub_menus` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `idsuppliers` int NOT NULL AUTO_INCREMENT,
  `supplieName` varchar(100) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `idtype_suppliers` int DEFAULT NULL,
  `id_level` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `account_id_update` int DEFAULT NULL,
  PRIMARY KEY (`idsuppliers`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Đại học thanh hoa ','thanhhoa@gmail.com','0962934127','Thanh hoanh ',1,NULL,NULL,'2023-12-04 10:23:06','2024-04-10 09:31:45',1),(3,'TNHH  đại lý 1','thtt@gmail.com','965372321','HCM',1,NULL,NULL,'2023-12-05 03:10:13',NULL,NULL),(4,'Hòa bình sss','hb@gmail.com','312','321',1,1,2,'2023-12-06 03:23:32',NULL,NULL),(5,'hhgg','222@gmail.com','2337777','333s ửa',1,NULL,1,'2024-02-26 04:12:24',NULL,NULL),(7,'test 12','vvv@gmail.com','09321','fff',1,NULL,1,'2024-04-10 04:46:18',NULL,NULL);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_customers`
--

DROP TABLE IF EXISTS `type_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_customers` (
  `idtype_customers` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idtype_customers`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_customers`
--

LOCK TABLES `type_customers` WRITE;
/*!40000 ALTER TABLE `type_customers` DISABLE KEYS */;
INSERT INTO `type_customers` VALUES (1,'Công Ty'),(2,'Cá Nhân');
/*!40000 ALTER TABLE `type_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_suppliers`
--

DROP TABLE IF EXISTS `type_suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_suppliers` (
  `idtype_suppliers` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idtype_suppliers`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_suppliers`
--

LOCK TABLES `type_suppliers` WRITE;
/*!40000 ALTER TABLE `type_suppliers` DISABLE KEYS */;
INSERT INTO `type_suppliers` VALUES (1,'Nhà cung cấp',NULL,NULL,NULL),(2,'Đại lý',NULL,NULL,NULL),(3,'Khách hàng',NULL,NULL,NULL),(7,'csaa ',1,'2023-12-19 08:05:16',NULL);
/*!40000 ALTER TABLE `type_suppliers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-11 11:51:19
