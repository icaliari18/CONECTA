const API_URL = 'http://localhost:3000';

// VERIFICAR SE EXISTE UM TOKEN
const token = sessionStorage.getItem('token');

// Se não existir token, volta para o login
if (!token) {
    window.location.href = 'index.html';
}

// ELEMENTOS DO HTML
const nomeUsuario = document.getElementById('nome-usuario');
const tipoUsuario = document.getElementById('tipo-usuario');
const avatar = document.querySelector('.avatar');

// VERIFICAR AUTENTICAÇÃO E CARREGAR PERFIL
async function carregarPerfil() {

    try {

        // Consulta o perfil na API
        const resposta = await fetch(`${API_URL}/usuarios/perfil`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Verifica se o token é válido
        if (!resposta.ok) {
            throw new Error('Sessão inválida ou expirada.');
        }

        const dados = await resposta.json();

        // Recupera os dados recebidos no login
        const usuarioSalvo = JSON.parse(
            sessionStorage.getItem('usuario')
        );

        // Mostra o nome do usuário
        nomeUsuario.textContent = usuarioSalvo.nome;

        // Mostra o tipo de perfil
        const tipo = dados.usuario.tipo;

        tipoUsuario.textContent =
            tipo === 'administrador'
                ? 'Administrador'
                : 'Colaborador';

        // Mostra a primeira letra do nome no avatar
        avatar.textContent = usuarioSalvo.nome
            .charAt(0)
            .toUpperCase();

    } catch (erro) {

        // Remove os dados da sessão inválida
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');

        // Volta para a tela de login
        window.location.href = 'index.html';

    }

}

// CARREGAR OS TOTAIS DOS MÓDULOS
async function carregarResumo() {

    const modulos = [
        {
            rota: '/atendimentos',
            elemento: 'total-atendimentos'
        },
        {
            rota: '/doacoes',
            elemento: 'total-doacoes'
        },
        {
            rota: '/recursos',
            elemento: 'total-recursos'
        },
        {
            rota: '/voluntarios',
            elemento: 'total-voluntarios'
        },
        {
            rota: '/eventos',
            elemento: 'total-eventos'
        }
    ];

    // Consulta todos os módulos
    await Promise.all(
        modulos.map(async (modulo) => {

            const elemento = document.getElementById(
                modulo.elemento
            );

            try {

                const resposta = await fetch(
                    `${API_URL}${modulo.rota}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (!resposta.ok) {
                    throw new Error('Erro ao buscar registros.');
                }

                const dados = await resposta.json();

                if (!Array.isArray(dados)) {
                    throw new Error('Formato de resposta inválido.');
                }

                // Mostra a quantidade de registros
                elemento.textContent = dados.length;

            } catch (erro) {

                console.error(
                    `Erro ao carregar ${modulo.rota}:`,
                    erro
                );

                elemento.textContent = '—';
            }

        })
    );
}


// Executa a verificação e carrega o resumo
if (token) {
    carregarPerfil();
    carregarResumo();
}
// LOGOUT
const botaoSair = document.getElementById('botao-sair');
if (botaoSair) {
    botaoSair.addEventListener('click', () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        window.location.href = 'index.html';
    });
}
