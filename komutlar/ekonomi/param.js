const Discord = require("discord.js");
const db = require("croxydb");
module.exports = {
  config: {
    name: "param",
    aliases: ["cash"],
    usage: "(parasını görmek istediğin kişi)",
    kategori: "ekonomi",
    description: "Hayaller elon musk gerçekler 0"
  },
  run: async (client, message, args) => {
    let member =
      message.mentions.members.first()
    if (!member) {
      let paraa = db.get(`${message.author.id}.para`)
      let basamak = paraa.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1'+".");
      message.reply(
        `ŞU ANKİ PARAN: **${basamak}TL**`
      );
    }else{
      let name = member.user.username
      if(db.has(`para_${member.id}`)){
        let paraa = db.get(`${message.author.id}.para`)
        let basamak = paraa.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1'+".");
      message.reply(`**${name}** KİŞİSİNİN PARASI **${basamak}**TL`)}else{
        message.reply(`:warning: **${name.toUpperCase()}** KİŞİSİNİN UMO HESABI YOK`)
      }
    } 
  },
};