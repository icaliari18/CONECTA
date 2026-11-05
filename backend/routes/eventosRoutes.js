import express from 'express';

import {
    cadastrarEvento,
    listarEventos,
    buscarEvento,
    atualizarEvento,
    excluirEvento
} from '../controllers/eventosController.js';

import { autenticar } from '../middlewares/autenticacao.js';

const router = express.Router();

router.use(autenticar);

router.post('/', cadastrarEvento);
router.get('/', listarEventos);
router.get('/:id', buscarEvento);
router.put('/:id', atualizarEvento);
router.delete('/:id', excluirEvento);

export default router;