-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-21 03:48:58
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `baidunews`
--

CREATE TABLE `baidunews` (
  `id` int(11) NOT NULL,
  `newstype` char(200) NOT NULL,
  `newstitle` varchar(200) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `newstime` datetime NOT NULL,
  `newssrc` char(100) NOT NULL,
  `isDelete` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `baidunews`
--

INSERT INTO `baidunews` (`id`, `newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`, `isDelete`) VALUES
(7, '精选', '比尔盖茨比尔盖茨比尔盖茨1', 'img/1.jpg', '2017-03-18 00:00:00', '极客学院', 0),
(9, '百家', '有信用 自由行1', 'img/2.jpg', '2017-03-16 10:50:00', '极客学院', 0),
(10, '本地', '比尔盖茨比尔盖茨比尔盖茨2', 'img/1.jpg', '2017-03-16 00:00:00', '极客学院', 1),
(11, '精选', '有信用 自由行2', 'img/2.jpg', '2017-03-16 00:00:00', '极客学院', 1),
(12, '图片', '有信用 自由行3', 'img/2.jpg', '2017-03-17 15:30:00', '极客学院', 0),
(13, '精选', '一个新的新闻', 'img/2.jpg', '2017-03-16 00:30:00', '极客学院', 0),
(14, '精选', 'rr', 'rr', '2017-03-22 10:25:00', 'rr', 1),
(15, '本地', '这里是另一个新闻', 'img/2.jpg', '2017-03-23 11:46:43', '本地', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `baidunews`
--
ALTER TABLE `baidunews`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `baidunews`
--
ALTER TABLE `baidunews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
