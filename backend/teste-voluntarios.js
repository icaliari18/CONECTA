const URL_API = 'http://localhost:3000';

async function testarVoluntarios() {
    try {
        // FAZER LOGIN
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
        const token = dadosLogin.token;

        if (!respostaLogin.ok) {
            throw new Error('Erro ao fazer login.');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // CADASTRAR VOLUNTÁRIO
        console.log('\n--- CADASTRAR VOLUNTÁRIO ---');

        const cadastro = await fetch(`${URL_API}/voluntarios`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                nome: 'Ana Souza',
                email: 'ana.voluntaria@example.com',
                telefone: '51988887777',
                area_atuacao: 'Distribuição de alimentos',
                disponibilidade: 'Sábados pela manhã'
            })
        });

        const dadosCadastro = await cadastro.json();
        console.log('Status:', cadastro.status);
        console.log(dadosCadastro);

        const id = dadosCadastro.id;

        // LISTAR VOLUNTÁRIOS
        console.log('\n--- LISTAR VOLUNTÁRIOS ---');

        const lista = await fetch(`${URL_API}/voluntarios`, {
            headers
        });

        console.log('Status:', lista.status);
        console.log(await lista.json());

        // BUSCAR VOLUNTÁRIO
        console.log('\n--- BUSCAR VOLUNTÁRIO ---');

        const busca = await fetch(`${URL_API}/voluntarios/${id}`, {
            headers
        });

        console.log('Status:', busca.status);
        console.log(await busca.json());

        // ATUALIZAR VOLUNTÁRIO
        console.log('\n--- ATUALIZAR VOLUNTÁRIO ---');

        const atualizacao = await fetch(`${URL_API}/voluntarios/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                nome: 'Ana Souza',
                email: 'ana.voluntaria@example.com',
                telefone: '51988887777',
                area_atuacao: 'Organização de doações',
                disponibilidade: 'Domingos pela manhã'
            })
        });

        console.log('Status:', atualizacao.status);
        console.log(await atualizacao.json());

        // EXCLUIR VOLUNTÁRIO
        console.log('\n--- EXCLUIR VOLUNTÁRIO ---');

        const exclusao = await fetch(`${URL_API}/voluntarios/${id}`, {
            method: 'DELETE',
            headers
        });

        console.log('Status:', exclusao.status);
        console.log(await exclusao.json());

    } catch (erro) {
        console.error('Erro no teste:', erro);
    }
}

testarVoluntarios();