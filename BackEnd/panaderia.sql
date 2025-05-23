-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db:3306
-- Tiempo de generación: 18-05-2025 a las 17:04:43
-- Versión del servidor: 11.6.2-MariaDB-ubu2404
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `panaderia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Pan integral', 'Panes formados con harina integral.'),
(2, 'Pan blanco', 'Nuestros panes hechos con harina común'),
(3, 'Salado', 'Productos panadería salados'),
(4, 'Dulce', 'Productos dulces recién horneados o tartas ricas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas_contacto`
--

CREATE TABLE `consultas_contacto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `consulta` text DEFAULT NULL,
  `fecha_envio` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `consultas_contacto`
--

INSERT INTO `consultas_contacto` (`id`, `nombre`, `email`, `telefono`, `consulta`, `fecha_envio`) VALUES
(1, 'Pepe', 'pepe@gmail.com', '665544772211', 'Me gustaría consultaros si tenéis pan de molde', '2025-05-11 17:24:30'),
(4, 'Jose', 'user@outlook.es', '558877441', 'hjuguyguy giuhoihiguygiuho', '2025-05-13 17:24:17'),
(5, 'Julia', 'julia@gmail.com', '554477896', 'La masa de las magdalenas están muy ricas, cuál es la receta?', '2025-05-16 14:11:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unidad` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `detalle_pedidos`
--

INSERT INTO `detalle_pedidos` (`id`, `pedido_id`, `producto_id`, `cantidad`, `precio_unidad`) VALUES
(5, 15, 1, 5, 0.70),
(8, 28, 1, 4, 0.70),
(9, 28, 2, 4, 1.20),
(10, 29, 11, 4, 23.89),
(11, 30, 1, 1, 0.80),
(12, 30, 2, 5, 1.20),
(13, 31, 1, 2, 0.80),
(14, 31, 2, 2, 1.20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha_pedido` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','enviado','cancelado','entregado') DEFAULT 'pendiente',
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `usuario_id`, `fecha_pedido`, `estado`, `total`) VALUES
(15, 6, '2025-05-14 00:00:00', 'pendiente', 3.50),
(20, 6, '2025-05-16 00:00:00', 'pendiente', 2.10),
(21, 6, '2025-05-16 00:00:00', 'pendiente', 1.40),
(22, 6, '2025-05-16 00:00:00', 'pendiente', 1.40),
(23, 6, '2025-05-16 00:00:00', 'pendiente', 2.10),
(24, 6, '2025-05-16 00:00:00', 'pendiente', 1.40),
(25, 6, '2025-05-16 00:00:00', 'pendiente', 2.80),
(26, 6, '2025-05-16 00:00:00', 'pendiente', 2.80),
(27, 6, '2025-05-16 00:00:00', 'pendiente', 2.80),
(28, 6, '2025-05-16 00:00:00', 'pendiente', 7.60),
(29, 6, '2025-05-15 00:00:00', 'entregado', 95.56),
(30, 1, '2025-05-18 00:00:00', 'pendiente', 6.80),
(31, 1, '2025-05-18 00:00:00', 'pendiente', 4.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `categoria_id` int(11) DEFAULT NULL,
  `imagen_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `categoria_id`, `imagen_url`) VALUES
(1, 'Pan Integral', 'Con harina integral', 0.80, 18, 1, 'barra-integral.jpg'),
(2, 'Pan largo', 'Pan horneado diariamente que es más largo y con menos miga', 1.20, 18, 2, 'barra-clasica.jpg'),
(9, 'Pan especial', 'Pan horneado diariamente que es más largo y con harina especial', 2.20, 2, 2, 'barra-turris.jpg'),
(11, 'Pan de queso', 'Un increíble pan de queso', 23.89, 30, 3, 'pan-con-queso.jpg'),
(12, 'Chusco clásico', 'Un chusco muy rico', 1.50, 24, 2, 'chusco-clasico.jpg'),
(13, 'Tarta de queso', 'Una tarta de queso deliciosa', 15.00, 4, 4, 'tarta-queso.jpg'),
(14, 'Tarta sacher', 'Una deliciosa tarta de chocolate con mermelada de albaricoque en su interior', 15.00, 3, 4, 'tarta-sacher.jpg'),
(15, 'Tarta de zanahoria', 'Una deliciosa tarta de zanahoria', 15.00, 3, 4, 'carrot-cake.jpg'),
(16, 'Tarta red velvet', 'Una deliciosa tarta de chocolate con glaseado a base de crema de queso, mantequilla y azúcar', 15.00, 3, 4, 'red-velvet.png'),
(17, 'Saint honore', 'Se compone de una base de pasta quebrada, sobre la que se dispone una espiral de pasta choux y sobre ella, una corona de bocaditos de esa misma pasta rellenos de crema chiboust', 15.00, 3, 4, 'saint-honore.jpg'),
(18, 'Selva negra', 'Una deliciosa tarta de chocolate para los amantes del chocolate', 15.00, 3, 4, 'selva-negra.jpg'),
(19, 'Chajá', 'Una deliciosa tarta de merengue, bizcochuelo, crema doble y sus frutas características son el durazno y la frutilla.', 15.00, 3, 4, 'chaja.png'),
(20, 'Lemon pie', 'Una deliciosa tarta de limón', 15.00, 3, 4, 'lemon-pie.jpg'),
(21, 'Tarta san marcos', 'Varias capas de bizcocho, rellena de nata montada, crema de trufa (naya con chocolate), y cubierta de yema tostada.', 12.00, 2, 4, 'san-marcos.jfif'),
(22, 'Tarta santiago', 'Una tarta de bizcocho con azucar glass por encima. Deliciosa.', 8.00, 4, 4, 'tarta-santiago.jpg'),
(23, 'Tarta tatin', 'Una deliciosa tarta de hojaldre con manzana', 10.00, 2, 4, 'tarta-tatin.jpg'),
(24, 'Chusco especial', 'Un chusco con nuestro ingrediente secreto y mucho amor', 10.00, 2, 2, 'chusco-turris.jpg'),
(25, 'Hogaza', 'Una deliciosa hogaza creada con nuestra harina de fuerza', 10.00, 2, 2, 'hogaza.jpg'),
(26, 'Pan de molde', 'Pan de molde horneado a diario, más largo y con una miga suave y ligera. Perfecto para tostadas o sándwiches.', 10.00, 2, 2, 'molde-clasico.jpg'),
(27, 'Pan de molde', 'Pan de coca ligero y con textura esponjosa, hecho con harina de calidad y fermentación lenta. Ideal para tapas o para servir con aceite y sal.', 10.00, 2, 2, 'pan-de-coca.jpg'),
(28, 'Burger brioche', 'Pan brioche para burger, tierno y ligeramente dulce, con un acabado brillante. Ideal para dar un toque gourmet a tus hamburguesas.', 10.00, 2, 2, 'burger-brioche.jpg'),
(29, 'Chusco integral', 'Pan chusco integral, con sabor intenso y textura rústica. Rico en fibra y hecho con masa madre.', 10.00, 2, 1, 'chusco-integral.jpg'),
(30, 'Barra integral', 'El clásico pan integral con las mejores harinas integrales.', 10.00, 2, 1, 'barra-integral.jpg'),
(31, 'Pan de leche', 'Un pan de leche mullido', 0.80, 14, 2, 'pan-leche.jpg'),
(32, 'Croissant de jamón y queso', 'Croissant relleno de jamón y queso, crujiente por fuera y fundente por dentro. Una combinación clásica que nunca falla.', 1.20, 8, 3, 'croissant-de-jamon-y-queso.jpg'),
(33, 'Empanada de espinacas y champiñones', 'Empanada vegetal con espinacas y champiñones, envuelta en una masa crujiente y dorada. Una opción deliciosa y equilibrada.', 1.50, 8, 3, 'empanada-de-espinacas-y-pinones.jpg'),
(34, 'Empanada de pollo', 'Empanada rellena de pollo guisado con cebolla y pimiento. Sabor casero.', 1.50, 8, 3, 'empanada-de-pollo.jpg'),
(35, 'Empanadilla de atún', 'Empanadilla rellena de atún, tomate y huevo. Sabor tradicional en formato pequeño.', 1.40, 12, 3, 'empanadilla-de-atun.jpg'),
(36, 'Quiche jamón york', 'Tarta salada elaborada con huevos, nata y jamón york, sobre una base de masa quebrada.', 1.40, 12, 3, 'quiche-de-jamon-york-y-queso.jpg'),
(37, 'Quiche de puerros y champiñones', 'Tarta salada hecha con puerros pochados y champiñones salteados, mezclados con huevos y nata. Textura ligera y deliciosa.', 1.40, 12, 3, 'quiche-de-puerros-y-champinones.jpg'),
(38, 'Quiche de verduras', 'Quiche de verduras asadas con masa crujiente y relleno cremoso. Ligera, sabrosa y llena de color.', 1.40, 10, 3, 'quiche-de-verduras.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_empleo`
--

CREATE TABLE `solicitudes_empleo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mensaje` text NOT NULL,
  `cv_archivo` longblob NOT NULL,
  `fecha_envio` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `solicitudes_empleo`
--

INSERT INTO `solicitudes_empleo` (`id`, `nombre`, `email`, `mensaje`, `cv_archivo`, `fecha_envio`) VALUES
(3, 'Luis', 'usuariotest@gmail.com', 'fsaoifjasofjoasdsa', 0x313734363935363239345f65323836623762366335313732616361396635622e706466, '2025-05-11 09:38:14'),
(4, 'luis', 'systemAdminPanaderia@outlook.com', 'fasdasdsa', 0x313734363935363634335f39363066636339613630323232663335373038622e706466, '2025-05-11 09:44:03'),
(7, 'Pepito', 'emailprueba@gmail.com', '', 0x313734363935383236375f36643962393735313133616232306366383035342e706466, '2025-05-11 10:11:07'),
(9, 'Jessi', 'JessicaTest@gmail.com', 'poh va a seh ezo', 0x313734373135373135395f62376164323464666535346236663930663938332e706466, '2025-05-13 17:25:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `rol` enum('superadmin','admin','usuario') DEFAULT 'usuario',
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `email`, `contrasenya`, `rol`, `fecha_creacion`) VALUES
(1, 'superadmin', 'systemAdminPanaderia@outlook.com', '$2y$10$uH3/Wbc1/LJl2LPzlAcxTuAbHIMlHYJLw35zgPgLwUiTBNdtw7Fam', 'superadmin', '2025-04-20 16:38:34'),
(2, 'usuariotest', 'usuariotestupdateado@gmail.com', '$2y$10$.3X4l461KdzV1glknMfDQOsUXZNurjUqIoCL8uPSPZP.Tt1HL3F8G', 'admin', '2025-04-30 17:31:57'),
(6, 'user', 'user@gmail.com', '$2y$10$uH3/Wbc1/LJl2LPzlAcxTuAbHIMlHYJLw35zgPgLwUiTBNdtw7Fam', 'usuario', '2025-05-01 11:41:46'),
(10, 'jessicatest', 'jessicatest2@gmail.com', '$2y$10$yAMhEg5/Y/PiWOpkStOB9Oc/uSIiWjU4lmzIE2hWn6KkipedieEwy', 'usuario', '2025-05-03 16:29:18'),
(12, 'usuarioNuevoTest', 'usuario@gmail.com', '$2y$10$PVp6ftxR/1mcZtZsprszjODuXLOskhH3MasmwnpHvmSWZTbJrFXDO', 'usuario', '2025-05-11 11:56:35');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `consultas_contacto`
--
ALTER TABLE `consultas_contacto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `detalle_pedidos_ibfk_1` (`pedido_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `solicitudes_empleo`
--
ALTER TABLE `solicitudes_empleo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `consultas_contacto`
--
ALTER TABLE `consultas_contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `solicitudes_empleo`
--
ALTER TABLE `solicitudes_empleo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
