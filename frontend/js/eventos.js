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
const formulario = document.getElementById('form-evento');
const campoId = document.getElementById('id-evento');
const campoNome = document.getElementById('nome');
const campoDescricao = document.getElementById('descricao');
const campoLocal = document.getElementById('local');
const campoData = document.getElementById('data-evento');
const campoCapacidade = document.getElementById('capacidade');
const campoStatus = document.getElementById('status');

const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar = document.getElementById('botao-cancelar');
const mensagem = document.getElementById('mensagem-evento');
const tituloFormulario = document.getElementById('titulo-formulario');
const listaEventos = document.getElementById('lista-eventos');

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

    botaoSalvar.textContent = 'Cadastrar evento';
    botaoCancelar.style.display = 'none';
    tituloFormulario.textContent = 'Novo evento';

    mensagem.style.display = 'none';
}

// CARREGAR EVENTOS
async function carregarEventos() {
    try {
        const resposta = await fetch(`${API_URL}/eventos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar os eventos.');
        }

        const eventos = await resposta.json();

        listaEventos.innerHTML = '';

        if (eventos.length === 0) {
            const linha = document.createElement('tr');
            const coluna = document.createElement('td');

            coluna.colSpan = 6;
            coluna.textContent = 'Nenhum evento cadastrado.';

            linha.appendChild(coluna);
            listaEventos.appendChild(linha);
            return;
        }

        eventos.forEach(evento => {
            const linha = document.createElement('tr');

            const nome = document.createElement('td');
            nome.textContent = evento.nome;

            const local = document.createElement('td');
            local.textContent = evento.local || 'Não informado';

            const data = document.createElement('td');
            data.textContent = formatarData(evento.data_evento);

            const capacidade = document.createElement('td');
            capacidade.textContent =
                evento.capacidade ?? 'Não informada';

            const status = document.createElement('td');

            const indicador = document.createElement('span');
            indicador.classList.add(
                'status-evento',
                `status-${evento.status}`
            );

            const nomesStatus = {
                planejado: 'Planejado',
                confirmado: 'Confirmado',
                realizado: 'Realizado',
                cancelado: 'Cancelado'
            };

            indicador.textContent =
                nomesStatus[evento.status] || evento.status;

            status.appendChild(indicador);

            const acoes = document.createElement('td');

            const botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';

            botaoEditar.addEventListener('click', () => {
                editarEvento(evento.id);
            });

            acoes.appendChild(botaoEditar);

            if (usuario.tipo === 'administrador') {
                const botaoExcluir = document.createElement('button');
                botaoExcluir.textContent = 'Excluir';

                botaoExcluir.addEventListener('click', () => {
                    excluirEvento(evento.id);
                });

                acoes.appendChild(botaoExcluir);
            }

            linha.append(
                nome,
                local,
                data,
                capacidade,
                status,
                acoes
            );

            listaEventos.appendChild(linha);
        });

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// CADASTRAR OU EDITAR EVENTO
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    if (!campoNome.value.trim() || !campoData.value) {
        mostrarMensagem(
            'Informe o nome e a data do evento.',
            'erro'
        );
        return;
    }

    let capacidade = null;

    if (campoCapacidade.value !== '') {
        capacidade = Number(campoCapacidade.value);

        if (!Number.isInteger(capacidade) || capacidade < 0) {
            mostrarMensagem(
                'A capacidade deve ser um número inteiro maior ou igual a zero.',
                'erro'
            );
            return;
        }
    }

    const dadosEvento = {
        nome: campoNome.value.trim(),
        descricao: campoDescricao.value,
        local: campoLocal.value,
        data_evento: campoData.value,
        capacidade: capacidade,
        status: campoStatus.value
    };

    const id = campoId.value;

    const metodo = id ? 'PUT' : 'POST';

    const url = id
        ? `${API_URL}/eventos/${id}`
        : `${API_URL}/eventos`;

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dadosEvento)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || 'Erro ao salvar evento.'
            );
        }

        limparFormulario();

        mostrarMensagem(
            resultado.mensagem || 'Evento salvo com sucesso!',
            'sucesso'
        );

        await carregarEventos();

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
});

// EDITAR EVENTO
async function editarEvento(id) {
    try {
        const resposta = await fetch(`${API_URL}/eventos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const evento = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                evento.mensagem || 'Erro ao buscar evento.'
            );
        }

        campoId.value = evento.id;
        campoNome.value = evento.nome;
        campoDescricao.value = evento.descricao || '';
        campoLocal.value = evento.local || '';
        campoData.value = String(evento.data_evento).slice(0, 10);
        campoCapacidade.value = evento.capacidade ?? '';
        campoStatus.value = evento.status || 'planejado';

        botaoSalvar.textContent = 'Salvar alterações';
        botaoCancelar.style.display = 'inline-block';
        tituloFormulario.textContent = 'Editar evento';

        mensagem.style.display = 'none';

        formulario.scrollIntoView({ behavior: 'smooth' });

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// EXCLUIR EVENTO
async function excluirEvento(id) {
    const confirmar = confirm('Deseja realmente excluir este evento?');

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/eventos/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || 'Erro ao excluir evento.'
            );
        }

        mostrarMensagem(
            resultado.mensagem || 'Evento excluído com sucesso!',
            'sucesso'
        );

        await carregarEventos();

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// CANCELAR EDIÇÃO
botaoCancelar.addEventListener('click', limparFormulario);

// CARREGAR EVENTOS AO ABRIR A PÁGINA
carregarEventos();