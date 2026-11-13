const API_URL = 'http://localhost:3000';

// ELEMENTOS DO HTML
const formularioLogin = document.getElementById('form-login');
const campoEmail = document.getElementById('email');
const campoSenha = document.getElementById('senha');
const mensagemLogin = document.getElementById('mensagem-login');
const botaoLogin = document.getElementById('botao-login');

// REALIZAR LOGIN
formularioLogin.addEventListener('submit', async (evento) => {

    // Impede o recarregamento da página
    evento.preventDefault();

    // Captura os valores digitados
    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    // Limpa mensagens anteriores
    mensagemLogin.textContent = '';

    // Desabilita o botão durante a requisição
    botaoLogin.disabled = true;
    botaoLogin.textContent = 'Entrando...';

    try {

        // Envia os dados para o backend
        const resposta = await fetch(`${API_URL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        // Converte a resposta para JSON
        const dados = await resposta.json();

        // Verifica se o login foi realizado
        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Não foi possível realizar o login.');
        }

        // Guarda o token e os dados do usuário
        sessionStorage.setItem('token', dados.token);
        sessionStorage.setItem('usuario', JSON.stringify(dados.usuario));

        // Exibe mensagem de sucesso
       mensagemLogin.textContent = 'Login realizado com sucesso!';
        mensagemLogin.className = 'mensagem-sucesso';

        // Redireciona para o painel
        window.location.href = 'painel.html';

    } catch (erro) {

        // Exibe mensagem de erro
        mensagemLogin.textContent = erro.message;
        mensagemLogin.className = 'mensagem-erro';

    } finally {

        // Reativa o botão
        botaoLogin.disabled = false;
        botaoLogin.innerHTML = 'Entrar <span>→</span>';

    }
});