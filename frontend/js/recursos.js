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
const formulario = document.getElementById('form-recurso');
const campoId = document.getElementById('id-recurso');
const campoNome = document.getElementById('nome');
const campoDescricao = document.getElementById('descricao');
const campoQuantidade = document.getElementById('quantidade');
const campoUnidade = document.getElementById('unidade');
const campoQuantidadeMinima = document.getElementById('quantidade-minima');

const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar = document.getElementById('botao-cancelar');
const mensagem = document.getElementById('mensagem-recursos');
const tituloFormulario = document.getElementById('titulo-formulario');
const listaRecursos = document.getElementById('lista-recursos');

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

// LIMPAR FORMULÁRIO
function limparFormulario() {
    formulario.reset();
    campoId.value = '';
    campoQuantidadeMinima.value = '0';

    botaoSalvar.textContent = 'Cadastrar recurso';
    botaoCancelar.style.display = 'none';
    tituloFormulario.textContent = 'Novo recurso';

    mensagem.style.display = 'none';
}

// CARREGAR RECURSOS
async function carregarRecursos() {
    try {
        const resposta = await fetch(`${API_URL}/recursos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar os recursos.');
        }

        const recursos = await resposta.json();

        listaRecursos.innerHTML = '';

        if (recursos.length === 0) {
            const linha = document.createElement('tr');
            const coluna = document.createElement('td');

            coluna.colSpan = 6;
            coluna.textContent = 'Nenhum recurso cadastrado.';

            linha.appendChild(coluna);
            listaRecursos.appendChild(linha);
            return;
        }

        recursos.forEach(recurso => {
            const linha = document.createElement('tr');

            const nome = document.createElement('td');
            nome.textContent = recurso.nome;

            const descricao = document.createElement('td');
            descricao.textContent = recurso.descricao || 'Sem descrição';

            const quantidade = document.createElement('td');
            quantidade.textContent =
                `${recurso.quantidade} ${recurso.unidade}`;

            const minimo = document.createElement('td');
            minimo.textContent = recurso.quantidade_minima;

            const situacao = document.createElement('td');
            const quantidadeAtual = Number(recurso.quantidade);
            const quantidadeMinima = Number(recurso.quantidade_minima);

            const indicador = document.createElement('span');
            indicador.classList.add('situacao-estoque');

            if (quantidadeAtual <= quantidadeMinima) {
                indicador.textContent = 'Estoque baixo';
                indicador.classList.add('estoque-baixo');
            } else {
                indicador.textContent = 'Normal';
                indicador.classList.add('estoque-normal');
            }

            situacao.appendChild(indicador);

            const acoes = document.createElement('td');

            const botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';

            botaoEditar.addEventListener('click', () => {
                editarRecurso(recurso.id);
            });

            acoes.appendChild(botaoEditar);

            if (usuario.tipo === 'administrador') {
                const botaoExcluir = document.createElement('button');
                botaoExcluir.textContent = 'Excluir';

                botaoExcluir.addEventListener('click', () => {
                    excluirRecurso(recurso.id);
                });

                acoes.appendChild(botaoExcluir);
            }

            linha.append(
                nome,
                descricao,
                quantidade,
                minimo,
                situacao,
                acoes
            );

            listaRecursos.appendChild(linha);
        });

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// CADASTRAR OU EDITAR RECURSO
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const quantidade = Number(campoQuantidade.value);
    const quantidadeMinima = Number(campoQuantidadeMinima.value);

    if (
        !campoNome.value.trim() ||
        campoQuantidade.value === '' ||
        !campoUnidade.value.trim()
    ) {
        mostrarMensagem(
            'Informe o nome, a quantidade e a unidade do recurso.',
            'erro'
        );
        return;
    }

    if (!Number.isFinite(quantidade) || quantidade < 0) {
        mostrarMensagem(
            'A quantidade deve ser um número igual ou maior que zero.',
            'erro'
        );
        return;
    }

    if (
        campoQuantidadeMinima.value !== '' &&
        (!Number.isFinite(quantidadeMinima) || quantidadeMinima < 0)
    ) {
        mostrarMensagem(
            'A quantidade mínima deve ser um número igual ou maior que zero.',
            'erro'
        );
        return;
    }

    const recurso = {
        nome: campoNome.value.trim(),
        descricao: campoDescricao.value,
        quantidade: quantidade,
        unidade: campoUnidade.value.trim(),
        quantidade_minima: campoQuantidadeMinima.value === ''
            ? 0
            : quantidadeMinima
    };

    const id = campoId.value;

    const metodo = id ? 'PUT' : 'POST';

    const url = id
        ? `${API_URL}/recursos/${id}`
        : `${API_URL}/recursos`;

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(recurso)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.mensagem || 'Erro ao salvar recurso.');
        }

        limparFormulario();

        mostrarMensagem(
            resultado.mensagem || 'Recurso salvo com sucesso!',
            'sucesso'
        );

        await carregarRecursos();

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
});

// EDITAR RECURSO
async function editarRecurso(id) {
    try {
        const resposta = await fetch(`${API_URL}/recursos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const recurso = await resposta.json();

        if (!resposta.ok) {
            throw new Error(recurso.mensagem || 'Erro ao buscar recurso.');
        }

        campoId.value = recurso.id;
        campoNome.value = recurso.nome;
        campoDescricao.value = recurso.descricao || '';
        campoQuantidade.value = recurso.quantidade;
        campoUnidade.value = recurso.unidade;
        campoQuantidadeMinima.value = recurso.quantidade_minima ?? 0;

        botaoSalvar.textContent = 'Salvar alterações';
        botaoCancelar.style.display = 'inline-block';
        tituloFormulario.textContent = 'Editar recurso';

        mensagem.style.display = 'none';

        formulario.scrollIntoView({ behavior: 'smooth' });

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// EXCLUIR RECURSO
async function excluirRecurso(id) {
    const confirmar = confirm('Deseja realmente excluir este recurso?');

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/recursos/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.mensagem || 'Erro ao excluir recurso.');
        }

        mostrarMensagem(
            resultado.mensagem || 'Recurso excluído com sucesso!',
            'sucesso'
        );

        await carregarRecursos();

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// CANCELAR EDIÇÃO
botaoCancelar.addEventListener('click', limparFormulario);

// CARREGAR LISTA AO ABRIR A PÁGINA
carregarRecursos();