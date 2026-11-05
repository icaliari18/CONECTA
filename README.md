# Conecta

## 1. Descrição do projeto
O Conecta é um sistema web desenvolvido para auxiliar instituições sociais na organização e no gerenciamento de suas atividades. A plataforma centraliza informações sobre atendimentos, doações, recursos, voluntários, eventos e campanhas, facilitando o controle das ações realizadas.

O sistema será destinado a diferentes tipos de instituições sociais. Cada uma poderá realizar seu próprio cadastro na plataforma, criar a conta de seu primeiro administrador e cadastrar colaboradores para auxiliar na gestão de suas atividades.

As instituições compartilharão a mesma plataforma, mas terão seus próprios usuários e registros, com controle de acesso para impedir que uma instituição visualize ou altere as informações de outra.

## 2. Problema identificado
Instituições sociais precisam organizar diversas atividades, como atendimentos, recebimento e distribuição de doações, controle de recursos, organização de voluntários e realização de eventos.

Quando essas informações ficam distribuídas entre diferentes pessoas, pastas etc pode ser mais difícil acompanhar solicitações, consultar registros, controlar recursos disponíveis e manter as atividades organizadas.

Diante desse cenário, o Conecta propõe uma solução digital para centralizar as informações e facilitar a gestão das atividades institucionais.

## 3. Público-alvo
O sistema será destinado a instituições sociais de diferentes tipos, como organizações não governamentais (ONGs), associações, projetos comunitários e outras organizações que realizam atividades de apoio social.

Os usuários da plataforma serão administradores e colaboradores responsáveis pela organização e execução das atividades de cada instituição.

## 4. Objetivo geral

Desenvolver um sistema web que facilite a organização e o gerenciamento das atividades de instituições sociais, centralizando informações e auxiliando no acompanhamento dos atendimentos, doações, recursos, voluntários e eventos.

## 5. Objetivos específicos

- Centralizar as informações de cada instituição em um único sistema.
- Permitir que diferentes instituições se cadastrem e utilizem a plataforma de forma independente.
- Facilitar o registro e o acompanhamento de atendimentos e solicitações.
- Organizar o controle de doações e recursos disponíveis.
- Manter os dados dos voluntários organizados.
- Facilitar o planejamento e o acompanhamento de eventos e campanhas.
- Permitir que administradores gerenciem os usuários de suas instituições.
- Controlar o acesso às informações conforme a instituição e o perfil de cada usuário.

## 6. Principais funcionalidades previstas
- **Cadastro de instituições:** permitir que uma instituição registre seus dados e crie sua conta na plataforma.
- **Criação do primeiro administrador:** criar a conta do administrador responsável pela instituição durante o cadastro inicial.
- **Login e autenticação:** permitir o acesso individual dos usuários por meio de credenciais próprias.
- **Gestão de usuários:** permitir que o administrador cadastre e gerencie os colaboradores de sua instituição.
- **Painel principal:** apresentar informações gerais e atividades que precisam de atenção.
- **Gestão de atendimentos:** registrar solicitações, responsáveis e seus status.
- **Gestão de doações e recursos:** registrar recebimentos, saídas e disponibilidade de recursos.
- **Gestão de voluntários:** cadastrar voluntários e organizar suas participações.
- **Gestão de eventos e campanhas:** registrar atividades, datas, responsáveis e participantes.
- **Consulta e atualização de registros:** permitir visualizar, editar e excluir informações conforme as permissões definidas.
- **Separação dos dados institucionais:** garantir que cada instituição acesse apenas seus próprios registros.

## 7. Tipos de usuários
### Administrador da instituição
O primeiro administrador será criado durante o cadastro da instituição. Ele será responsável por organizar o acesso ao sistema dentro de sua organização.

Suas funções poderão incluir:

- Gerenciar os dados da instituição.
- Cadastrar, consultar e gerenciar os colaboradores.
- Definir ou administrar as permissões dos usuários, conforme as regras do sistema.
- Consultar e gerenciar os registros da própria instituição.
- Acompanhar as atividades e as informações apresentadas no painel principal.

### Colaborador
Cada colaborador terá sua própria conta, vinculada à instituição em que trabalha.

Suas funções poderão incluir:

- Consultar as informações permitidas pelo seu perfil.
- Registrar e atualizar atendimentos.
- Cadastrar e atualizar informações sobre doações e recursos.
- Organizar voluntários, eventos e campanhas conforme suas permissões.

As permissões específicas serão definidas durante o desenvolvimento. Nenhum dos dois perfis deverá acessar os dados de outras instituições.

## 8. Fluxo básico de funcionamento
1. Uma instituição acessa a plataforma e preenche o formulário de cadastro.
2. O sistema registra a instituição e cria a conta de seu primeiro administrador.
3. O administrador entra no sistema usando seu próprio login e senha.
4. O administrador cadastra os colaboradores que precisam de acesso.
5. Cada colaborador recebe uma conta individual e acessa o sistema com suas próprias credenciais.
6. Os usuários acessam o painel e utilizam as funcionalidades permitidas para seus perfis.
7. Os registros ficam associados à instituição correspondente.
8. O backend verifica a autenticação, as permissões e a instituição vinculada ao usuário antes de permitir o acesso ou a alteração dos dados.

Esse fluxo permitirá que várias instituições utilizem a mesma plataforma sem compartilhar seus registros entre si.

## 9. Tecnologias previstas
- **HTML:** estrutura das páginas.
- **CSS:** aparência e organização visual da interface.
- **JavaScript:** funcionalidades e manipulação dos elementos da página.
- **Fetch API:** comunicação entre o front-end e o back-end.
- **Node.js:** execução do código JavaScript no servidor.
- **Express:** criação das rotas e da API.
- **MySQL:** armazenamento das informações em um banco de dados relacional.
- **JWT:** autenticação dos usuários e apoio ao controle de acesso.
- **Git e GitHub:** versionamento, armazenamento e acompanhamento da evolução do projeto.

## 10. Estrutura inicial do projeto
conecta/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── database/
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
├── sql/
├── README.md
└── .gitignore

## 11. Organização do desenvolvimento
O projeto será desenvolvido em etapas. Inicialmente, serão definidos o problema, a solução e a estrutura do sistema. Em seguida, serão implementados o banco de dados relacional, o cadastro de instituições, a criação do primeiro administrador, o login, a autenticação e as permissões de acesso.

Nas etapas seguintes, serão desenvolvidas as funcionalidades de gerenciamento, a integração entre a interface, a API e o banco de dados, além das verificações necessárias para manter os dados de cada instituição separados.

O código-fonte e os scripts SQL serão mantidos em um único repositório no GitHub, com documentação atualizada ao longo do desenvolvimento. Arquivos de dependências instaladas, credenciais, senhas e tokens não serão publicados no repositório.


## PARTE/ENTREGA 2 !!!!!!!!!!

## 12. Banco de dados

O Conecta utiliza o MySQL como sistema de gerenciamento de banco de dados. O banco de dados `conecta` possui tabelas relacionadas por meio de chaves primárias e estrangeiras.

As principais tabelas são:

- **instituicoes:** armazena os dados das instituições cadastradas.
- **usuarios:** armazena os dados dos administradores e colaboradores, vinculados às suas instituições.
- **atendimentos:** registra os atendimentos realizados pelas instituições.
- **doacoes:** armazena informações sobre as doações recebidas.
- **recursos:** controla os recursos disponíveis.
- **voluntarios:** mantém os dados dos voluntários.
- **eventos:** registra os eventos organizados pelas instituições.

O script de criação dessas tabelas está disponível em `sql/conecta.sql`.

## 13. Autenticação e controle de acesso

O sistema possui cadastro de instituições e login de usuários integrados ao banco de dados.

Durante o cadastro, a instituição cria sua conta e seu primeiro administrador. As senhas são protegidas utilizando hash com a biblioteca `bcryptjs`.

A autenticação utiliza JSON Web Token (JWT), permitindo identificar os usuários e controlar o acesso às rotas protegidas da API.

O backend possui dois middlewares principais:

- **Autenticação:** verifica se o usuário está autenticado por meio de um token válido.
- **Autorização:** verifica se o perfil do usuário possui permissão para acessar determinada funcionalidade.

Os usuários possuem dois perfis: administrador e colaborador.

Além disso, as consultas e operações são vinculadas ao identificador da instituição do usuário autenticado, mantendo os registros separados entre as instituições.

## 14. Execução do backend

Para executar o backend localmente, é necessário ter o Node.js e o MySQL instalados.

1. Instalar as dependências do projeto com `npm install`.
2. Configurar as variáveis de ambiente no arquivo `.env`, incluindo os dados de conexão com o MySQL e a chave secreta do JWT.
3. Garantir que o banco de dados `conecta` esteja criado e que as tabelas tenham sido configuradas utilizando o script `sql/conecta.sql`.
4. Iniciar o servidor com `npm run dev`.

Após a inicialização, a API estará disponível em `http://localhost:3000`.

## 15. Organização e segurança

O projeto utiliza arquivos separados para organizar as rotas, os controladores, os middlewares e a conexão com o banco de dados.

O arquivo `.env` contém configurações privadas e não deve ser publicado no GitHub. A pasta `node_modules` também não precisa ser enviada ao repositório, pois as dependências podem ser instaladas por meio do `package.json`.