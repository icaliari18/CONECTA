
import 'dotenv/config';
import conexao from './database/conexao.js';
import bcrypt from 'bcryptjs';

const URL_API = 'http://localhost:3000';

async function testarColaborador() {
    try {
        // 1. Fazer login como administrador
        console.log('\n--- LOGIN DO ADMINISTRADOR ---');

        const loginAdmin = await fetch(`${URL_API}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin.teste@example.com',
                senha: 'Teste1234!'
            })
        });

        const dadosAdmin = await loginAdmin.json();

        if (!loginAdmin.ok) {
            throw new Error('Não foi possível fazer login como administrador.');
        }

        console.log('Login do administrador:', loginAdmin.status);

        // 2. Criar ou atualizar um colaborador de teste no banco
        const emailColaborador = 'colaborador.teste@example.com';
        const senhaColaborador = 'Colaborador123!';
        const senhaHash = await bcrypt.hash(senhaColaborador, 10);

        const [usuarios] = await conexao.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [emailColaborador]
        );

        if (usuarios.length > 0) {
            await conexao.query(
                `UPDATE usuarios
                SET instituicao_id = ?, nome = ?, senha = ?, tipo = 'colaborador'
                WHERE email = ?`,
                [
                    dadosAdmin.usuario.instituicao_id,
                    'Colaborador de Teste',
                    senhaHash,
                    emailColaborador
                ]
            );
        } else {
            await conexao.query(
                `INSERT INTO usuarios
                (instituicao_id, nome, email, senha, tipo)
                VALUES (?, ?, ?, ?, 'colaborador')`,
                [
                    dadosAdmin.usuario.instituicao_id,
                    'Colaborador de Teste',
                    emailColaborador,
                    senhaHash
                ]
            );
        }

        console.log('Colaborador de teste preparado!');

        // 3. Fazer login como colaborador
        console.log('\n--- LOGIN DO COLABORADOR ---');

        const loginColaborador = await fetch(`${URL_API}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailColaborador,
                senha: senhaColaborador
            })
        });

        const dadosColaborador = await loginColaborador.json();

        console.log('Login:', loginColaborador.status);

        if (!loginColaborador.ok) {
            throw new Error('Não foi possível fazer login como colaborador.');
        }

        const headers = {
            'Authorization': `Bearer ${dadosColaborador.token}`
        };

        // 4. Testar acesso ao próprio perfil
        console.log('\n--- ACESSAR PERFIL ---');

        const perfil = await fetch(`${URL_API}/usuarios/perfil`, {
            headers
        });

        console.log('Status:', perfil.status);
        console.log(await perfil.json());

        // 5. Testar acesso à rota exclusiva de administrador
        console.log('\n--- ACESSAR ROTA DE ADMINISTRADOR ---');

        const rotaAdmin = await fetch(`${URL_API}/usuarios/somente-admin`, {
            headers
        });

        console.log('Status:', rotaAdmin.status);
        console.log(await rotaAdmin.json());

    } catch (erro) {
        console.error('Erro no teste:', erro);
    } finally {
        await conexao.end();
    }
}

testarColaborador();