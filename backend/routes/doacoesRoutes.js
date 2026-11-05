
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

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

router.post('/', cadastrarDoacao);
router.get('/', listarDoacoes);
router.get('/:id', buscarDoacao);
router.put('/:id', atualizarDoacao);
router.delete('/:id', excluirDoacao);

export default router;
