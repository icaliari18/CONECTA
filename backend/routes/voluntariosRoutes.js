
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

const router = express.Router();

router.use(autenticar);

router.post('/', cadastrarVoluntario);
router.get('/', listarVoluntarios);
router.get('/:id', buscarVoluntario);
router.put('/:id', atualizarVoluntario);
router.delete('/:id', excluirVoluntario);

export default router;