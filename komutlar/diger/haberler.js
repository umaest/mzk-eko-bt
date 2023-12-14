const Parser = require('rss-parser');
const parser = new Parser()
const { EmbedBuilder } = require("discord.js")
module.exports = {
    config: {
        name: "haber",
        aliases: ["haberler", "sondakika"],
        usage: "",
        kategori: "diger",
        description: "Son dakika haberlerini gösterir",
    },
    run: async (client, message) => {
      const feed = await parser.parseURL("https://www.cnnturk.com/feed/rss/all/news")
  const haberler = feed.items[0];
 
  /*const random = Math.floor(Math.random() * haberler.length)
  const haber = haberler[random]*/
 
  const embed = new EmbedBuilder()
  .setColor('#ff0000')
  .setTitle("Son Dakika Haberleri 📰 ")
  .setDescription(haberler.content + haberler.img)
  .setImage(haberler.link)
 
  message.channel.send({embeds: [embed]})
    }
    }