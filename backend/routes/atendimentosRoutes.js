import express from 'express';

import {
    cadastrarAtendimento,
    listarAtendimentos,
    buscarAtendimento,
    atualizarAtendimento,
    excluirAtendimento
} from '../controllers/atendimentosController.js';

import {
    autenticar
} from '../middlewares/autenticacao.js';

import {
    autorizar
} from '../middlewares/autorizacao.js';

const router = express.Router();

// Todas as rotas exigem login
router.use(autenticar);

// Cadastrar atendimento
router.post(
    '/',
    autorizar('administrador', 'colaborador'),
    cadastrarAtendimento
);

// Listar atendimentos
router.get(
    '/',
    autorizar('administrador', 'colaborador'),
    listarAtendimentos
);

// Buscar atendimento específico
router.get(
    '/:id',
    autorizar('administrador', 'colaborador'),
    buscarAtendimento
);

// Atualizar atendimento
router.put(
    '/:id',
    autorizar('administrador', 'colaborador'),
    atualizarAtendimento
);

// Excluir atendimento (somente administrador)
router.delete(
    '/:id',
    autorizar('administrador'),
    excluirAtendimento
);

export default router;