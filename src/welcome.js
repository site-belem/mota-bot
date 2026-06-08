const fs = require('fs');
const path = require('path');
const { config, loadConfig } = require('./config');

module.exports = async (sock, anu) => {
    const from = anu.id;
    loadConfig();
    if (anu.action === 'add' && config.welcomeEnabled && config.welcomeEnabled[from]) {
        for (let num of anu.participants) {
            const userId = typeof num === 'string' ? num : num.id;
            const name = userId.split('@')[0];
            const welcomeText = `🌟 *𝐁𝐞𝐦-𝐯𝐢𝐧𝐝𝐨(𝐚)!* 🌟\n\nOlá @${name}, seja muito bem-vindo ao grupo!\n\n${config.welcomeMsg}`;
            const welcomeVideoPath = path.join(__dirname, '../assets/welcome.mp4');
            if (fs.existsSync(welcomeVideoPath)) {
                await sock.sendMessage(from, { video: fs.readFileSync(welcomeVideoPath), caption: welcomeText, gifPlayback: true, mentions: [userId] });
            } else {
                await sock.sendMessage(from, { text: welcomeText, mentions: [userId] });
            }
        }
    }
};
