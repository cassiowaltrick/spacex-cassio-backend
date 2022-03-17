# Objetivo do projeto

Este projeto é do BackEnd. O FrontEnd se encontra no link (https://github.com/cassiowaltrick/spacex-cassio-frontend)

Este projeto foi desenvolvido por Cássio Waltrick.
A ideia dele é a execução de um desafio, onde deveria executar consultas na API da SPACE X (https://api.spacexdata.com/) e retornar as seguintes consultas.

● Próximo lançamento\
● Último lançamento\
● Próximos lançamentos\
● Lançamentos passados

## Scripts Disponíveis

No diretório do projeto você pode executar:

### `npm install`

Para instalar todas as dependências do projeto permitindo que o projeto possa ser executado corretamente.

### `npm start`

Irá executar a aplicação em modo de desenvolvimento.

A página será recarregada quando você fizer alterações.\
Você também pode ver erros no console.

### `npm test`

Foram elaborados testes de rota, somente verificando se o retorno de StatusCode é 200 e se tem algum objeto de retorno, havendo um objeto verificamos se este objeto contém a variável 'name'.

## Explicação de como foi desenvolvido o backend

Esse projeto não demandou muita estrutura para o backend pois a ideia de criar uma api para consumir outra api deixa boa parte do projeto pronta.\
Pois basicamente só precisamos buscar selecionar e devolver. Então como ficou essa estrutura.\
Arquivo 'api.js' utilizando 'AXIOS', define a url a ser utilizada que é a URL da API do SPACE X.
Arquivo 'index.js' somente utilizado para rodar a aplicação tanto em desenvolvimento como em produção, pois este arquivo somente define a porta que o servidor irá utilizar.
Arquivo 'server.js' é o grande motor dessa aplicação, utilizando da 'api.js' executa todas as consultas estipuladas no escopo desse projeto sobre lançamentos da SPACE X e retorna um array com 'name' e 'date_local' para todas situações.\
Único retorno com algum tipo de alteração é o de últimos lançamentos onde é feito uma ordenação retornando a lista em ordem decrescente pela variável de data('date_local')\
A única função de tratamento de dado que temos nesse último arquivo citado é a conversão de data em string, onde a minha api recebe um valor date_local em formato string vindo da api da spacex, e a minha api executa uma conversão enviando como retorno uma string também porém com o formato 'dd/MM/yyyy HH:mm:ss'