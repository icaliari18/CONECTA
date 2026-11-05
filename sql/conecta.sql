CREATE DATABASE IF NOT EXISTS conecta;

USE conecta;

CREATE TABLE IF NOT EXISTS instituicoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instituicao_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador', 'colaborador') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (instituicao_id)
        REFERENCES instituicoes(id)
);

CREATE TABLE IF NOT EXISTS atendimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instituicao_id INT NOT NULL,
    usuario_responsavel_id INT,
    nome_atendido VARCHAR(150) NOT NULL,
    tipo_atendimento VARCHAR(100) NOT NULL,
    descricao TEXT,
    status ENUM('pendente', 'em andamento', 'concluido')
        DEFAULT 'pendente',
    data_atendimento DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (instituicao_id)
        REFERENCES instituicoes(id),

    FOREIGN KEY (usuario_responsavel_id)
        REFERENCES usuarios(id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS doacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instituicao_id INT NOT NULL,
    nome_doador VARCHAR(150),
    tipo_doacao VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade DECIMAL(10,2) NOT NULL,
    data_recebimento DATE NOT NULL,
    observacoes TEXT,

    FOREIGN KEY (instituicao_id)
        REFERENCES instituicoes(id)
);

CREATE TABLE IF NOT EXISTS recursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instituicao_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    quantidade DECIMAL(10,2) NOT NULL DEFAULT 0,
    unidade VARCHAR(30) NOT NULL,
    quantidade_minima DECIMAL(10,2) DEFAULT 0,

    FOREIGN KEY (instituicao_id)
        REFERENCES instituicoes(id)
);

CREATE TABLE IF NOT EXISTS voluntarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instituicao_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    telefone VARCHAR(20),
    area_atuacao VARCHAR(100),
    disponibilidade VARCHAR(150),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (instituicao_id)
        REFERENCES instituicoes(id)
);

CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instituicao_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    `local` VARCHAR(150),
    data_evento DATETIME NOT NULL,
    capacidade INT,
    status ENUM('planejado', 'confirmado', 'realizado', 'cancelado')
        DEFAULT 'planejado',

    FOREIGN KEY (instituicao_id)
        REFERENCES instituicoes(id)
);