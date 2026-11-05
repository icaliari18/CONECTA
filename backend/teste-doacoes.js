
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

// 1. CADASTRAR DOAÇÃO
console.log('\n--- CADASTRAR DOAÇÃO ---');

const cadastro = await fetch('http://localhost:3000/doacoes', {
    method: 'POST',
    headers: cabecalho,
    body: JSON.stringify({
        nome_doador: 'João da Silva',
        tipo_doacao: 'Alimentos',
        descricao: 'Doação de alimentos não perecíveis.',
        quantidade: 25,
        data_recebimento: '2026-11-05',
        observacoes: 'Recebida em bom estado.'
    })
});

const dadosCadastro = await cadastro.json();

console.log('Status:', cadastro.status);
console.log(dadosCadastro);

if (!cadastro.ok) {
    process.exit(1);
}

const id = dadosCadastro.id;

// 2. LISTAR DOAÇÕES
console.log('\n--- LISTAR DOAÇÕES ---');

const lista = await fetch('http://localhost:3000/doacoes', {
    headers: cabecalho
});

console.log('Status:', lista.status);
console.log(await lista.json());

// 3. BUSCAR DOAÇÃO
console.log('\n--- BUSCAR DOAÇÃO ---');

const busca = await fetch(`http://localhost:3000/doacoes/${id}`, {
    headers: cabecalho
});

console.log('Status:', busca.status);
console.log(await busca.json());

// 4. ATUALIZAR DOAÇÃO
console.log('\n--- ATUALIZAR DOAÇÃO ---');

const atualizacao = await fetch(`http://localhost:3000/doacoes/${id}`, {
    method: 'PUT',
    headers: cabecalho,
    body: JSON.stringify({
        nome_doador: 'João da Silva',
        tipo_doacao: 'Alimentos',
        descricao: 'Doação atualizada de alimentos.',
        quantidade: 30,
        data_recebimento: '2026-11-05',
        observacoes: 'Quantidade conferida.'
    })
});

console.log('Status:', atualizacao.status);
console.log(await atualizacao.json());

// 5. EXCLUIR DOAÇÃO
console.log('\n--- EXCLUIR DOAÇÃO ---');

const exclusao = await fetch(`http://localhost:3000/doacoes/${id}`, {
    method: 'DELETE',
    headers: cabecalho
});

console.log('Status:', exclusao.status);
console.log(await exclusao.json());