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

const router = express.Router();

// Todas as rotas exigem login
router.use(autenticar);

// Cadastrar atendimento
router.post('/', cadastrarAtendimento);

// Listar atendimentos
router.get('/', listarAtendimentos);

// Buscar atendimento específico
router.get('/:id', buscarAtendimento);

// Atualizar atendimento
router.put('/:id', atualizarAtendimento);

// Excluir atendimento
router.delete('/:id', excluirAtendimento);

export default router;
