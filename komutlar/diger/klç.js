const Discord = require('discord.js');
const db = require("croxydb");
module.exports = {
    config: {
        name: "kl-çıkar",
        aliases: ["bl-çıkar","klç"],
        usage: "",
        kategori: "yetkili",
        description: "Yetkilimisin yarram",
    },
  run : async (client, message, args) => {

  if (![client.sahip].includes(message.author.id)) {
    return; 
  }

  let member = message.mentions.members.first() || client.users.cache.get(args[0]);
  if (!member) return message.channel.send("❌ Bir Üye Etiketlemelisin!");
if(db.get("karaliste").includes(member.id)){
  db.unpush(`karaliste`, member.id)
  message.channel.send(`${member} Kara Listeden Çıkarıldı Artık Komutları Kullanabilecek!`)
}else{
  message.channel.send("BU KİŞİ KARA LİSTEDE YOK")
}
  }} 