import conexao from '../database/conexao.js';

// CADASTRAR VOLUNTÁRIO
export async function cadastrarVoluntario(req, res) {
    try {
        const {
            nome,
            email,
            telefone,
            area_atuacao,
            disponibilidade
        } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: 'Informe o nome do voluntário.'
            });
        }

        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `INSERT INTO voluntarios
            (instituicao_id, nome, email, telefone, area_atuacao, disponibilidade)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                instituicao_id,
                nome,
                email || null,
                telefone || null,
                area_atuacao || null,
                disponibilidade || null
            ]
        );

        return res.status(201).json({
            mensagem: 'Voluntário cadastrado com sucesso!',
            id: resultado.insertId
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar voluntário.'
        });
    }
}

// LISTAR VOLUNTÁRIOS
export async function listarVoluntarios(req, res) {
    try {
        const instituicao_id = req.usuario.instituicao_id;

        const [voluntarios] = await conexao.query(
            `SELECT * FROM voluntarios
            WHERE instituicao_id = ?
            ORDER BY nome ASC`,
            [instituicao_id]
        );

        return res.status(200).json(voluntarios);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao listar voluntários.'
        });
    }
}

// BUSCAR VOLUNTÁRIO PELO ID
export async function buscarVoluntario(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [voluntarios] = await conexao.query(
            `SELECT * FROM voluntarios
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (voluntarios.length === 0) {
            return res.status(404).json({
                mensagem: 'Voluntário não encontrado.'
            });
        }

        return res.status(200).json(voluntarios[0]);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao buscar voluntário.'
        });
    }
}

// ATUALIZAR VOLUNTÁRIO
export async function atualizarVoluntario(req, res) {
    try {
        const { id } = req.params;

        const {
            nome,
            email,
            telefone,
            area_atuacao,
            disponibilidade
        } = req.body;

        const instituicao_id = req.usuario.instituicao_id;

        if (!nome) {
            return res.status(400).json({
                mensagem: 'Informe o nome do voluntário.'
            });
        }

        const [resultado] = await conexao.query(
            `UPDATE voluntarios
            SET nome = ?,
                email = ?,
                telefone = ?,
                area_atuacao = ?,
                disponibilidade = ?
            WHERE id = ? AND instituicao_id = ?`,
            [
                nome,
                email || null,
                telefone || null,
                area_atuacao || null,
                disponibilidade || null,
                id,
                instituicao_id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Voluntário não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Voluntário atualizado com sucesso!'
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao atualizar voluntário.'
        });
    }
}

// EXCLUIR VOLUNTÁRIO
export async function excluirVoluntario(req, res) {
    try {
        const { id } = req.params;
        const instituicao_id = req.usuario.instituicao_id;

        const [resultado] = await conexao.query(
            `DELETE FROM voluntarios
            WHERE id = ? AND instituicao_id = ?`,
            [id, instituicao_id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Voluntário não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Voluntário excluído com sucesso!'
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao excluir voluntário.'
        });
    }
}