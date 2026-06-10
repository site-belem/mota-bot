# 🍎 MOTA BOT - WhatsApp Multi-Device

<p align="center">
  <img src="assets/mota_bot_banner.png" alt="Mota Bot Banner" width="800">
</p>

<p align="center">
  <b>Um bot de WhatsApp potente, rápido e inteligente, inspirado na precisão de Teru Mikami.</b>
</p>

---

## 🚀 Funcionalidades

O **Mota Bot** vem carregado com ferramentas essenciais para grupos e conversas privadas:

- 🤖 **IA Integrada**: Respostas inteligentes via GPT-4.
- 🛠️ **Utilidades**: Encurtador de links, busca de imagens (Pinterest/Bing).
- 📥 **Downloads**: Baixe vídeos e músicas diretamente pelo chat.
- 🧹 **Administração**: Comandos de limpeza e gestão de grupo.
- ⚡ **Estabilidade**: Rodando via PM2 para garantir 24h online.

---

## 🛠️ Instalação (Passo a Passo)

Se você está alugando ou instalando o bot, siga estes passos no seu terminal Linux (Ubuntu recomendado):

### 1. Requisitos
Certifique-se de ter o Node.js v16+ e o Git instalados.

### 2. Clonar o Repositório
```bash
git clone https://github.com/site-belem/mota-bot.git
cd mota-bot
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Conectar o WhatsApp (Pareamento)
Use o script de pareamento por número para facilitar:
```bash
node numero.js
```
> Digite seu número com DDI (ex: 55919xxxxxxxx) e insira o código de 8 dígitos que aparecerá no seu WhatsApp.

### 5. Deixar Online 24h (PM2)
Após conectar com sucesso, use o PM2 para manter o bot vivo:
```bash
pm2 start qr.js --name Mota
pm2 save
```

---

## 📞 Contato & Aluguel

Interessado em alugar o bot ou tirar dúvidas? Entre em contato com o desenvolvedor oficial:

- **Dono:** Site-Belém
- **WhatsApp:** [Clique aqui para falar com o dono](https://wa.me/559184886473)
- **Número:** `+55 91 8488-6473`

---

<p align="center">
  <i>"Eu criarei um novo mundo..." — Teru Mikami</i>
</p>
