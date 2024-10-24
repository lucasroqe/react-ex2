# Atividade - Servidor

A aplicação possui um servidor usado para persitir valores RGB na tabela _tbrgb_ do _bdrgb_ do SQLite.

A aplicação responde nos end points:
- HTTP GET http://localhost:3011/get para retornar o último registro da _tbrgb_;
- HTTP GET http://localhost:3011/get?id=5 para retornar o último registro da _tbrgb_ ou o registro que possui `id` igual a `5`;
- HTTP POST http://localhost:3011/save para inserir um registro na _tbrgb_ com os valores recebidos pelo body no formato `{r:number, g:number, b:number}`.

### Instruções de uso

Utilize os comandos a seguir para clonar o repositório e subir o serviço na porta _3011_.
1. Crie uma pasta no local de sua preferência do computador;
2. Abra essa pasta no CMD (prompt de comando) e digite o comando a seguir para baixar o projeto no seu computador: 
```
git clone https://github.com/arleysouza/server-rgb-sqlite.git server
cd server
```
3. Comandos para subir o servidor:
```
npm run dev
ou
npm start
```
