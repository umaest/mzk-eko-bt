
const Discord = require('discord.js');
const delay = require("delay")
const { stripIndents } = require('common-tags');
function winning(board, player){
    if (
           (board[0] == player && board[1] == player && board[2] == player) ||
           (board[3] == player && board[4] == player && board[5] == player) ||
           (board[6] == player && board[7] == player && board[8] == player) ||
           (board[0] == player && board[3] == player && board[6] == player) ||
           (board[1] == player && board[4] == player && board[7] == player) ||
           (board[2] == player && board[5] == player && board[8] == player) ||
           (board[0] == player && board[4] == player && board[8] == player) ||
           (board[2] == player && board[4] == player && board[6] == player)
           ) {
           return true;
       } else {
           return false;
       }
   }
   function emptyIndexies(board){
    return  board.filter(s => s != "𝗢" && s != "𝗫");
  }
  function minimax(newBoard, player){
    //available spots
    var availSpots = emptyIndexies(newBoard);
  
    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (winning(newBoard, Player1)){
       return {score:-10};
    }
      else if (winning(newBoard, Player2)){
      return {score:10};
      }
    else if (availSpots.length === 0){
        return {score:0};
    }
  
  // an array to collect all the objects
    var gamemoves = [];
  
    // loop through available spots
    for (var i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
        move.index = newBoard[availSpots[i]];
  
      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;
  
      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == Player2){
        var result = minimax(newBoard, Player1);
        move.score = result.score;
      }
      else{
        var result = minimax(newBoard, Player2);
        move.score = result.score;
      }
  
      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;
  
      // push the object to the array
      gamemoves.push(move);
    }
  
  // if it is the computer's turn loop over the gamemoves and choose the move with the highest score
    var bestMove;
    if(player === Player2){
      var bestScore = -10000;
      for(var i = 0; i < gamemoves.length; i++){
        if(gamemoves[i].score > bestScore){
          bestScore = gamemoves[i].score;
          bestMove = i;
        }
      }
    }else{
  
  // else loop over the gamemoves and choose the move with the lowest score
      var bestScore = 10000;
      for(var i = 0; i < gamemoves.length; i++){
        if(gamemoves[i].score < bestScore){
          bestScore = gamemoves[i].score;
          bestMove = i;
        }
      }
    }
  
  // return the chosen move (object) from the array to the higher depth
    return gamemoves[bestMove];
  }
const Player1 = "𝗫"
const Player2 = "𝗢"

this.games = new Set()
module.exports = { 
    config: {
        name: "xox",
        usage: '(oynayacağın kişi)',
        description: "Etiketlediğin kişiyle xox oynrsın",
        kategori: "diger"

    },
    run: async (client, message, args) => {
        var botmode = false
let msg = message
  const opponent = msg.mentions.users.first()
  if (!opponent) return msg.reply('Bir kullanıcı girmelisiniz!')
  // if (opponent.bot) return msg.reply('Botlar ile oyun oynyamazsınız.');
if (opponent.id == client.user.id) botmode = true
        if (opponent.id === msg.author.id) return msg.reply('Kendiniz ile oyun oynayamazsınız.');
        if (this.games.has(msg.channel.id)) return msg.reply('Kanal başına sadece bir düello meydana gelebilir.');
        this.games.add(msg.channel.id);
        try {
            await msg.channel.send(`<@${opponent.id}>, düelloyu kabul ediyor musun?`);
            const filter = res => {return res.author.id === opponent.id && res.content.toLowerCase() === 'evet';} 
            (async () => {
                
                if(botmode){
                    await delay(500)
                    message.channel.send("evet")}})()
            const verification = await message.channel.awaitMessages({filter, 
                max: 1,
                time: 25000
            })
            if (!verification.size) {
                this.games.delete(msg.channel.id);
                return msg.channel.send('Görünüşe göre kabul edilemedi!');
            }
          message.channel.send('Yükleniyor..').then(async msgx => {
            let geçme = 0
            const sides = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
            const taken = [];
            let userTurn = true;
            let winner = null;
            while (!winner && taken.length < 9 && geçme < 3) {
                const user = userTurn ? msg.author : opponent;
                const sign = userTurn ? '𝗫' : '𝗢';
                await msgx.edit(stripIndents`
                    <@${user.id}>, hangi tarafı almak istersin?
                    \`\`\`
                    ${sides[0]} | ${sides[1]} | ${sides[2]}
                    —————————
                    ${sides[3]} | ${sides[4]} | ${sides[5]}
                    —————————
                    ${sides[6]} | ${sides[7]} | ${sides[8]}
                    \`\`\`
                `);
                const filter = res => {
                    let choice = Number(res.content);
                    return res.author.id == user.id && sides.includes(choice) && !taken.includes(choice);
                };
                (async () => {
                    await delay(1000)
                    if (botmode && user.id == client.user.id) {
                     message.channel.send(minimax(sides,sign).index)
                 }
                 })()
                const turn = await msg.channel.awaitMessages({filter, 
                    max: 1,
                    time: 30000
                });
                
                if (!turn.size) {
                    await msg.channel.send('Üzgünüm, zaman doldu!');
                    userTurn = !userTurn;
                    geçme++
                    continue;
                }
                const choice = turn.first().content;
                turn.first().delete()
                sides[Number.parseInt(choice, 10)] = sign;
                taken.push(choice);
                if (winning(sides, sign)) winner = userTurn ? msg.author : opponent;
                userTurn = !userTurn;
            }
            this.games.delete(msg.channel.id);
          if(geçme === 3) return msgx.edit('3 defadır cevap vermediğiniz için oyun bitti')
          else msgx.edit(stripIndents`
          ${winner ? `Tebrikler, ${winner}!` : 'Hiçkimse kazanamadı.'}
          \`\`\`
          ${sides[0]} | ${sides[1]} | ${sides[2]}
          —————————
          ${sides[3]} | ${sides[4]} | ${sides[5]}
          —————————
          ${sides[6]} | ${sides[7]} | ${sides[8]}
          \`\`\`
      `);
    })
        } catch (err) {
            this.games.delete(msg.channel.id);
            throw err;
        }
    }}
