import express from 'express';
import { cadastrarInstituicao } from '../controllers/instituicoesController.js';

const router = express.Router();

router.post('/cadastro', cadastrarInstituicao);

export default router;