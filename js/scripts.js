// Simulando um banco de dados para armazenar os registros
let registros = [];
let idContador = 1;

// Função para cadastrar uma pessoa usando o formulário do modal
function cadastrarPessoaModal() {
    // Obter valores dos campos do formulário
    const nome = document.getElementById('nomeModal').value;
    const idade = document.getElementById('idadeModal').value;
    const salario = document.getElementById('salarioModal').value;
    const funcao = document.getElementById('funcaoModal').value;

    // Criar objeto pessoa
    const pessoa = {
        id: idContador++,
        nome,
        idade,
        salario,
        funcao
    };

    // Adicionar pessoa aos registros e atualizar a tabela
    registros.push(pessoa);
    exibirRegistros();

    // Limpar os campos do formulário do modal após a inserção
    document.getElementById('nomeModal').value = '';
    document.getElementById('idadeModal').value = '';
    document.getElementById('salarioModal').value = '';
    document.getElementById('funcaoModal').value = '';

    // Fechar o modal de cadastro
    fecharModalCadastro();
}

// Função para exibir os registros na tabela
function exibirRegistros() {
    const tabelaRegistros = document.getElementById('listaRegistros');
    tabelaRegistros.innerHTML = '';

    registros.forEach((pessoa) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pessoa.nome}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.salario}</td>
            <td>${pessoa.funcao}</td>
            <td>
                <button onclick="editarPessoa(${pessoa.id})">Editar</button>
                <button onclick="excluirPessoa(${pessoa.id})">Excluir</button>
            </td>
        `;
        tabelaRegistros.appendChild(tr);
    });
}

// Função para editar uma pessoa
let pessoaEditando;

function editarPessoa(id) {
    pessoaEditando = registros.find(pessoa => pessoa.id === id);

    if (!pessoaEditando) {
        alert('Pessoa não encontrada para edição.');
        return;
    }

    // Preencher os campos do formulário de edição com os valores atuais
    document.getElementById('editNome').value = pessoaEditando.nome;
    document.getElementById('editIdade').value = pessoaEditando.idade;
    document.getElementById('editSalario').value = pessoaEditando.salario;
    document.getElementById('editFuncao').value = pessoaEditando.funcao;

    // Exibir o modal de edição
    document.getElementById('myModal').style.display = 'block';
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Função para salvar a edição de uma pessoa
function salvarEdicao() {
    // Atualizar os valores da pessoa editando com os valores do modal de edição
    pessoaEditando.nome = document.getElementById('editNome').value;
    pessoaEditando.idade = document.getElementById('editIdade').value;
    pessoaEditando.salario = document.getElementById('editSalario').value;
    pessoaEditando.funcao = document.getElementById('editFuncao').value;

    // Fechar o modal de edição
    fecharModal();

    // Atualizar a tabela de registros
    exibirRegistros();
}

// Função para excluir uma pessoa
let pessoaParaExcluir;

function excluirPessoa(id) {
    pessoaParaExcluir = registros.find(pessoa => pessoa.id === id);

    if (!pessoaParaExcluir) {
        alert('Pessoa não encontrada para exclusão.');
        return;
    }

    // Exibir modal de confirmação
    const confirmMessage = `Tem certeza que deseja excluir ${pessoaParaExcluir.nome}?`;
    exibirConfirmacao(confirmMessage);
}

// Função para exibir o modal de confirmação
function exibirConfirmacao(message) {
    document.getElementById('confirmMessage').innerText = message;
    document.getElementById('confirmModal').style.display = 'block';
}

// Função para confirmar a exclusão de uma pessoa
function confirmarExclusao() {
    registros = registros.filter(pessoa => pessoa.id !== pessoaParaExcluir.id);
    fecharModalConfirmacao();
    exibirRegistros();
}

// Função para fechar o modal de confirmação
function fecharModalConfirmacao() {
    document.getElementById('confirmModal').style.display = 'none';
}

// Função para mostrar a página desejada
function mostrarPagina(id) {
    const paginas = document.querySelectorAll('.content');
    paginas.forEach(pagina => {
        pagina.style.display = 'none';
    });

    const paginaAtual = document.getElementById(id);
    paginaAtual.style.display = 'block';
}

// Função para abrir o modal de cadastro
function abrirModalCadastro() {
    document.getElementById('cadastroModal').style.display = 'block';
}

// Função para fechar o modal de cadastro
function fecharModalCadastro() {
    document.getElementById('cadastroModal').style.display = 'none';
}
