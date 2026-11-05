
import jwt from 'jsonwebtoken';

export function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensagem: 'Acesso não autorizado. Faça login.'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            mensagem: 'Token não fornecido.'
        });
    }

    try {
        const dadosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = dadosUsuario;

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado.'
        });
    }
}