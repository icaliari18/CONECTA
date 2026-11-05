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

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

router.post('/', cadastrarRecurso);
router.get('/', listarRecursos);
router.get('/:id', buscarRecurso);
router.put('/:id', atualizarRecurso);
router.delete('/:id', excluirRecurso);

export default router;