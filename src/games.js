let ttt_games = {};

const handleTTT = async (sock, from, sender, text) => {
    if (ttt_games[from]) {
        const game = ttt_games[from];
        if (sender === game.playerX || sender === game.playerO) {
            const turn = game.turn === 'X' ? game.playerX : game.playerO;
            if (sender === turn) {
                const pos = parseInt(text);
                if (!isNaN(pos) && pos >= 1 && pos <= 9 && game.board[pos-1] === null) {
                    game.board[pos-1] = game.turn;
                    game.turn = game.turn === 'X' ? 'O' : 'X';
                    
                    const checkWin = (b) => {
                        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
                        for (let w of wins) { if (b[w[0]] && b[w[0]] === b[w[1]] && b[w[0]] === b[w[2]]) return b[w[0]]; }
                        return b.includes(null) ? null : 'Tie';
                    };
                    
                    const winner = checkWin(game.board);
                    const renderBoard = (b) => {
                        const icons = { X: '❌', O: '⭕', null: '⬜' };
                        let str = "";
                        for (let i=0; i<9; i++) {
                            str += icons[b[i]] || (i+1) + '️⃣';
                            if ((i+1) % 3 === 0) str += "\n";
                        }
                        return str;
                    };

                    if (winner) {
                        let resText = `🎮 *𝐉𝐎𝐆𝐎 𝐃𝐀 𝐕𝐄𝐋𝐇𝐀*\n\n${renderBoard(game.board)}\n`;
                        if (winner === 'Tie') resText += "🤝 *Empate! Deu velha!*";
                        else resText += `🏆 *Vencedor:* @${(winner === 'X' ? game.playerX : game.playerO).split('@')[0]}!`;
                        await sock.sendMessage(from, { text: resText, mentions: [game.playerX, game.playerO] });
                        delete ttt_games[from];
                    } else {
                        const nextPlayer = game.turn === 'X' ? game.playerX : game.playerO;
                        await sock.sendMessage(from, { text: `🎮 *𝐉𝐎𝐆𝐎 𝐃𝐀 𝐕𝐄𝐋𝐇𝐀*\n\n${renderBoard(game.board)}\nTurno de: @${nextPlayer.split('@')[0]}\nDigite o número da casa!`, mentions: [nextPlayer] });
                    }
                    return true;
                }
            }
        }
    }
    return false;
};

module.exports = { ttt_games, handleTTT };
