# Sem Barreiras API

# Variáveis de ambiente

Arquivo de exemplo `.env.example` na raiz do projeto

# Requisitos

- Instalar [Node.js](https://nodejs.org/en/)
- Caso utilize [nvm](https://github.com/nvm-sh/nvm), basta rodar `nvm install` para aplicar a versão indicada no terminal (arquivo `.nvmrc`)

# Rodando o projeto

- Iniciando o projeto localmente:

```
# criar um arquio .env na raiz do projeto e copiar o conteúdo de .env.example

❯ cp -n .env.example .env

# instalar dependencias

❯ npm i

# iniciar o projeto em modo desenvolvimento

❯ npm run dev:server
```

- Rodando com docker

```
❯ docker-compose up -d
```

Acessar `http://localhost:8080/establishments`

##

## Testes

Testes utilizam a biblioteca [Jest](https://jestjs.io/pt-BR/)

```
❯ npm run test

```
