-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 29, 2024 at 07:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crudApi`
--

-- --------------------------------------------------------

--
-- Table structure for table `notizen`
--

CREATE TABLE `notizen` (
  `id` int(11) NOT NULL,
  `titel` varchar(50) NOT NULL,
  `inhalt` varchar(500) NOT NULL,
  `erstellungsdatum` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notizen`
--

INSERT INTO `notizen` (`id`, `titel`, `inhalt`, `erstellungsdatum`) VALUES
(26, 'Treffen mit Freunden', 'Treffen mit John, Sarah und Mike zum Abendessen im neuen italienischen Restaurant.', '2024-07-28'),
(27, 'Familiengeburtstag', 'Überraschungsparty für Mama mit allen Verwandten organisieren.', '2024-07-29'),
(28, 'Arbeitsangelegenheiten', 'Das Quartalsbericht fertigstellen und an den Manager senden.', '2024-07-30'),
(29, 'Einkaufsliste', 'Einkaufen: Milch, Eier, Brot und frisches Gemüse.', '2024-07-31'),
(30, 'Geschäftsmeeting', 'Wöchentliches Teammeeting um 10 Uhr im Konferenzraum.', '2024-08-01'),
(31, 'Arzttermin', 'Jährliche Untersuchung beim Hausarzt!', '2024-08-02'),
(32, 'Projektabgabe', 'Das Projekt für den Kunden bis Freitag abschließen.', '2024-08-03'),
(33, 'Geburtstagsvorbereitungen', 'Geschenk für Peters Geburtstag kaufen und einpacken.', '2024-08-04'),
(34, 'Fitnessstudio', 'Trainingseinheit im Fitnessstudio um 18 Uhr.', '2024-08-05'),
(35, 'Urlaubsplanung', 'Nächsten Sommerurlaub mit der Familie planen.', '2024-08-06'),
(36, 'Autoreparatur', 'Termin in der Werkstatt für die Autoreparatur vereinbaren.', '2024-08-07'),
(37, 'Buchclubtreffen', 'Diskussion über das Buch des Monats im Buchclub.', '2024-08-08'),
(38, 'Hausarbeit', 'Wohnung putzen und Wäsche waschen.', '2024-08-09'),
(39, 'Kochabend', 'Neues Rezept ausprobieren und Freunde zum Abendessen einladen.', '2024-08-10'),
(40, 'Weiterbildung', 'Anmeldung zum Online-Kurs über Projektmanagement.', '2024-08-11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notizen`
--
ALTER TABLE `notizen`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notizen`
--
ALTER TABLE `notizen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
