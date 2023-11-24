-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dbcerty
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `certificado`
--

DROP TABLE IF EXISTS `certificado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_certificado` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `codigo` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `creditos` int NOT NULL,
  `horas` int NOT NULL,
  `lugar` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_creacion` date NOT NULL,
  `nivel_academico_id` int NOT NULL,
  `documento_id` int NOT NULL,
  `estudiante_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `certificado_FK` (`documento_id`),
  KEY `certificado_FK_1` (`nivel_academico_id`),
  KEY `certificado_FK_2` (`estudiante_id`),
  CONSTRAINT `certificado_FK` FOREIGN KEY (`documento_id`) REFERENCES `documento` (`id`),
  CONSTRAINT `certificado_FK_1` FOREIGN KEY (`nivel_academico_id`) REFERENCES `nivel_academico` (`id`),
  CONSTRAINT `certificado_FK_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificado`
--

LOCK TABLES `certificado` WRITE;
/*!40000 ALTER TABLE `certificado` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documento`
--

DROP TABLE IF EXISTS `documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url_doc` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` char(1) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento`
--

LOCK TABLES `documento` WRITE;
/*!40000 ALTER TABLE `documento` DISABLE KEYS */;
INSERT INTO `documento` VALUES (2,'https://example.com/documento.pdf','1'),(3,'https://example.com/documento.pdf','1'),(4,'https://example.com/documento.pdf','1'),(5,'https://example.com/documento.pdf','1'),(6,'https://example.com/documento.pdf','1'),(21,'https://example.com/documento.pdf','1'),(23,'https://example.com/documento.pdf','1'),(24,'https://example.com/documento.pdf','1'),(27,'https://example.com/documento.pdf','1'),(29,'https://example.com/documento.pdf','1'),(30,'https://example.com/documento.pdf','1'),(32,'https://example.com/documento.pdf','1'),(33,'https://example.com/documento.pdf','1'),(35,'https://example.com/documento.pdf','1'),(37,'https://example.com/documento.pdf','1'),(38,'https://example.com/documento.pdf','1'),(39,'https://example.com/documento.pdf','1'),(41,'https://example.com/documento.pdf','1'),(42,'https://example.com/documento.pdf','1'),(44,'https://example.com/documento.pdf','1'),(45,'https://example.com/documento.pdf','1'),(46,'https://example.com/documento.pdf','1'),(48,'https://example.com/documento.pdf','1'),(50,'https://example.com/documento.pdf','1'),(52,'https://example.com/documento.pdf','1'),(53,'https://example.com/documento.pdf','1'),(54,'https://example.com/documento.pdf','1'),(56,'https://example.com/documento.pdf','1'),(58,'https://example.com/documento.pdf','1'),(59,'https://example.com/documento.pdf','1'),(60,'https://example.com/documento.pdf','1'),(61,'https://example.com/documento.pdf','1');
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documento_copia`
--

DROP TABLE IF EXISTS `documento_copia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documento_copia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url_doc` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` char(1) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo` char(1) COLLATE utf8mb4_spanish_ci NOT NULL,
  `documento_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `documento_copia_FK` (`documento_id`),
  CONSTRAINT `documento_copia_FK` FOREIGN KEY (`documento_id`) REFERENCES `documento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento_copia`
--

LOCK TABLES `documento_copia` WRITE;
/*!40000 ALTER TABLE `documento_copia` DISABLE KEYS */;
INSERT INTO `documento_copia` VALUES (1,'https://example-update.com/documento_copia.pdf','B','S',2),(2,'https://example-update.com/documento_copia.pdf','B','S',2),(3,'https://example-update.com/documento_copia.pdf','B','S',2),(4,'https://example-update.com/documento_copia.pdf','B','S',2),(5,'https://example-update.com/documento_copia.pdf','B','S',2),(6,'https://example-update.com/documento_copia.pdf','B','S',2),(7,'https://example-update.com/documento_copia.pdf','B','S',2),(8,'https://example-update.com/documento_copia.pdf','B','S',2),(9,'https://example-update.com/documento_copia.pdf','B','S',2),(10,'https://example-update.com/documento_copia.pdf','B','S',2),(11,'https://example-update.com/documento_copia.pdf','B','S',2);
/*!40000 ALTER TABLE `documento_copia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `foto` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL,
  `dni` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `codigo_universitario` char(9) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `estudiante_FK` (`usuario_id`),
  CONSTRAINT `estudiante_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante`
--

LOCK TABLES `estudiante` WRITE;
/*!40000 ALTER TABLE `estudiante` DISABLE KEYS */;
INSERT INTO `estudiante` VALUES (9,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',52),(11,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',55),(12,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',56),(14,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',60),(17,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',64),(19,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',65),(20,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',70),(22,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',73),(25,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',78),(26,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',81),(28,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',86),(30,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',91),(32,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',95),(34,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',99),(36,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',102),(38,'Nombres del Estudiante','Apellidos del Estudiante','https://example.com/foto.jpg','74701343','202012379','2000-01-01',106);
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ins`
--

DROP TABLE IF EXISTS `ins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `codigo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `url_logo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `responsable` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `sector` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ins`
--

LOCK TABLES `ins` WRITE;
/*!40000 ALTER TABLE `ins` DISABLE KEYS */;
/*!40000 ALTER TABLE `ins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mfuc`
--

DROP TABLE IF EXISTS `mfuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mfuc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modulo_formativo_id` int NOT NULL,
  `unidad_competencia_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mfuc_FK` (`modulo_formativo_id`),
  KEY `mfuc_FK_1` (`unidad_competencia_id`),
  CONSTRAINT `mfuc_FK` FOREIGN KEY (`modulo_formativo_id`) REFERENCES `modulo_formativo` (`id`),
  CONSTRAINT `mfuc_FK_1` FOREIGN KEY (`unidad_competencia_id`) REFERENCES `unidad_competencia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mfuc`
--

LOCK TABLES `mfuc` WRITE;
/*!40000 ALTER TABLE `mfuc` DISABLE KEYS */;
/*!40000 ALTER TABLE `mfuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo_formativo`
--

DROP TABLE IF EXISTS `modulo_formativo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulo_formativo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo_formativo`
--

LOCK TABLES `modulo_formativo` WRITE;
/*!40000 ALTER TABLE `modulo_formativo` DISABLE KEYS */;
/*!40000 ALTER TABLE `modulo_formativo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivel_academico`
--

DROP TABLE IF EXISTS `nivel_academico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivel_academico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nivel` char(1) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo` char(1) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivel_academico`
--

LOCK TABLES `nivel_academico` WRITE;
/*!40000 ALTER TABLE `nivel_academico` DISABLE KEYS */;
INSERT INTO `nivel_academico` VALUES (1,'1','0'),(2,'2','1'),(3,'1','0'),(4,'2','1'),(6,'2','1'),(8,'2','1'),(10,'2','1'),(12,'2','1'),(14,'2','1'),(16,'2','1'),(17,'2','1'),(20,'2','1'),(22,'2','1'),(24,'2','1'),(26,'2','1'),(27,'2','1');
/*!40000 ALTER TABLE `nivel_academico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pee`
--

DROP TABLE IF EXISTS `pee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estudiante_id` int NOT NULL,
  `plan_estudio_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plan_estudio_estudiante_FK` (`estudiante_id`),
  KEY `plan_estudio_estudiante_FK_1` (`plan_estudio_id`),
  CONSTRAINT `plan_estudio_estudiante_FK` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiante` (`id`),
  CONSTRAINT `plan_estudio_estudiante_FK_1` FOREIGN KEY (`plan_estudio_id`) REFERENCES `plan_estudio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pee`
--

LOCK TABLES `pee` WRITE;
/*!40000 ALTER TABLE `pee` DISABLE KEYS */;
/*!40000 ALTER TABLE `pee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pemf`
--

DROP TABLE IF EXISTS `pemf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pemf` (
  `id` int NOT NULL AUTO_INCREMENT,
  `programa_estudio_id` int NOT NULL,
  `modulo_formativo_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pemf_FK` (`programa_estudio_id`),
  KEY `pemf_FK_1` (`modulo_formativo_id`),
  CONSTRAINT `pemf_FK` FOREIGN KEY (`programa_estudio_id`) REFERENCES `programa_estudio` (`id`),
  CONSTRAINT `pemf_FK_1` FOREIGN KEY (`modulo_formativo_id`) REFERENCES `modulo_formativo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pemf`
--

LOCK TABLES `pemf` WRITE;
/*!40000 ALTER TABLE `pemf` DISABLE KEYS */;
/*!40000 ALTER TABLE `pemf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pepe`
--

DROP TABLE IF EXISTS `pepe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pepe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_estudio_id` int NOT NULL,
  `programa_estudio_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pepe_FK` (`plan_estudio_id`),
  KEY `pepe_FK_1` (`programa_estudio_id`),
  CONSTRAINT `pepe_FK` FOREIGN KEY (`plan_estudio_id`) REFERENCES `plan_estudio` (`id`),
  CONSTRAINT `pepe_FK_1` FOREIGN KEY (`programa_estudio_id`) REFERENCES `programa_estudio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pepe`
--

LOCK TABLES `pepe` WRITE;
/*!40000 ALTER TABLE `pepe` DISABLE KEYS */;
/*!40000 ALTER TABLE `pepe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo`
--

DROP TABLE IF EXISTS `periodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `horas` int NOT NULL,
  `creditos` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_estudio`
--

DROP TABLE IF EXISTS `plan_estudio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_estudio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_estudio`
--

LOCK TABLES `plan_estudio` WRITE;
/*!40000 ALTER TABLE `plan_estudio` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan_estudio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pr`
--

DROP TABLE IF EXISTS `pr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privilegio_id` int NOT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `privilegio_rol_FK` (`privilegio_id`),
  KEY `privilegio_rol_FK_1` (`rol_id`),
  CONSTRAINT `privilegio_rol_FK` FOREIGN KEY (`privilegio_id`) REFERENCES `privilegio` (`id`),
  CONSTRAINT `privilegio_rol_FK_1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pr`
--

LOCK TABLES `pr` WRITE;
/*!40000 ALTER TABLE `pr` DISABLE KEYS */;
/*!40000 ALTER TABLE `pr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegio`
--

DROP TABLE IF EXISTS `privilegio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilegio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` char(1) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegio`
--

LOCK TABLES `privilegio` WRITE;
/*!40000 ALTER TABLE `privilegio` DISABLE KEYS */;
INSERT INTO `privilegio` VALUES (2,'Admin','A'),(4,'Admin','A'),(6,'Admin','A'),(8,'Admin','A'),(10,'Admin','A'),(12,'Admin','A'),(14,'Admin','A');
/*!40000 ALTER TABLE `privilegio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programa_estudio`
--

DROP TABLE IF EXISTS `programa_estudio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programa_estudio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programa_estudio`
--

LOCK TABLES `programa_estudio` WRITE;
/*!40000 ALTER TABLE `programa_estudio` DISABLE KEYS */;
/*!40000 ALTER TABLE `programa_estudio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` char(1) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (2,'Admin','A'),(3,'Admin','A'),(4,'Admin','A'),(6,'Admin','A'),(8,'Admin','A'),(9,'Admin','A'),(11,'Admin','A'),(12,'Admin','A'),(13,'Admin','A'),(14,'Admin','A'),(17,'Admin','A'),(18,'Admin','A'),(19,'Admin','A'),(21,'Admin','A'),(23,'Admin','A'),(24,'Admin','A'),(25,'Admin','A'),(27,'Admin','A'),(28,'Admin','A'),(29,'Admin','A'),(31,'Admin','A'),(32,'Admin','A');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ru`
--

DROP TABLE IF EXISTS `ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ru` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rol_usuario_FK` (`rol_id`),
  KEY `rol_usuario_FK_1` (`usuario_id`),
  CONSTRAINT `rol_usuario_FK` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`),
  CONSTRAINT `rol_usuario_FK_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ru`
--

LOCK TABLES `ru` WRITE;
/*!40000 ALTER TABLE `ru` DISABLE KEYS */;
/*!40000 ALTER TABLE `ru` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ucud`
--

DROP TABLE IF EXISTS `ucud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ucud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unidad_competencia_id` int NOT NULL,
  `unidad_didactica_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ucud_FK` (`unidad_competencia_id`),
  KEY `ucud_FK_1` (`unidad_didactica_id`),
  CONSTRAINT `ucud_FK` FOREIGN KEY (`unidad_competencia_id`) REFERENCES `unidad_competencia` (`id`),
  CONSTRAINT `ucud_FK_1` FOREIGN KEY (`unidad_didactica_id`) REFERENCES `unidad_didactica` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ucud`
--

LOCK TABLES `ucud` WRITE;
/*!40000 ALTER TABLE `ucud` DISABLE KEYS */;
/*!40000 ALTER TABLE `ucud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `udp`
--

DROP TABLE IF EXISTS `udp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `udp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unidad_didactica_id` int NOT NULL,
  `periodo_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `udp_FK` (`unidad_didactica_id`),
  KEY `udp_FK_1` (`periodo_id`),
  CONSTRAINT `udp_FK` FOREIGN KEY (`unidad_didactica_id`) REFERENCES `unidad_didactica` (`id`),
  CONSTRAINT `udp_FK_1` FOREIGN KEY (`periodo_id`) REFERENCES `periodo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `udp`
--

LOCK TABLES `udp` WRITE;
/*!40000 ALTER TABLE `udp` DISABLE KEYS */;
/*!40000 ALTER TABLE `udp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad_competencia`
--

DROP TABLE IF EXISTS `unidad_competencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad_competencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad_competencia`
--

LOCK TABLES `unidad_competencia` WRITE;
/*!40000 ALTER TABLE `unidad_competencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidad_competencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad_didactica`
--

DROP TABLE IF EXISTS `unidad_didactica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad_didactica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad_didactica`
--

LOCK TABLES `unidad_didactica` WRITE;
/*!40000 ALTER TABLE `unidad_didactica` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidad_didactica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'Nombre del Usuario 2','correo@example.com','contraseña','0'),(3,'Usuario Actualizado','prueba@example.com','password','0'),(5,'Usuario de prueba','prueba@example.com','password','0'),(6,'Usuario de prueba','prueba@example.com','password','0'),(7,'Usuario de prueba','prueba@example.com','password','0'),(9,'Usuario de prueba','prueba@example.com','password','0'),(11,'Usuario de prueba','prueba@example.com','password','0'),(12,'Usuario de prueba','prueba@example.com','password','0'),(13,'Usuario de prueba','prueba@example.com','password','0'),(15,'Usuario de prueba','prueba@example.com','password','0'),(16,'Usuario de prueba','prueba@example.com','password','0'),(17,'Usuario de prueba','prueba@example.com','password','0'),(18,'Usuario de prueba','prueba@example.com','password','0'),(19,'Usuario de prueba','prueba@example.com','password','0'),(20,'Usuario de prueba','prueba@example.com','password','0'),(21,'Usuario de prueba','prueba@example.com','password','0'),(22,'Usuario de prueba','prueba@example.com','password','0'),(23,'Usuario de prueba','prueba@example.com','password','0'),(24,'Usuario de prueba','prueba@example.com','password','0'),(25,'Usuario de prueba','prueba@example.com','password','0'),(26,'Usuario de prueba','prueba@example.com','password','0'),(27,'Usuario de prueba','prueba@example.com','password','0'),(28,'Usuario de prueba','prueba@example.com','password','0'),(29,'Usuario de prueba','prueba@example.com','password','0'),(30,'Usuario de prueba','prueba@example.com','password','0'),(31,'Usuario de prueba','prueba@example.com','password','0'),(32,'Usuario de prueba','prueba@example.com','password','0'),(47,'Usuario de prueba','prueba@example.com','password','0'),(49,'Usuario de prueba','prueba@example.com','password','0'),(50,'Usuario de prueba','prueba@example.com','password','0'),(52,'Usuario de prueba','prueba@example.com','password','0'),(53,'Usuario de prueba','prueba@example.com','password','0'),(55,'Usuario de prueba','prueba@example.com','password','0'),(56,'Usuario de prueba','prueba@example.com','password','0'),(57,'Usuario de prueba','prueba@example.com','password','0'),(60,'Usuario de prueba','prueba@example.com','password','0'),(61,'Usuario de prueba','prueba@example.com','password','0'),(62,'Usuario de prueba','prueba@example.com','password','0'),(64,'Usuario de prueba','prueba@example.com','password','0'),(65,'Usuario de prueba','prueba@example.com','password','0'),(67,'Usuario de prueba','prueba@example.com','password','0'),(68,'Usuario de prueba','prueba@example.com','password','0'),(69,'Usuario de prueba','prueba@example.com','password','0'),(70,'Usuario de prueba','prueba@example.com','password','0'),(72,'Usuario de prueba','prueba@example.com','password','0'),(73,'Usuario de prueba','prueba@example.com','password','0'),(75,'Usuario de prueba','prueba@example.com','password','0'),(76,'Usuario de prueba','prueba@example.com','password','0'),(77,'Usuario de prueba','prueba@example.com','password','0'),(78,'Usuario de prueba','prueba@example.com','password','0'),(80,'Usuario de prueba','prueba@example.com','password','0'),(81,'Usuario de prueba','prueba@example.com','password','0'),(82,'Usuario de prueba','prueba@example.com','password','0'),(84,'Usuario de prueba','prueba@example.com','password','0'),(85,'Saul Ytucayasi','saul@gmail.com','12345','1'),(86,'Usuario de prueba','prueba@example.com','password','0'),(88,'Usuario de prueba','prueba@example.com','password','0'),(89,'Usuario de prueba','prueba@example.com','password','0'),(91,'Usuario de prueba','prueba@example.com','password','0'),(92,'Usuario de prueba','prueba@example.com','password','0'),(93,'Usuario de prueba','prueba@example.com','password','0'),(94,'Usuario de prueba','prueba@example.com','password','0'),(95,'Usuario de prueba','prueba@example.com','password','0'),(97,'Usuario de prueba','prueba@example.com','password','0'),(99,'Usuario de prueba','prueba@example.com','password','0'),(100,'Usuario de prueba','prueba@example.com','password','0'),(101,'Usuario de prueba','prueba@example.com','password','0'),(102,'Usuario de prueba','prueba@example.com','password','0'),(103,'Usuario de prueba','prueba@example.com','password','0'),(104,'Usuario de prueba','prueba@example.com','password','0'),(106,'Usuario de prueba','prueba@example.com','password','0'),(107,'Usuario de prueba','prueba@example.com','password','0'),(108,'Usuario de prueba','prueba@example.com','password','0');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dbcerty'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-24 10:09:54
