# ValiDC Front-end

Front-end do ValiDC usando react-js.

## Preparando a Máquina (instale o nodejs e npm)

- Necessário Node v12.18.2 ou superior
- Necessário NPM v6.14.0 ou superior

## Estrutura do projeto

- components → Páginas da aplicação e recursos que podem ser compartilhados por dois ou mais páginas
- routes → Definição das rotas das páginas
- services → Responsável pela definição dos serviços e requisições acessados pela aplicação
- styles → Arquivos de estilização utilizado de forma global
- utils → Recursos que podem ser utilizados em qualquer parte da aplicação

## Execução

Crie um arquivo <b>.env</b> a partir do .env-example. Lembre-se de mudar o valor da variável <b>REACT_APP_BASE_URL</b> para a url do backend.

Após criar o arquivo <b>.env</b> execute os seguintes comandos.
```
npm install
npm start
```

Por padrão o site executa em `http://localhost:3000`
