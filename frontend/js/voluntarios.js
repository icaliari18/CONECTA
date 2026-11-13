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
const formulario = document.getElementById('form-voluntario');
const campoId = document.getElementById('id-voluntario');
const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const campoTelefone = document.getElementById('telefone');
const campoArea = document.getElementById('area-atuacao');
const campoDisponibilidade = document.getElementById('disponibilidade');

const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar = document.getElementById('botao-cancelar');
const mensagem = document.getElementById('mensagem-voluntario');
const tituloFormulario = document.getElementById('titulo-formulario');
const listaVoluntarios = document.getElementById('lista-voluntarios');

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

    botaoSalvar.textContent = 'Cadastrar voluntário';
    botaoCancelar.style.display = 'none';
    tituloFormulario.textContent = 'Novo voluntário';

    mensagem.style.display = 'none';
}

// CARREGAR VOLUNTÁRIOS
async function carregarVoluntarios() {
    try {
        const resposta = await fetch(`${API_URL}/voluntarios`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar os voluntários.');
        }

        const voluntarios = await resposta.json();

        listaVoluntarios.innerHTML = '';

        if (voluntarios.length === 0) {
            const linha = document.createElement('tr');
            const coluna = document.createElement('td');

            coluna.colSpan = 6;
            coluna.textContent = 'Nenhum voluntário cadastrado.';

            linha.appendChild(coluna);
            listaVoluntarios.appendChild(linha);
            return;
        }

        voluntarios.forEach(voluntario => {
            const linha = document.createElement('tr');

            const nome = document.createElement('td');
            nome.textContent = voluntario.nome;

            const email = document.createElement('td');
            email.textContent = voluntario.email || 'Não informado';

            const telefone = document.createElement('td');
            telefone.textContent = voluntario.telefone || 'Não informado';

            const area = document.createElement('td');
            area.textContent = voluntario.area_atuacao || 'Não informada';

            const disponibilidade = document.createElement('td');
            disponibilidade.textContent =
                voluntario.disponibilidade || 'Não informada';

            const acoes = document.createElement('td');

            const botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';

            botaoEditar.addEventListener('click', () => {
                editarVoluntario(voluntario.id);
            });

            acoes.appendChild(botaoEditar);

            if (usuario.tipo === 'administrador') {
                const botaoExcluir = document.createElement('button');
                botaoExcluir.textContent = 'Excluir';

                botaoExcluir.addEventListener('click', () => {
                    excluirVoluntario(voluntario.id);
                });

                acoes.appendChild(botaoExcluir);
            }

            linha.append(
                nome,
                email,
                telefone,
                area,
                disponibilidade,
                acoes
            );

            listaVoluntarios.appendChild(linha);
        });

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// CADASTRAR OU EDITAR VOLUNTÁRIO
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    if (!campoNome.value.trim()) {
        mostrarMensagem('Informe o nome do voluntário.', 'erro');
        return;
    }

    const voluntario = {
        nome: campoNome.value.trim(),
        email: campoEmail.value.trim(),
        telefone: campoTelefone.value.trim(),
        area_atuacao: campoArea.value.trim(),
        disponibilidade: campoDisponibilidade.value.trim()
    };

    const id = campoId.value;

    const metodo = id ? 'PUT' : 'POST';

    const url = id
        ? `${API_URL}/voluntarios/${id}`
        : `${API_URL}/voluntarios`;

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(voluntario)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.mensagem || 'Erro ao salvar voluntário.');
        }

        limparFormulario();

        mostrarMensagem(
            resultado.mensagem || 'Voluntário salvo com sucesso!',
            'sucesso'
        );

        await carregarVoluntarios();

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
});

// EDITAR VOLUNTÁRIO
async function editarVoluntario(id) {
    try {
        const resposta = await fetch(`${API_URL}/voluntarios/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const voluntario = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                voluntario.mensagem || 'Erro ao buscar voluntário.'
            );
        }

        campoId.value = voluntario.id;
        campoNome.value = voluntario.nome;
        campoEmail.value = voluntario.email || '';
        campoTelefone.value = voluntario.telefone || '';
        campoArea.value = voluntario.area_atuacao || '';
        campoDisponibilidade.value = voluntario.disponibilidade || '';

        botaoSalvar.textContent = 'Salvar alterações';
        botaoCancelar.style.display = 'inline-block';
        tituloFormulario.textContent = 'Editar voluntário';

        mensagem.style.display = 'none';

        formulario.scrollIntoView({ behavior: 'smooth' });

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// EXCLUIR VOLUNTÁRIO
async function excluirVoluntario(id) {
    const confirmar = confirm('Deseja realmente excluir este voluntário?');

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/voluntarios/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || 'Erro ao excluir voluntário.'
            );
        }

        mostrarMensagem(
            resultado.mensagem || 'Voluntário excluído com sucesso!',
            'sucesso'
        );

        await carregarVoluntarios();

    } catch (erro) {
        mostrarMensagem(erro.message, 'erro');
    }
}

// CANCELAR EDIÇÃO
botaoCancelar.addEventListener('click', limparFormulario);

// CARREGAR LISTA AO ABRIR A PÁGINA
carregarVoluntarios();
