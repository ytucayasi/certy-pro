CREATE SCHEMA `dbcerty` ;
use dbcerty;
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
INSERT INTO privilegio (`id`, `nombre`, `estado`) VALUES ('1', 'Administrador', '1');
INSERT INTO privilegio (`id`, `nombre`, `estado`) VALUES ('2', 'Moderador', '1');
/*!40000 ALTER TABLE `privilegio` ENABLE KEYS */;
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
INSERT INTO rol (`id`, `nombre`, `estado`) VALUES ('1', 'Admin', '1');
INSERT INTO rol (`id`, `nombre`, `estado`) VALUES ('2', 'Secretaria', '1');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
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
INSERT INTO pr (`id`, `privilegio_id`, `rol_id`) VALUES ('1', '1', '1');
INSERT INTO pr (`id`, `privilegio_id`, `rol_id`) VALUES ('2', '2', '2');
/*!40000 ALTER TABLE `pr` ENABLE KEYS */;
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
  `correo` varchar(254) COLLATE utf8mb4_spanish_ci NOT NULL,
  `clave` varchar(254) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO usuario (`id`, `nombre`, `correo`, `clave`, `estado`) VALUES ('1', 'jhobany.ticona', 'jhobany.ticona@gmail.com', 'pruebas123', '1');
INSERT INTO usuario (`id`, `nombre`, `correo`, `clave`, `estado`) VALUES ('2', 'Yeni.Elina', 'Yeni.Elina@gmail.com', 'pruebas123', '1');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
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
INSERT INTO ru (`id`, `rol_id`, `usuario_id`) VALUES ('1', '1', '1');
INSERT INTO ru (`id`, `rol_id`, `usuario_id`) VALUES ('2', '2', '2');
/*!40000 ALTER TABLE `ru` ENABLE KEYS */;
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
INSERT INTO estudiante (`id`, `nombres`, `apellidos`, `foto`, `dni`, `codigo_universitario`, `fecha_nacimiento`, `usuario_id`) VALUES ('1', 'Jhobany', 'Ticona Gonzalo', 'https://example.com/fotojhobany.jpg', '83332234', '202012384', '2000-07-20', '1');
INSERT INTO estudiante (`id`, `nombres`, `apellidos`, `foto`, `dni`, `codigo_universitario`, `fecha_nacimiento`, `usuario_id`) VALUES ('2', 'Elina', 'Calla Linarez', 'https://example.com/fotoElina.jpg', '32344545', '202013454', '2000-08-17', '2');
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;
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
INSERT INTO documento (`id`, `url_doc`, `estado`) VALUES ('1', 'https://firebase/documentos/documentoperfil1.pdf', '1');
INSERT INTO documento (`id`, `url_doc`, `estado`) VALUES ('2', 'https://firebase/documentos/bachillerperfil2.pdf', '1');
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;
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
INSERT INTO nivel_academico (`id`, `nivel`, `tipo`) VALUES ('1', '2', '2');
INSERT INTO nivel_academico (`id`, `nivel`, `tipo`) VALUES ('2', '1', '1');
/*!40000 ALTER TABLE `nivel_academico` ENABLE KEYS */;
UNLOCK TABLES;


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
INSERT INTO certificado (`id`, `nombre_certificado`, `estado`, `codigo`, `tipo`, `creditos`, `horas`, `lugar`, `fecha_creacion`, `nivel_academico_id`, `documento_id`, `estudiante_id`) VALUES ('1', 'Perfil', '1', 'PE23-45', '1', '120', '1700', 'Ciudad Universitaria', '2023-07-15', '1', '1', '1');
INSERT INTO certificado (`id`, `nombre_certificado`, `estado`, `codigo`, `tipo`, `creditos`, `horas`, `lugar`, `fecha_creacion`, `nivel_academico_id`, `documento_id`, `estudiante_id`) VALUES ('2', 'Bachiller', '0', 'PE45-34', '1', '110', '1600', 'Online', '2022-11-30', '2', '2', '2');
/*!40000 ALTER TABLE `certificado` ENABLE KEYS */;
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
INSERT INTO documento_copia (`id`, `url_doc`, `estado`, `tipo`, `documento_id`) VALUES ('1', 'https://certificadonacional.com/documento1.pdf', '1', '2', '1');
INSERT INTO documento_copia (`id`, `url_doc`, `estado`, `tipo`, `documento_id`) VALUES ('2', 'https://duplicado.modulo/documento2.pdf', '1', '1', '2');
/*!40000 ALTER TABLE `documento_copia` ENABLE KEYS */;
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
INSERT INTO plan_estudio (`id`, `nombre`) VALUES ('1', 'Plan de Estudios de Ingeniería en Informática');
INSERT INTO plan_estudio (`id`, `nombre`) VALUES ('2', 'Plan de Estudios de Administración de Empresas');
/*!40000 ALTER TABLE `plan_estudio` ENABLE KEYS */;
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
INSERT INTO pee (`id`, `estudiante_id`, `plan_estudio_id`) VALUES ('1', '1', '1');
INSERT INTO pee (`id`, `estudiante_id`, `plan_estudio_id`) VALUES ('2', '2', '2');
/*!40000 ALTER TABLE `pee` ENABLE KEYS */;
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
INSERT INTO programa_estudio (`id`, `nombre`) VALUES ('1', 'Programa de Estudios de Idiomas Extranjeros');
INSERT INTO programa_estudio (`id`, `nombre`) VALUES ('2', 'Programa de Estudios de Marketing Digital');
/*!40000 ALTER TABLE `programa_estudio` ENABLE KEYS */;
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
INSERT INTO pepe (`id`, `plan_estudio_id`, `programa_estudio_id`) VALUES ('1', '1', '1');
INSERT INTO pepe (`id`, `plan_estudio_id`, `programa_estudio_id`) VALUES ('2', '2', '2');
/*!40000 ALTER TABLE `pepe` ENABLE KEYS */;
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
INSERT INTO modulo_formativo (`id`, `nombre`) VALUES ('1', 'Módulo Formativo de Programación Orientada a Objetos');
INSERT INTO modulo_formativo (`id`, `nombre`) VALUES ('2', 'Módulo Formativo de Diseño Gráfico Digital');
/*!40000 ALTER TABLE `modulo_formativo` ENABLE KEYS */;
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
INSERT INTO pemf (`id`, `programa_estudio_id`, `modulo_formativo_id`) VALUES ('1', '1', '1');
INSERT INTO pemf (`id`, `programa_estudio_id`, `modulo_formativo_id`) VALUES ('2', '2', '2');
/*!40000 ALTER TABLE `pemf` ENABLE KEYS */;
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
INSERT INTO unidad_competencia (`id`, `nombre`) VALUES ('1', 'Desarrollo de Aplicaciones Web Interactivas');
INSERT INTO unidad_competencia (`id`, `nombre`) VALUES ('2', 'Gestión Efectiva de Equipos de Trabajo');
/*!40000 ALTER TABLE `unidad_competencia` ENABLE KEYS */;
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
INSERT INTO mfuc (`id`, `modulo_formativo_id`, `unidad_competencia_id`) VALUES ('1', '1', '1');
INSERT INTO mfuc (`id`, `modulo_formativo_id`, `unidad_competencia_id`) VALUES ('2', '2', '2');
/*!40000 ALTER TABLE `mfuc` ENABLE KEYS */;
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
INSERT INTO unidad_didactica (`id`, `nombre`) VALUES ('1', 'Programación Básica en Python');
INSERT INTO unidad_didactica (`id`, `nombre`) VALUES ('2', 'Desarrollo de la Escritura Creativa');
/*!40000 ALTER TABLE `unidad_didactica` ENABLE KEYS */;
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
INSERT INTO ucud (`id`, `unidad_competencia_id`, `unidad_didactica_id`) VALUES ('1', '1', '1');
INSERT INTO ucud (`id`, `unidad_competencia_id`, `unidad_didactica_id`) VALUES ('2', '2', '2');
/*!40000 ALTER TABLE `ucud` ENABLE KEYS */;
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
INSERT INTO periodo (`id`, `nombre`, `horas`, `creditos`) VALUES ('1', 'Verano 2023', '190', '16');
INSERT INTO periodo (`id`, `nombre`, `horas`, `creditos`) VALUES ('2', 'Primavera 2024', '205', '20');
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
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
INSERT INTO udp (`id`, `unidad_didactica_id`, `periodo_id`) VALUES ('1', '1', '1');
INSERT INTO udp (`id`, `unidad_didactica_id`, `periodo_id`) VALUES ('2', '2', '2');
/*!40000 ALTER TABLE `udp` ENABLE KEYS */;
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