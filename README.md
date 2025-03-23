# 💻 Jarvinho - Desktop


## 🚀 Tecnologias

- ⚡ Electron
- 🧪 TypeScript
- 🧰 Electron Builder
- 📡 WebSocket
- 📁 Empacotamento multiplataforma

---

## 📦 Scripts disponíveis

| Script          | Descrição                                                       |
|------------------|-----------------------------------------------------------------|
| `npm run dev`     | Executa o app com `ts-node` diretamente (modo desenvolvimento) |
| `npm run build`   | Compila o código TypeScript e copia os assets                  |
| `npm start`       | Inicia o app Electron com o conteúdo da `dist/`                |
| `npm run copy-assets` | Copia os arquivos da pasta `src/assets/` para `dist/assets/`     |
| `npm run copy-html`   | Copia o `index.html` do app para a pasta `dist/`            |

---

## 🛠️ Requisitos

- Node.js instalado (v18+)
- NPM
- Sistema operacional: Windows, Linux ou macOS

---

## ▶️ Como rodar em modo desenvolvimento

```bash
# Clonar o projeto
git clone https://github.com/Jarvinho-AI/jarvinho-desktop.git
cd jarvinho-desktop

# Instalar dependências
npm install

# Rodar em modo dev (com ts-node)
npm run dev
```

---

## 📦 Como compilar o app

```bash
npm run build
npm start
```

---

## 📦 Como gerar o instalador

Utilizando o `electron-builder`, é possível gerar builds nativos para distribuição:

```bash
npm run build
npx electron-builder --dir      # build local (não cria instalador)
npx electron-builder --win      # build para Windows
npx electron-builder --linux    # build para Linux
npx electron-builder --mac      # build para macOS
```

> Os artefatos serão gerados na pasta `dist/` ou `out/`, dependendo da configuração.

# 📦 Seção: Definição Estrutural

## 🧠 Contexto do Sistema

O **Jarvinho** é um sistema distribuído que conecta dispositivos remotos a um app inteligente, permitindo automações e execuções de comandos controladas. Um dos principais componentes dessa arquitetura é o **Jarvinho Desktop**, que se divide em dois módulos:

- **App**: a interface principal com a qual o usuário interage. Responsável por exibir status, configurar permissões e gerenciar o Drive.
- **Drive**: roda como um processo em segundo plano no sistema operacional, recebendo comandos do servidor e executando ações no computador local.

---

## 🧩 Integração entre App e Drive

O **App** e o **Drive** funcionam como componentes independentes dentro da mesma aplicação instalada. O App pode iniciar, pausar e monitorar o Drive, enquanto o Drive mantém uma conexão constante com o backend (Hagon) e executa comandos.

---

## 🔌 Módulo: DRIVE

O **Drive** é responsável por:

1. Estabelecer uma comunicação WebSocket com o servidor central (Hagon).
2. Executar comandos de forma segura e controlada no dispositivo local.
3. Retornar o resultado da execução diretamente para o servidor.

---

## 🏗️ Estrutura Arquitetural do Drive

A arquitetura do Drive segue o padrão **MVC invertido**, adaptado para sistemas baseados em eventos e execução de comandos locais. Cada camada tem responsabilidades bem definidas, garantindo organização, segurança e escalabilidade:

```
src/drive/
├── models/
│   Define a estrutura e a tipagem dos dados recebidos. 
│   Responsável por validar e transformar os dados crus (geralmente em JSON) 
│   para um formato tipado e seguro.
│   Exemplo: `CommandModel` com método `parseJson`.
│
├── services/
│   Contém a lógica de negócio.
│   Aqui são feitas as ações mais críticas, como a execução de comandos no sistema 
│   operacional, com controle de diretório e tratamento de erros.
│   Exemplo: `commandService` que usa `child_process` para executar scripts.
│
├── controllers/
│   Camada responsável por orquestrar o fluxo entre os dados recebidos e os serviços.
│   Faz a validação inicial, chama os serviços e envia as respostas para o WebSocket.
│   Exemplo: `commandController` recebendo dados e respondendo com sucesso ou erro.
│
├── routes/
│   Define os canais de escuta ou entradas do sistema.
│   No caso do Drive, define os listeners dos eventos recebidos via WebSocket.
│   Exemplo: `socketRoutes` que define que "message" será tratado pelo controller.
│
├── websocket/
│   Implementa o cliente WebSocket que conecta ao servidor Ragon.
│   Cuida da reconexão, envio de mensagens iniciais (como o registro do device) 
│   e delega o tratamento de mensagens às rotas.
│   Exemplo: `wsClient` com reconexão automática e integração com `socketRoutes`.
│
├── utils/
│   Funções utilitárias que não pertencem diretamente à regra de negócio.
│   Exemplo: `logger.ts` para logs padronizados.
```

---

## 🔁 Fluxo de Execução

1. O `wsClient.ts` se conecta ao servidor via WebSocket.
2. Quando uma mensagem chega, ela é passada para `socketRoutes`.
3. A rota direciona para o `commandController`.
4. O controller valida o comando com `CommandModel`.
5. Se for válido, o `commandService` executa o comando.
6. O controller envia a resposta de volta via WebSocket.

---

Esse padrão garante que qualquer nova funcionalidade (como captura de tela, shutdown, leitura de arquivos, etc.) possa ser adicionada de forma modular, criando apenas novos modelos, serviços e controladores — mantendo o Drive separado do App, mas ainda totalmente integrado a ele.


## 📡 Conexão com o sistema

Para usar a conexão ponta a ponta, deve instalar a infra de services: Saiba mais

---

## 🤝 Contribuindo

Este projeto está em desenvolvimento e faz parte do ecossistema **Jarvinho**.  
Pull Requests e sugestões são bem-vindos!

---
