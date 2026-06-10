const fs = require('fs');
const path = require('path');
const { getGreeting, getTime } = require('./utils');
const { config } = require('./config');

module.exports = async (sock, from, pushName, prefix) => {
    const menuText = `✨ *𝐎𝐥𝐚́, ${pushName}!* ✨
👋 *${getGreeting()}*
🕒 *𝐇𝐨𝐫𝐚́𝐫𝐢𝐨:* ${getTime()}
👑 *𝐃𝐎𝐍𝐎:* Mota
💠 *𝐏𝐫𝐞𝐟𝐢𝐱𝐨𝐬:* [ ${config.prefixes.join(' ')} ]

💵 *𝐀𝐋𝐔𝐆𝐔𝐄𝐋*
┌ ♠️ *${prefix}aluguel*
├ ♠️ *${prefix}alugar*
└ ♠️ *${prefix}infoteste*

🌍 *𝐈𝐍𝐓𝐄𝐑𝐍𝐄𝐓*
┌ ♠️ *${prefix}play*
├ ♠️ *${prefix}baixar*
├ ♠️ *${prefix}gpt*
├ ♠️ *${prefix}img*
├ ♠️ *${prefix}encurtar*
├ ♠️ *${prefix}tr*
├ ♠️ *${prefix}tst*
└ ♠️ *${prefix}curiosidade*

🎮 *𝐉𝐎𝐆𝐎𝐒*
┌ ♠️ *${prefix}velha*
├ ♠️ *${prefix}gado*
└ ♠️ *${prefix}casal*

⚙️ *𝐆𝐑𝐔𝐏𝐎*
┌ ♠️ *${prefix}bemvindoon*
├ ♠️ *${prefix}bemvindooff*
├ ♠️ *${prefix}add*
├ ♠️ *${prefix}ban*
├ ♠️ *${prefix}seradm*
├ ♠️ *${prefix}tiraradm*
├ ♠️ *${prefix}mute*
├ ♠️ *${prefix}unmute*
├ ♠️ *${prefix}fechargp*
├ ♠️ *${prefix}abrirgp*
├ ♠️ *${prefix}limpar*
└ ♠️ *${prefix}all*

🔑 *𝐒𝐈𝐒𝐓𝐄𝐌𝐀*
┌ ♠️ *${prefix}boton*
├ ♠️ *${prefix}botoff*
├ ♠️ *${prefix}addprefixo*
├ ♠️ *${prefix}remprefixo*
└ ♠️ *${prefix}infocmd*

👑 *𝐃𝐎𝐍𝐎*
┌ ♠️ *${prefix}addaluguel*
├ ♠️ *${prefix}addteste*
├ ♠️ *${prefix}remaluguel*
└ ♠️ *${prefix}id*`;

    const menuVideoPath = path.join(__dirname, '../assets/menu.mp4');
    if (fs.existsSync(menuVideoPath)) {
        await sock.sendMessage(from, { video: fs.readFileSync(menuVideoPath), caption: menuText, gifPlayback: true });
    } else { 
        await sock.sendMessage(from, { text: menuText }); 
    }
};
