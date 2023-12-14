const Discord = require('discord.js');
const db = require("croxydb");
const math = require('math-expression-evaluator')
module.exports = {
    config: {
        name: "günlük",
        aliases: ["daily"],
        usage: " ",
        kategori: "ekonomi",
        description: "Günlük paranı alırsın"
    },
run: async (client, message, args) => {
  var dt = new Date();
  const gün = dt.getDate();
  let kişigün = db.get(`${message.author.id}.dailyts`)
  if(gün === kişigün){
    message.reply('GÜNLÜĞÜNÜ ZATEN TOPLADIN') }
    else {
      let randpara = ['10000', '12000', '14500', '17000', '20000', '25000',"50000"]
      let daily = Math.floor(Math.random() * randpara.length)
      let netdaily = randpara[daily]
      let basmak = netdaily.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1'+".");
      message.reply(`**TEBRİKLER** ${basmak}TL ALDIN`)
      db.set(`${message.author.id}.dailyts`, gün)
      if(db.has(`${message.author.id}.para`)){
       var artı = math.eval(db.get(`${message.author.id}.para`) + '+' + netdaily)
       db.set(`${message.author.id}.para`, artı)
      } else{
        db.set(`${message.author.id}.para`, '0')
        var artı = math.eval(db.get(`${message.author.id}.para`) + '+' + netdaily)
       db.set(`${message.author.id}.para`, artı)
      }
    }
  }
}