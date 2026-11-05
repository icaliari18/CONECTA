import express from 'express';

import {
    login
} from '../controllers/usuariosController.js';

import {
    autenticar
} from '../middlewares/autenticacao.js';

import {
    autorizar
} from '../middlewares/autorizacao.js';

const router = express.Router();

// Rota de login
router.post('/login', login);

// Rota para consultar os dados do usuário logado
router.get('/perfil', autenticar, (req, res) => {
    res.status(200).json({
        mensagem: 'Usuário autenticado com sucesso!',
        usuario: req.usuario
    });
});

// Rota de teste exclusiva para administradores
router.get(
    '/somente-admin',
    autenticar,
    autorizar('administrador'),
    (req, res) => {
        res.status(200).json({
            mensagem: 'Acesso permitido para administrador!'
        });
    }
);

export default router;