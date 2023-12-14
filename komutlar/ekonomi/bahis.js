const Discord = require('discord.js') 
const db = require('croxydb')
const math = require('math-expression-evaluator') 
module.exports = {
    config: {
        name: "bahis",
        usage: "(koyacağın miktar)",
        kategori: "ekonomi",
        description: "Hayaller elon musk gerçekler hiko baba"
    },
run: async (client, message, args) => {
  var miktar = args[0]
  if(miktar){
  if(!isNaN(miktar)){
    if(miktar < 1) {
      message.channel.send('**GEÇERLİ BİR SAYI GİRİN**')
    } else{
      if(miktar > db.get(`${message.author.id}.para`)){
        message.channel.send('**O KADAR PARAN YOK**')
      } else{
    let random = Math.floor(Math.random() * 100)
    if(random < 45){
      message.reply(`**TEBRİKLER!! BAHİSİ ${miktar}TL İLE KAZANDIN**`)
      let artı = math.eval(db.get(`${message.author.id}.para`) + '+' + miktar)
      db.set(`${message.author.id}.para`, artı)
    }
     else{if(`${db.get(`${message.author.id}`)}` === miktar){
       message.reply(`**BAHİSİ ${miktar}TL İLE KAYBETTİN AĞLA**<:A_:1025645509827903499>`)
       db.set(`${message.author.id}.para`, '0')
     } else{
      message.reply(`**BAHİSİ ${miktar}TL İLE KAYBETTİN**`)
       let eksi = math.eval(db.get(`${message.author.id}.para`) + '-' + miktar)
       db.set(`${message.author.id}.para`, eksi)
    }} }}
  }
  else{
    message.channel.send('**GEÇERLİ BİR SAYI GİRİN**')
  }}
  else{
    message.channel.send('**KOYACAĞINIZ MİKTARI GİRİN**') 
  } 
}} 