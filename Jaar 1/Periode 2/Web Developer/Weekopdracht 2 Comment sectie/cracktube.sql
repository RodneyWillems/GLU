-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2023 at 08:40 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cracktube`
--

CREATE TABLE `cracktube` (
  `id` int(10) NOT NULL,
  `videoid` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `comment` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cracktube`
--

INSERT INTO `cracktube` (`id`, `videoid`, `username`, `email`, `comment`) VALUES
(1, 1, 'Deonide', 'Deonide@gmail.com', 'Yes'),
(2, 2, 'GohanBlade', 'GohanBlade@gmail.com', 'No'),
(3, 4, 'GohanBlade', 'gohanblade@gmail.com', 'I loved that ending !!!!'),
(4, 4, 'Deonide', 'Deonide@gmail.com', 'I hated this video !!! >:('),
(5, 1, 'Laclac', 'Loic@gaming.net', 'I really liked number 5!'),
(6, 2, 'Zakaria', 'Zak@gaming.net', 'I missed \"Nope\" why????'),
(7, 3, 'Mark', 'MarkVerrips@gmail.com', 'Ik hou van mayo de noche!');
(8, 5, 'GohanBlade', 'Gohanblade@gmail.com', 'I loved the FNAF movie !!!');)

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cracktube`
--
ALTER TABLE `cracktube`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cracktube`
--
ALTER TABLE `cracktube`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
