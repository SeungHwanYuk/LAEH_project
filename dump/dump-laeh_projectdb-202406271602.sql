-- MariaDB dump 10.19  Distrib 10.11.7-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: laeh_projectdb
-- ------------------------------------------------------
-- Server version	10.11.7-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Sequence structure for `메모장_seq`
--

DROP SEQUENCE IF EXISTS `메모장_seq`;
CREATE SEQUENCE `메모장_seq` start with 1 minvalue 1 maxvalue 9223372036854775806 increment by 50 nocache nocycle ENGINE=InnoDB;
SELECT SETVAL(`메모장_seq`, 751, 0);

--
-- Table structure for table `강사`
--

DROP TABLE IF EXISTS `강사`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `강사` (
  `강사번호` varchar(255) NOT NULL,
  `담당종목` enum('HEALTH','PILATES','YOGA') DEFAULT NULL,
  `강사등록일` date DEFAULT NULL,
  `강사닉네임` varchar(255) DEFAULT NULL,
  `강사아이디` varchar(100) DEFAULT NULL,
  `강사사진` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`강사번호`),
  KEY `FKiosu4fst4mg44piojjphxvavl` (`강사아이디`),
  CONSTRAINT `FKiosu4fst4mg44piojjphxvavl` FOREIGN KEY (`강사아이디`) REFERENCES `사용자` (`사용자아이디`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `강사`
--

LOCK TABLES `강사` WRITE;
/*!40000 ALTER TABLE `강사` DISABLE KEYS */;
INSERT INTO `강사` VALUES
('1','YOGA',NULL,'BOBO','bobo','https://i.ibb.co/pyP7rGy/profile02.jpg'),
('2','HEALTH',NULL,'Sun','yami','https://i.ibb.co/x2tbpdj/profile03.jpg'),
('3','PILATES',NULL,'Byeol','star0717','https://i.ibb.co/SNMJTBB/profile01.jpg');
/*!40000 ALTER TABLE `강사` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `강의`
--

DROP TABLE IF EXISTS `강의`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `강의` (
  `강의번호` varchar(255) NOT NULL,
  `총영상길이` time(6) DEFAULT NULL,
  `종목` enum('HEALTH','PILATES','YOGA') DEFAULT NULL,
  `강의명` varchar(255) DEFAULT NULL,
  `강사번호` varchar(255) DEFAULT NULL,
  `강의내용` varchar(255) DEFAULT NULL,
  `썸네일이미지` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`강의번호`),
  KEY `FKspc3tt3acpmv3p357rjqgsv12` (`강사번호`),
  CONSTRAINT `FKspc3tt3acpmv3p357rjqgsv12` FOREIGN KEY (`강사번호`) REFERENCES `강사` (`강사번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `강의`
--

LOCK TABLES `강의` WRITE;
/*!40000 ALTER TABLE `강의` DISABLE KEYS */;
INSERT INTO `강의` VALUES
('H','00:00:01.000000','HEALTH','헬스가 좋아 왕좋아','2','헬창으로 사는 방법','1'),
('P',NULL,'PILATES','필라테스는 모야?','3','나도 잘 몰?루',NULL),
('Y',NULL,'YOGA','요가가 좋아 짱좋아','1','요가는 운동인가 체조인가',NULL);
/*!40000 ALTER TABLE `강의` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `강의리뷰`
--

DROP TABLE IF EXISTS `강의리뷰`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `강의리뷰` (
  `강의리뷰번호` varchar(255) NOT NULL,
  `리뷰등록일` date DEFAULT NULL,
  `리뷰내용` varchar(255) DEFAULT NULL,
  `사용자아이디` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`강의리뷰번호`),
  KEY `FK4kh0pawn3af4fal4ypdqv2q9j` (`사용자아이디`),
  CONSTRAINT `FK4kh0pawn3af4fal4ypdqv2q9j` FOREIGN KEY (`사용자아이디`) REFERENCES `사용자` (`사용자아이디`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `강의리뷰`
--

LOCK TABLES `강의리뷰` WRITE;
/*!40000 ALTER TABLE `강의리뷰` DISABLE KEYS */;
/*!40000 ALTER TABLE `강의리뷰` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `강의세부`
--

DROP TABLE IF EXISTS `강의세부`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `강의세부` (
  `강의세부고유번호` int(11) NOT NULL,
  `구독료` int(11) DEFAULT NULL,
  `강의설명` varchar(255) DEFAULT NULL,
  `강의번호` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`강의세부고유번호`),
  KEY `FK70gvgqp0ef4k64pcirbowvbtv` (`강의번호`),
  CONSTRAINT `FK70gvgqp0ef4k64pcirbowvbtv` FOREIGN KEY (`강의번호`) REFERENCES `강의` (`강의번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `강의세부`
--

LOCK TABLES `강의세부` WRITE;
/*!40000 ALTER TABLE `강의세부` DISABLE KEYS */;
/*!40000 ALTER TABLE `강의세부` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `게시글`
--

DROP TABLE IF EXISTS `게시글`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `게시글` (
  `게시글번호` bigint(20) NOT NULL AUTO_INCREMENT,
  `글내용` varchar(5000) DEFAULT NULL,
  `등록일자` datetime(6) NOT NULL,
  `글제목` varchar(150) NOT NULL,
  `게시판id` bigint(20) NOT NULL,
  `사용자아이디` varchar(100) NOT NULL,
  `댓글` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`게시글번호`),
  KEY `FK121rrki8fedo4eumgd25nb67g` (`게시판id`),
  KEY `FKtm4xd5gdx6oh5rbiu81i71ioq` (`사용자아이디`),
  CONSTRAINT `FK121rrki8fedo4eumgd25nb67g` FOREIGN KEY (`게시판id`) REFERENCES `게시판` (`글고유번호`),
  CONSTRAINT `FKtm4xd5gdx6oh5rbiu81i71ioq` FOREIGN KEY (`사용자아이디`) REFERENCES `사용자` (`사용자아이디`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `게시글`
--

LOCK TABLES `게시글` WRITE;
/*!40000 ALTER TABLE `게시글` DISABLE KEYS */;
INSERT INTO `게시글` VALUES
(1,'시작하기버튼을 누르시면 강의 선택창으로 안내해드려요! 들어가셔서 원하시는 강좌를 들어보세요!','2024-06-21 12:44:07.593322','이용 시 수강 가능한 클래스를 확인하고 싶어요!',3,'admin',NULL),
(2,'CLASS101+ 구독을 결제했지만, 결제한 계정이 아닌 다른 계정에서 이용을 원하시나요? 그렇다면 다음 방법을 확인해주세요! 이용하고자 하는 계정이 이미 있는 경우, 안타깝게도 구독권은 이전이 불가하기 때문에 재가입 구독을 해주셔야해요😢','2024-06-21 12:46:18.722802','다른 계정에서 이용하고 싶어요',3,'admin',NULL),
(3,'최초 회원가입 시 클래스101 알림톡으로 [회원가입 정보]를 보내드리고 있어요! 번거로우시겠지만 카카오톡 알림톡을 통해 ID와 로그인 정보 확인 부탁드립니다. 만약 알림톡에서 확인이 불가하다면 번거로우시더라도 고객센터를 통해 문의해주시기 바랍니다.신속하고 친절한 안내 드리겠습니다.','2024-06-21 12:47:46.630823','가입한 계정을 찾을 수 없어요',3,'admin',NULL),
(4,'로그인을 하셨다면 메인페이지 \'시작하기\' 버튼을 누르시면 구독하신 마이페이창으로 이동이 되요! 두번째 방법은 상단의 마이페이지에 들어 오시면 회원님의 강의를 보실수 있어요.','2024-06-21 12:50:06.663063','구독 내역을 확인하고 싶어요!',3,'admin','알겟다 오바'),
(5,'그룹 플랜은 구독 공유형 서비스입니다. 그룹 플랜으로 헬로피티 구독을 시작하시면, 타 계정을 초대하여 함께 구독 서비스를 이용하실 수 있습니다.','2024-06-21 12:51:24.904703','플랜 서비스',3,'admin',NULL),
(6,'이런 느낌 처음이야.','2024-06-21 14:02:39.362163','뭐에요',2,'bobo',NULL),
(9,'fsdfsdf','2024-06-21 16:06:49.980244','dfsdfds',2,'bobo',NULL),
(10,'333','2024-06-21 17:03:03.594718','333',2,'bobo',NULL),
(11,'123123','2024-06-21 17:10:50.857673','123123',2,'bobo',NULL),
(14,'34q3yq34yq34y','2024-06-21 17:23:52.341927','123123q34tyq',2,'bobo',NULL),
(16,'135135','2024-06-21 17:24:27.070224','135135##########',2,'bobo',NULL),
(21,'test','2024-06-25 09:05:24.995670','test',1,'yami',NULL),
(22,'test','2024-06-25 09:07:36.622703','test',1,'yami',NULL),
(23,'test','2024-06-25 09:07:47.714066','test',1,'yami',NULL),
(24,'test','2024-06-25 09:07:52.331350','test',1,'yami',NULL),
(25,'test','2024-06-25 09:07:56.265802','test',1,'yami','불럿냥?'),
(26,'test','2024-06-25 09:08:00.217157','test',1,'yami',NULL);
/*!40000 ALTER TABLE `게시글` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `게시판`
--

DROP TABLE IF EXISTS `게시판`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `게시판` (
  `글고유번호` bigint(20) NOT NULL,
  `제목` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`글고유번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `게시판`
--

LOCK TABLES `게시판` WRITE;
/*!40000 ALTER TABLE `게시판` DISABLE KEYS */;
INSERT INTO `게시판` VALUES
(1,'자유게시판'),
(2,'QnA'),
(3,'FAQ');
/*!40000 ALTER TABLE `게시판` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `구독`
--

DROP TABLE IF EXISTS `구독`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `구독` (
  `구독번호` bigint(20) NOT NULL AUTO_INCREMENT,
  `구독시작일` date DEFAULT NULL,
  `사용자아이디` varchar(100) DEFAULT NULL,
  `영상번호` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`구독번호`),
  KEY `FKm2rryxn25xkfsvl5i1y985ius` (`사용자아이디`),
  KEY `FK4c1byqmqbhxol4x0dnv4mc5mo` (`영상번호`),
  CONSTRAINT `FK4c1byqmqbhxol4x0dnv4mc5mo` FOREIGN KEY (`영상번호`) REFERENCES `영상` (`영상번호`),
  CONSTRAINT `FKm2rryxn25xkfsvl5i1y985ius` FOREIGN KEY (`사용자아이디`) REFERENCES `사용자` (`사용자아이디`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `구독`
--

LOCK TABLES `구독` WRITE;
/*!40000 ALTER TABLE `구독` DISABLE KEYS */;
INSERT INTO `구독` VALUES
(15,'2024-06-18','yami2024',4),
(16,'2024-06-18','yami2024',5),
(17,'2024-06-18','yami2024',10),
(19,'2024-06-18','star0717',2),
(20,'2024-06-18','star0717',3),
(21,'2024-06-18','star0717',3),
(39,'2024-06-19','yami2024',3),
(40,'2024-06-19','yami2024',10),
(41,'2024-06-19','yami2024',9),
(42,'2024-06-19','yami2024',18),
(43,'2024-06-20','yami2024',15),
(44,'2024-06-20','yami2024',15),
(45,'2024-06-20','yami2024',10),
(46,'2024-06-20','yami2024',10),
(47,'2024-06-20','yami2024',17),
(48,'2024-06-20','hongbao',10),
(49,'2024-06-20','hongbao',15),
(50,'2024-06-20','hongbao',10),
(51,'2024-06-20','yami',10),
(52,'2024-06-20','yami',12),
(53,'2024-06-20','yami',10),
(54,'2024-06-20','yami',10),
(55,'2024-06-20','yami',15),
(56,'2024-06-20','yami',17),
(57,'2024-06-20','yami',5),
(58,'2024-06-20','yami',6),
(59,'2024-06-20','yami',6),
(60,'2024-06-20','yami',10),
(61,'2024-06-20','yami',16),
(62,'2024-06-20','yami',18),
(63,'2024-06-24','yami',1),
(64,'2024-06-25','yami',11),
(65,'2024-06-25','admin',5),
(66,'2024-06-25','yami',7),
(67,'2024-06-26','admin',3),
(69,'2024-06-27','yami',3),
(70,'2024-06-27','yami',2),
(71,'2024-06-27','yami',9);
/*!40000 ALTER TABLE `구독` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `권한`
--

DROP TABLE IF EXISTS `권한`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `권한` (
  `권한명` varchar(50) NOT NULL,
  PRIMARY KEY (`권한명`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `권한`
--

LOCK TABLES `권한` WRITE;
/*!40000 ALTER TABLE `권한` DISABLE KEYS */;
INSERT INTO `권한` VALUES
('ROLE_ADMIN'),
('ROLE_TEACHER'),
('ROLE_USER');
/*!40000 ALTER TABLE `권한` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `동영상`
--

DROP TABLE IF EXISTS `동영상`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `동영상` (
  `동영상번호` bigint(20) NOT NULL AUTO_INCREMENT,
  `동영상설명` varchar(255) DEFAULT NULL,
  `동영상소스` varchar(255) DEFAULT NULL,
  `동영상길이` time(6) DEFAULT NULL,
  `동영상제목` varchar(255) DEFAULT NULL,
  `동영상등록일` date DEFAULT NULL,
  `영상아이디` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`동영상번호`),
  KEY `FK4uud3pw2waij2uq70ub95ocfe` (`영상아이디`),
  CONSTRAINT `FK4uud3pw2waij2uq70ub95ocfe` FOREIGN KEY (`영상아이디`) REFERENCES `영상` (`영상번호`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `동영상`
--

LOCK TABLES `동영상` WRITE;
/*!40000 ALTER TABLE `동영상` DISABLE KEYS */;
INSERT INTO `동영상` VALUES
(1,'25 Min FULL BODY Dumbbell Workout','https://youtu.be/eqTF-rDHm2I?si=i78Xxxe36Dx3QZtu',NULL,'제목 테스트',NULL,1),
(2,'30 Min FULL BODY DUMBBELL WORKOUT','https://youtu.be/Jpxc0TUr9BI?si=WeQ2k19geNH5LMxo',NULL,'제목 테스트',NULL,1),
(3,'20 Min Fat Burning HIIT Workout ','https://youtu.be/-hSma-BRzoo?si=nzMInokcJWeYNJEB',NULL,'제목 테스트',NULL,2),
(4,'20 MIN CARDIO HIIT WORKOUT','https://youtu.be/bbVJUxQSJME?si=TVUIn3l0ZRYbZZRR',NULL,'제목 테스트',NULL,2),
(5,'20 Minute Full Body Cardio HIIT Workout','https://youtu.be/M0uO8X3_tEA?si=0cPBCrtX0NeolrDv',NULL,'제목 테스트',NULL,3),
(6,'30 MIN CARDIO HIIT WORKOUT - ALL STANDING ','https://youtu.be/nbP7m0S0Ato?si=rn1x8hYEkAB1oF87',NULL,'제목 테스트',NULL,3),
(7,'20 MIN CARDIO HIIT WORKOUT - ALL STANDING','https://youtu.be/FeR-4_Opt-g?si=rO3eUDHulBEUKcQH',NULL,'제목 테스트',NULL,3),
(8,'30 MIN CARDIO HIIT WORKOUT - ALL STANDING','https://youtu.be/n_cIBBDb9JA?si=rk2T0BXrKZcv-jnM',NULL,'제목 테스트',NULL,4),
(9,'30 Minute Full Body Cardio HIIT Workout ','https://www.youtube.com/watch?v=tgm_QjUiwlk',NULL,'제목 테스트',NULL,5),
(10,'30 Minute Full Body Dumbbell Workout','https://youtu.be/XxuRSjER3Qk?si=1sP3-dM8rmwM1x-K',NULL,'제목 테스트',NULL,4),
(11,'30 Minute Full Body Dumbbell Strength Workout ','https://youtu.be/dhCwHlL32Jw?si=EpdryKyS9nNLdPBw',NULL,'제목 테스트',NULL,5),
(12,'20 MIN CARDIO HIIT WORKOUT - ALL STANDING','https://youtu.be/yXHgcYpUVD4?si=12B-5lDGISxa1mzO',NULL,'제목 테스트',NULL,4),
(13,'20 Minute Full Body Nonstop Cardio Workout','https://youtu.be/Iv5gIipdZVg?si=sQSOSBmbI-e3norc',NULL,'제목 테스트',NULL,5),
(14,'30 MIN MORNING PILATES ','https://youtu.be/C3LB3Qszx2I?si=i-kMT9peW8In-40o',NULL,'제목 테스트',NULL,6),
(15,'40 MIN FULL BODY WORKOUT','https://youtu.be/sqh_EjMteu8?si=zPLFWmBCiNw6oyW-',NULL,'제목 테스트',NULL,6),
(16,'몸의 비대칭 때문에 고민이라면 꼭 해보세요','https://youtu.be/l3FDS3I-Syw?si=zrlo69ZonYUhhkDD',NULL,'제목 테스트',NULL,7),
(17,'온몸 구석구석 시원하게 풀어주는 1시간 요가 클래스 ','https://youtu.be/CIScU774a8o?si=tEv-iguDhfdraTBr',NULL,'제목 테스트',NULL,7),
(18,'몸이 가벼워지고 개운해지는 25분 플로우 요가','https://youtu.be/ei34GLXhsxo?si=7RJmdMH6d6Jl0hE-',NULL,'제목 테스트',NULL,7),
(19,'반드시 해야하는 20분 전신순환 스트레칭 ','https://youtu.be/Kk7TQGqQ3nA?si=bTB_hwKFR_FzwnDp',NULL,'제목 테스트',NULL,8),
(20,'온 몸에 땀 폭발 20분 매운맛 전신 운동','https://youtu.be/TtAD5B0_nes?si=FTm74GaHj7rxQKHB',NULL,'제목 테스트',NULL,8),
(21,'칼로리 소모량 2배! 10분 전신 유산소 운동 (층간소음X)','https://youtu.be/4VodTTXBO44?si=gZKykFM5B3R5PXDK',NULL,'제목 테스트',NULL,8),
(22,'[Cupid 다이어트 스트레칭] 운동 전 따라하면 효과 2배 꿀잼인데 살빠져서 놀라는 군살아웃 스트레칭!!','https://youtu.be/y1XniMeHZfM?si=q7ltD6ppxf32Ocz9',NULL,'제목 테스트',NULL,9),
(23,'[여자아이돌 다이어트댄스] 실제 감량 후기 폭발했던 4세대 여돌 플레이리스트로 2주 -5kg 도전 해보세요!','https://youtu.be/2paxL9MmxWM?si=nvcJNZbgF5a_OjC0',NULL,'제목 테스트',NULL,9),
(24,'[에스파 다이어트댄스] Supernova 비트가 미쳤다는 쇠맛','https://youtu.be/JZkOftbRDnQ?si=ULHHn-Ogm207zHq2',NULL,'제목 테스트',NULL,9),
(25,'온 몸의 독소를 다 빼주는 전신 스트레칭','https://youtu.be/ECu-P8IqgHU?si=pAlX-Ilv1T0Ikb_P',NULL,'제목 테스트',NULL,10),
(26,'매일 ‘이 동작’을 9분만 했더니 볼록한 ‘아랫뱃살’이 사라졌다','https://youtu.be/AaB1QpU7Kdo?si=7mUReq7EWtxAgvAX',NULL,'제목 테스트',NULL,10),
(27,'몸에 쌓인 독소가 눈에 띄게 빠지는!','https://youtu.be/7yKJAbLjg28?si=aPlGH4bpzxUUJWyw',NULL,'제목 테스트',NULL,10),
(28,'임산부 필라테스 스트레칭(15MIN)','https://youtu.be/FlSVpoYC30Y?si=LSCzpBYmQNJ0IKEt',NULL,'제목 테스트',NULL,11),
(29,'임산부 유산소운동 l 타바타(10MIN)','https://youtu.be/iGTNHxaAb54?si=pXes_SjyUxWd7NKM',NULL,'제목 테스트',NULL,11),
(30,'임산부 막달운동 l 의자편(13MIN)','https://youtu.be/8gLI3sIe5aE?si=3cIdlyOkCoBxJPNZ',NULL,'제목 테스트',NULL,11),
(31,'우리에게 꼭 필요한 10분 스트레칭','https://youtu.be/bOWoNq2nUgg?si=mDgfA-h92ySDseET',NULL,'제목 테스트',NULL,12),
(32,'매일하기 좋은 데일리 요가','https://youtu.be/qmhdb6ezluk?si=D9PzkAuzNN4h9TW3',NULL,'제목 테스트',NULL,12),
(33,'남녀노소 누구나 할 수 있는 하타요가 ','https://youtu.be/CwmVLAPCj08?si=hBR52rySun6tjiZ4',NULL,'제목 테스트',NULL,12),
(34,'천천히 따라하는 전신 스트레칭','https://youtu.be/PTSwv2qgKxY?si=c2acvWj_089bOAt6',NULL,'제목 테스트',NULL,13),
(35,'가볍게 하기 좋은 데일리 빈야사 요가','https://youtu.be/VQ9qGKBgrk0?si=gLdtvZF6C87liT0g',NULL,'제목 테스트',NULL,13),
(36,'공복에 수련하는 30분 빈야사 요가','https://youtu.be/3kQI-UBjAUg?si=9rF6mPPWWBETffNi',NULL,'제목 테스트',NULL,13),
(37,'요가원처럼 1시간 풀 시퀀스','https://youtu.be/-QXVYbp9g-8?si=Z_Bh6E66w4LgjIik',NULL,'제목 테스트',NULL,14),
(38,'요가와 근력운동 한번에 하는 루틴','https://youtu.be/8bhVTAOIZ7E?si=RR7G5sLky7LNeHvP',NULL,'제목 테스트',NULL,14),
(39,'새로운 첫 시작을 위한 요가','https://youtu.be/Zk_qUVb-ESI?si=BOxXz7GLAyTjShpj',NULL,'제목 테스트',NULL,14),
(40,'체중 감량을 위한 파워요가','https://youtu.be/YBNt7w_sHQY?si=ysbneUWkMW_H2xr4',NULL,'제목 테스트',NULL,15),
(41,'우리에게 꼭 필요한 기초 코어운동','https://youtu.be/UR4yba7uwuU?si=v8Rp3LkxwlEqwAbj',NULL,'제목 테스트',NULL,15),
(42,'오늘 요가 뭐하지','https://youtu.be/Mz5fMvdQ4uY?si=HUZA9_xRkD3jVb4z',NULL,'제목 테스트',NULL,15),
(43,'마음이 평온해지는 요가','https://youtu.be/BScGrU1rKJE?si=0ILYewRB2NmSWG6R',NULL,'제목 테스트',NULL,16),
(44,'빨리빨리에 길들여진 우리에게 꼭 필요한 요가','https://youtu.be/H_tQDt1_Odk?si=QXSXRg1sRYacGHl_',NULL,'제목 테스트',NULL,16),
(45,'요가랑 근력운동 황금비율로 섞은 루틴','https://youtu.be/6SVi2k7dizw?si=SEa_-aWVd4GGWURy',NULL,'제목 테스트',NULL,16),
(46,'제주 바다와 함께하는 요가','https://youtu.be/F4UiKFUsQag?si=JqgNlSNkkb4_p2mJ',NULL,'제목 테스트',NULL,17),
(47,'저녁에 하는 20분 명상 요가','https://youtu.be/M0OXbBvghL8?si=iKDX_lGs8-o3fuWf',NULL,'제목 테스트',NULL,17),
(48,'아침을 깨우는 모닝요가','https://youtu.be/pSGluAkCVvI?si=klbQ-up3tcvlSks3',NULL,'제목 테스트',NULL,17),
(49,'넓은어깨 필수운동 덤벨 숄더프레스 하는법 자세히 정리! ','https://youtu.be/Ia9DYFMkMmU?si=bSTeUkLqD7ZDFLAn',NULL,'제목 테스트',NULL,18),
(50,'절대 안 커지는 어깨, 이 운동이면 커집니다! ','https://youtu.be/66gDfjrm-gk?si=sh3JzpD9vRAwyfhZ',NULL,'제목 테스트',NULL,18),
(51,'덤벨 숄더프레스','https://youtu.be/zgKAnvCK4-0?si=Vk7XnC6ccSCWl9sa',NULL,'제목 테스트',NULL,18),
(52,'10 MIN CARDIO HIIT WORKOUT - ALL STANDING','https://youtu.be/PwXUHMKamP8?si=nKto7xeky0Nfdw6X',NULL,'제목 테스트',NULL,3),
(53,'30 MIN CARDIO HIIT WORKOUT','https://youtu.be/ybg59BxnfwE?si=jwbKgv5NndnYErXZ',NULL,'제목 테스트',NULL,4),
(54,'30 Minute Upper Body Dumbbell Strength Workout','https://youtu.be/x5qulwJMq1E?si=RLDyWjYP8lF1UtOQ',NULL,'제목 테스트',NULL,5),
(55,'35 MIN PILATES WORKOUT','https://youtu.be/kQACrehFaLA?si=MYLsWwtsZn8Yn33f',NULL,'제목 테스트',NULL,6),
(56,'다이어트를 돕는 아침 공복 운동','https://youtu.be/tUCYnnV7MME?si=e4fIsyEJZhhyfNQi',NULL,'제목 테스트',NULL,7),
(57,'덤벨 20분 전신운동 - 근력강화, 체지방 감량 - 전신 자극 레전드!','https://youtu.be/06ujly22XVQ?si=hCK9QBs3KE6Plvf-',NULL,'제목 테스트',NULL,8),
(58,'[캔디 다이어트댄스] -5kg','https://youtu.be/wcebbEj3LkU?si=9-pEYvCR_vA_2tVU',NULL,'제목 테스트',NULL,9),
(59,'30 Minute Abs & Arms Workout with Dumbbells','https://youtu.be/4NOxBkzneyQ?si=fhzhGq9v9ztK-zQh',NULL,'제목 테스트',NULL,1),
(60,'30 Min TOTAL ARM WORKOUT WITH DUMBBELLS','https://youtu.be/lzaarm-0MkM?si=ZAdJb1mpla5c0Oqn',NULL,'제목 테스트',NULL,1);
/*!40000 ALTER TABLE `동영상` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `등급`
--

DROP TABLE IF EXISTS `등급`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `등급` (
  `등급명` varchar(255) NOT NULL,
  `할인율` int(11) DEFAULT NULL,
  `등급상한가` int(11) DEFAULT NULL,
  `등급하한가` int(11) DEFAULT NULL,
  PRIMARY KEY (`등급명`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `등급`
--

LOCK TABLES `등급` WRITE;
/*!40000 ALTER TABLE `등급` DISABLE KEYS */;
/*!40000 ALTER TABLE `등급` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `메모장`
--

DROP TABLE IF EXISTS `메모장`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `메모장` (
  `메모번호` bigint(20) NOT NULL,
  `메모등록날짜` datetime(6) DEFAULT NULL,
  `메모내용` varchar(255) DEFAULT NULL,
  `사용자아이디` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`메모번호`),
  KEY `FKqk7qxtdt35sl63go7s6nrhiaf` (`사용자아이디`),
  CONSTRAINT `FKqk7qxtdt35sl63go7s6nrhiaf` FOREIGN KEY (`사용자아이디`) REFERENCES `사용자` (`사용자아이디`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `메모장`
--

LOCK TABLES `메모장` WRITE;
/*!40000 ALTER TABLE `메모장` DISABLE KEYS */;
INSERT INTO `메모장` VALUES
(352,'2024-06-20 14:38:07.407367','천재임?','yami2024'),
(402,'2024-06-20 14:40:01.115307','천재냐고','yami2024'),
(452,'2024-06-25 11:40:02.162892','asdasd','yami'),
(502,'2024-06-25 13:44:12.858630','천재냐고!','yami'),
(552,'2024-06-25 13:48:35.621349','와우','yami'),
(652,'2024-06-27 15:59:39.624493','메모번호','admin'),
(653,'2024-06-27 15:59:41.837249','메모번호','admin');
/*!40000 ALTER TABLE `메모장` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `사용자`
--

DROP TABLE IF EXISTS `사용자`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `사용자` (
  `사용자아이디` varchar(100) NOT NULL,
  `계정생성날짜` datetime(6) DEFAULT NULL,
  `비밀번호` varchar(255) DEFAULT NULL,
  `핸드폰번호` varchar(255) DEFAULT NULL,
  `이메일` varchar(255) DEFAULT NULL,
  `사용자이름` varchar(255) DEFAULT NULL,
  `닉네임` varchar(255) DEFAULT NULL,
  `권한명` varchar(50) DEFAULT NULL,
  `성별` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`사용자아이디`),
  KEY `FKe2762p88f733b1yk7qk2gi712` (`권한명`),
  CONSTRAINT `FKe2762p88f733b1yk7qk2gi712` FOREIGN KEY (`권한명`) REFERENCES `권한` (`권한명`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `사용자`
--

LOCK TABLES `사용자` WRITE;
/*!40000 ALTER TABLE `사용자` DISABLE KEYS */;
INSERT INTO `사용자` VALUES
('','2024-06-14 11:19:39.434860','$2a$10$y1VCZJOTs8mFONswToNJDOaI36KnorLKxPLO3nJqtuJITmLyOZEh6','','','','','ROLE_USER',''),
('123123','2024-06-25 14:33:53.906199','$2a$10$R772qBvXDnULcZgkS0tBt.SR3FamFv22E2j679kDj3j.EYkt0yu32','123','123','123','123','ROLE_USER','male'),
('15123512','2024-06-14 11:18:33.293229','$2a$10$Pa6tWkn5s1anZ6GsDuXwHesVF6zyuDJOBRLHtqVL86o4MdBj8iDhG','125','12512','15123512','125125','ROLE_USER','5125'),
('15123512545','2024-06-14 11:19:58.430703','$2a$10$DIblvuDT4ZgHGdG/Z6x9pOAlYE.WcPtbg3y9/tO655nR2l6hcJQoe','','','15123512545','','ROLE_USER',''),
('444','2024-06-14 11:22:48.958184','$2a$10$Td9fIGruWWvC.KB98UKYQe19oKovShEzlGp96kDkEp/bXATk9xTyC','4','4','444','44','ROLE_USER','44'),
('admin','2024-06-21 14:07:21.479973','$2a$10$1s9AF/B2hgIz4Xaj.TRlzuEQvFBZgmqwQH6ykumu.t5QrtQt4e8Tq','11','admin','admin','admin','ROLE_ADMIN','female'),
('bobo','2024-06-14 11:14:59.956055','$2a$10$w0nEI4NT/WnXuHNGDbvcR.0PuAF/bM9InX6ZLi6QRo9ZcoRoZ.wwO','012121212','iambobo@email.com','bobo','bobo','ROLE_TEACHER','WOMEN'),
('df','2024-06-11 16:51:29.129953','$2a$10$.mj.cl6P6YxtJD7kc40nS.l6H71yA5HpdUe8b8Lr2D9GBQIsYpV1q','3','df','df','df','ROLE_USER','df'),
('hongbao','2024-06-07 16:46:48.995679','$2a$10$tL7WE.LmJ.ihDbY0RGwIbeZ2uICnjDOUyasqyPrc20rAPL1Y6XJhi','123123123','iampanda@email.com','panda','panda','ROLE_USER','male'),
('hongbao1','2024-06-18 14:58:38.404195','$2a$10$ISJjsdZ.4Z5cI/VZrE5zRuVay81xM4ZrdYUc9tbDbaIpcCPVRwM1C','012121212','iampanda@email.com','HongBao','Hong','ROLE_USER','MAN'),
('star0717','2024-06-10 16:15:05.868515','$2a$10$3LAOYW3QHxc4mIjgBJO5.uDddmyZlBbDJXUx0QOIN51FSAr9VA36G','012121212','iamstar@email.com','star0717','byul','ROLE_TEACHER','WOMEN'),
('yami','2024-06-20 16:19:21.580774','$2a$10$BjbTE7cqelN6phWhlXDCmuaBVzACvMA2cyTKTc8PYaJ7MidZmeKXu','0101010101','iamcat@email.com','Yami','cat','ROLE_TEACHER',''),
('yami2024','2024-06-20 15:26:41.508621','12341234!a','123123','iamcat@email.com','Yami','yam','ROLE_USER','male'),
('yaya','2024-06-19 10:11:42.581520','$2a$10$EomVdPp6YxYm31PpTg9q/.lrQYb3T.EOZfJL8i1DAu8Y94I50qAbC','333','123','ASD1234!','123','ROLE_USER','male'),
('yayaya','2024-06-18 12:23:47.505477','$2a$10$E2OtALK664JNxmWfyGy5O.kDaE9BgvQP3RMWL601YF7yXPTsIXDLm','0101','ya@ya','yayaya','ya','ROLE_USER','ya');
/*!40000 ALTER TABLE `사용자` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `성분정리표`
--

DROP TABLE IF EXISTS `성분정리표`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `성분정리표` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `1인분칼로리(kcal)` double DEFAULT NULL,
  `탄수화물(g)` double DEFAULT NULL,
  `콜레스트롤(g)` double DEFAULT NULL,
  `등록일` date DEFAULT NULL,
  `식이섬유(g)` double DEFAULT NULL,
  `지방(g)` double DEFAULT NULL,
  `음식명` varchar(255) DEFAULT NULL,
  `단백질(g)` double DEFAULT NULL,
  `나트륨(g)` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=636 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `성분정리표`
--

LOCK TABLES `성분정리표` WRITE;
/*!40000 ALTER TABLE `성분정리표` DISABLE KEYS */;
INSERT INTO `성분정리표` VALUES
(1,311,68.3,0,NULL,0,1,'떡국용가래떡',5.3,231),
(2,96,21,0,NULL,0,0.3,'떡볶이용가래떡',1.6,71),
(3,58,0.1,44.6,NULL,0,1.7,'가자미',9.9,104),
(4,76,0.2,50.1,'2012-01-06',0,3.1,'가자미구이',11.2,255),
(5,45.4,2.4,27,'2012-01-04',0.4,1.2,'가자미조림',6.6,183),
(6,6,1.6,0.3,'2012-01-06',0.2,0,'가지',0.3,1),
(7,19,2.9,0.4,'2012-01-16',0.4,0.9,'가지나물',0.8,278),
(8,8,0.7,0,NULL,0,0,'간장(왜간장)',1.2,879),
(9,586,14.3,87.4,'2012-01-04',0.3,43.7,'갈비구이',28.1,1093),
(10,262.2,3.5,43.2,'2012-01-04',0.1,20,'갈비찜',13.7,413),
(11,362.5,20.7,49.9,'2012-01-04',0.6,22.3,'갈비탕',16.5,992),
(12,60,0,28.8,NULL,0,3,'갈치',7.4,40),
(13,110.4,0.1,44.1,NULL,0,6.8,'갈치구이',11.3,331),
(14,37,1.8,13.8,'2012-01-04',0.3,1.5,'갈치조림',4,120),
(15,48.2,1.9,19.2,'2012-01-16',0.3,2.1,'갈치찌개',5.4,538),
(16,119,33,0,'2012-01-04',1.4,0.1,'감(곶감)',1.1,3),
(17,37,10.4,0,'2012-01-04',0.4,0,'감(단감)',0.4,6),
(18,43,9.5,0,'2012-01-04',0.1,0,'감자',1.8,2),
(19,55.1,11.4,1.5,'2012-01-04',0.2,0.1,'감자국',2.8,239),
(20,36.2,6,0.1,'2012-01-04',0.1,1,'감자볶음',1.1,119),
(21,64,9,7.1,'2012-01-04',0.2,2.5,'감자샐러드',1.7,316),
(22,39,6.8,0,'2012-01-04',0.1,0.9,'감자조림',1.3,104),
(23,239,23.6,0,'2012-01-04',0.5,16.7,'감자칩',2.5,117),
(24,11,2,0,'2012-01-04',0.1,0.1,'강낭콩',0.7,0),
(25,144,0.4,20,NULL,0,11.1,'개고기',10.5,40),
(26,104,18.5,0.5,'2012-01-04',0.1,2.4,'건빵',2.2,116),
(27,42,3.4,0,NULL,0.5,2,'검정콩',3.9,0.2),
(28,13,1,0,'2012-01-17',0.2,0.7,'겨자',0.9,1),
(29,144,30.7,0,'2012-01-04',0.2,1.1,'경단',2.5,111),
(30,90,21.8,0,NULL,0.6,0.1,'고구마',1,11),
(31,266,48.1,0.1,NULL,1.7,8,'고구마맛탕',2.5,18),
(32,2,0.7,0,'2012-01-17',0.2,0,'고구마줄기',0.1,1),
(33,72.4,11.7,0,'2012-01-04',0.2,2.8,'고구마튀김',0.7,58),
(34,348.1,35,24.1,'2012-01-04',0.7,14.3,'고기만두',19.2,881),
(35,14,3.2,0,'2012-01-17',0.5,0.2,'고들빼기',1.2,4),
(36,92,0,24,NULL,0,5.2,'고등어',10.1,38),
(37,95,0.1,25.9,'2012-01-04',0,3.4,'고등어(자반고등어)',14.8,990),
(38,110.4,0,25.2,'2012-01-04',0,7.1,'고등어구이',10.6,226),
(39,107,3.3,24.2,NULL,0.5,5.4,'고등어조림',11.1,284),
(40,66,2.5,14.6,'2012-01-17',0.3,3.3,'고등어찌개',6.7,225),
(41,167.3,6.4,34.9,'2012-01-04',0,10,'고등어튀김',11.5,350),
(42,8,2,0,'2012-01-06',0.6,0,'고사리',1,2),
(43,68,16.3,0,'2012-01-17',2.9,0.2,'고사리(말린것)',7.7,5),
(44,25.5,2.6,0,'2012-01-04',0.7,1.7,'고사리나물',1.3,328),
(45,6,1.4,0,'2012-01-04',0.1,0.1,'고추냉이(와사비)',0.3,2),
(46,30.3,2.3,5.8,'2012-01-11',0.1,1.2,'고추멸치볶음',2.7,112),
(47,16,1,0,'2012-01-17',0.2,1.3,'고추볶음',0.7,111),
(48,27,7.5,0,NULL,0.5,0.1,'고추장',1,596),
(49,6.3,1.7,0,'2012-01-04',0.5,0.1,'고추장아찌',0.4,223),
(50,42,2.2,0,'2012-01-17',0.2,3.7,'고추튀김',0.5,254),
(51,5,1.1,0,NULL,0.4,0.2,'고춧가루',0.3,0),
(52,2,0.3,0,'2012-01-06',0,0,'고춧잎',0.1,0),
(53,34,1.6,45.6,NULL,0,0.3,'골뱅이(통조림)',6,209),
(54,82,10.5,55.8,'2012-01-04',0.6,1.1,'골뱅이무침',8.3,421),
(55,263,39.6,18.9,NULL,0.3,9.2,'곰보빵(소보로빵)',6.2,162),
(56,119,1.8,31,'2012-01-17',0.1,5.6,'곰탕(가정식)',12.3,833),
(57,198,3.1,51.7,'2012-01-04',0.2,9.3,'곰탕(외식)',20.5,1388),
(58,127.5,11.9,85.5,'2012-01-04',1.1,5.8,'곱창전골',8.8,572),
(59,123,31.8,0,'2012-01-04',0,0,'과일탄산음료',0,5),
(60,115,5.9,49,'2012-01-04',1.1,2.8,'광어매운탕',18.1,139),
(61,343.9,66.5,16.4,'2012-01-04',0.5,2.6,'국밥',11.2,876),
(62,429,36.7,24,'2012-01-04',0.4,22.5,'군만두',19,1068),
(63,13,0.7,7.2,NULL,0,0.2,'굴',1.8,46),
(64,23.3,1.7,5.7,'2012-01-17',0.2,1.3,'굴무침',1.6,156),
(65,266,0.3,0,'2012-01-04',0,12.2,'굴비',35.5,330),
(66,38,9.9,0,'2012-01-06',0.1,0.1,'귤',0.7,11),
(67,78,20.8,0,'2012-01-04',0,0.2,'귤쥬스',0.4,26),
(68,7,1.4,0.5,'2012-01-17',0.4,0.1,'근대',1,72),
(69,36.1,5.3,0.1,'2012-01-17',0.8,0.8,'근대된장국',3.7,868),
(70,66,18,0,'2012-01-04',0.8,0.1,'금귤',0.9,14),
(71,22,4.5,0,'2012-01-06',0,0.1,'기장',0.7,0),
(72,2,0.9,0,'2012-01-04',0.1,0,'김',0.7,0),
(73,3,0.9,0.5,NULL,0,0,'김구이',0.9,29),
(74,74,5.7,2.3,'2012-01-17',0.4,6.2,'김무침',5.2,363),
(75,306,57.4,64.5,NULL,0.7,4.2,'김밥',9.2,601),
(76,14,3,0,'2012-01-04',0.6,0.3,'김치(갓김치)',1.4,319),
(77,26,4.8,0,'2012-01-17',1,1.1,'김치(고들빼기김치)',1.6,892),
(78,12,2.6,0,'2012-01-04',0.2,0.1,'김치(깍두기)',0.6,209),
(79,19,3.4,0,'2012-01-11',0.7,0.6,'김치(깻잎김치)',1.4,852),
(80,9,2.5,0,'2012-01-04',0.8,0.1,'김치(나박김치)',0.8,1256),
(81,11,3,0,NULL,0.5,0.1,'김치(동치미)',0.7,609),
(82,8,0.8,0,'2012-01-17',0,0.2,'김치(무청김치)',0.9,0),
(83,7,1.6,0,NULL,0.5,0.2,'김치(배추김치)',0.8,458),
(84,7,1.8,0,'2012-01-04',0.5,0.1,'김치(백김치)',0.6,380),
(85,21,3.3,0,'2012-01-17',0.9,0.8,'김치(부추김치)',1.9,916),
(86,13,3,0,'2012-01-04',0.5,0.2,'김치(열무김치)',1.1,218),
(87,16,3.2,0,'2012-01-04',0.5,0.3,'김치(오이김치)',1.2,803),
(88,6,1.4,0,'2012-01-04',0.5,0.1,'김치(오이소박이)',0.6,212),
(89,15,3,0,NULL,0.2,0.2,'김치(총각김치)',0.9,1211),
(90,16,3.5,0,'2012-01-04',0.5,0.2,'김치(파김치)',1,263),
(91,21.3,2.2,1.8,'2012-01-17',0.6,0.8,'김치국',2.5,705),
(92,19.1,2,0,'2012-01-04',0.6,1.3,'김치볶음',1,478),
(93,480.8,93,5,'2012-01-04',1.2,6.8,'김치볶음밥',9.6,733),
(94,133.3,17.8,47.3,'2012-01-17',0.7,4.8,'김치전',4.6,815),
(95,88.1,4,11.4,NULL,1,5.7,'김치찌개',7.2,942),
(96,208.2,25.8,2.9,'2012-01-17',0.6,11.6,'김튀김',7.5,172),
(97,11,0.3,0,'2012-01-06',0.1,1,'깨(검정깨)',0.4,0),
(98,12,0.4,0,NULL,0.1,1.1,'깨(흰깨)',0.4,0),
(99,12,0.3,0,'2012-01-17',0.1,1.1,'깨소금',0.4,0),
(100,5,1.2,0,'2012-01-06',0.3,0.1,'깻잎',0.6,0),
(101,6,0.6,0,'2012-01-17',0.1,0,'깻잎장아찌',0.3,0),
(102,20,0.3,13.4,'2012-01-04',0,0.5,'꼬막',3.5,0),
(103,34,2,6.3,'2012-01-17',0.2,1.1,'꼬막찜',3.9,73),
(104,74,0,31.1,'2012-01-06',0,3.9,'꽁치',8.8,36),
(105,98,0.1,35.3,NULL,0,6,'꽁치구이',10,378),
(106,60,1.8,21.6,'2012-01-04',0.3,2.8,'꽁치조림',6.6,137),
(107,33,0.9,36,'2012-01-04',0,0.4,'꽃게',6.2,137),
(108,32,2.4,25.2,NULL,0.1,0.3,'꽃게장',4.8,344),
(109,98,7.1,70.6,'2012-01-04',0.6,1.5,'꽃게탕',14.4,874),
(110,59,15.9,0,NULL,0,0,'꿀',0,1),
(111,33,0.1,52.8,'2012-01-04',0,0.4,'낙지',6.9,136),
(112,90,10.8,42.8,NULL,0.8,3,'낙지볶음',6.9,807),
(113,9,1.6,0,'2012-01-04',0.5,0.2,'냉이',1.4,5),
(114,43,5.1,2.9,'2012-01-11',0.8,1.1,'냉이된장국',4.6,891),
(115,52,0.2,35.5,'2012-01-04',0,0.9,'넙치(광어)',10.2,80),
(116,151,27.9,0,'2012-01-06',2.1,0.7,'녹두',10,1),
(117,11,0,0,NULL,0,0,'녹두묵',0,5),
(118,198.4,21.8,7.9,NULL,1,8.8,'녹두빈대떡',9,591),
(119,2,0.3,0,NULL,0,0,'녹차',0,8),
(120,2,0.4,0,'2012-01-04',0,0,'녹차음료',0,9),
(121,109.7,24.3,0,'2012-01-04',0.1,0.1,'누룽지',1.8,2),
(122,6,1.5,0,NULL,0.2,0,'느타리버섯',0.7,1),
(123,24,2.7,0.1,'2012-01-04',0.3,1.4,'느타리버섯볶음',0.9,217),
(124,16,4.5,0,'2012-01-06',0.5,0.1,'늙은호박',0.5,1),
(125,34,0,15,'2012-01-17',0,0.3,'다랑어(냉동)',7.4,12),
(126,59,0,7.6,NULL,0,4.7,'다랑어(통조림)',3.6,87),
(127,3,1.5,0,'2012-01-04',0.2,0.1,'다시마',0.4,194),
(128,1,0.5,0,'2012-01-06',0,0,'다시마(말린것)',0.1,31),
(129,68,7.2,0,NULL,0.6,4.1,'다시마튀각',1.2,360),
(130,2,0.7,0,NULL,0.2,0,'단무지',0.1,224),
(131,249,44.6,3.4,NULL,0.8,5.2,'단팥빵',6.5,143),
(132,55,1.1,188,NULL,0,3.3,'달걀',4.7,61),
(133,73,3.5,199,'2012-01-04',0.1,3.7,'달걀국',6.1,532),
(134,74.2,2,191.5,NULL,0.1,5,'달걀말이',4.9,305),
(135,73.3,1.3,210.7,'2012-01-04',0,5,'달걀부침(달걀후라이)',5.3,121),
(136,50.3,1.2,168.6,'2012-01-04',0,3,'달걀찜',4.3,305),
(137,3,0.6,0,'2012-01-04',0.1,0,'달래',0.3,1),
(138,30,2.9,0,'2012-01-04',0.3,1.2,'달래된장찌개',2.7,448),
(139,32,3,0,'2012-01-04',0.5,2.2,'달래무침',1.1,61),
(140,141.1,5.9,92.6,'2012-01-17',1.1,7.8,'닭개장',13.1,573),
(141,171,0.9,71.3,'2012-01-04',0,10.1,'닭고기',18.1,63),
(142,198,0.6,74.1,NULL,0,12.9,'닭고기(가슴)',17.9,55),
(143,97,1.1,71.3,'2012-01-17',0,0.4,'닭고기(가슴,껍질제거)',22.1,39),
(144,210,0.8,110.2,'2012-01-04',0,14.4,'닭고기(날개)',16.6,65),
(145,120,0.8,78.9,NULL,0,4.1,'닭고기(다리)',17.3,109),
(146,114,0.9,89.3,'2012-01-11',0,3.6,'닭고기(다리,껍질제거)',19.1,82),
(147,201,12.2,74.2,'2012-01-04',0.7,9.7,'닭도리탕',17.1,544),
(148,322.7,20.7,102.9,'2012-01-04',1,16.8,'닭볶음(닭갈비)',23.4,913),
(149,335.2,21.4,136.4,'2012-01-04',0.8,19,'닭양념튀김',20.2,339),
(150,526.3,67.2,131.4,'2012-01-04',0.9,7.7,'닭죽',45.4,363),
(151,254.3,15.4,95.6,'2012-01-04',0.6,11.7,'닭찜',22.3,500),
(152,328.4,7.4,163.8,'2012-01-04',0,21.3,'닭튀김',24.9,662),
(153,3,0.7,0,NULL,0.1,0,'당근',0.1,2),
(154,70,17.2,0,NULL,0,0,'당면',0,1),
(155,72,0.2,60.3,'2012-01-04',0,0.5,'대구',15.8,107),
(156,119,9.1,53.6,'2012-01-04',1.5,2.3,'대구매운탕',18.2,485),
(157,57,4.7,0,NULL,0.7,2.7,'대두',5.3,0),
(158,12,2.9,0,'2012-01-04',0.1,0.1,'대추(건과)',0.2,0),
(159,11,2.5,0,'2012-01-18',0.3,0.1,'더덕',0.8,1),
(160,31,6.1,0,'2012-01-18',0.6,0.7,'더덕무침',1.4,198),
(161,29,7.2,0,'2012-01-18',0.5,0.1,'도라지',0.7,7),
(162,62,8.8,0,'2012-01-18',0.6,3.1,'도라지나물',1,175),
(163,41,9.5,0,'2012-01-18',0.7,0.6,'도라지생채',1.2,264),
(164,309,30.5,82.5,'2012-01-04',0.2,19.5,'도우넛(링)',5.5,270),
(165,439,50.3,121,'2012-01-04',0.9,16.8,'도우넛(팥)',7.3,207),
(166,30,7.1,0,NULL,0.1,0.1,'도토리묵',0.1,39),
(167,52,8.6,0,'2012-01-11',0.3,1.7,'도토리묵무침',1.1,405),
(168,287.5,15.5,88.5,NULL,0.1,18.5,'돈까스',13.8,453),
(169,4,0.8,0,'2012-01-04',0.2,0.1,'돌나물',0.5,5),
(170,55,0.1,38,'2012-01-04',0,1.9,'돔(옥돔)',8.9,40),
(171,9,1.7,0,'2012-01-04',0.1,0,'동부',0.7,0),
(172,60.5,3.8,28.7,'2012-01-04',0.6,1,'동태국',9.8,674),
(173,80,2.3,51.3,'2012-01-11',0.4,1,'동태조림',15,515),
(174,71.1,4.5,31.3,NULL,0.6,1.4,'동태찌개',11,437),
(175,375,16.4,79,'2012-01-04',0.1,21.5,'돼지갈비구이',28,872),
(176,324.4,9.4,87,'2012-01-04',0.3,20,'돼지갈비찜',26,745),
(177,157,0.7,0,'2012-01-04',0,11.4,'돼지고기',11.6,11),
(178,270,1.3,89.7,NULL,0,18.1,'돼지고기(갈비)',24.1,79),
(179,513,1.2,99.2,NULL,0,44,'돼지고기(삼겹살)',26.7,68),
(180,20,0.5,6.3,'2012-01-04',0,0.6,'돼지고기가공품(등심햄)',2.5,162),
(181,39,0.4,9.3,NULL,0,2.8,'돼지고기가공품(런천미트)',2.3,124),
(182,17,0.4,7.1,'2012-01-04',0,0.9,'돼지고기가공품(베이컨)',1.6,133),
(183,105,1,17.5,NULL,0,8.5,'돼지고기가공품(비엔나소시지)',4.8,293),
(184,97,0.8,17.5,NULL,0,7.7,'돼지고기가공품(프랑크프르트소시지)',5,230),
(185,427.3,1.8,89.6,'2012-01-04',0,32.4,'돼지고기구이',28.4,1065),
(186,660.3,99.8,46.3,'2012-01-04',0.9,17.2,'돼지고기덮밥',22.7,831),
(187,260,10.1,44.2,'2012-01-04',0.6,17.6,'돼지고기볶음',15.4,562),
(188,91,2.6,19.3,'2012-01-04',0.1,5.8,'돼지고기장조림',6.4,233),
(189,136.2,5.1,24.6,'2012-01-16',0.6,8.7,'돼지고기찌개',10,686),
(190,256,11.7,40.4,'2012-01-04',0.6,17.2,'돼지불고기',13.9,379),
(191,24,2.7,0,'2012-01-04',0.3,0.7,'된장',2,898),
(192,33,2.3,0,'2012-01-17',0.4,0.8,'된장(가루된장)',4,0),
(193,60,5.6,2.3,'2012-01-04',0.4,2.2,'된장국',5.6,688),
(194,60.2,6.1,1.8,NULL,0.6,2.2,'된장찌개',5.4,637),
(195,13,2.2,1.5,'2012-01-04',0.8,0.2,'두릅',2.2,3),
(196,54,8.1,0,'2012-01-16',1.2,2.5,'두릅무침',3.2,987),
(197,50,0.8,0,NULL,0.1,3.4,'두부',5.6,3),
(198,156,5.4,7.1,'2012-01-04',0.9,11,'두부김치',12.1,371),
(199,50.1,0.6,0,'2012-01-06',0.1,3.9,'두부부침',4.1,111),
(200,89.4,3.3,0,NULL,0.5,5.9,'두부조림',8.2,355),
(201,88,5.6,0.7,'2012-01-04',0.4,4.7,'두부찌개',8.5,285),
(202,144,9.6,0,NULL,0,7.4,'두유음료',9,277),
(203,35,0,0,'2012-01-17',0,4,'들기름',0,0),
(204,8,0.8,0,'2012-01-04',0.6,0.7,'들깨',0.3,0),
(205,5,1.1,0,'2012-01-04',0.4,0.1,'들미나리',0.7,5),
(206,26,6.7,0,'2012-01-04',0.4,0.2,'딸기',0.6,10),
(207,49,12.6,0,'2012-01-04',0.1,0,'딸기잼',0.1,1),
(208,74,2.8,0,NULL,0.4,6.3,'땅콩',3.3,0),
(209,30,1.6,0,'2012-01-04',0.1,2.6,'땅콩버터',0.6,23),
(210,399,79.3,70.3,'2012-01-04',0.1,3.4,'떡국',11.2,1109),
(211,470,73.3,50.7,'2012-01-04',0.4,12.3,'떡만두국',15.6,1067),
(212,170,34.1,5.6,'2012-01-04',0.4,1.9,'떡볶이',4.7,457),
(213,521,81.6,75.9,NULL,0.7,19.8,'라면',13.2,1339),
(214,142,21.9,0.5,'2012-01-04',0,4.1,'롤빵',4.5,221),
(215,219,28.9,0,'2012-01-06',0.1,9.9,'롤케익',4.5,69),
(216,36,0,0.1,'2012-01-17',0,4.1,'마가린',0,22),
(217,13,3,0,NULL,0.1,0,'마늘',0.5,0),
(218,5.5,1.2,0,'2012-01-04',0.1,0,'마늘장아찌',0.4,8),
(219,14,2.4,0,NULL,0.3,0.6,'마늘쫑무침',0.5,75),
(220,31,4,0,'2012-01-04',0.7,1.8,'마늘쫑볶음',0.8,59),
(221,5.5,1.4,0,'2012-01-04',0.2,0,'마늘쫑장아찌',0.3,1),
(222,74,0.9,21.2,NULL,0,7.5,'마요네즈',0.1,46),
(223,59,3.4,2.5,'2012-01-04',0.3,3.7,'마파두부',4,360),
(224,184,7.2,0,NULL,0,0,'막걸리',6.4,24),
(225,473,42.4,149.8,'2012-01-04',0.7,22.8,'만두국',24.9,2190),
(226,7,1.8,0,'2012-01-17',0,0,'맛술(미림)',0,2),
(227,131,9.9,0,'2012-01-04',0,0,'맥주',1.1,18),
(228,9,1.9,0,'2012-01-04',0.4,0.1,'머위',1.2,6),
(229,29,3,0,'2012-01-04',0.7,1.8,'머위나물',1.6,136),
(230,21,2,16.7,'2012-01-04',0,0.5,'멍게',1.8,0),
(231,86,0.1,48,'2012-01-04',0,4,'메기',11.3,35),
(232,103,4.6,37.6,'2012-01-04',0.7,4.5,'메기매운탕',11.9,726),
(233,447,86.7,0,'2012-01-04',0,3,'메밀국수(건면)',18.2,1105),
(234,70,0.9,188,'2012-01-04',0,4.8,'메추라기알',5,62),
(235,88,4.4,207.3,'2012-01-04',0,4.9,'메추라기알장조림',5.9,613),
(236,12,0.2,5.7,NULL,0,0.3,'멸치(자건품, 중)',1.9,43),
(237,47,2.1,9.5,NULL,0,2.3,'멸치볶음',4.2,146),
(238,28,0.3,85,'2012-01-16',0,0.4,'명란알',5.6,41),
(239,18,0.4,52.5,'2012-01-16',0,0.5,'명란젓',3.1,530),
(240,37,0.1,29,NULL,0,0.3,'명태(동태)',8,105),
(241,58,0,59.4,'2012-01-06',0,0.6,'명태(북어)',12.3,99),
(242,185,6.4,109.1,'2012-01-04',0.4,3,'모듬회',32.4,740),
(243,472,92.4,2.6,'2012-01-04',0.7,3.2,'모밀국수',20.6,1462),
(244,5,0.2,4.4,'2012-01-16',0,0.1,'모시조개젓',0.9,0),
(245,5,1.4,0,'2012-01-17',0.2,0,'목이버섯(말린것)',0.2,1),
(246,28,6.8,0,NULL,0.5,0.1,'무',1.2,9),
(247,61.4,10.8,5,'2012-01-17',0.8,0.9,'무국',4.3,418),
(248,53,6.5,0,'2012-01-04',0.5,3,'무나물',1.3,226),
(249,56,10.3,1.8,'2012-01-17',0.8,0.7,'무된장국',3.6,674),
(250,11,2.6,0,'2012-01-04',0.3,0.1,'무말랭이',0.4,5),
(251,23.3,4.3,0,NULL,0.5,0.7,'무말랭이무침',0.8,93),
(252,19,3.5,0,'2012-01-04',0.4,0.6,'무말랭이장아찌',0.7,228),
(253,55,9.1,0,NULL,0.8,2.1,'무생채',1.6,277),
(254,13.2,1.7,0,'2012-01-17',0.2,0.9,'무장아찌(무초절임)',0.3,198),
(255,3,0.8,0,'2012-01-17',0.2,0,'무짠지',0.1,256),
(256,11,2.7,0,'2012-01-04',0.6,0.1,'무청',1.2,22),
(257,7,0,9,'2012-01-04',0,0.1,'문어',1.6,21),
(258,583,89,198.5,'2012-01-04',2.2,10.3,'물냉면',33.1,4067),
(259,59,15.1,0,'2012-01-17',0,0,'물엿',0,0),
(260,58,0.1,106.2,'2012-01-04',0,1.7,'미꾸라지',9.7,51),
(261,18.5,1.9,0,'2012-01-04',0.4,1.3,'미나리나물',0.7,114),
(262,21,2.7,0,'2012-01-04',0.4,1.2,'미나리무침',0.7,175),
(263,8,0.4,3.2,'2012-01-06',0,0.2,'미더덕',1,43),
(264,85,14.9,0,'2012-01-17',0.3,1.1,'미숫가루',3.1,6),
(265,6,2.2,0,'2012-01-04',0.1,0.2,'미역(말린것)',1.2,366),
(266,3,1.5,0,'2012-01-04',0.2,0.1,'미역(생것)',0.6,0),
(267,20.4,2.4,1.8,'2012-01-04',0.1,1.2,'미역국',2.1,780),
(268,12,1.5,0,'2012-01-17',0.2,0.9,'미역줄기볶음',0.6,271),
(269,23.1,4.4,0,'2012-01-17',0.3,1,'미역초무침',0.8,256),
(270,170,33.3,0,NULL,0.1,0.5,'밀가루(중력분)',5.2,9),
(271,108,28.5,0,NULL,0.3,0.3,'바나나',1.6,3),
(272,24,1,8.8,'2012-01-06',0,0.3,'바지락조개(모시조개)',4,130),
(273,16,3.7,0,NULL,0.1,0.1,'밤',0.3,0),
(274,59,16.4,0,NULL,0.9,0.2,'배',0.5,5),
(275,6,1.7,0,NULL,0.4,0,'배추',0.5,18),
(276,33.4,3.5,0,'2012-01-04',0.7,2.3,'배추겉절이',1.1,502),
(277,13,1.6,0,'2012-01-04',0.3,0.8,'배추나물',0.6,171),
(278,289,64,0,NULL,0.2,0.3,'백미',5,6),
(279,194.6,43,0,NULL,0.2,0.2,'백미죽',3.2,4),
(280,222,49.3,0,NULL,0.1,0.8,'백설기',3.3,222),
(281,19,0.9,11,'2012-01-17',0,0.3,'백합',2.9,0),
(282,36,0.1,83.4,'2012-01-17',0,1.1,'뱅어포',6,68),
(283,26.1,2.5,0.1,'2012-01-04',0.3,1.8,'버섯볶음',0.9,164),
(284,37,0,10,'2012-01-04',0,4.2,'버터',0,36),
(285,34,7.7,0,NULL,0.1,0.1,'보리',0.9,0),
(286,380.6,84.2,0,'2012-01-04',0.3,0.5,'보리밥',6.8,7),
(287,154,7.5,19.8,NULL,1.4,10,'보신탕',11,671),
(288,202,12.4,74.6,NULL,1.8,5.3,'보쌈',28.4,1878),
(289,93,6.3,43.2,'2012-01-17',1.4,1.5,'복매운탕',15.9,644),
(290,88,24,0,'2012-01-04',0.5,0.1,'복숭아(통조림)',0.3,8),
(291,80,0.1,56.7,'2012-01-04',0,0.9,'복어',16.9,137),
(292,123,6.2,64.6,NULL,0.7,1.9,'복지리',22.1,411),
(293,461.5,71.6,129.7,'2012-01-04',0.5,12.7,'볶음밥',12,587),
(294,46,0,33.8,'2012-01-04',0,1.3,'볼락',8,34),
(295,171.3,13.3,16.9,'2012-01-04',0.9,9.8,'부대찌개',9.1,778),
(296,6,1.2,0,'2012-01-04',0.3,0.2,'부추',0.9,2),
(297,24.3,3.3,0,'2012-01-04',0.7,1.1,'부추무침',1.7,390),
(298,158,21.8,24.8,'2012-01-04',0.4,5.3,'부추전',4.6,317),
(299,263,36.4,41.4,NULL,0.6,8.9,'부추전(가정식)',7.7,528),
(300,44,6.1,6.9,'2012-01-04',0.1,1.5,'부추전(외식)',1.3,88),
(301,112.4,2.8,119.9,NULL,0.2,3.8,'북어국',16.3,861),
(302,77,3,44.5,'2012-01-17',0,0.7,'북어조림',13.9,341),
(303,120,5.8,57.7,'2012-01-04',0.4,2.4,'북어찜',18.7,572),
(304,2,0.3,0,'2012-01-17',0,0,'분말조미료(쇠고기)',0.1,262),
(305,197.5,6.9,53,NULL,0.2,10.9,'불고기',17.4,700),
(306,132,4.6,35.3,'2012-01-04',0.2,7.3,'불고기(가정식)',11.6,466),
(307,230.4,8.1,61.8,'2012-01-04',0.3,12.8,'불고기(외식)',20.3,816),
(308,1,0.2,0,'2012-01-04',0.1,0,'붉은고추',0.1,0),
(309,8,1.5,0,NULL,0.4,0.1,'브로콜리',1.5,3),
(310,12,2,0,'2012-01-17',0.3,0.3,'비름',1.3,2),
(311,29,2.9,0,'2012-01-17',0.4,1.8,'비름나물',1.7,153),
(312,599,117.2,62,'2012-01-04',1.5,5.8,'비빔국수',17,2933),
(313,552,96.1,117.3,'2012-01-04',0.9,7.7,'비빔냉면',25.6,1354),
(314,588.9,95.1,214.7,NULL,1.8,14.1,'비빔밥',20.5,883),
(315,131,15.7,5.5,'2012-01-04',0,6.9,'비스킷(소프트)',1.4,55),
(316,86,15.6,4.4,'2012-01-04',0,2,'비스킷(하드)',1.5,64),
(317,28,5.8,0,'2012-01-17',0,0.3,'빵가루',1.1,43),
(318,69,18.2,0,NULL,0.8,0.6,'사과',0.3,11),
(319,72,1.7,39,'2012-01-17',0.1,7.3,'사우전드아일랜드드레싱',0.1,114),
(320,100,25.3,0,'2012-01-04',0,0,'사이다',0,13),
(321,24,5.9,0,NULL,0,0,'사탕',0,2),
(322,610.4,1.5,118,'2012-01-04',0,52.4,'삼겹살구이',31.7,843),
(323,395,32,134.5,'2012-01-04',0.6,15.4,'삼계탕(닭백숙)',30.4,857),
(324,55,0,28.8,'2012-01-17',0,2.4,'삼치',7.6,23),
(325,77,0,32.6,'2012-01-04',0,4.4,'삼치구이',8.6,282),
(326,72.5,4.3,27.7,'2012-01-12',0.6,2.6,'삼치조림',8.5,391),
(327,2,0.4,0,'2012-01-04',0.2,0.1,'상추',0.3,2),
(328,34,2.8,0,'2012-01-17',0.6,2.5,'상추겉절이',1.3,490),
(329,33,0,45.5,'2012-01-04',0,0.3,'새우(중하)',7,95),
(330,15,0.1,19.1,'2012-01-04',0,0.3,'새우(중하,자건품)',2.7,0),
(331,9.1,0.4,9.8,'2012-01-04',0,0.2,'새우볶음',1.4,39),
(332,2,0.1,6.9,'2012-01-04',0,0,'새우젓',0.4,325),
(333,2.4,0.1,3.1,NULL,0,0.1,'새우젓무침',0.4,311),
(334,358,35,191.2,NULL,0.3,18.4,'샌드위치',12.8,439),
(335,1,0.1,0,'2012-01-06',0,0,'생강',0,0),
(336,116,6.2,68.3,'2012-01-04',0,5.7,'생선가스',9.7,301),
(337,66.1,3.2,52.8,'2012-01-04',0,3.4,'생선전',5.2,229),
(338,454.2,74.8,119.7,'2012-01-04',0.4,4.2,'생선초밥',25.4,341),
(339,102,23,4.8,'2012-01-04',0,0.8,'샤베트',0.7,10),
(340,70,4,28,'2012-01-17',0.6,1.9,'선짓국',9.9,617),
(341,171.1,18.9,37.5,'2012-01-04',0.4,4.8,'설렁탕',13,1653),
(342,46,12,0,NULL,0,0,'설탕(백설탕)',0,0),
(343,46,11.9,0,'2012-01-04',0,0,'설탕(황설탕)',0,1),
(344,2,0.5,0,'2012-01-04',0.1,0,'셀러리',0.2,14),
(345,0,0,0,'2012-01-04',0,0,'소금',0,336),
(346,19,0.5,21.2,'2012-01-04',0,0.2,'소라',3.6,92),
(347,490,104.4,0,NULL,0.3,0.3,'소면(건면)',11.7,1945),
(348,63,0,0,'2012-01-04',0,0,'소주',0,0),
(349,282,0,0,'2012-01-04',0,0,'소주',0,0),
(350,95,20.5,0,'2012-01-04',0.1,0.6,'송편(깨)',1.6,97),
(351,263,0.9,55,'2012-01-04',0,19.5,'쇠고기,수입우(갈비)',18.5,41),
(352,101,0.4,27,'2012-01-04',0,7.2,'쇠고기,수입우(등심)',7.9,20),
(353,42,0.3,18.6,'2012-01-16',0,1.6,'쇠고기,수입우(사태)',6.2,18),
(354,53,0.4,18.6,'2012-01-16',0,2.3,'쇠고기,수입우(양지)',7.4,17),
(355,34,0.3,13.8,'2012-01-17',0,1.1,'쇠고기,수입우(우둔)',5.5,11),
(356,48,0.2,0,'2012-01-04',0,2.8,'쇠고기,한우',4.8,65),
(357,86,0.5,28.8,NULL,0,5.1,'쇠고기,한우(등심)',9,199),
(358,46,0.3,17.2,NULL,0,1.6,'쇠고기,한우(사태)',7.1,26),
(359,58,0.4,17.9,NULL,0,2.8,'쇠고기,한우(양지)',7.5,126),
(360,66,3.2,20.2,NULL,0.4,2.7,'쇠고기국',7.7,546),
(361,63,3.7,16.3,'2012-01-04',0.2,3.4,'쇠고기미역국',7.3,1056),
(362,39,0.4,73.8,'2012-01-17',0,1.4,'쇠고기부산물(간)',5.7,20),
(363,56,0.2,69.6,'2012-01-17',0,4.5,'쇠고기부산물(곱창)',3.6,18),
(364,20,1,13.6,'2012-01-17',0,0,'쇠고기부산물(선지)',4,239),
(365,104,9.1,31.6,'2012-01-04',0.3,4.6,'쇠고기산적',6.5,242),
(366,104,6.1,23.3,'2012-01-04',0.8,5.5,'쇠고기전골',8.7,367),
(367,31,6.9,0,'2012-01-06',0.3,0.5,'수박',1,1),
(368,25,5.2,0,'2012-01-04',0,0.2,'수수',0.7,0),
(369,465.8,103.5,0,'2012-01-17',0.8,1,'수수밥',8.6,9),
(370,127.1,3.2,60.4,'2012-01-04',0.1,4.2,'수육(쇠고기)',18.8,66),
(371,453.2,14.3,94.4,'2012-01-04',0,0.2,'수제비',2.8,0),
(372,4,0.6,0,NULL,0.1,0,'숙주나물',0.8,1),
(373,15.1,1.1,0,'2012-01-04',0.2,1,'숙주나물',1.1,260),
(374,64.1,1.1,0,NULL,0.6,3.1,'순대',0.8,848),
(375,127,11.3,44.3,'2012-01-04',0.9,5.1,'순대국',6.7,272),
(376,40,0.9,0,NULL,0.1,2.7,'순두부',4,5),
(377,80.3,4.3,75.5,'2012-01-04',0.6,4.3,'순두부찌개',7.7,374),
(378,145,20.6,0,'2012-01-04',0.1,5.9,'스낵과자(밀가루)',2.2,213),
(379,237,29.4,0,'2012-01-04',0,12.2,'스낵과자(옥수수)',2.3,212),
(380,514.4,85.9,11.3,'2012-01-04',0.5,9.9,'스파게티',16.5,419),
(381,309,63.4,0,'2012-01-04',0.2,0.2,'스파게티(건면)',9.5,16),
(382,152.2,22.2,14.2,'2012-01-04',1,6.2,'스프',3.4,61),
(383,14,2.7,0,NULL,0.4,0.2,'시금치',1.4,24),
(384,26,3.1,0,'2012-01-04',0.4,1.3,'시금치나물',1.7,154),
(385,35.1,5.1,1.4,NULL,0.6,0.8,'시금치된장국',3.4,621),
(386,38,5.4,1.9,'2012-01-17',0.8,0.8,'시래기된장국',3.7,784),
(387,93,21.7,0,NULL,0.6,0.2,'시리얼(콘푸레이크)',1.7,248),
(388,156,28.1,8.3,NULL,0.2,2.9,'식빵',4.6,36),
(389,1,0.2,0,NULL,0,0,'식초',0,0),
(390,89,26.6,0,NULL,0,0,'식혜',0.5,10),
(391,183,31.3,0,'2012-01-17',1.6,6.4,'쌀과자',1.3,90),
(392,405,89.5,0,NULL,0.3,0.4,'쌀밥',6.6,8),
(393,35,5.3,0,'2012-01-04',0.3,0.8,'쌈장',1.8,592),
(394,74,17.5,0,'2012-01-17',0,0.2,'쌍화차(분말)',0.5,27),
(395,31,9,0,'2012-01-06',2.1,0,'쑥',2.4,5),
(396,1,0.2,0,'2012-01-04',0.1,0,'쑥갓',0.2,2),
(397,52.5,11.7,1.7,'2012-01-17',2.5,0.5,'쑥된장국',4.5,513),
(398,12,2.8,0,'2012-01-04',0.4,0.1,'씀바귀',0.9,11),
(399,43,6.1,0,'2012-01-17',0.6,2.2,'씀바귀나물',1.6,376),
(400,89,5.6,39.3,'2012-01-04',1.1,2.5,'아구찜',12.5,350),
(401,48,0.2,38.5,'2012-01-04',0,0.4,'아귀',10.1,91),
(402,48,1.6,0,NULL,0,4.3,'아몬드',1.5,0),
(403,0,0.1,0,'2012-01-04',0,0,'아스파라거스',0.1,0),
(404,10,1.3,0,'2012-01-17',0.5,0.3,'아욱',1.8,18),
(405,39.2,4.2,9.7,'2012-01-17',0.8,1,'아욱된장국',5.2,663),
(406,216,27.8,38.4,NULL,0,9.6,'아이스크림',4.7,132),
(407,178,17.8,37.6,'2012-01-04',0,10.4,'아이스크림(소프트,바닐라)',3.3,49),
(408,173,22.6,37.6,'2012-01-04',0,8.8,'아이스크림바(초콜렛)',3,61),
(409,167,22,24.4,'2012-01-04',0,7.7,'아이스크림콘(바닐라)',2.7,84),
(410,255,43,42.6,'2012-01-04',0.5,8,'약과',2.3,20),
(411,39.2,3.9,23.7,'2012-01-04',0.5,0.5,'양념꽃게장',5.3,709),
(412,6,1.6,0,NULL,0.2,0,'양배추',0.2,2),
(413,56,2.9,13.6,NULL,0.2,4.8,'양배추샐러드',0.3,52),
(414,3,0.8,0,'2012-01-04',0.2,0,'양상추',0.3,2),
(415,2,0.5,0,NULL,0.1,0,'양송이버섯',0.4,1),
(416,71,0,0,'2012-01-04',0,0,'양주(위스키)',0,1),
(417,3,0.8,0.1,'2012-01-04',0,0,'양파',0.1,0),
(418,35,4.4,4.1,NULL,0,0.6,'어묵',3,187),
(419,53,7,10.5,NULL,0.2,0.9,'어묵국',4.6,368),
(420,88.7,10.1,12.3,NULL,0.1,3.1,'어묵볶음',5.5,526),
(421,1,0,4,NULL,0,0,'어패류액젓(멸치액젓)',0.2,171),
(422,12,0.2,17.5,NULL,0,0.5,'어패류액젓(어란젓)',1.5,0),
(423,12,0.8,16.5,NULL,0,0.3,'어패류액젓(창란젓)',1.3,1),
(424,17,4.1,0,'2012-01-04',0.2,0,'연근',0.5,9),
(425,24,5.2,0,'2012-01-04',0.4,0.3,'연근조림',0.8,182),
(426,45,0.9,0,'2012-01-04',0.1,2.6,'연두부',5.7,6),
(427,88.2,2.8,77.8,'2012-01-17',0.2,5,'연두부찌개',9.5,128),
(428,34,0.1,9,'2012-01-04',0,1.5,'연어(훈제)',4.6,159),
(429,6,1.3,0,'2012-01-06',0.4,0,'열무',1.1,16),
(430,127,31.4,0,'2012-01-04',0,0,'엿',0.7,3),
(431,334.1,72.5,0,'2012-01-04',0.7,0.8,'오곡밥',7,222),
(432,86,22.4,0,'2012-01-04',0.6,0.2,'오렌지',1.8,2),
(433,84,21,0,NULL,0,0.4,'오렌지주스',1.4,4),
(434,525,1.7,132,'2012-01-04',0,45.5,'오리고기',26.4,140),
(435,508.1,2,127.3,'2012-01-04',0.1,43.9,'오리고기로스',25.5,834),
(436,519.4,90.8,206.8,'2012-01-04',0.9,9.7,'오므라이스',14.6,858),
(437,4,0.9,0,NULL,0.2,0,'오이',0.3,2),
(438,7.1,1.2,0,'2012-01-04',0.2,0.3,'오이생채',0.3,258),
(439,6.5,1.1,0,'2012-01-17',0.2,0.3,'오이생채(가정식)',0.2,235),
(440,12,1.9,0,'2012-01-17',0.4,0.6,'오이생채(단체급식)',0.4,423),
(441,1,0.3,0,'2012-01-04',0.1,0,'오이지',0.1,217),
(442,7.1,1.2,0,'2012-01-04',0.2,0.3,'오이지무침',0.3,258),
(443,33.7,9.3,0,'2012-01-04',0.2,0.1,'오이피클',0.2,244),
(444,33,0,102.9,NULL,0,0.5,'오징어',6.8,63),
(445,53,0,127,NULL,0,1,'오징어(말린것)',10.2,147),
(446,62,3.7,141.7,'2012-01-17',0.6,0.8,'오징어국',10.2,494),
(447,455.6,84.2,249.3,'2012-01-04',1.4,1.9,'오징어덮밥',23.7,736),
(448,40,2.8,85.8,'2012-01-04',0.3,0.6,'오징어무침',6.1,319),
(449,95,6.8,147.8,NULL,0.5,3.2,'오징어볶음',10.6,338),
(450,15.4,0.4,29.3,'2011-12-27',0,0.2,'오징어젓무침',2.8,777),
(451,38,1.8,93.9,'2012-01-17',0.2,0.5,'오징어찌개',6.6,216),
(452,98.3,5.7,176.4,'2012-01-17',0.2,2.5,'오징어채무침',13.5,416),
(453,108,5.3,189.6,NULL,0.1,3.2,'오징어채볶음',14.2,485),
(454,46,2.3,63.5,'2012-01-04',0,1.9,'오징어튀김',4.5,39),
(455,31,2,58.2,'2012-01-17',0,0.6,'오징어포조림',4.4,137),
(456,35,0,0,'2012-01-17',0,4,'옥수수기름',0,0),
(457,10,2.2,0,'2012-01-04',0.1,0.1,'옥수수통조림',0.3,29),
(458,90,19.1,0,'2012-01-17',0.8,1,'옥수수튀밥',2.9,1),
(459,4,1,0,'2012-01-04',0.2,0.1,'올리브',0.1,2),
(460,37,0,0,'2012-01-04',0,4,'올리브유',0,0),
(461,8,1.5,0,'2012-01-06',0.2,0,'완두콩',0.6,0),
(462,84,2.5,35.1,NULL,0.1,6.1,'완자전',4.6,125),
(463,98,22.4,0,NULL,0,0.2,'요구르트(액상)',2.3,93),
(464,109,17.7,12.1,NULL,0.1,3,'요구르트(호상, 딸기)',3.5,58),
(465,55,12.5,0,NULL,0,0.1,'요구르트음료',1.3,52),
(466,30,3,5,'2012-01-04',0.5,0.9,'우거지국',3.1,542),
(467,370,56.6,148.9,NULL,0.4,5.9,'우동',20.2,2321),
(468,177,36.8,0,'2012-01-04',0.2,0.5,'우동국수(생면)',4.4,192),
(469,4,0.9,0,'2012-01-17',0,0,'우스터소스',0,84),
(470,10,2.3,0,'2012-01-06',0.2,0,'우엉',0.5,1),
(471,44,8.6,0,'2012-01-04',0.7,1,'우엉조림',1.4,246),
(472,120,9.4,22,NULL,0,6.4,'우유',6.4,110),
(473,48,4,0,'2012-01-04',0.5,2.2,'유부',4.6,1),
(474,463.4,81.3,0,NULL,1.6,8.2,'유부초밥',16.5,444),
(475,25,6.3,0,'2012-01-17',0.1,0,'유자차(분말)',0,0),
(476,86,6.2,45.9,'2012-01-04',1.1,3.8,'육개장',8.6,621),
(477,60,11.5,0,'2012-01-17',0.1,1.1,'율무차(분말)',1.1,59),
(478,9,1.9,0,'2012-01-04',0,0.1,'은행',0.3,0),
(479,63,15.8,0,NULL,0,0,'이온스포츠음료',0,100),
(480,28,6.8,0,'2012-01-17',0,0,'인삼차(과립)',0.1,2),
(481,109,22.4,0,NULL,0.2,0.9,'인절미',2.5,174),
(482,102,0,35,'2012-01-17',0,6.3,'임연수구이',10.3,197),
(483,83,0,33.5,'2012-01-17',0,4.4,'임연수어',9.9,55),
(484,794,113.9,17.6,NULL,0.8,26,'자장면',22.2,1131),
(485,33,4.4,0,'2012-01-04',0.2,0.8,'자장소스',2.4,581),
(486,16,0.8,3.8,'2012-01-16',0,0.7,'잔멸치볶음',1.5,56),
(487,638,118.7,135.6,'2012-01-04',1.6,6.6,'잔치국수',22.5,3489),
(488,189.4,28.5,8.8,NULL,0.5,7,'잡채',4.4,489),
(489,447.4,75.4,13.5,'2012-01-04',0.5,11,'잡채밥',9.5,469),
(490,20,0.3,0,'2012-01-04',0,2,'잣',0.4,0),
(491,156,0.1,60,'2012-01-04',0,9.5,'장어(갯장어)',15.7,52),
(492,220,12.8,58.9,'2012-01-04',0.6,11.5,'장어양념구이',16.5,537),
(493,45,2.4,17.1,NULL,0,1.2,'장조림',6.1,388),
(494,33,2,26.6,'2012-01-17',0,0.7,'재첩(재치조개,갱조개)',4.4,137),
(495,84,5.8,0,'2012-01-04',0,0,'적포도주',0.2,7),
(496,9,0.5,13.5,'2012-01-04',0,0.1,'전복',1.5,0),
(497,184.6,32,25.9,'2012-01-04',0.1,3.4,'전복죽',5.1,276),
(498,17,4.1,0,'2012-01-17',0,0,'전분',0,0),
(499,110,21.9,0,NULL,0.1,0.4,'절편',2.2,93),
(500,124,2.7,59.5,'2012-01-04',0.1,2.8,'제육(돼지고기)',21.7,47),
(501,28,1.5,9.6,NULL,0,0.3,'조개국',4.5,292),
(502,42,0,39.2,NULL,0,0.8,'조기',8.2,70),
(503,112,0,64.9,NULL,0,3.8,'조기구이',18.3,368),
(504,80.1,5.4,40.1,'2012-01-17',0.9,1.4,'조기매운탕',12.6,690),
(505,73,0.8,47.6,'2012-01-04',0.1,1.4,'조기찜',13.6,143),
(506,73.4,3,30,'2012-01-04',0,3.4,'조기튀김',7.1,215),
(507,2,0.3,0,'2012-01-17',0,0,'조미분',0.2,0),
(508,2,0.2,0,'2012-01-17',0,0,'조미소',0.5,159),
(509,165,0.3,60.8,'2012-01-04',0,11.6,'족발',15.5,76),
(510,23,0.2,135.5,'2012-01-17',0,0.2,'주꾸미',4.9,0),
(511,3,0.5,0,'2012-01-04',0.3,0.1,'죽순',0.7,2),
(512,393,78,0,'2012-01-17',0,1.7,'중국국수(생면)',12,574),
(513,50,5.1,14.1,'2012-01-04',0,0.3,'쥐치(말린것)',6.3,226),
(514,555,83.7,91.4,NULL,1.3,14.4,'짬뽕',21.2,1592),
(515,580.3,95.6,101.7,'2012-01-04',1.3,4.4,'쫄면',15.4,897),
(516,23,4.6,0,'2012-01-04',0.1,0.3,'차조',0.6,0),
(517,383.9,84.2,0,'2012-01-17',0.4,0.7,'차조밥',6.6,7),
(518,387.9,85.3,0,'2012-01-04',0.5,0.4,'찰밥',7.1,5),
(519,126,26.5,0,'2012-01-06',0.5,1.1,'찰옥수수',4.4,1),
(520,35,0,0,NULL,0,4,'참기름',0,0),
(521,42.1,5.5,0,'2012-01-17',1.1,2.2,'참나물',2.6,569),
(522,13,3,0,'2012-01-17',0.7,0.2,'참나물',1.4,2),
(523,25,10.5,0,'2012-01-06',7.6,0.6,'참외',3.1,14),
(524,83,1.6,9.7,'2012-01-17',0.3,6.1,'참치찌개',5.2,397),
(525,56,12.3,0,'2012-01-06',0.1,0.1,'찹쌀',1.1,0),
(526,165,35.3,0,'2012-01-04',0.4,1,'찹쌀떡',3.4,113),
(527,31,0.5,0,'2012-01-04',0.5,1.5,'청국장',3.5,1082),
(528,79,2.5,2.4,'2012-01-04',0.9,4.2,'청국장찌개',8.5,1457),
(529,48,1.9,0,'2012-01-04',0,0,'청주',0.3,1),
(530,193,7.6,0,'2012-01-04',0,0,'청주',1.1,4),
(531,33.4,0.6,15.4,'2012-01-04',0.1,1.9,'청포묵무침',1.2,212),
(532,30,8.2,0,'2012-01-04',0.2,0,'초고추장',0.8,564),
(533,248,32,4.5,'2012-01-04',0,11.6,'초코바',4.5,161),
(534,153,22.3,14.7,NULL,0,6.6,'초코파이',1.5,73),
(535,98,13,16,NULL,0,9.2,'초콜릿',2,23),
(536,94.1,6.4,104.6,NULL,1.3,3,'추어탕',12,764),
(537,14,3.2,0,'2012-01-04',0.8,0.2,'취나물',1.5,7),
(538,30,3.4,0,'2012-01-04',0.7,1.8,'취나물',1.6,106),
(539,23,5.4,0,'2012-01-17',1.1,0.2,'취나물(말린것)',2.2,0),
(540,64,0.3,16,NULL,0,4.6,'치즈',5.3,62),
(541,62,1.1,16,'2012-01-04',0,4.8,'치즈,가공치즈',3.7,227),
(542,32,1.9,2.1,'2012-01-04',0,1.5,'치즈,모짜렐라',2.6,98),
(543,1,0.3,0,'2012-01-04',0.1,0,'치커리',0.2,0),
(544,41,8,0.9,'2012-01-17',0,1.1,'카라멜',0.2,10),
(545,32,4.7,0,'2012-01-04',0.1,1.2,'카레(분말)',0.8,376),
(546,433.8,75,15.3,'2012-01-04',0.8,8.8,'카레라이스',12.2,1180),
(547,162,27.6,129,'2012-01-04',0.1,4.3,'카스테라',3.4,53),
(548,425,94.5,4.3,NULL,0.6,2.6,'칼국수',13.4,3344),
(549,226,51.8,0,'2012-01-04',0.2,1.3,'칼국수(반건)',5.8,1591),
(550,20,8.8,0,'2012-01-17',0,0.7,'캔커피',1.1,92),
(551,29,3.6,0,'2012-01-17',0,1.4,'커피(분말크림)',0.5,13),
(552,19,4.4,0,'2012-01-04',0,0,'커피(설탕)',0.4,1),
(553,40,6.6,0,'2012-01-04',0,1.4,'커피(설탕,분말크림)',0.5,13),
(554,6,1.1,0,'2012-01-04',0,0,'커피(원두,블랙)',0.3,2),
(555,54,9.2,0,'2012-01-17',0,1.8,'커피믹스',0.6,16),
(556,7,1.4,0,'2012-01-17',0,0,'커피분말',0.4,1),
(557,33,3.4,0,NULL,0,2.1,'커피프림',0.2,18),
(558,317,41.9,6.5,'2012-01-04',0.4,15.7,'케이크(생크림)',3.8,122),
(559,437,40.2,31.6,'2012-01-04',0.2,30.4,'케이크(초코릿)',4.7,129),
(560,343,39.7,53.4,'2012-01-04',0.3,19.4,'케이크(파운드)',4.8,134),
(561,100,25,0,NULL,0,0,'콜라',0,0),
(562,738,111.3,0,'2012-01-04',4.5,16.3,'콩국수',40.6,2775),
(563,35,0,0,'2012-01-17',0,4,'콩기름',0,0),
(564,25,2.2,0,NULL,0.6,1.6,'콩나물',2.2,203),
(565,12,1.4,0,NULL,0.4,0.5,'콩나물',2,2),
(566,18.2,2.3,1,'2012-01-17',0.6,0.6,'콩나물국',2.6,319),
(567,549.3,105.2,11.6,'2012-01-04',1.9,6.2,'콩나물밥',18,504),
(568,383.3,80,0,NULL,0.7,2,'콩밥',8.8,7),
(569,15,2.9,0,'2012-01-17',0.9,0.4,'콩비지',0.9,12),
(570,69,9,7.6,'2012-01-04',2.5,3,'콩비지찌개',4.9,584),
(571,38,3.8,0,NULL,0.4,1.7,'콩조림(콩자반)',3,87),
(572,140,20.7,21.3,'2012-01-04',0,5.6,'쿠키',1.8,105),
(573,175,20.6,0,'2012-01-04',0.1,9.7,'크래커',2.5,222),
(574,172,20.6,0,'2012-01-04',0,8.5,'크래커(샌드)',3.1,307),
(575,237,23.8,136,'2012-01-04',0.3,14.6,'크로켓',4.8,277),
(576,288,47.8,70.4,'2012-01-04',0.2,8.1,'크림빵',6.3,168),
(577,24,6.5,0,'2012-01-04',0.6,0.2,'키위',0.4,1),
(578,230,19.9,66.2,'2012-01-04',0.4,11.5,'탕수육',8.9,276),
(579,26,5.9,0,'2012-01-17',0.4,0.1,'토란',1.1,1),
(580,45,13.1,0,'2012-01-17',2.1,0.2,'토란대(말린것)',1.5,2),
(581,14,3.3,0,'2012-01-04',0.4,0.1,'토마토',0.9,5),
(582,27,6.5,0,'2012-01-04',0.8,0.2,'토마토주스',1.7,132),
(583,6,1.6,0,'2012-01-04',0,0,'토마토케첩',0.1,49),
(584,16,3.9,0,'2012-01-04',0,0,'토마토페이스트',0.7,38),
(585,6,2.5,0,'2012-01-04',0.5,0.2,'톳',1,205),
(586,32,7.7,0,'2012-01-17',0.7,0.9,'톳나물',1.6,928),
(587,3,0.7,0,NULL,0.1,0,'파',0.2,0),
(588,3,1.2,0,NULL,0.1,0,'파래',1,339),
(589,43,4.3,0,NULL,0.4,3,'파래무침',1.6,721),
(590,50,3,0,'2012-01-16',0.7,4.2,'파무침',1.5,114),
(591,10,2.8,0,NULL,0.2,0,'파인애플',0.2,2),
(592,109.2,14.3,35.2,'2012-01-04',0.3,4.1,'파전',3.2,197),
(593,50,5.8,0,'2012-01-04',0.2,3.1,'팝콘',0.8,78),
(594,34,6.8,0,NULL,0.5,0,'팥',1.9,0),
(595,344.9,75.5,0,'2012-01-16',0.7,0.4,'팥밥',7.1,7),
(596,195,41.4,0,NULL,0.8,0.8,'팥시루떡',5.4,200),
(597,247.5,52.1,0,'2012-01-04',1.5,0.3,'팥죽',8.8,329),
(598,3,0.6,0,NULL,0.1,0,'팽이버섯',0.3,1),
(599,39,10.6,0,'2012-01-06',0.1,0.1,'포도',0.4,4),
(600,11,3,0,'2012-01-04',0,0,'포도,건포도',0.1,0),
(601,110,29,0,'2012-01-04',0,0.4,'포도주스',0.6,2),
(602,3,0.6,0,'2012-01-04',0.1,0,'표고버섯',0.2,1),
(603,8,1.9,0,'2012-01-04',0.2,0.1,'표고버섯(말린것)',0.5,1),
(604,2,0.5,0,NULL,0,0.1,'풋고추',0.1,1),
(605,11,0.8,3,NULL,0,0.1,'풋고추조림',0.5,112),
(606,4,0.9,0,'2012-01-04',0.1,0.1,'풋마늘',0.4,1),
(607,1,0.3,0,'2012-01-04',0.1,0,'피망',0,0),
(608,390,43.6,31.5,'2012-01-04',0.4,17.3,'피자',17.5,577),
(609,103.3,5.3,43.2,'2012-01-04',0.1,6.2,'함박스테이크',6.6,230),
(610,124,9.2,22,'2012-01-04',0,7.4,'핫도그',5.3,342),
(611,86.3,6,50.5,'2012-01-04',0.7,1.4,'해물탕',13.9,473),
(612,5,0.3,0,'2012-01-04',0,0.1,'해삼',0.7,260),
(613,7,0.5,47.8,'2012-01-04',0,0.1,'해파리',1,1200),
(614,344,38.1,42,'2012-01-04',0.5,14.7,'햄버거',17,747),
(615,42,9.3,0,NULL,0.3,0.3,'현미',0.9,9),
(616,389.3,86,0,'2012-01-04',1.3,1.1,'현미밥',7.1,34),
(617,98,0.4,0,'2012-01-04',0.4,10,'호두',2.3,1),
(618,8,2.1,0,NULL,0.1,0,'호박(애호박)',0.5,0),
(619,32,3.6,0.1,'2012-01-04',0.3,2,'호박나물',0.9,182),
(620,76,6.2,70.6,'2012-01-04',0.2,4.5,'호박전',2.9,214),
(621,243.6,51.4,0,NULL,1.5,0.2,'호박죽',8.6,308),
(622,229,46.4,3.6,'2012-01-04',0.4,0.8,'호빵',6.6,200),
(623,26,0,26.4,'2012-01-16',0,0.2,'홍어',5.9,67),
(624,44.4,4.3,23.1,'2012-01-17',0.4,0.8,'홍어회무침',5.7,283),
(625,72,17.5,0,'2012-01-04',0,0,'홍차',0.2,5),
(626,3,0.3,0,'2012-01-04',0,0.2,'홍차',0.3,3),
(627,64,16.6,0,'2012-01-17',0,0,'홍차음료',0,4),
(628,14,0.8,9.8,'2012-01-04',0,0.2,'홍합',1.9,52),
(629,28,2.8,0.8,'2012-01-17',0.2,2.2,'홍합미역국',1.8,824),
(630,696.5,121.9,51.2,'2012-01-06',2.5,5.5,'회덮밥',39.8,892),
(631,0,0,0,'2012-01-04',0,0,'효모',0,0),
(632,367,47.2,0,'2012-01-04',4,19.7,'후렌치후라이',4.4,223),
(633,29,7.7,0,'2012-01-04',0.2,0.2,'후르츠샐러드(칵테일)',0.1,1),
(634,3,0.7,0,NULL,0.1,0,'후추',0.1,0),
(635,387.2,85,0,'2012-01-04',0.4,0.7,'흑미밥',6.7,7);
/*!40000 ALTER TABLE `성분정리표` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `영상`
--

DROP TABLE IF EXISTS `영상`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `영상` (
  `영상번호` bigint(20) NOT NULL AUTO_INCREMENT,
  `영상제목` varchar(255) DEFAULT NULL,
  `내용` varchar(255) DEFAULT NULL,
  `총영상길이` time(6) DEFAULT NULL,
  `영상등록일` date DEFAULT NULL,
  `강의번호` varchar(255) DEFAULT NULL,
  `영상썸네일소스` varchar(255) DEFAULT NULL,
  `컨텐츠이미지` varchar(255) DEFAULT NULL,
  `강의소개` varchar(255) DEFAULT NULL,
  `조회수` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`영상번호`),
  KEY `FKdytcw308sfk0iuj545f2hbt53` (`강의번호`),
  CONSTRAINT `FKdytcw308sfk0iuj545f2hbt53` FOREIGN KEY (`강의번호`) REFERENCES `강의` (`강의번호`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `영상`
--

LOCK TABLES `영상` WRITE;
/*!40000 ALTER TABLE `영상` DISABLE KEYS */;
INSERT INTO `영상` VALUES
(1,'하루 한시간 맨몸운동 클래스','변화가 눈으로 확인되는 고강도 홈트레이닝','00:00:01.000000','2024-06-01','H','1','https://i.ibb.co/51nWbCt/image.png','빠른 변화가 필요하시거나 평소 고강도의 운동을 즐기시는 분들에게 추천하는 과정입니다.\n 맨몸운동으로 강도는 강하지만 집에서도 충분히 즐길 수 있는 클래스입니다. \n 다가올 여름을 위해 단기 몸만들기를 원하시는 분들께 강추드립니다 :)',14),
(2,'9가지 대표운동 킨스트레치','스쿼트 푸쉬업 달리기까지 한큐에',NULL,'2024-06-02','H',NULL,'https://i.ibb.co/51nWbCt/image.png','운동을 시작하기에 앞서 운동 동작에 필요한 관절의 움직임을 세세하게 배울 수 있는 클래스입니다. 우리 몸의 관절을 이해하고 움직임을 조절하는 법을 배우며 유연성을 늘려보아요! 전문가가 아닌 일반인들도 운동 동작을 매끄럽게 이해할 수 있습니다 :)',12),
(3,'왕초보 맨몸운동 클래스','기초부터 시작하는 맨몸운동',NULL,'2024-06-04','H',NULL,'https://i.ibb.co/51nWbCt/image.png','운동에 경험이 적은 입문자를 위한 맨몸운동 클래스입니다. 운동이 어색한 초보자분들도 기초부터 탄탄히 시작할 수 있는 첫 단추가 되어줄 과정입니다. 피트니스센터는 부담스럽고 시간이 부족해서 운동을 못했던 입문자 여러분들을 환영합니다!',31),
(4,'육쌤의 3개월 단기 홈트레이닝','바디프로필 고민중이라면?',NULL,'2024-06-04','H',NULL,'https://i.ibb.co/51nWbCt/image.png','탄탄한 경력을 가진 육선생님이 알려주는 3개월 단기 홈트레이닝, 바디프로필 이제 집에서 준비해보세요! 헬로피티와 함께라면 단기홈트를 통해 여러분도 바프에 도전할 수 있답니다 :)',1),
(5,'케틀벨 전신 홈트레이닝','좁은공간에서도 충분히 함께할 수 있는',NULL,'2024-06-04','H',NULL,'https://i.ibb.co/51nWbCt/image.png','집에서 온라인클래스로 운동을 배울 때 가장 난감했던 공간 차지! 이젠 케틀벨 운동을 통해 자리를 많이 차지하지 않으면서도 높은 웨이트 효과를 경험해보세요 케틀벨 하나면 전신운동 OK!',7),
(6,'하루 30분 홈필라테스 배우기','직장인들 하루 피로를 풀어줄',NULL,'2024-06-05','P',NULL,'https://i.ibb.co/6mSs10m/image.png','바쁘다 바빠 현대사회! 잘못된 자세로 장시간 근무하는 직장인들에게 제격인 과정입니다. 시간이 부족해도 하루 삼십분이면 괜찮아요 :) 헬로피티와 함께 필라테스를 통해 건강하게 피로를 풀고싶으신 분들 환영합니다 :)',3),
(7,'체형교정 다이어트 필라테스','체형고정이 고민인 학생, 직장인을 위한',NULL,'2024-06-06','P',NULL,'https://i.ibb.co/6mSs10m/image.png','책상에 오래 있을 수 밖에 없는 직장인, 학생분들 위해 준비했습니다! 내 체형에 맞는 자세를 알아보고 함께 배워볼 수 있는 클래스입니다. 바른 체형과 자세만큼 중요한 건 없습니다, 지금 바로 시작해보세요!',10),
(8,'매일매일 10분 홈스트레칭','출근전, 퇴근후 간단하게',NULL,'2024-06-07','P',NULL,'https://i.ibb.co/6mSs10m/image.png','외출 전에도, 외출 시 틈틈히, 외출 후에도 10분씩 간단하게 시작하는 스트레칭 바깥에서 항상 긴장되어있는 내 몸의 근육을 위해 지금 시작해보세요 :)',3),
(9,'음악과 즐기는 필라테스 홈트','지루하고 어려운 홈트는 이제 그만',NULL,'2024-06-08','P',NULL,'https://i.ibb.co/6mSs10m/image.png','필라테스는 어렵고 지루하다고 생각하셨을 여러분을 위해 준비했습니다. 흥부자들 모여라! 음악과 함께 필라테스를 할 수 있는 즐거운 과정입니다. 입문자, 초보자 모두 함께 즐길 수 있는 가볍고 기분좋은 클래스입니다 :)',32),
(10,'하루 20분 홈 기구 필라테스','간단한 기구로 즐길 수 있는',NULL,'2024-06-09','P',NULL,'https://i.ibb.co/6mSs10m/image.png','자리 공간을 적게 차지하면서도 간단하게 즐길 수 있는 기구 필라테스 강좌입니다. 기구를 이용해 더욱 즐겁고 효과있는 필라테스를 즐겨보세요!',197),
(11,'예비엄마를 위한 임산부 필라테스','예비엄마들 모여라',NULL,'2024-06-10','P',NULL,'https://i.ibb.co/6mSs10m/image.png','예비 엄마들의 건강을 위해 헬로피티가 준비한 클래스입니다. 예비 엄마는 물론 출산을 한지 얼마 안된 초보 엄마들도 하루 잠깐의 시간을 투자하여 몸과 마음의 건강을 챙겨보시는건 어떨까요? :)',34),
(12,'하루 10분 요가 클래스','요가로 찾은 내 몸의 선',NULL,'2024-06-16','Y',NULL,'https://i.ibb.co/XtCkB8T/image.png','하루 10분으로 찾은 몸과 마음의 편안함 내 몸의 선을 찾아보고 차분한 요가 클래스를 통해 잠시의 휴식을 가져보세요. 입문자 혹은 초보자 여러분들께 적극 추천하는 헬로피티의 요가 클래스입니다.',23),
(13,'근막테라피 요가 클래스','한번의 짧은 시간으로 몸의 통증을 풀어주는',NULL,'2024-06-12','Y',NULL,'https://i.ibb.co/XtCkB8T/image.png','근육통과 같은 일상 속 몸의 통증을 요가로 극복할 수 있는 근막테라피 요가 클래스입니다. 기분좋은 습관으로 더욱 가벼워진 아침을 맞이해보세요. 변화하는 내 몸이 즐거움을 선사해줄거에요 :)',26),
(14,'하루 10분 아로마 요가 4주 플랜','지친 내 몸, 힐링이 필요하다면?',NULL,'2024-06-13','Y',NULL,'https://i.ibb.co/XtCkB8T/image.png','하루 10분으로 즐기는 아로마테라피, 아로마요가 4주 플랜 클래스입니다. 아로마는 몸과 마음을 진정시켜주고 근육을 이완시켜줍니다. 지친 일상 속 내 몸에게 선물해보세요!',3),
(15,'체중 감량을 위한 파워요가','우리에게 꼭 필요한 기초 코어운동',NULL,'2024-06-17','H','Test','https://i.ibb.co/51nWbCt/image.png','오늘 요가 뭐하지?',21),
(16,'요가와 명상 입문 클래스','몸과 마음의 무게 덜어내기',NULL,'2024-06-15','Y',NULL,'https://i.ibb.co/XtCkB8T/image.png','지친 일상 속 자신에게 위로를 건네주는 힐링 명상 클래스 몸과 마음의 무거운 짐을 덜어내고 잠시 집중해보세요, 하루의 고민이 눈녹듯 사라질거에요 :)',14),
(17,'하루 10분 현대인 뷰티 요가 클래스','현대인 필수 입문 코스',NULL,'2024-06-16','Y',NULL,'https://i.ibb.co/XtCkB8T/image.png','직장인, 학생도 부담없이 즐길 수 있는 10분 뷰티요가 클래스입니다. 예쁜 몸은 만들고싶지만 시간이 없어 속상했던 현대인분들 모이세요!',81),
(18,'넓은어깨 필수운동 덤벨 숄더프레스','절대 안 커지는 어깨, 이 운동이면 커집니다!',NULL,'2024-06-17','H','Test','https://i.ibb.co/51nWbCt/image.png','어깨 부위별 타겟법',90);
/*!40000 ALTER TABLE `영상` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `영상리뷰`
--

DROP TABLE IF EXISTS `영상리뷰`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `영상리뷰` (
  `영상리뷰번호` varchar(255) NOT NULL,
  `리뷰등록일` date DEFAULT NULL,
  `리뷰내용` varchar(255) DEFAULT NULL,
  `영상번호` bigint(20) DEFAULT NULL,
  `사용자아이디` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`영상리뷰번호`),
  KEY `FKg2nbvwejkucs0ynbtq7722qlv` (`영상번호`),
  KEY `FKg28mttvgrrdrdu6e319t167et` (`사용자아이디`),
  CONSTRAINT `FKg28mttvgrrdrdu6e319t167et` FOREIGN KEY (`사용자아이디`) REFERENCES `사용자` (`사용자아이디`),
  CONSTRAINT `FKg2nbvwejkucs0ynbtq7722qlv` FOREIGN KEY (`영상번호`) REFERENCES `영상` (`영상번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `영상리뷰`
--

LOCK TABLES `영상리뷰` WRITE;
/*!40000 ALTER TABLE `영상리뷰` DISABLE KEYS */;
/*!40000 ALTER TABLE `영상리뷰` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `진도율`
--

DROP TABLE IF EXISTS `진도율`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `진도율` (
  `진도율고유번호` int(11) NOT NULL AUTO_INCREMENT,
  `저장시점` int(11) DEFAULT NULL,
  `구독번호` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`진도율고유번호`),
  UNIQUE KEY `UKla423bhyd2yln9xvovuvv97n6` (`구독번호`),
  CONSTRAINT `FKef6mslbk91c2m1kdslukqylhv` FOREIGN KEY (`구독번호`) REFERENCES `구독` (`구독번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `진도율`
--

LOCK TABLES `진도율` WRITE;
/*!40000 ALTER TABLE `진도율` DISABLE KEYS */;
/*!40000 ALTER TABLE `진도율` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'laeh_projectdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-27 16:02:27
