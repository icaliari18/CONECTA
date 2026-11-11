import conexao from '../database/conexao.js';

// CADASTRAR RECURSO
export async function cadastrarRecurso(req, res) {
    try {
        const {
            nome,
            descricao,
            quantidade,
            unidade,
            quantidade_minima
        } = req.body;

        if (!nome || quantidade === undefined || quantidade === null || quantidade === '' || !unidade) {
            return res.status(400).json({
                mensagem: 'Informe o nome, a quantidade e a unidade do recurso.'
            });
        }

        if (!Number.isFinite(Number(quantidade)) || Number(quantidade) < 0) {
            return res.status(400).json({
                mensagem: 'A quantidade deve ser um número igual ou maior que zero.'
            });
        }

        if (
            quantidade_minima !== undefined &&
            (!Number.isFinite(Number(quantidade_minima)) || Number(quantidade_minima) < 0)
        ) {
            return res.status(400).json({
                mensagem: 'A quantidade mínima deve ser um número igual ou maior que zero.'
            });
        }

        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `INSERT INTO recursos
            (instituicao_id, nome, descricao, quantidade, unidade, quantidade_minima)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                instituicao_id,
                nome,
                descricao || null,
                quantidade,
                unidade,
                quantidade_minima ?? 0
            ]
        );

        return res.status(201).json({
            mensagem: 'Recurso cadastrado com sucesso!',
            id: resultado.insertId
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar recurso.'
        });
    }
}

// LISTAR RECURSOS
export async function listarRecursos(req, res) {
    try {
        const instituicao_id = req.usuario.instituicao_id;

        const [recursos] = await conexao.query(
            `SELECT * FROM recursos
            WHERE instituicao_id = ?
            ORDER BY nome ASC`,
            [instituicao_id]
        );

        return res.status(200).json(recursos);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao listar recursos.'
        });
    }
}

// BUSCAR RECURSO PELO ID
export async function buscarRecurso(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [recursos] = await conexao.query(
            `SELECT * FROM recursos
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (recursos.length === 0) {
            return res.status(404).json({
                mensagem: 'Recurso não encontrado.'
            });
        }

        return res.status(200).json(recursos[0]);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao buscar recurso.'
        });
    }
}

// ATUALIZAR RECURSO
export async function atualizarRecurso(req, res) {
    try {
        const { id } = req.params;

        const {
            nome,
            descricao,
            quantidade,
            unidade,
            quantidade_minima
        } = req.body;

        const instituicao_id = req.usuario.instituicao_id;

        if (!nome || quantidade === undefined || quantidade === null || quantidade === '' || !unidade) {
            return res.status(400).json({
                mensagem: 'Informe o nome, a quantidade e a unidade do recurso.'
            });
        }

        if (!Number.isFinite(Number(quantidade)) || Number(quantidade) < 0) {
            return res.status(400).json({
                mensagem: 'A quantidade deve ser um número igual ou maior que zero.'
            });
        }

        if (
            quantidade_minima !== undefined &&
            (!Number.isFinite(Number(quantidade_minima)) || Number(quantidade_minima) < 0)
        ) {
            return res.status(400).json({
                mensagem: 'A quantidade mínima deve ser um número igual ou maior que zero.'
            });
        }

        const [existente] = await conexao.query(
            `SELECT id FROM recursos
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (existente.length === 0) {
            return res.status(404).json({
                mensagem: 'Recurso não encontrado.'
            });
        }

        await conexao.query(
            `UPDATE recursos
            SET nome = ?,
                descricao = ?,
                quantidade = ?,
                unidade = ?,
                quantidade_minima = ?
            WHERE id = ? AND instituicao_id = ?`,
            [
                nome,
                descricao || null,
                quantidade,
                unidade,
                quantidade_minima ?? 0,
                id,
                instituicao_id
            ]
        );

        return res.status(200).json({
            mensagem: 'Recurso atualizado com sucesso!'
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao atualizar recurso.'
        });
    }
}

// EXCLUIR RECURSO
export async function excluirRecurso(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `DELETE FROM recursos
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Recurso não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Recurso excluído com sucesso!'
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao excluir recurso.'
        });
    }
}