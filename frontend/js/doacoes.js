const API_URL = 'http://localhost:3000';

const token = sessionStorage.getItem('token');
const usuario = JSON.parse(sessionStorage.getItem('usuario'));

if (!token || !usuario) {
    window.location.href = 'index.html';
}

// ELEMENTOS DO PERFIL
const nomeUsuario = document.getElementById('nome-usuario');
const tipoUsuario = document.getElementById('tipo-usuario');
const avatar = document.querySelector('.avatar');

// ELEMENTOS DO FORMULÁRIO
const formulario = document.getElementById('form-doacao');
const campoId = document.getElementById('id-doacao');
const campoDoador = document.getElementById('nome-doador');
const campoTipo = document.getElementById('tipo-doacao');
const campoDescricao = document.getElementById('descricao');
const campoQuantidade = document.getElementById('quantidade');
const campoData = document.getElementById('data-recebimento');
const campoObservacoes = document.getElementById('observacoes');

const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar = document.getElementById('botao-cancelar');
const mensagem = document.getElementById('mensagem-doacao');
const tituloFormulario = document.getElementById('titulo-formulario');
const listaDoacoes = document.getElementById('lista-doacoes');

// DADOS DO PERFIL
nomeUsuario.textContent = usuario.nome;
tipoUsuario.textContent = usuario.tipo;
avatar.textContent = usuario.nome.charAt(0).toUpperCase();

// MOSTRAR MENSAGENS
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
    mensagem.style.display = 'block';
}

// FORMATAR DATA
function formatarData(data) {
    if (!data) return 'Não informada';

    const dataTexto = String(data).slice(0, 10);
    const [ano, mes, dia] = dataTexto.split('-');

    return `${dia}/${mes}/${ano}`;
}

// LIMPAR FORMULÁRIO
function limparFormulario() {
    formulario.reset();
    campoId.value = '';

    botaoSalvar.textContent = 'Cadastrar doação';
    botaoCancelar.style.display = 'none';
    tituloFormulario.textContent = 'Nova doação';

    mensagem.style.display = 'none';
}

// CARREGAR DOAÇÕES
async function carregarDoacoes() {
    try {
        const resposta = await fetch(`${API_URL}/doacoes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar as doações.');
        }

        const doacoes = await resposta.json();

        listaDoacoes.innerHTML = '';

        if (doacoes.length === 0) {
            const linha = document.createElement('tr');
            const coluna = document.createElement('td');

            coluna.colSpan = 5;
            coluna.textContent = 'Nenhuma doação cadastrada.';

            linha.appendChild(coluna);
            listaDoacoes.appendChild(linha);
            return;
        }

        doacoes.forEach(doacao => {
            const linha = document.createElement('tr');

            const doador = document.createElement('td');
            doador.textContent = doacao.nome_doador || 'Não informado';

            const tipo = document.createElement('td');
            tipo.textContent = doacao.tipo_doacao;

            const quantidade = document.createElement('td');
            quantidade.textContent = doacao.quantidade;

            const data = document.createElement('td');
            data.textContent = formatarData(doacao.data_recebimento);

            const acoes = document.createElement('td');

            const botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';
            botaoEditar.addEventListener('click', () => {
                editarDoacao(doacao.id);
            });

            acoes.appendChild(botaoEditar);

            if (usuario.tipo === 'administrador') {
                const botaoExcluir = document.createElement('button');
                botaoExcluir.textContent = 'Excluir';
                botaoExcluir.addEventListener('click', () => {
                    excluirDoacao(doacao.id);
                });

                acoes.appendChild(botaoExcluir);
            }

            linha.append(doador, tipo, quantidade, data, acoes);
            listaDoacoes.appendChild(linha);
        });

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// CADASTRAR OU EDITAR DOAÇÃO
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const quantidade = Number(campoQuantidade.value);

    if (!campoTipo.value || !campoData.value ||
        campoQuantidade.value === '' ||
        !Number.isFinite(quantidade) || quantidade <= 0) {
        mostrarMensagem(
            'Preencha o tipo, a quantidade válida e a data de recebimento.',
            'erro'
        );
        return;
    }

    const doacao = {
        nome_doador: campoDoador.value,
        tipo_doacao: campoTipo.value,
        descricao: campoDescricao.value,
        quantidade: quantidade,
        data_recebimento: campoData.value,
        observacoes: campoObservacoes.value
    };

    const id = campoId.value;

    const metodo = id ? 'PUT' : 'POST';
    const url = id
        ? `${API_URL}/doacoes/${id}`
        : `${API_URL}/doacoes`;

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(doacao)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.mensagem || 'Erro ao salvar doação.');
        }

        mostrarMensagem(
            resultado.mensagem || 'Doação salva com sucesso!',
            'sucesso'
        );

        limparFormulario();
        await carregarDoacoes();

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
});

// EDITAR DOAÇÃO
async function editarDoacao(id) {
    try {
        const resposta = await fetch(`${API_URL}/doacoes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const doacao = await resposta.json();

        if (!resposta.ok) {
            throw new Error(doacao.mensagem || 'Erro ao buscar doação.');
        }

        campoId.value = doacao.id;
        campoDoador.value = doacao.nome_doador || '';
        campoTipo.value = doacao.tipo_doacao;
        campoDescricao.value = doacao.descricao || '';
        campoQuantidade.value = doacao.quantidade;
        campoData.value = String(doacao.data_recebimento).slice(0, 10);
        campoObservacoes.value = doacao.observacoes || '';

        botaoSalvar.textContent = 'Salvar alterações';
        botaoCancelar.style.display = 'inline-block';
        tituloFormulario.textContent = 'Editar doação';

        mensagem.style.display = 'none';

        formulario.scrollIntoView({ behavior: 'smooth' });

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// EXCLUIR DOAÇÃO
async function excluirDoacao(id) {
    const confirmar = confirm('Deseja realmente excluir esta doação?');

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/doacoes/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.mensagem || 'Erro ao excluir doação.');
        }

        mostrarMensagem(
            resultado.mensagem || 'Doação excluída com sucesso!',
            'sucesso'
        );

        await carregarDoacoes();

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// CANCELAR EDIÇÃO
botaoCancelar.addEventListener('click', limparFormulario);

// CARREGAR A LISTA AO ABRIR A PÁGINA
carregarDoacoes();

// LOGOUT
const botaoSair = document.getElementById('botao-sair');
if (botaoSair) {
    botaoSair.addEventListener('click', () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        window.location.href = 'index.html';
    });
}