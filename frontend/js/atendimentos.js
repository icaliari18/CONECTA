const API_URL = 'http://localhost:3000';

// VERIFICAR AUTENTICAÇÃO
const token = sessionStorage.getItem('token');
const usuario = JSON.parse(sessionStorage.getItem('usuario') || 'null');

if (!token || !usuario) {
    window.location.href = 'index.html';
}

// ELEMENTOS DO HTML
const formulario = document.getElementById('form-atendimento');
const campoId = document.getElementById('id-atendimento');
const campoNome = document.getElementById('nome-atendido');
const campoTipo = document.getElementById('tipo-atendimento');
const campoDescricao = document.getElementById('descricao');
const campoStatus = document.getElementById('status');

const lista = document.getElementById('lista-atendimentos');
const mensagem = document.getElementById('mensagem-atendimento');

const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar = document.getElementById('botao-cancelar');

const nomeUsuario = document.getElementById('nome-usuario');
const tipoUsuario = document.getElementById('tipo-usuario');
const avatar = document.querySelector('.avatar');

// MOSTRAR DADOS DO USUÁRIO
nomeUsuario.textContent = usuario.nome;

if (avatar) avatar.textContent = usuario.nome.charAt(0).toUpperCase();

tipoUsuario.textContent =
    usuario.tipo === 'administrador'
        ? 'Administrador'
        : 'Colaborador';

// CABEÇALHOS DAS REQUISIÇÕES
function obterCabecalhos() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// FORMATAR DATA
function formatarData(data) {
    if (!data) return '-';

    const dataFormatada = new Date(data);

    if (isNaN(dataFormatada.getTime())) return '-';

    return dataFormatada.toLocaleDateString('pt-BR');
}

// EVITAR INSERÇÃO DE HTML INDEVIDO
function escaparHTML(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    })[caractere]);
}

// CARREGAR ATENDIMENTOS
async function carregarAtendimentos() {
    lista.innerHTML = `
        <tr>
            <td colspan="5">Carregando atendimentos...</td>
        </tr>
    `;

    try {
        const resposta = await fetch(`${API_URL}/atendimentos`, {
            method: 'GET',
            headers: obterCabecalhos()
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao carregar atendimentos.');
        }

        if (!Array.isArray(dados)) {
            throw new Error('Resposta inválida da API.');
        }

        if (dados.length === 0) {
            lista.innerHTML = `
                <tr>
                    <td colspan="5">Nenhum atendimento cadastrado ainda.</td>
                </tr>
            `;
            return;
        }

        lista.innerHTML = dados.map(atendimento => `
            <tr>
                <td>${escaparHTML(atendimento.nome_atendido)}</td>
                <td>${escaparHTML(atendimento.tipo_atendimento)}</td>
                <td>${formatarData(atendimento.data_atendimento)}</td>
                <td>${escaparHTML(atendimento.status)}</td>
                <td>
                    <button
                        type="button"
                        onclick="editarAtendimento(${Number(atendimento.id)})">
                        Editar
                    </button>

                    ${usuario.tipo === 'administrador' ? `
                        <button
                            type="button"
                            onclick="excluirAtendimento(${Number(atendimento.id)})">
                            Excluir
                        </button>
                    ` : ''}
                </td>
            </tr>
        `).join('');

    } catch (erro) {
        console.error('Erro ao carregar atendimentos:', erro);

        lista.innerHTML = `
            <tr>
                <td colspan="5">${escaparHTML(erro.message)}</td>
            </tr>
        `;
    }
}

// CADASTRAR OU ATUALIZAR
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const id = campoId.value;

    const atendimento = {
        nome_atendido: campoNome.value.trim(),
        tipo_atendimento: campoTipo.value.trim(),
        descricao: campoDescricao.value.trim(),
        status: campoStatus.value
    };

    if (!atendimento.nome_atendido || !atendimento.tipo_atendimento) {
        mensagem.textContent = 'Preencha os campos obrigatórios.';
        return;
    }

    const metodo = id ? 'PUT' : 'POST';

    const rota = id
        ? `${API_URL}/atendimentos/${id}`
        : `${API_URL}/atendimentos`;

    try {
        botaoSalvar.disabled = true;

        const resposta = await fetch(rota, {
            method: metodo,
            headers: obterCabecalhos(),
            body: JSON.stringify(atendimento)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao salvar atendimento.');
        }

        mensagem.textContent = dados.mensagem;
        mensagem.className = 'mensagem-sucesso';

        formulario.reset();
        cancelarEdicao();

        await carregarAtendimentos();

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.className = 'mensagem-erro';

    } finally {
        botaoSalvar.disabled = false;
    }
});

// EDITAR ATENDIMENTO
async function editarAtendimento(id) {
    try {
        const resposta = await fetch(`${API_URL}/atendimentos/${id}`, {
            headers: obterCabecalhos()
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao buscar atendimento.');
        }

        campoId.value = dados.id;
        campoNome.value = dados.nome_atendido;
        campoTipo.value = dados.tipo_atendimento;
        campoDescricao.value = dados.descricao || '';
        campoStatus.value = dados.status;

        document.getElementById('titulo-formulario').textContent =
            'Editar atendimento';

        botaoSalvar.textContent = 'Salvar alterações';
        botaoCancelar.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.className = 'mensagem-erro';
    }
}

// CANCELAR EDIÇÃO
function cancelarEdicao() {
    campoId.value = '';

    document.getElementById('titulo-formulario').textContent =
        'Novo atendimento';

    botaoSalvar.textContent = 'Cadastrar atendimento';
    botaoCancelar.hidden = true;
}

// BOTÃO CANCELAR
botaoCancelar.addEventListener('click', () => {
    formulario.reset();
    cancelarEdicao();
    mensagem.textContent = '';
});

// EXCLUIR ATENDIMENTO
async function excluirAtendimento(id) {
    if (usuario.tipo !== 'administrador') {
        alert('Somente administradores podem excluir atendimentos.');
        return;
    }

    const confirmar = confirm(
        'Tem certeza que deseja excluir este atendimento?'
    );

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/atendimentos/${id}`, {
            method: 'DELETE',
            headers: obterCabecalhos()
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao excluir atendimento.');
        }

        mensagem.textContent = dados.mensagem;
        mensagem.className = 'mensagem-sucesso';

        await carregarAtendimentos();

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.className = 'mensagem-erro';
    }
}

// DEIXAR FUNÇÕES DISPONÍVEIS NOS BOTÕES
window.editarAtendimento = editarAtendimento;
window.excluirAtendimento = excluirAtendimento;

// INICIAR PÁGINA
carregarAtendimentos();
// LOGOUT
const botaoSair = document.getElementById('botao-sair');
if (botaoSair) {
    botaoSair.addEventListener('click', () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        window.location.href = 'index.html';
    });
}

