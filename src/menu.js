const fs = require('fs');
const path = require('path');
const { getGreeting, getTime } = require('./utils');
const { config } = require('./config');

module.exports = async (sock, from, pushName, prefix) => {
    const menuText = `✨ *𝐎𝐥𝐚́, ${pushName}!* ✨\n` +
                     `👋 *${getGreeting()}*\n🕒 *𝐇𝐨𝐫𝐚́𝐫𝐢𝐨:* ${getTime()}\n👑 *𝐃𝐨𝐧𝐨:* ${config.ownerName}\n` +
                     `💠 *𝐏𝐫𝐞𝐟𝐢𝐱𝐨𝐬:* [ ${config.prefixes.join(' ')} ]\n\n` +
                     `🛠️ *𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀𝐒*\n` +
                     `┌ ♠️ *${prefix}s*\n` +
                     `├ ♠️ *${prefix}sc*\n` +
                     `├ ♠️ *${prefix}cr*\n` +
                     `├ ♠️ *${prefix}cr2*\n` +
                     `├ ♠️ *${prefix}rename*\n` +
                     `└ ♠️ *${prefix}att*\n\n` +
                     `🌍 *𝐈𝐍𝐓𝐄𝐑𝐍𝐄𝐓*\n` +
                     `┌ ♠️ *${prefix}play*\n` +
                     `├ ♠️ *${prefix}baixar*\n` +
                     `├ ♠️ *${prefix}gpt*\n` +
                     `├ ♠️ *${prefix}img*\n` +
                     `├ ♠️ *${prefix}encurtar*\n` +
                     `├ ♠️ *${prefix}tr*\n` +
                     `├ ♠️ *${prefix}tst*\n` +
                     `└ ♠️ *${prefix}curiosidade*\n\n` +
                     `🎮 *𝐉𝐎𝐆𝐎𝐒*\n` +
                     `┌ ♠️ *${prefix}velha*\n` +
                     `├ ♠️ *${prefix}gado*\n` +
                     `└ ♠️ *${prefix}casal*\n\n` +
                     `⚙️ *𝐆𝐑𝐔𝐏𝐎*\n` +
                     `┌ ♠️ *${prefix}bemvindoon*\n` +
                     `├ ♠️ *${prefix}bemvindooff*\n` +
                     `├ ♠️ *${prefix}add*\n` +
                     `├ ♠️ *${prefix}ban*\n` +
                     `├ ♠️ *${prefix}seradm*\n` +
                     `├ ♠️ *${prefix}tiraradm*\n` +
                     `├ ♠️ *${prefix}mute*\n` +
                     `├ ♠️ *${prefix}unmute*\n` +
                     `├ ♠️ *${prefix}fechargp*\n` +
                     `├ ♠️ *${prefix}abrirgp*\n` +
                     `├ ♠️ *${prefix}limpar*\n` +
                     `└ ♠️ *${prefix}all*\n\n` +
                     `🔑 *𝐒𝐈𝐒𝐓𝐄𝐌𝐀*\n` +
                     `┌ ♠️ *${prefix}boton*\n` +
                     `├ ♠️ *${prefix}botoff*\n` +
                     `├ ♠️ *${prefix}addprefixo*\n` +
                     `├ ♠️ *${prefix}remprefixo*\n` +
                     `└ ♠️ *${prefix}infocmd*`;
    
    const menuVideoPath = path.join(__dirname, '../assets/menu.mp4');
    if (fs.existsSync(menuVideoPath)) {
        await sock.sendMessage(from, { video: fs.readFileSync(menuVideoPath), caption: menuText, gifPlayback: true });
    } else { await sock.sendMessage(from, { text: menuText }); }
};
