# Projeto de API Node.js em Serverless Framework para Aplicação NuxVerso

Este é um projeto de API em Node.js para uma aplicação de metaverso usando o Serverless Framework, o AWS Lambda e o DynamoDB.

## Instalação

Certifique-se de ter o Node.js e o Serverless Framework instalados em sua máquina. 
Em seguida, siga estas etapas:

Clone o repositório: git clone https://github.com/seu-usuario/nome-do-projeto.git
Entre na pasta do projeto: cd nome-do-projeto
Instale as dependências: yarn

## Configuração

Você precisa configurar suas credenciais do AWS. Você pode fazer isso configurando seu arquivo ~/.aws/credentials ou definindo as variáveis de ambiente AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY.

É mandatório criar o perfil DEFAULT para que a criação de dominio pelo comando serverless create_domain funcione.

## Criação de Dominio Personalizado pelo Serverless Framework

Execute o comando : yarn dev_create_domain ( Para stage "dev" - Altere de acordo com o stage desejado )

## Uso

A API possui as seguintes rotas:

### post /v1/auth/register: 

Cria um novo usuário com os dados enviados no corpo da solicitação.

**Corpo da requisição:**

Exemplo:
{
  "email": "johnwick@gmail.com",
  "password": "113355",
  "wixId": "d701748f0851",
  "firstName": "John",
  "lastName": "Wick",
  "profileImage": "https://nuxcloudfront/d290f1ee-6c54-4b01-90e6-d701748f0851-image.png",
  "role": "ADMIN"
}

**Resposta:** 

A resposta contém os dados do usuário e um token de autenticação JWT que deve ser usado para autenticar as solicitações subsequentes.

### post /v1/auth/login:

Autentica o usuário com as credenciais fornecidas no corpo da solicitação.

**Corpo da requisição:**

Exemplo:
{
  "email": "johnwick@gmail.com",
  "password": "113355",
}

**Resposta:** 

A resposta contém os dados do usuário e um token de autenticação JWT que deve ser usado para autenticar as solicitações subsequentes.

### post /v1/auth/social:

Autentica o usuário com as credenciais fornecidas no corpo da solicitação.

**Corpo da requisição:**

Exemplo:
{
  "email": "johnwick@gmail.com",
  "wixId": "113355"
}

**Resposta:** 

A resposta contém os dados do usuário e um token de autenticação JWT que deve ser usado para autenticar as solicitações subsequentes.

## Testes

Se você tiver acesso, você pode acessar a documentação pelo swaggerHub

[Nux Development SwaggerHub](https://app.swaggerhub.com/apis/DEVELOPMENT_23/NuxverseAPI/1.0.0)


Caso contrario, você pode testar a API pelo Swagger Editor

**Arquivo de Documentação Swagger**

serverless-api\doc\Swagger\Nux-API-1.0.0.yaml

**Navegue para o Swagger Editor**

[SwaggerEditor](https://editor-next.swagger.io/)

**Copie e counteudo do arquivo Nux-API-1.0.0.yaml**

* Entre no arquivo Nux-API-1.0.0.yaml
* Pressione CTRL+A para selecionar o conteudo do arquivo
* Pressione CTRL+C para copiar o conteudo do arquivo
* No Swagger editor :
* Pressione CTRL+A para selecionar as informações
* Pressione DEL para limpar os dados
* Pressione CTRL+C para copiar o conteudo do arquivo Nux-API-1.0.0.yaml

Testes Unitários

[Dcomentação dos testes unitários](https://nuxverse.atlassian.net/wiki/spaces/~71202018361408b5884436b34a602363dd2320/pages/5832750/Unit+Tests+Documentation)

