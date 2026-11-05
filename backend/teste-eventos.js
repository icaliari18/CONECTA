const URL_API = 'http://localhost:3000';

async function testarEventos() {
    try {
        // LOGIN
        const respostaLogin = await fetch(`${URL_API}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin.teste@example.com',
                senha: 'Teste1234!'
            })
        });

        const dadosLogin = await respostaLogin.json();

        if (!respostaLogin.ok) {
            throw new Error('Erro ao fazer login.');
        }

        const token = dadosLogin.token;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // CADASTRAR EVENTO
        console.log('\n--- CADASTRAR EVENTO ---');

        const cadastro = await fetch(`${URL_API}/eventos`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                nome: 'Campanha de arrecadação',
                descricao: 'Evento para arrecadar alimentos.',
                local: 'Centro comunitário',
                data_evento: '2026-12-10 14:00:00',
                capacidade: 50,
                status: 'planejado'
            })
        });

        const dadosCadastro = await cadastro.json();
        console.log('Status:', cadastro.status);
        console.log(dadosCadastro);

        const id = dadosCadastro.id;

        // LISTAR EVENTOS
        console.log('\n--- LISTAR EVENTOS ---');

        const lista = await fetch(`${URL_API}/eventos`, {
            headers
        });

        console.log('Status:', lista.status);
        console.log(await lista.json());

        // BUSCAR EVENTO
        console.log('\n--- BUSCAR EVENTO ---');

        const busca = await fetch(`${URL_API}/eventos/${id}`, {
            headers
        });

        console.log('Status:', busca.status);
        console.log(await busca.json());

        // ATUALIZAR EVENTO
        console.log('\n--- ATUALIZAR EVENTO ---');

        const atualizacao = await fetch(`${URL_API}/eventos/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                nome: 'Campanha de arrecadação de alimentos',
                descricao: 'Evento atualizado para arrecadar alimentos.',
                local: 'Salão comunitário',
                data_evento: '2026-12-10 15:00:00',
                capacidade: 70,
                status: 'confirmado'
            })
        });

        console.log('Status:', atualizacao.status);
        console.log(await atualizacao.json());

        // EXCLUIR EVENTO
        console.log('\n--- EXCLUIR EVENTO ---');

        const exclusao = await fetch(`${URL_API}/eventos/${id}`, {
            method: 'DELETE',
            headers
        });

        console.log('Status:', exclusao.status);
        console.log(await exclusao.json());

    } catch (erro) {
        console.error('Erro no teste:', erro);
    }
}

testarEventos();