module.exports = {
    config: {
        name: "fakemesaj",
        aliases: ["fakemsg"],
        usage: "(kişi etiket) (mesaj)",
        kategori: "diger",
        description: "webhook ile etiketlediğiniz kişinin profiliyle mesaj yazar",
    }}
const Discord  = require('discord.js');

module.exports.run = async (client, message, args) => {
  
  //Tanımlar
let üye = message.mentions.users.first()
let mesaj = args.slice(1).join(" ")
  //-------

  //Embedler
const embed1 = new Discord.EmbedBuilder().setTimestamp().setColor('Red').setDescription(`Birisini etiketlemelisin. \n\n Örnek kullanım : **u.fake-mesaj** @kişi **deneme**`)
const embed2 = new Discord.EmbedBuilder().setTimestamp().setColor('Red').setDescription(`Bir mesaj yazmalısın. \n\n Örnek kullanım : **u.fakemesaj** @kişi **deneme**`)
  //-------

  //Hatalar
if(!üye) return message.channel.send({embeds : [embed1]})
if(!mesaj) return message.channel.send({embeds : [embed2]})
  //-------
  
  //Webhook/Bitiş
  let hook = await message.channel.createWebhook({name : üye.username,   avatar: üye.avatarURL()}).then(async s => {
    message.delete()
    await s.send({content : `${mesaj}`}) 
  s.delete({ timeout: 300 });
  }).catch(err => {return message.channel.send('Webhook oluşturma yetkim yok.\n\n' + err)})

  //-------
  ;}