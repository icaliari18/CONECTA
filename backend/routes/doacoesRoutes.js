import express from 'express';

import {
    cadastrarDoacao,
    listarDoacoes,
    buscarDoacao,
    atualizarDoacao,
    excluirDoacao
} from '../controllers/doacoesController.js';

import {
    autenticar
} from '../middlewares/autenticacao.js';

import {
    autorizar
} from '../middlewares/autorizacao.js';

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

// Cadastrar doação
router.post(
    '/',
    autorizar('administrador', 'colaborador'),
    cadastrarDoacao
);

// Listar doações
router.get(
    '/',
    autorizar('administrador', 'colaborador'),
    listarDoacoes
);

// Buscar doação específica
router.get(
    '/:id',
    autorizar('administrador', 'colaborador'),
    buscarDoacao
);

// Atualizar doação
router.put(
    '/:id',
    autorizar('administrador', 'colaborador'),
    atualizarDoacao
);

// Excluir doação (somente administrador)
router.delete(
    '/:id',
    autorizar('administrador'),
    excluirDoacao
);

export default router;