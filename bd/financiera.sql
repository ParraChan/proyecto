--crear y usar la base de datos
CREATE DATABASE IF NOT EXISTS financiera;
USE financiera;

CREATE TABLE clientes (
	id_cliente INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(45) NOT NULL,
	apellido_paterno VARCHAR(45) NOT NULL,
	apellido_materno VARCHAR(45) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	ingresos_mensuales DECIMAL(10,2) NOT NULL
);

CREATE TABLE roles(
	id_rol INT AUTO_INCREMENT PRIMARY KEY,
	nombre_rol VARCHAR(45) NOT NULL
);

CREATE TABLE usuarios (
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(45) NOT NULL,
	apellido_paterno VARCHAR(45) NOT NULL,
	apellido_materno VARCHAR(45) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	fecha_ingreso DATE NOT NULL,
	puesto INT NOT NULL,
	FOREIGN KEY (puesto) REFERENCES roles(id_rol)
);

CREATE TABLE creditos (
	id_credito INT AUTO_INCREMENT PRIMARY KEY,
	monto_credito DECIMAL(10,2) NOT NULL,
	fecha_entrega DATE NOT NULL,
	numero_pagos ENUM('10', '12', '16', '24') NOT NULL,
	frecuencia_pagos ENUM('semanal', 'quincenal', 'mensual') NOT NULL,
	estatus_pago ENUM('Pagado', 'Pendiente de pago') NOT NULL,
	id_cliente INT NOT NULL,
	id_usuario INT NULL,
	FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);


