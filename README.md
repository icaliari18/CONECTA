# Conecta

## 1. Descri├º├úo do projeto
O Conecta ├® um sistema web desenvolvido para auxiliar institui├º├Áes sociais na organiza├º├úo e no gerenciamento de suas atividades. A plataforma centraliza informa├º├Áes sobre atendimentos, doa├º├Áes, recursos, volunt├írios, eventos e campanhas, facilitando o controle das a├º├Áes realizadas.

O sistema ser├í destinado a diferentes tipos de institui├º├Áes sociais. Cada uma poder├í realizar seu pr├│prio cadastro na plataforma, criar a conta de seu primeiro administrador e cadastrar colaboradores para auxiliar na gest├úo de suas atividades.

As institui├º├Áes compartilhar├úo a mesma plataforma, mas ter├úo seus pr├│prios usu├írios e registros, com controle de acesso para impedir que uma institui├º├úo visualize ou altere as informa├º├Áes de outra.

## 2. Problema identificado
Institui├º├Áes sociais precisam organizar diversas atividades, como atendimentos, recebimento e distribui├º├úo de doa├º├Áes, controle de recursos, organiza├º├úo de volunt├írios e realiza├º├úo de eventos.

Quando essas informa├º├Áes ficam distribu├¡das entre diferentes pessoas, pastas etc pode ser mais dif├¡cil acompanhar solicita├º├Áes, consultar registros, controlar recursos dispon├¡veis e manter as atividades organizadas.

Diante desse cen├írio, o Conecta prop├Áe uma solu├º├úo digital para centralizar as informa├º├Áes e facilitar a gest├úo das atividades institucionais.

## 3. P├║blico-alvo
O sistema ser├í destinado a institui├º├Áes sociais de diferentes tipos, como organiza├º├Áes n├úo governamentais (ONGs), associa├º├Áes, projetos comunit├írios e outras organiza├º├Áes que realizam atividades de apoio social.

Os usu├írios da plataforma ser├úo administradores e colaboradores respons├íveis pela organiza├º├úo e execu├º├úo das atividades de cada institui├º├úo.

## 4. Objetivo geral

Desenvolver um sistema web que facilite a organiza├º├úo e o gerenciamento das atividades de institui├º├Áes sociais, centralizando informa├º├Áes e auxiliando no acompanhamento dos atendimentos, doa├º├Áes, recursos, volunt├írios e eventos.

## 5. Objetivos espec├¡ficos

- Centralizar as informa├º├Áes de cada institui├º├úo em um ├║nico sistema.
- Permitir que diferentes institui├º├Áes se cadastrem e utilizem a plataforma de forma independente.
- Facilitar o registro e o acompanhamento de atendimentos e solicita├º├Áes.
- Organizar o controle de doa├º├Áes e recursos dispon├¡veis.
- Manter os dados dos volunt├írios organizados.
- Facilitar o planejamento e o acompanhamento de eventos e campanhas.
- Permitir que administradores gerenciem os usu├írios de suas institui├º├Áes.
- Controlar o acesso ├ás informa├º├Áes conforme a institui├º├úo e o perfil de cada usu├írio.

## 6. Principais funcionalidades previstas
- **Cadastro de institui├º├Áes:** permitir que uma institui├º├úo registre seus dados e crie sua conta na plataforma.
- **Cria├º├úo do primeiro administrador:** criar a conta do administrador respons├ível pela institui├º├úo durante o cadastro inicial.
- **Login e autentica├º├úo:** permitir o acesso individual dos usu├írios por meio de credenciais pr├│prias.
- **Gest├úo de usu├írios:** permitir que o administrador cadastre e gerencie os colaboradores de sua institui├º├úo.
- **Painel principal:** apresentar informa├º├Áes gerais e atividades que precisam de aten├º├úo.
- **Gest├úo de atendimentos:** registrar solicita├º├Áes, respons├íveis e seus status.
- **Gest├úo de doa├º├Áes e recursos:** registrar recebimentos, sa├¡das e disponibilidade de recursos.
- **Gest├úo de volunt├írios:** cadastrar volunt├írios e organizar suas participa├º├Áes.
- **Gest├úo de eventos e campanhas:** registrar atividades, datas, respons├íveis e participantes.
- **Consulta e atualiza├º├úo de registros:** permitir visualizar, editar e excluir informa├º├Áes conforme as permiss├Áes definidas.
- **Separa├º├úo dos dados institucionais:** garantir que cada institui├º├úo acesse apenas seus pr├│prios registros.

## 7. Tipos de usu├írios
### Administrador da institui├º├úo
O primeiro administrador ser├í criado durante o cadastro da institui├º├úo. Ele ser├í respons├ível por organizar o acesso ao sistema dentro de sua organiza├º├úo.

Suas fun├º├Áes poder├úo incluir:

- Gerenciar os dados da institui├º├úo.
- Cadastrar, consultar e gerenciar os colaboradores.
- Definir ou administrar as permiss├Áes dos usu├írios, conforme as regras do sistema.
- Consultar e gerenciar os registros da pr├│pria institui├º├úo.
- Acompanhar as atividades e as informa├º├Áes apresentadas no painel principal.

### Colaborador
Cada colaborador ter├í sua pr├│pria conta, vinculada ├á institui├º├úo em que trabalha.

Suas fun├º├Áes poder├úo incluir:

- Consultar as informa├º├Áes permitidas pelo seu perfil.
- Registrar e atualizar atendimentos.
- Cadastrar e atualizar informa├º├Áes sobre doa├º├Áes e recursos.
- Organizar volunt├írios, eventos e campanhas conforme suas permiss├Áes.

As permiss├Áes espec├¡ficas ser├úo definidas durante o desenvolvimento. Nenhum dos dois perfis dever├í acessar os dados de outras institui├º├Áes.

## 8. Fluxo b├ísico de funcionamento
1. Uma institui├º├úo acessa a plataforma e preenche o formul├írio de cadastro.
2. O sistema registra a institui├º├úo e cria a conta de seu primeiro administrador.
3. O administrador entra no sistema usando seu pr├│prio login e senha.
4. O administrador cadastra os colaboradores que precisam de acesso.
5. Cada colaborador recebe uma conta individual e acessa o sistema com suas pr├│prias credenciais.
6. Os usu├írios acessam o painel e utilizam as funcionalidades permitidas para seus perfis.
7. Os registros ficam associados ├á institui├º├úo correspondente.
8. O backend verifica a autentica├º├úo, as permiss├Áes e a institui├º├úo vinculada ao usu├írio antes de permitir o acesso ou a altera├º├úo dos dados.

Esse fluxo permitir├í que v├írias institui├º├Áes utilizem a mesma plataforma sem compartilhar seus registros entre si.

## 9. Tecnologias previstas
- **HTML:** estrutura das p├íginas.
- **CSS:** apar├¬ncia e organiza├º├úo visual da interface.
- **JavaScript:** funcionalidades e manipula├º├úo dos elementos da p├ígina.
- **Fetch API:** comunica├º├úo entre o front-end e o back-end.
- **Node.js:** execu├º├úo do c├│digo JavaScript no servidor.
- **Express:** cria├º├úo das rotas e da API.
- **MySQL:** armazenamento das informa├º├Áes em um banco de dados relacional.
- **JWT:** autentica├º├úo dos usu├írios e apoio ao controle de acesso.
- **Git e GitHub:** versionamento, armazenamento e acompanhamento da evolu├º├úo do projeto.

## 10. Estrutura inicial do projeto
conecta/
Ôö£ÔöÇÔöÇ backend/
Ôöé   Ôö£ÔöÇÔöÇ routes/
Ôöé   Ôö£ÔöÇÔöÇ controllers/
Ôöé   Ôö£ÔöÇÔöÇ middlewares/
Ôöé   Ôö£ÔöÇÔöÇ database/
Ôöé   ÔööÔöÇÔöÇ server.js
Ôö£ÔöÇÔöÇ frontend/
Ôöé   Ôö£ÔöÇÔöÇ index.html
Ôöé   Ôö£ÔöÇÔöÇ css/
Ôöé   ÔööÔöÇÔöÇ js/
Ôö£ÔöÇÔöÇ sql/
Ôö£ÔöÇÔöÇ README.md
ÔööÔöÇÔöÇ .gitignore

## 11. Organiza├º├úo do desenvolvimento
O projeto ser├í desenvolvido em etapas. Inicialmente, ser├úo definidos o problema, a solu├º├úo e a estrutura do sistema. Em seguida, ser├úo implementados o banco de dados relacional, o cadastro de institui├º├Áes, a cria├º├úo do primeiro administrador, o login, a autentica├º├úo e as permiss├Áes de acesso.

Nas etapas seguintes, ser├úo desenvolvidas as funcionalidades de gerenciamento, a integra├º├úo entre a interface, a API e o banco de dados, al├®m das verifica├º├Áes necess├írias para manter os dados de cada institui├º├úo separados.

O c├│digo-fonte e os scripts SQL ser├úo mantidos em um ├║nico reposit├│rio no GitHub, com documenta├º├úo atualizada ao longo do desenvolvimento. Arquivos de depend├¬ncias instaladas, credenciais, senhas e tokens n├úo ser├úo publicados no reposit├│rio.


## PARTE/ENTREGA 2 !!!!!!!!!!

## 12. Banco de dados

O Conecta utiliza o MySQL como sistema de gerenciamento de banco de dados. O banco de dados `conecta` possui tabelas relacionadas por meio de chaves prim├írias e estrangeiras.

As principais tabelas s├úo:

- **instituicoes:** armazena os dados das institui├º├Áes cadastradas.
- **usuarios:** armazena os dados dos administradores e colaboradores, vinculados ├ás suas institui├º├Áes.
- **atendimentos:** registra os atendimentos realizados pelas institui├º├Áes.
- **doacoes:** armazena informa├º├Áes sobre as doa├º├Áes recebidas.
- **recursos:** controla os recursos dispon├¡veis.
- **voluntarios:** mant├®m os dados dos volunt├írios.
- **eventos:** registra os eventos organizados pelas institui├º├Áes.

O script de cria├º├úo dessas tabelas est├í dispon├¡vel em `sql/conecta.sql`.

## 13. Autentica├º├úo e controle de acesso

O sistema possui cadastro de institui├º├Áes e login de usu├írios integrados ao banco de dados.

Durante o cadastro, a institui├º├úo cria sua conta e seu primeiro administrador. As senhas s├úo protegidas utilizando hash com a biblioteca `bcryptjs`.

A autentica├º├úo utiliza JSON Web Token (JWT), permitindo identificar os usu├írios e controlar o acesso ├ás rotas protegidas da API.

O backend possui dois middlewares principais:

- **Autentica├º├úo:** verifica se o usu├írio est├í autenticado por meio de um token v├ílido.
- **Autoriza├º├úo:** verifica se o perfil do usu├írio possui permiss├úo para acessar determinada funcionalidade.

Os usu├írios possuem dois perfis: administrador e colaborador.

Al├®m disso, as consultas e opera├º├Áes s├úo vinculadas ao identificador da institui├º├úo do usu├írio autenticado, mantendo os registros separados entre as institui├º├Áes.

## 14. Execu├º├úo do backend

Para executar o backend localmente, ├® necess├írio ter o Node.js e o MySQL instalados.

1. Instalar as depend├¬ncias do projeto com `npm install`.
2. Configurar as vari├íveis de ambiente no arquivo `.env`, incluindo os dados de conex├úo com o MySQL e a chave secreta do JWT.
3. Garantir que o banco de dados `conecta` esteja criado e que as tabelas tenham sido configuradas utilizando o script `sql/conecta.sql`.
4. Iniciar o servidor com `npm run dev`.

Ap├│s a inicializa├º├úo, a API estar├í dispon├¡vel em `http://localhost:3000`.

## 15. Organiza├º├úo e seguran├ºa

O projeto utiliza arquivos separados para organizar as rotas, os controladores, os middlewares e a conex├úo com o banco de dados.

O arquivo `.env` cont├®m configura├º├Áes privadas e n├úo deve ser publicado no GitHub. A pasta `node_modules` tamb├®m n├úo precisa ser enviada ao reposit├│rio, pois as depend├¬ncias podem ser instaladas por meio do `package.json`.


## PARTE/ENTREGA 3 — CRUD Completo e Integração Front-end/Back-end

Nesta etapa foi desenvolvido o CRUD completo da entidade principal do sistema (**Atendimentos**), integrando o banco de dados MySQL, a API REST em Node.js/Express e a interface web com HTML, CSS e JavaScript moderno.

### 16. CRUD da Entidade Principal (Atendimentos)

A entidade de atendimentos contempla todas as operações fundamentais exigidas:
- **POST `/atendimentos`**: Cadastra um novo atendimento vinculado à instituição do usuário autenticado.
- **GET `/atendimentos`**: Lista todos os atendimentos da instituição do usuário logado.
- **GET `/atendimentos/:id`**: Consulta detalhes de um atendimento específico pertencente à instituição.
- **PUT `/atendimentos/:id`**: Atualiza as informações e o status do atendimento (`pendente`, `em andamento`, `concluido`).
- **DELETE `/atendimentos/:id`**: Exclui um atendimento da instituição (operação restrita a administradores).

### 17. Permissões e Regras de Negócio

- **Verificação dupla de permissão (Back-end e Front-end):**
  - **No Back-end:** As rotas possuem o middleware `autenticar` (validação de JWT) e `autorizar(perfis)`. A rota de exclusão (`DELETE /atendimentos/:id`) exige estritamente o perfil `administrador`. Se um colaborador tentar disparar a requisição de exclusão, a API bloqueia retornando status `403 Proibido`.
  - **No Front-end:** O botão "Excluir" só é renderizado na tabela para usuários autenticados com perfil `administrador`.
- **Isolamento multi-inquilino:** Todas as consultas, alterações e exclusões filtram obrigatoriamente pelo `instituicao_id` extraído do token JWT, assegurando que nenhuma instituição acerte ou visualize registros alheios.
- **Validações de dados:** O back-end valida campos obrigatórios (`nome_atendido`, `tipo_atendimento`) e restringe os valores aceitos para o campo `status`.

### 18. Interface e Integração com Fetch API

- **Manipulação do DOM:** Atualização dinâmica da tabela de atendimentos, formulário com alternância entre os modos "Novo atendimento" e "Editar atendimento" com preenchimento automático.
- **Fetch API:** Comunicação assíncrona com envio de cabeçalho `Authorization: Bearer <token>` em todas as requisições protegidas.
- **Segurança na exibição:** Sanitização e escape de caracteres HTML para prevenir injeções de script (XSS).
- **Controle de sessão:** Redirecionamento automático para a tela de login caso o token não esteja presente ou seja inválido, além de botão de encerramento de sessão (*Logout*).