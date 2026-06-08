const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../database/config.json');
let config = { 
    prefixes: ['+', '-', '.', '×', '!', '/', '#', '$'], 
    autoSticker: false,
    ownerName: 'Mota',
    ownerNumber: '189846798762188', // ID atualizado conforme solicitado
    welcomeMsg: 'Seja bem-vindo(a) ao grupo!',
    welcomeEnabled: {},
    mutedUsers: {},
    stickerPack: 'mota',
    stickerAuthor: '',
    botOn: true
};

function loadConfig() {
    if (fs.existsSync(configPath)) { 
        try { 
            const data = JSON.parse(fs.readFileSync(configPath, 'utf-8')); 
            Object.assign(config, data);
            if (config.botOn === undefined) config.botOn = true;
            // Garante que o número do dono seja o ID correto se não estiver no JSON
            if (config.ownerNumber !== '189846798762188') {
                config.ownerNumber = '189846798762188';
            }
        } catch (e) { 
            config.welcomeEnabled = {}; 
            config.mutedUsers = {};
        } 
    }
}

const saveConfig = () => {
    if (!fs.existsSync(path.dirname(configPath))) fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};

module.exports = { config, loadConfig, saveConfig };
