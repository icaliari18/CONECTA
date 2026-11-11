import conexao from '../database/conexao.js';
import bcrypt from 'bcryptjs';

export async function cadastrarInstituicao(req, res) {
    const {
        nomeInstituicao,
        emailInstituicao,
        telefone,
        cidade,
        estado,
        nomeAdministrador,
        emailAdministrador,
        senha
    } = req.body;

    if (
        !nomeInstituicao ||
        !emailInstituicao ||
        !nomeAdministrador ||
        !emailAdministrador ||
        !senha
    ) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos obrigatórios.'
        });
    }

    if (senha.length < 8) {
        return res.status(400).json({
            mensagem: 'A senha deve ter pelo menos 8 caracteres.'
        });
    }

    const conexaoBanco = await conexao.getConnection();

    try {
        await conexaoBanco.beginTransaction();

        const [instituicao] = await conexaoBanco.execute(
            `INSERT INTO instituicoes
            (nome, email, telefone, cidade, estado)
            VALUES (?, ?, ?, ?, ?)`,
            [
                nomeInstituicao,
                emailInstituicao,
                telefone || null,
                cidade || null,
                estado || null
            ]
        );

        const instituicaoId = instituicao.insertId;

        const senhaHash = await bcrypt.hash(senha, 10);

        await conexaoBanco.execute(
            `INSERT INTO usuarios
            (instituicao_id, nome, email, senha, tipo)
            VALUES (?, ?, ?, ?, ?)`,
            [
                instituicaoId,
                nomeAdministrador,
                emailAdministrador,
                senhaHash,
                'administrador'
            ]
        );

        await conexaoBanco.commit();

        return res.status(201).json({
            mensagem: 'Instituição e administrador cadastrados com sucesso!'
        });

    } catch (erro) {
        await conexaoBanco.rollback();

        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensagem: 'Já existe uma instituição ou usuário com esse e-mail.'
            });
        }

        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao cadastrar a instituição.'
        });

    } finally {
        conexaoBanco.release();
    }
}