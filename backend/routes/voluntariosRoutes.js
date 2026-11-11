import express from 'express';

import {
    cadastrarVoluntario,
    listarVoluntarios,
    buscarVoluntario,
    atualizarVoluntario,
    excluirVoluntario
} from '../controllers/voluntariosController.js';

import {
    autenticar
} from '../middlewares/autenticacao.js';

import {
    autorizar
} from '../middlewares/autorizacao.js';

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

// Cadastrar voluntário
router.post(
    '/',
    autorizar('administrador', 'colaborador'),
    cadastrarVoluntario
);

// Listar voluntários
router.get(
    '/',
    autorizar('administrador', 'colaborador'),
    listarVoluntarios
);

// Buscar voluntário específico
router.get(
    '/:id',
    autorizar('administrador', 'colaborador'),
    buscarVoluntario
);

// Atualizar voluntário
router.put(
    '/:id',
    autorizar('administrador', 'colaborador'),
    atualizarVoluntario
);

// Excluir voluntário (somente administrador)
router.delete(
    '/:id',
    autorizar('administrador'),
    excluirVoluntario
);

export default router;