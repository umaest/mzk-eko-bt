const Discord = require('discord.js')
const math = require('math-expression-evaluator') 
module.exports = {
    config: {
        name: "altın",
        aliases: ["ga"],
        usage: "(komut)",
        kategori: "diger",
        description: "Altının fiyatını gösterir",
    },
run: async(client, message, args) => {
const csfetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

message.channel.send("Gram altın Yükleniyor...").then(async msg => {    
setTimeout(() => {
    csfetch("https://api.bigpara.hurriyet.com.tr/doviz/headerlist/anasayfa").then(async r => {
    const json = await r.json();
    const dolarobj = json.data.filter(c => c.SEMBOL=="GLDGR")[0]
if (dolarobj.SATIS){
  let işlem = math.eval("31+31")
        msg.edit(`Güncel Gram Altın: **${dolarobj.SATIS}TL**`)
      } else {
        msg.edit("Gram Altını Bulamadım! :(")
      }
})
}, 1) 
  })
}}