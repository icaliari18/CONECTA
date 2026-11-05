
const resposta = await fetch('http://localhost:3000/usuarios/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'admin.teste@example.com',
        senha: 'Teste1234!'
    })
});

const resultado = await resposta.json();

console.log('Status:', resposta.status);
console.log('Resposta:', resultado.mensagem);
console.log('Usuário:', resultado.usuario);
console.log('Token JWT recebido:', Boolean(resultado.token));
