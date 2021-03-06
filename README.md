# Nuvem


## Para preparar o back-end:

1. O projeto está utilizando o Google Cloud, para tal é necessário ter uma "service account" para mais informações [clique aqui](https://cloud.google.com/docs/authentication/getting-started#cloud-console)

2. Para executar o back-end é necessário gerar o .jar, para isso acessa a pasta `back-end` no root do repositório, e rode o seguinte comando:
  ```
  $./mvnw install
  ```

3. Após executado, copie o arquivo `Nuvem/back-end/target/validc-1.0.0.jar` para `Nuvem/docker-compose/back-end`

4. Mude o arquivo `docker-compose.yml` na linha para colocar o caminho do arquivo que foi baixado no passo 1, lembrando de manter o final da linha, como por exemplo:
```
/home/{seu usuario}/Downloads/validc-5eb4e6ccdec6.json:/validc.json
```

## Para preparar o front-end:

1. Dentro da pasta front-end na raiz do projeto execute os seguinte scomando:
```
$ npm install
$ npm run build
```
O primeiro comando irá instalar as dependências do projeto, já o segundo irá gerar a pasta chamada `build` para fazer o deploy.

2. Mova a pasta build para `docker-compose/front-end`.

## Para rodar o projeto inteiro:

1. Vá até a pasta docker-compose e execute o seguinte comando:

```
$ sudo docker-compose up --build
```
2. Para acessar o front-end, no navegador de sua preferência, acesse a url ```http://localhost:5000/```