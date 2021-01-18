# ValiDC Front-end

Front-end do ValiDC usando react-js.

## Preparando a Máquina (instale o nodejs e npm)

- Necessário Node v12.18.2 ou superior
- Necessário NPM v6.14.0 ou superior

Tutotial de instalação do NodeJS e NPM (testado no ambiente Ubuntu 18.04 LTS)

```
sudo apt-get update
sudo apt-get -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get -y install gcc g++ make nodejs

sudo npm install -g --save typescript react react-dom react-router-dom react-input-mask antd axios

//for generate development env
npm install
```

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
