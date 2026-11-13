
const API_URL = 'http://localhost:3000';

// ELEMENTOS DO FORMULÁRIO
const formularioCadastro = document.getElementById('form-cadastro');
const mensagemCadastro = document.getElementById('mensagem-cadastro');
const botaoCadastro = document.getElementById('botao-cadastro');

// REALIZAR CADASTRO DA INSTITUIÇÃO
formularioCadastro.addEventListener('submit', async (evento) => {

    evento.preventDefault();

    // CAPTURAR OS DADOS
    const nomeInstituicao = document.getElementById('nome-instituicao').value.trim();
    const emailInstituicao = document.getElementById('email-instituicao').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();

    const nomeAdministrador = document.getElementById('nome-administrador').value.trim();
    const emailAdministrador = document.getElementById('email-administrador').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    mensagemCadastro.textContent = '';
    mensagemCadastro.className = '';

    // VALIDAR SE AS SENHAS SÃO IGUAIS
    if (senha !== confirmarSenha) {
        mensagemCadastro.textContent = 'As senhas não coincidem.';
        mensagemCadastro.className = 'mensagem-erro';
        return;
    }

    // VALIDAR TAMANHO DA SENHA
    if (senha.length < 8) {
        mensagemCadastro.textContent = 'A senha deve ter pelo menos 8 caracteres.';
        mensagemCadastro.className = 'mensagem-erro';
        return;
    }

    botaoCadastro.disabled = true;
    botaoCadastro.textContent = 'Cadastrando...';

    try {

        // ENVIAR OS DADOS PARA A API
        const resposta = await fetch(`${API_URL}/instituicoes/cadastro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomeInstituicao,
                emailInstituicao,
                telefone,
                cidade,
                estado,
                nomeAdministrador,
                emailAdministrador,
                senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Não foi possível realizar o cadastro.');
        }

        mensagemCadastro.textContent =
            'Instituição cadastrada com sucesso! Agora você pode fazer login.';

        mensagemCadastro.className = 'mensagem-sucesso';

        formularioCadastro.reset();

    } catch (erro) {

        mensagemCadastro.textContent = erro.message;
        mensagemCadastro.className = 'mensagem-erro';

    } finally {

        botaoCadastro.disabled = false;
        botaoCadastro.innerHTML = 'Cadastrar instituição <span>→</span>';

    }

});