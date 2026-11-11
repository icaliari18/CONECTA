const resposta = await fetch('http://localhost:3000/instituicoes/cadastro', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nomeInstituicao: 'Instituicao Teste',
        emailInstituicao: 'instituicao.teste@example.com',
        telefone: '51999999999',
        cidade: 'Santa Cruz do Sul',
        estado: 'RS',
        nomeAdministrador: 'Administrador Teste',
        emailAdministrador: 'admin.teste@example.com',
        senha: 'Teste1234!'
    })
});

const resultado = await resposta.json();

console.log('Status:', resposta.status);
console.log('Resposta:', resultado);