
import conexao from '../database/conexao.js';

// CADASTRAR ATENDIMENTO
export async function cadastrarAtendimento(req, res) {
    try {
        const {
            nome_atendido,
            tipo_atendimento,
            descricao
        } = req.body;

        if (!nome_atendido || !tipo_atendimento) {
            return res.status(400).json({
                mensagem: 'Informe o nome da pessoa atendida e o tipo de atendimento.'
            });
        }

        const instituicao_id = req.usuario.instituicao_id;
        const usuario_responsavel_id = req.usuario.id;

        const [resultado] = await conexao.query(
            `INSERT INTO atendimentos
            (instituicao_id, usuario_responsavel_id, nome_atendido, tipo_atendimento, descricao)
            VALUES (?, ?, ?, ?, ?)`,
            [
                instituicao_id,
                usuario_responsavel_id,
                nome_atendido,
                tipo_atendimento,
                descricao || null
            ]
        );

        return res.status(201).json({
            mensagem: 'Atendimento cadastrado com sucesso!',
            id: resultado.insertId
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao cadastrar atendimento.'
        });
    }
}

// LISTAR ATENDIMENTOS DA INSTITUIÇÃO
export async function listarAtendimentos(req, res) {
    try {
        const instituicao_id = req.usuario.instituicao_id;

        const [atendimentos] = await conexao.query(
            `SELECT * FROM atendimentos
            WHERE instituicao_id = ?
            ORDER BY data_atendimento DESC`,
            [instituicao_id]
        );

        return res.status(200).json(atendimentos);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao listar atendimentos.'
        });
    }
}

// BUSCAR UM ATENDIMENTO PELO ID
export async function buscarAtendimento(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [atendimentos] = await conexao.query(
            `SELECT * FROM atendimentos
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (atendimentos.length === 0) {
            return res.status(404).json({
                mensagem: 'Atendimento não encontrado.'
            });
        }

        return res.status(200).json(atendimentos[0]);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao buscar atendimento.'
        });
    }
}

// ATUALIZAR ATENDIMENTO
export async function atualizarAtendimento(req, res) {
    try {
        const { id } = req.params;

        const {
            nome_atendido,
            tipo_atendimento,
            descricao,
            status
        } = req.body;

        const instituicao_id = req.usuario.instituicao_id;

        if (!nome_atendido || !tipo_atendimento) {
            return res.status(400).json({
                mensagem: 'Informe o nome da pessoa atendida e o tipo de atendimento.'
            });
        }

        const statusPermitidos = [
            'pendente',
            'em andamento',
            'concluido'
        ];

        if (status && !statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensagem: 'Status inválido.'
            });
        }

        const [resultado] = await conexao.query(
            `UPDATE atendimentos
            SET nome_atendido = ?,
                tipo_atendimento = ?,
                descricao = ?,
                status = ?
            WHERE id = ? AND instituicao_id = ?`,
            [
                nome_atendido,
                tipo_atendimento,
                descricao || null,
                status || 'pendente',
                id,
                instituicao_id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Atendimento não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Atendimento atualizado com sucesso!'
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao atualizar atendimento.'
        });
    }
}

// EXCLUIR ATENDIMENTO
export async function excluirAtendimento(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `DELETE FROM atendimentos
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Atendimento não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Atendimento excluído com sucesso!'
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao excluir atendimento.'
        });
    }
}