const URL_API = 'http://localhost:3000';

// 1. LOGIN DA SEGUNDA INSTITUIÇÃO
console.log('\n--- LOGIN DA SEGUNDA INSTITUIÇÃO ---');

const login = await fetch(`${URL_API}/usuarios/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'isolamento.admin@example.com',
        senha: 'SenhaTeste2026!'
    })
});

const dadosLogin = await login.json();

console.log('Status do login:', login.status);
console.log(dadosLogin);

if (!login.ok) {
    console.log('Não foi possível realizar o teste.');
    process.exit(1);
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${dadosLogin.token}`
};

// 2. LISTAR ATENDIMENTOS DA SEGUNDA INSTITUIÇÃO
console.log('\n--- LISTAR ATENDIMENTOS DA SEGUNDA INSTITUIÇÃO ---');

const lista = await fetch(`${URL_API}/atendimentos`, {
    headers
});

const dadosLista = await lista.json();

console.log('Status:', lista.status);
console.log('Atendimentos encontrados:', dadosLista);

// 3. TENTAR ACESSAR ATENDIMENTO DA PRIMEIRA INSTITUIÇÃO
// O ID 1 será usado como referência. Se não existir,
// substituiremos pelo ID correto após conferir o resultado.

console.log('\n--- TENTAR ACESSAR ATENDIMENTO DA PRIMEIRA INSTITUIÇÃO ---');

const busca = await fetch(`${URL_API}/atendimentos/1`, {
    headers
});

console.log('Status:', busca.status);
console.log(await busca.json());


// 4. TENTAR ATUALIZAR ATENDIMENTO DA PRIMEIRA INSTITUIÇÃO
console.log('\n--- TENTAR ATUALIZAR ATENDIMENTO DE OUTRA INSTITUIÇÃO ---');

const atualizacao = await fetch(`${URL_API}/atendimentos/3`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
        nome_atendido: 'Tentativa de alteração',
        tipo_atendimento: 'Assistência social',
        descricao: 'Teste de isolamento.',
        status: 'em andamento'
    })
});

console.log('Status:', atualizacao.status);
console.log(await atualizacao.json());

// 5. TENTAR EXCLUIR ATENDIMENTO DA PRIMEIRA INSTITUIÇÃO
console.log('\n--- TENTAR EXCLUIR ATENDIMENTO DE OUTRA INSTITUIÇÃO ---');

const exclusao = await fetch(`${URL_API}/atendimentos/3`, {
    method: 'DELETE',
    headers
});

console.log('Status:', exclusao.status);
console.log(await exclusao.json());
