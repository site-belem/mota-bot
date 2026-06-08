
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const path = require('path');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(path.resolve(__dirname, 'auth'));
    
    // Busca a versão mais recente do WhatsApp Web automaticamente
    const { version } = await fetchLatestBaileysVersion();
    console.log(`Conectando com a versão do WhatsApp Web: v${version.join('.')}`);

    const sock = makeWASocket({
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
        },
        logger: pino({ level: 'silent' }),
        // Browser configurado como Chrome no Ubuntu (muito estável)
        browser: ["Ubuntu", "Chrome", "110.0.5481.178"],
        syncFullHistory: false,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.clear();
            console.log('📱 ESCANEIE O QR CODE ABAIXO:');
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const statusCode = (lastDisconnect.error instanceof Boom) ? lastDisconnect.error.output.statusCode : 0;
            console.log(`Conexão fechada. Status: ${statusCode}`);
            if (statusCode !== DisconnectReason.loggedOut) {
                setTimeout(() => connectToWhatsApp(), 5000);
            }
        } else if (connection === 'open') {
            console.clear();
            console.log('✅ BOT CONECTADO!');
            require('./bot.js')(sock);
        }
    });
}
connectToWhatsApp();
