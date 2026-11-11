const resposta = await fetch('http://localhost:3000/instituicoes/cadastro', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nomeInstituicao: 'Instituição Isolamento Teste',
        emailInstituicao: 'isolamento.instituicao@example.com',
        telefone: '51988888888',
        cidade: 'Santa Cruz do Sul',
        estado: 'RS',
        nomeAdministrador: 'Admin Isolamento',
        emailAdministrador: 'isolamento.admin@example.com',
        senha: 'SenhaTeste2026!'
    })
});

const resultado = await resposta.json();

console.log('--- CADASTRO DA SEGUNDA INSTITUIÇÃO ---');
console.log('Status:', resposta.status);
console.log('Resposta:', resultado);
