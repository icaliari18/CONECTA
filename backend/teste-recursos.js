
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

// 1. CADASTRAR RECURSO
console.log('\n--- CADASTRAR RECURSO ---');

const cadastro = await fetch('http://localhost:3000/recursos', {
    method: 'POST',
    headers: cabecalho,
    body: JSON.stringify({
        nome: 'Cestas básicas',
        descricao: 'Cestas para distribuição às famílias.',
        quantidade: 50,
        unidade: 'unidades',
        quantidade_minima: 10
    })
});

const dadosCadastro = await cadastro.json();

console.log('Status:', cadastro.status);
console.log(dadosCadastro);

if (!cadastro.ok) {
    process.exit(1);
}

const id = dadosCadastro.id;

// 2. LISTAR RECURSOS
console.log('\n--- LISTAR RECURSOS ---');

const lista = await fetch('http://localhost:3000/recursos', {
    headers: cabecalho
});

console.log('Status:', lista.status);
console.log(await lista.json());

// 3. BUSCAR RECURSO
console.log('\n--- BUSCAR RECURSO ---');

const busca = await fetch(`http://localhost:3000/recursos/${id}`, {
    headers: cabecalho
});

console.log('Status:', busca.status);
console.log(await busca.json());

// 4. ATUALIZAR RECURSO
console.log('\n--- ATUALIZAR RECURSO ---');

const atualizacao = await fetch(`http://localhost:3000/recursos/${id}`, {
    method: 'PUT',
    headers: cabecalho,
    body: JSON.stringify({
        nome: 'Cestas básicas',
        descricao: 'Cestas básicas atualizadas.',
        quantidade: 40,
        unidade: 'unidades',
        quantidade_minima: 15
    })
});

console.log('Status:', atualizacao.status);
console.log(await atualizacao.json());

// 5. EXCLUIR RECURSO
console.log('\n--- EXCLUIR RECURSO ---');

const exclusao = await fetch(`http://localhost:3000/recursos/${id}`, {
    method: 'DELETE',
    headers: cabecalho
});

console.log('Status:', exclusao.status);
console.log(await exclusao.json());