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

# 🧠 Arquitetura Modular — Jarvinho Drive

O módulo **Drive** é responsável por manter uma conexão WebSocket ativa com o backend (Ragon), validar e executar comandos recebidos no computador local, respeitando regras de segurança e autenticação. A estrutura segue um padrão arquitetural modular e escalável.

---

## 🗂️ Estrutura de Pastas (Drive)

```
src/drive/
├── controllers/
│   └── commandController.ts        # Fluxo principal do recebimento do comando
│
├── models/
│   └── CommandModel.ts             # Tipagem e validação dos dados recebidos
│
├── modules/
│   ├── authentication/             # (futuro) Módulo de autenticação local
│   └── execmodule/
│       └── services/
│           └── commandService.ts   # Execução de comandos no sistema
│
├── routes/
│   └── socketRoutes.ts             # Mapeamento dos eventos recebidos pelo WebSocket
│
├── utils/
│   └── ...                         # Funções utilitárias
│
├── websocket/
│   ├── wsClient.ts                 # Cliente WebSocket do Drive
│   └── index.ts                    # Entry do WebSocket no processo principal
```

---

## 🔁 Fluxo de Execução

Com base no seu fluxograma, o fluxo de execução completo é:

1. **WebSocket (wsClient)**: escuta comandos do servidor Ragon.
2. **Rotas (socketRoutes)**: redireciona os tipos de mensagens para seus controladores.
3. **Controller (commandController)**:
   - Valida o formato do comando (via `CommandModel`);
   - Garante que o comando veio para o dispositivo correto;
   - Chama o **Security Module** para checagem de segurança;
   - Em caso positivo, encaminha para o **Exec Module**;
   - A resposta da execução é enviada ao Ragon.
4. **ExecModule > commandService**: executa de fato o comando com `child_process`, dentro de um ambiente controlado.
5. **Receiver/Sender (via socket)**: envia a resposta de volta para o servidor.

---

## 📌 Módulos e Suas Responsabilidades

### ✅ Exec Module
- Responsável por realizar a execução do comando.
- Baseado no `child_process`, com segurança de diretório.
- Usa `commandService.ts`.

### 🔐 Security Module *(em desenvolvimento)*
- Aplicará validações de segurança (comandos perigosos, diretórios proibidos, etc).
- Será chamado pelo `controller` antes da execução real.

### 🧾 Auth Module *(em desenvolvimento)*
- Validará tokens locais, permissões e status do device.
- Pode reutilizar informações da Firebase Auth ou mecanismo offline.

### 🔁 Receiver/Sender
- Integra o WebSocket com o resto da arquitetura.
- Mantém canal bidirecional com o servidor.

---

## 🧱 Visão Arquitetural (Simplificada)

```
[ WebSocket ] 
     ↓
[ socketRoutes.ts ]
     ↓
[ commandController.ts ]
     ↓
[ Validate device ID ]
     ↓
[ Security Module ]
     ↓
[ Exec Module ]
     ↓
[ Send response ]
```



Esse padrão garante:
- Clareza na responsabilidade de cada módulo;
- Flexibilidade para adicionar novos módulos;
- Segurança e rastreabilidade em cada passo da execução.

---

## 📡 Conexão com o sistema

Para usar a conexão ponta a ponta, deve instalar a infra de services: Saiba mais

---

## 🤝 Contribuindo

Este projeto está em desenvolvimento e faz parte do ecossistema **Jarvinho**.  
Pull Requests e sugestões são bem-vindos!

---
