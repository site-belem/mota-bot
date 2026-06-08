const WebP = require('node-webpmux');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function addMetadata(webpBuffer, pack, author) {
    try {
        const img = new WebP.Image();
        await img.load(webpBuffer);
        const exif = Buffer.concat([
            Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]),
            Buffer.from(JSON.stringify({ "sticker-pack-name": pack, "sticker-pack-publisher": author, "emojis": ["🤩"] }), 'utf-8')
        ]);
        exif.writeUIntLE(exif.length - 22, 14, 4);
        img.exif = exif;
        return await img.save(null);
    } catch (e) { return webpBuffer; }
}

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "𝐁𝐨𝐦 𝐝𝐢𝐚 🌅";
    if (hour >= 12 && hour < 18) return "𝐁𝐨𝐚 𝐭𝐚𝐫𝐝𝐞 ☀️";
    return "𝐁𝐨𝐚 𝐧𝐨𝐢𝐭𝐞 🌙";
};

const getTime = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

module.exports = { addMetadata, getGreeting, getTime };
