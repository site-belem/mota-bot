const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(path.resolve(__dirname, 'auth'));

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        // Configuração de browser estável para pareamento por número
        browser: Browsers.ubuntu('Chrome'),
    });

    if (!sock.authState.creds.registered) {
        console.clear();
        console.log('--- CONEXÃO POR NÚMERO ---');
        let phoneNumber = await question('Digite o número com DDI (Ex: 5591988887777):\n> ');
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

        if (phoneNumber.length < 10) {
            console.log('❌ Número inválido. Tente novamente.');
            process.exit();
        }

        try {
            const code = await sock.requestPairingCode(phoneNumber);
            console.log(`\n🔑 SEU CÓDIGO DE PAREAMENTO: ${code}\n`);
            console.log('Insira este código no seu WhatsApp (Aparelhos Conectados > Conectar com número).');
        } catch (err) {
            console.log('❌ Erro ao solicitar código:', err.message);
            process.exit();
        }
    }

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const statusCode = (lastDisconnect.error instanceof Boom) ? 
                lastDisconnect.error.output.statusCode : 0;
            
            if (statusCode !== DisconnectReason.loggedOut) {
                console.log(`Conexão fechada (${statusCode}). Reconectando...`);
                setTimeout(() => connectToWhatsApp(), 5000);
            } else {
                console.log('❌ Sessão encerrada. Limpe a pasta "auth".');
                process.exit();
            }
        } else if (connection === 'open') {
            console.log('\n✅ Bot conectado com sucesso!');
            require('./bot.js')(sock);
        }
    });
}

connectToWhatsApp();
