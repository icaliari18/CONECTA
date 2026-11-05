import conexao from '../database/conexao.js';

// CADASTRAR EVENTO
export async function cadastrarEvento(req, res) {
    try {
        const {
            nome,
            descricao,
            local,
            data_evento,
            capacidade,
            status
        } = req.body;

        if (!nome || !data_evento) {
            return res.status(400).json({
                mensagem: 'Informe o nome e a data do evento.'
            });
        }

        if (capacidade !== undefined && capacidade !== null &&
            (!Number.isInteger(Number(capacidade)) || Number(capacidade) < 0)) {
            return res.status(400).json({
                mensagem: 'A capacidade deve ser um número inteiro maior ou igual a zero.'
            });
        }

        const statusPermitidos = [
            'planejado',
            'confirmado',
            'realizado',
            'cancelado'
        ];

        if (status && !statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensagem: 'Status do evento inválido.'
            });
        }

        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `INSERT INTO eventos
            (instituicao_id, nome, descricao, local, data_evento, capacidade, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                instituicao_id,
                nome,
                descricao || null,
                local || null,
                data_evento,
                capacidade ?? null,
                status || 'planejado'
            ]
        );

        return res.status(201).json({
            mensagem: 'Evento cadastrado com sucesso!',
            id: resultado.insertId
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar evento.'
        });
    }
}

// LISTAR EVENTOS
export async function listarEventos(req, res) {
    try {
        const instituicao_id = req.usuario.instituicao_id;

        const [eventos] = await conexao.query(
            `SELECT * FROM eventos
            WHERE instituicao_id = ?
            ORDER BY data_evento ASC`,
            [instituicao_id]
        );

        return res.status(200).json(eventos);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao listar eventos.'
        });
    }
}

// BUSCAR EVENTO PELO ID
export async function buscarEvento(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [eventos] = await conexao.query(
            `SELECT * FROM eventos
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (eventos.length === 0) {
            return res.status(404).json({
                mensagem: 'Evento não encontrado.'
            });
        }

        return res.status(200).json(eventos[0]);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao buscar evento.'
        });
    }
}

// ATUALIZAR EVENTO
export async function atualizarEvento(req, res) {
    try {
        const { id } = req.params;

        const {
            nome,
            descricao,
            local,
            data_evento,
            capacidade,
            status
        } = req.body;

        const instituicao_id = req.usuario.instituicao_id;

        if (!nome || !data_evento) {
            return res.status(400).json({
                mensagem: 'Informe o nome e a data do evento.'
            });
        }

        if (capacidade !== undefined && capacidade !== null &&
            (!Number.isInteger(Number(capacidade)) || Number(capacidade) < 0)) {
            return res.status(400).json({
                mensagem: 'A capacidade deve ser um número inteiro maior ou igual a zero.'
            });
        }

        const statusPermitidos = [
            'planejado',
            'confirmado',
            'realizado',
            'cancelado'
        ];

        if (status && !statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensagem: 'Status do evento inválido.'
            });
        }

        const [resultado] = await conexao.query(
            `UPDATE eventos
            SET nome = ?,
                descricao = ?,
                local = ?,
                data_evento = ?,
                capacidade = ?,
                status = ?
            WHERE id = ? AND instituicao_id = ?`,
            [
                nome,
                descricao || null,
                local || null,
                data_evento,
                capacidade ?? null,
                status || 'planejado',
                id,
                instituicao_id
            ]
        );

        if (resultado.affectedRows === 0) {
            const [eventos] = await conexao.query(
                `SELECT id FROM eventos
                WHERE id = ? AND instituicao_id = ?`,
                [id, instituicao_id]
            );

            if (eventos.length === 0) {
                return res.status(404).json({
                    mensagem: 'Evento não encontrado.'
                });
            }
        }

        return res.status(200).json({
            mensagem: 'Evento atualizado com sucesso!'
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao atualizar evento.'
        });
    }
}

// EXCLUIR EVENTO
export async function excluirEvento(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `DELETE FROM eventos
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Evento não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Evento excluído com sucesso!'
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao excluir evento.'
        });
    }
}