import express from 'express';

import {
    cadastrarRecurso,
    listarRecursos,
    buscarRecurso,
    atualizarRecurso,
    excluirRecurso
} from '../controllers/recursosController.js';

import {
    autenticar
} from '../middlewares/autenticacao.js';

import {
    autorizar
} from '../middlewares/autorizacao.js';

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

// Cadastrar recurso
router.post(
    '/',
    autorizar('administrador', 'colaborador'),
    cadastrarRecurso
);

// Listar recursos
router.get(
    '/',
    autorizar('administrador', 'colaborador'),
    listarRecursos
);

// Buscar recurso específico
router.get(
    '/:id',
    autorizar('administrador', 'colaborador'),
    buscarRecurso
);

// Atualizar recurso
router.put(
    '/:id',
    autorizar('administrador', 'colaborador'),
    atualizarRecurso
);

// Excluir recurso (somente administrador)
router.delete(
    '/:id',
    autorizar('administrador'),
    excluirRecurso
);

export default router;