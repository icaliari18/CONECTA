
import conexao from '../database/conexao.js';

// CADASTRAR DOAÇÃO
export async function cadastrarDoacao(req, res) {
    try {
        const {
            nome_doador,
            tipo_doacao,
            descricao,
            quantidade,
            data_recebimento,
            observacoes
        } = req.body;

        if (!tipo_doacao || quantidade === undefined || quantidade === null || quantidade === '' || !data_recebimento) {
            return res.status(400).json({
                mensagem: 'Informe o tipo, a quantidade e a data de recebimento da doação.'
            });
        }

        if (!Number.isFinite(Number(quantidade)) || Number(quantidade) <= 0) {
            return res.status(400).json({
                mensagem: 'A quantidade deve ser um número maior que zero.'
            });
        }

        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `INSERT INTO doacoes
            (instituicao_id, nome_doador, tipo_doacao, descricao, quantidade, data_recebimento, observacoes)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                instituicao_id,
                nome_doador || null,
                tipo_doacao,
                descricao || null,
                quantidade,
                data_recebimento,
                observacoes || null
            ]
        );

        return res.status(201).json({
            mensagem: 'Doação cadastrada com sucesso!',
            id: resultado.insertId
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar doação.'
        });
    }
}

// LISTAR DOAÇÕES
export async function listarDoacoes(req, res) {
    try {
        const instituicao_id = req.usuario.instituicao_id;

        const [doacoes] = await conexao.query(
            `SELECT * FROM doacoes
            WHERE instituicao_id = ?
            ORDER BY data_recebimento DESC`,
            [instituicao_id]
        );

        return res.status(200).json(doacoes);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao listar doações.'
        });
    }
}

// BUSCAR DOAÇÃO PELO ID
export async function buscarDoacao(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [doacoes] = await conexao.query(
            `SELECT * FROM doacoes
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (doacoes.length === 0) {
            return res.status(404).json({
                mensagem: 'Doação não encontrada.'
            });
        }

        return res.status(200).json(doacoes[0]);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao buscar doação.'
        });
    }
}

// ATUALIZAR DOAÇÃO
export async function atualizarDoacao(req, res) {
    try {
        const { id } = req.params;

        const {
            nome_doador,
            tipo_doacao,
            descricao,
            quantidade,
            data_recebimento,
            observacoes
        } = req.body;

        const instituicao_id = req.usuario.instituicao_id;

        if (!tipo_doacao || quantidade === undefined || quantidade === null || quantidade === '' || !data_recebimento) {
            return res.status(400).json({
                mensagem: 'Informe o tipo, a quantidade e a data de recebimento da doação.'
            });
        }

        if (!Number.isFinite(Number(quantidade)) || Number(quantidade) <= 0) {
            return res.status(400).json({
                mensagem: 'A quantidade deve ser um número maior que zero.'
            });
        }

        const [resultado] = await conexao.query(
            `UPDATE doacoes
            SET nome_doador = ?,
                tipo_doacao = ?,
                descricao = ?,
                quantidade = ?,
                data_recebimento = ?,
                observacoes = ?
            WHERE id = ? AND instituicao_id = ?`,
            [
                nome_doador || null,
                tipo_doacao,
                descricao || null,
                quantidade,
                data_recebimento,
                observacoes || null,
                id,
                instituicao_id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Doação não encontrada.'
            });
        }

        return res.status(200).json({
            mensagem: 'Doação atualizada com sucesso!'
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao atualizar doação.'
        });
    }
}

// EXCLUIR DOAÇÃO
export async function excluirDoacao(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `DELETE FROM doacoes
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Doação não encontrada.'
            });
        }

        return res.status(200).json({
            mensagem: 'Doação excluída com sucesso!'
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao excluir doação.'
        });
    }
}