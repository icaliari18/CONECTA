import express from 'express';

import {
    cadastrarEvento,
    listarEventos,
    buscarEvento,
    atualizarEvento,
    excluirEvento
} from '../controllers/eventosController.js';

import {
    autenticar
} from '../middlewares/autenticacao.js';

import {
    autorizar
} from '../middlewares/autorizacao.js';

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

// Cadastrar evento
router.post(
    '/',
    autorizar('administrador', 'colaborador'),
    cadastrarEvento
);

// Listar eventos
router.get(
    '/',
    autorizar('administrador', 'colaborador'),
    listarEventos
);

// Buscar evento específico
router.get(
    '/:id',
    autorizar('administrador', 'colaborador'),
    buscarEvento
);

// Atualizar evento
router.put(
    '/:id',
    autorizar('administrador', 'colaborador'),
    atualizarEvento
);

// Excluir evento (somente administrador)
router.delete(
    '/:id',
    autorizar('administrador'),
    excluirEvento
);

export default router;