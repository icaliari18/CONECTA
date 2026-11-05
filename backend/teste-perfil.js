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

console.log('Login:', respostaLogin.status);

if (!respostaLogin.ok) {
    console.log(dadosLogin);
    process.exit(1);
}

const token = dadosLogin.token;

// Teste da rota de perfil
const respostaPerfil = await fetch('http://localhost:3000/usuarios/perfil', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

console.log('Perfil:', respostaPerfil.status);
console.log(await respostaPerfil.json());

// Teste da rota exclusiva para administrador
const respostaAdmin = await fetch('http://localhost:3000/usuarios/somente-admin', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

console.log('Rota de administrador:', respostaAdmin.status);
console.log(await respostaAdmin.json());