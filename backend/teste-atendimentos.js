const respostaLogin = await fetch('http://localhost:3000/usuarios/login', {
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
    console.log('Erro no login:', dadosLogin);
    process.exit(1);
}

const token = dadosLogin.token;

const cabecalho = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

// 1. CADASTRAR
console.log('\n--- CADASTRAR ATENDIMENTO ---');

const cadastro = await fetch('http://localhost:3000/atendimentos', {
    method: 'POST',
    headers: cabecalho,
    body: JSON.stringify({
        nome_atendido: 'Maria da Silva',
        tipo_atendimento: 'Assistência social',
        descricao: 'Atendimento inicial para cadastro.'
    })
});

const dadosCadastro = await cadastro.json();
console.log('Status:', cadastro.status);
console.log(dadosCadastro);

if (!cadastro.ok) process.exit(1);

const id = dadosCadastro.id;

// 2. LISTAR
console.log('\n--- LISTAR ATENDIMENTOS ---');

const lista = await fetch('http://localhost:3000/atendimentos', {
    headers: cabecalho
});

console.log('Status:', lista.status);
console.log(await lista.json());

// 3. BUSCAR UM ATENDIMENTO
console.log('\n--- BUSCAR ATENDIMENTO ---');

const busca = await fetch(`http://localhost:3000/atendimentos/${id}`, {
    headers: cabecalho
});

console.log('Status:', busca.status);
console.log(await busca.json());

// 4. ATUALIZAR
console.log('\n--- ATUALIZAR ATENDIMENTO ---');

const atualizacao = await fetch(`http://localhost:3000/atendimentos/${id}`, {
    method: 'PUT',
    headers: cabecalho,
    body: JSON.stringify({
        nome_atendido: 'Maria da Silva',
        tipo_atendimento: 'Assistência social',
        descricao: 'Atendimento atualizado.',
        status: 'em andamento'
    })
});

console.log('Status:', atualizacao.status);
console.log(await atualizacao.json());

// 5. EXCLUIR
console.log('\n--- EXCLUIR ATENDIMENTO ---');

const exclusao = await fetch(`http://localhost:3000/atendimentos/${id}`, {
    method: 'DELETE',
    headers: cabecalho
});

console.log('Status:', exclusao.status);
console.log(await exclusao.json());