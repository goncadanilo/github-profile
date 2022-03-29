<h1 align="center">
  🎯 Github Profile
</h1>
<h3 align="center">
  🚀 Desafio Front End | Compass.UOL
</h3>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">

  <a href="https://app.rocketseat.com.br/me/goncadanilo">
    <img src="https://img.shields.io/static/v1?label=author&message=Danilo%20Gon%C3%A7alves&color=8257E5&labelColor=000000" />
  </a>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<br>



https://user-images.githubusercontent.com/53796755/160672516-43ef2c76-8064-4d4f-8f27-7cb91c13ac0b.mp4



## 🚀 Tecnologias

![Next.js](https://img.shields.io/badge/-Next.js-05122A?style=for-the-badge&logo=next.js)&nbsp;
![React](https://img.shields.io/badge/-React-05122A?style=for-the-badge&logo=react)&nbsp;
![React Query](https://img.shields.io/badge/-React--query-05122A?style=for-the-badge&logo=react-query)&nbsp;
![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=for-the-badge&logo=typescript)&nbsp;
![SASS](https://img.shields.io/badge/-SASS-05122A?style=for-the-badge&logo=SASS)&nbsp;
![Github API](https://img.shields.io/badge/-Github--API-05122A?style=for-the-badge&logo=Github)&nbsp;


## 💻 Projeto

Esse projeto é uma plataforma para acesso aos dados de perfis de usuários do Github. O usuário pode fazer login com sua conta do Github. pesquisar por um usuário especifico, listar os seus repositórios e listar seus repositórios favoritos.

Esse é um desafio técnico para a vaga de Front end Developer na Compass UOL.

🔥 Demo: https://profile-git.herokuapp.com/

### 🚀 Features

- [x] Login com Github;
- [x] Pesquisa por usuários;
- [x] Listar repositórios de um usuário;
- [x] Listar repositórios favoritos de um usuário;
- [x] Cache de dados;
- [x] Loading screen; 
- [ ] Subistituir o loading por Skeleton para melhorar o UX;
- [ ] Testes unitários;
- [ ] Testes de integração;
- [x] Deploy;

## 🔧 Como rodar

É necessário ter instalado:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### 🗂 Faça um clone do projeto

```bash
git clone https://github.com/goncadanilo/github-profile.git
```

### 📥 Instale as dependências
```bash
# Acesse o diretório do projeto
cd github-profile

# Instale as dependências
yarn
```

### ⚙️ Defina as variáveis de ambiente
Será necessário definir as seguintes variáveis de ambiente:
```dotenv
GITHUB_APP_CLIENT_ID=<github-client-id>
GITHUB_APP_CLIENT_SECRET=<github-client-id>
```

Para saber como gerar essas variáveis de ambiente, acesse o link abaixo:

https://docs.github.com/pt/developers/apps/building-oauth-apps

> 💡 OBS: Quando for criar o OAuth App no github, defina o callback como: `http://localhost:3000/api/auth/` para executar o projeto em ambiente local.

### ⚡ Inicie a aplicação
```bash
yarn dev
```

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ♥ by [Danilo Gonçalves](https://github.com/goncadanilo). Me adicione no [LinkedIn](https://www.linkedin.com/in/goncadanilo/) :wave:
