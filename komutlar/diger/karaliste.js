const Discord = require('discord.js');
const db = require("croxydb");
module.exports = {
    config: {
        name: "karaliste",
        aliases: ["blacklist"],
        usage: "",
        kategori: "yetkili",
        description: "yetkilimisin yarram",
    },
run: async (client, message, args) => {

  if (client.sahip != message.author.id) {
    return; 
  }


  let member = message.mentions.members.first() || client.users.cache.get(args[0]);
  if (!member) return message.channel.send("❌ Bir Üye Etiketlemelisin!");

message.channel.send(`${member} Kara Listeye Alındı Artık Komutları Kullanamıyacak!`)
db.push(`karaliste`, member.id)


}} 