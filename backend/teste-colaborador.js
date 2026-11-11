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

    // 6. Testar se o colaborador consegue cadastrar atendimento
        console.log('\n--- CADASTRAR ATENDIMENTO COMO COLABORADOR ---');

        const cadastro = await fetch(`${URL_API}/atendimentos`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome_atendido: 'Teste de Permissão',
                tipo_atendimento: 'Assistência social',
                descricao: 'Atendimento para testar permissões.'
            })
        });

        const dadosAtendimento = await cadastro.json();

        console.log('Status do cadastro:', cadastro.status);
        console.log(dadosAtendimento);


        // 7. Testar se o colaborador consegue listar atendimentos
        console.log('\n--- LISTAR ATENDIMENTOS COMO COLABORADOR ---');

        const listaAtendimentos = await fetch(`${URL_API}/atendimentos`, {
            headers
        });

        console.log('Status da listagem:', listaAtendimentos.status);
        console.log(await listaAtendimentos.json());

        // 8. Testar se o colaborador consegue buscar um atendimento
        if (cadastro.ok) {
            console.log('\n--- BUSCAR ATENDIMENTO COMO COLABORADOR ---');

            const buscaAtendimento = await fetch(
                `${URL_API}/atendimentos/${dadosAtendimento.id}`,
                { headers }
            );

            console.log('Status da busca:', buscaAtendimento.status);
            console.log(await buscaAtendimento.json());

            // 9. Testar se o colaborador consegue atualizar atendimento
            console.log('\n--- ATUALIZAR ATENDIMENTO COMO COLABORADOR ---');

            const atualizacao = await fetch(
                `${URL_API}/atendimentos/${dadosAtendimento.id}`,
                {
                    method: 'PUT',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome_atendido: 'Teste de Permissão Atualizado',
                        tipo_atendimento: 'Assistência social',
                        descricao: 'Atualização realizada pelo colaborador.',
                        status: 'em andamento'
                    })
                }
            );

            console.log('Status da atualização:', atualizacao.status);
            console.log(await atualizacao.json());
        }


        // 7. Testar se o colaborador consegue excluir atendimento
        if (cadastro.ok) {
            console.log('\n--- TENTAR EXCLUIR ATENDIMENTO COMO COLABORADOR ---');

            const exclusao = await fetch(
                `${URL_API}/atendimentos/${dadosAtendimento.id}`,
                {
                    method: 'DELETE',
                    headers
                }
            );

            console.log('Status da exclusão:', exclusao.status);
            console.log(await exclusao.json());
        }



        // 8. Testar cadastro de doação como colaborador
        console.log('\n--- CADASTRAR DOAÇÃO COMO COLABORADOR ---');

        const cadastroDoacao = await fetch(`${URL_API}/doacoes`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome_doador: 'Doador de Teste',
                tipo_doacao: 'Alimentos',
                descricao: 'Doação para teste de permissões.',
                quantidade: 10,
                data_recebimento: '2026-11-10',
                observacoes: 'Teste do colaborador.'
            })
        });

        const dadosDoacao = await cadastroDoacao.json();

        console.log('Status do cadastro:', cadastroDoacao.status);
        console.log(dadosDoacao);

        
        // Consultar todas as doações
        console.log('\n--- LISTAR DOAÇÕES COMO COLABORADOR ---');

        const listaDoacoes = await fetch(`${URL_API}/doacoes`, {
            headers
        });

        console.log('Status da listagem:', listaDoacoes.status);
        console.log(await listaDoacoes.json());

        // Buscar uma doação pelo ID
        if (cadastroDoacao.ok) {
            console.log('\n--- BUSCAR DOAÇÃO COMO COLABORADOR ---');

            const buscaDoacao = await fetch(
                `${URL_API}/doacoes/${dadosDoacao.id}`,
                { headers }
            );

            console.log('Status da busca:', buscaDoacao.status);
            console.log(await buscaDoacao.json());

            // Atualizar uma doação
            console.log('\n--- ATUALIZAR DOAÇÃO COMO COLABORADOR ---');

            const atualizacaoDoacao = await fetch(
                `${URL_API}/doacoes/${dadosDoacao.id}`,
                {
                    method: 'PUT',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome_doador: 'Doador Atualizado',
                        tipo_doacao: 'Alimentos',
                        descricao: 'Doação atualizada pelo colaborador.',
                        quantidade: 15,
                        data_recebimento: '2026-11-11',
                        observacoes: 'Teste de atualização.'
                    })
                }
            );

            console.log('Status da atualização:', atualizacaoDoacao.status);
            console.log(await atualizacaoDoacao.json());
        }


        // 9. Testar exclusão de doação como colaborador
        if (cadastroDoacao.ok) {
            console.log('\n--- TENTAR EXCLUIR DOAÇÃO COMO COLABORADOR ---');

            const exclusaoDoacao = await fetch(
                `${URL_API}/doacoes/${dadosDoacao.id}`,
                {
                    method: 'DELETE',
                    headers
                }
            );

            console.log('Status da exclusão:', exclusaoDoacao.status);
            console.log(await exclusaoDoacao.json());
        }


        // 10. Cadastrar recurso como colaborador
        console.log('\n--- CADASTRAR RECURSO COMO COLABORADOR ---');

        const cadastroRecurso = await fetch(`${URL_API}/recursos`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: 'Material de limpeza - Teste',
                descricao: 'Recurso para teste de permissões.',
                quantidade: 20,
                unidade: 'unidades',
                quantidade_minima: 5
            })
        });

        const dadosRecurso = await cadastroRecurso.json();

        console.log('Status do cadastro:', cadastroRecurso.status);
        console.log(dadosRecurso);

                // Consultar todos os recursos
        console.log('\n--- LISTAR RECURSOS COMO COLABORADOR ---');

        const listaRecursos = await fetch(`${URL_API}/recursos`, {
            headers
        });

        console.log('Status da listagem:', listaRecursos.status);
        console.log(await listaRecursos.json());

        // Buscar recurso pelo ID
        if (cadastroRecurso.ok) {
            console.log('\n--- BUSCAR RECURSO COMO COLABORADOR ---');

            const buscaRecurso = await fetch(
                `${URL_API}/recursos/${dadosRecurso.id}`,
                { headers }
            );

            console.log('Status da busca:', buscaRecurso.status);
            console.log(await buscaRecurso.json());

            // Atualizar recurso
            console.log('\n--- ATUALIZAR RECURSO COMO COLABORADOR ---');

            const atualizacaoRecurso = await fetch(
                `${URL_API}/recursos/${dadosRecurso.id}`,
                {
                    method: 'PUT',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: 'Material de limpeza atualizado',
                        descricao: 'Recurso atualizado pelo colaborador.',
                        quantidade: 25,
                        unidade: 'unidades',
                        quantidade_minima: 5
                    })
                }
            );

            console.log('Status da atualização:', atualizacaoRecurso.status);
            console.log(await atualizacaoRecurso.json());
        }

        // 11. Tentar excluir recurso como colaborador
        if (cadastroRecurso.ok) {
            console.log('\n--- TENTAR EXCLUIR RECURSO COMO COLABORADOR ---');

            const exclusaoRecurso = await fetch(
                `${URL_API}/recursos/${dadosRecurso.id}`,
                {
                    method: 'DELETE',
                    headers
                }
            );

            console.log('Status da exclusão:', exclusaoRecurso.status);
            console.log(await exclusaoRecurso.json());
        }

    // 12. Cadastrar evento como colaborador
        console.log('\n--- CADASTRAR EVENTO COMO COLABORADOR ---');

        const cadastroEvento = await fetch(`${URL_API}/eventos`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: 'Evento de teste - Colaborador',
                descricao: 'Evento criado para testar permissões.',
                local: 'Salão principal',
                data_evento: '2026-12-15 14:00:00',
                capacidade: 30,
                status: 'planejado'
            })
        });

        const dadosEvento = await cadastroEvento.json();

        console.log('Status do cadastro:', cadastroEvento.status);
        console.log(dadosEvento);

        // LISTAR EVENTOS COMO COLABORADOR
console.log('\n--- LISTAR EVENTOS COMO COLABORADOR ---');

const listaEventos = await fetch(`${URL_API}/eventos`, {
    headers
});

console.log('Status da listagem:', listaEventos.status);
console.log(await listaEventos.json());


// BUSCAR EVENTO PELO ID COMO COLABORADOR
if (cadastroEvento.ok) {
    console.log('\n--- BUSCAR EVENTO COMO COLABORADOR ---');

    const buscaEvento = await fetch(`${URL_API}/eventos/${dadosEvento.id}`, {
        headers
    });

    console.log('Status da busca:', buscaEvento.status);
    console.log(await buscaEvento.json());


    // ATUALIZAR EVENTO COMO COLABORADOR
    console.log('\n--- ATUALIZAR EVENTO COMO COLABORADOR ---');

    const atualizacaoEvento = await fetch(`${URL_API}/eventos/${dadosEvento.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: 'Evento atualizado pelo colaborador',
            descricao: 'Evento atualizado durante o teste de permissões.',
            local: 'Auditório principal',
            data_evento: '2026-12-20 14:00:00',
            capacidade: 40,
            status: 'confirmado'
        })
    });

    console.log('Status da atualização:', atualizacaoEvento.status);
    console.log(await atualizacaoEvento.json());
}

        // 13. Tentar excluir evento como colaborador
        if (cadastroEvento.ok) {
            console.log('\n--- TENTAR EXCLUIR EVENTO COMO COLABORADOR ---');

            const exclusaoEvento = await fetch(
                `${URL_API}/eventos/${dadosEvento.id}`,
                {
                    method: 'DELETE',
                    headers
                }
            );

            console.log('Status da exclusão:', exclusaoEvento.status);
            console.log(await exclusaoEvento.json());
        }

                // 14. Cadastrar voluntário como colaborador
        console.log('\n--- CADASTRAR VOLUNTÁRIO COMO COLABORADOR ---');

        const cadastroVoluntario = await fetch(`${URL_API}/voluntarios`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: 'Voluntário de teste',
                email: 'voluntario.teste@example.com',
                telefone: '51999999999',
                area_atuacao: 'Organização de doações',
                disponibilidade: 'Finais de semana'
            })
        });

        const dadosVoluntario = await cadastroVoluntario.json();

        console.log('Status do cadastro:', cadastroVoluntario.status);
        console.log(dadosVoluntario);

        // LISTAR VOLUNTÁRIOS COMO COLABORADOR
console.log('\n--- LISTAR VOLUNTÁRIOS COMO COLABORADOR ---');

const listaVoluntarios = await fetch(`${URL_API}/voluntarios`, {
    headers
});

console.log('Status da listagem:', listaVoluntarios.status);
console.log(await listaVoluntarios.json());


// BUSCAR VOLUNTÁRIO PELO ID COMO COLABORADOR
if (cadastroVoluntario.ok) {
    console.log('\n--- BUSCAR VOLUNTÁRIO COMO COLABORADOR ---');

    const buscaVoluntario = await fetch(
        `${URL_API}/voluntarios/${dadosVoluntario.id}`,
        { headers }
    );

    console.log('Status da busca:', buscaVoluntario.status);
    console.log(await buscaVoluntario.json());


    // ATUALIZAR VOLUNTÁRIO COMO COLABORADOR
    console.log('\n--- ATUALIZAR VOLUNTÁRIO COMO COLABORADOR ---');

    const atualizacaoVoluntario = await fetch(
        `${URL_API}/voluntarios/${dadosVoluntario.id}`,
        {
            method: 'PUT',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: 'Voluntário atualizado pelo colaborador',
                email: 'voluntario.atualizado@example.com',
                telefone: '51988888888',
                area_atuacao: 'Organização de eventos',
                disponibilidade: 'Durante a semana'
            })
        }
    );

    console.log('Status da atualização:', atualizacaoVoluntario.status);
    console.log(await atualizacaoVoluntario.json());
}

        // 15. Tentar excluir voluntário como colaborador
        if (cadastroVoluntario.ok) {
            console.log('\n--- TENTAR EXCLUIR VOLUNTÁRIO COMO COLABORADOR ---');

            const exclusaoVoluntario = await fetch(
                `${URL_API}/voluntarios/${dadosVoluntario.id}`,
                {
                    method: 'DELETE',
                    headers
                }
            );

            console.log('Status da exclusão:', exclusaoVoluntario.status);
            console.log(await exclusaoVoluntario.json());
        }





    } catch (erro) {
        console.error('Erro no teste:', erro);
    } finally {
        await conexao.end();
    }
}

testarColaborador();