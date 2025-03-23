# 💻 Jarvinho - Desktop Drive

O **Jarvinho Drive** é o aplicativo desktop responsável por manter a comunicação em tempo real com o sistema Jarvinho, rodando localmente na máquina do usuário. Ele será executado em segundo plano, mantendo um WebSocket conectado com o HOGAN e aguardando comandos autorizados para execução.

---

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

---

## 📁 Estrutura esperada após build

```
jarvinho-desktop/
├── dist/
│   ├── main.js
│   └── assets/
│       └── ...
├── src/
│   ├── main.ts
│   ├── assets/
│   └── ...
```

---

## 📡 Conexão com o sistema

Futuramente o Drive se conectará automaticamente ao HOGAN via WebSocket, utilizando autenticação e validação segura. Também será possível gerenciar permissões de execução via UI ou ícone de bandeja.

---

## 🤝 Contribuindo

Este projeto está em desenvolvimento e faz parte do ecossistema **Jarvinho**.  
Pull Requests e sugestões são bem-vindos!

---
