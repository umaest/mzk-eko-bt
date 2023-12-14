const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
module.exports = {
  config: {
    name: "deneme",
    aliases: ["de"],
    usage: "(komut)",
    kategori: "diger",
    description: "Yardım komutu.",
  },
  run: async (client, message, args) => {
    const row1 = new ButtonBuilder()
      .setCustomId("back")
      .setLabel("eminsin?")
      .setStyle(ButtonStyle.Success);
    const row2 = new ButtonBuilder()
      .setCustomId("next")
      .setLabel("❌")
      .setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder().addComponents(row1);
    const emb = new EmbedBuilder().setAuthor({name: 'TRANSFER', iconURL: message.author.displayAvatarURL({dynamic: true})}).setDescription("deneme").setImage('https://media.tenor.com/XQ0mT-V1n30AAAAM/are-you-sure-about-that-t he-rock.gif').setFooter({text: `**?** kişisinden **?** kişisine para transferi`});
    let dat = Date.now() / 1000 - 8;
    const emb2 = new EmbedBuilder().setAuthor({name: 'TRANSFER GERÇEKLEŞTİ', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'}).setDescription("deneme " + `<t:${dat.toFixed(0)}:R>`).setFooter({text: `BAŞARIYLA ? KİŞİSİNE ?TL YOLLANDI ${client.uptime}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp().setColor('#00ff00');
    message.channel.send({ embeds: [emb], components: [row] }).then(msg => {
    const collector = msg.createMessageComponentCollector(user => user.clicker.user.id == message.author.id)
      collector.on('collect', async (button) => {
      let interaction = button
        if (interaction.customId == "back") {
          await interaction.deferUpdate()
        msg.edit({embeds: [emb2] ,components: []})
          //message.channel.send(`BASAN KİŞİ: <@${interaction.user.id}>`)
        collector.stop()
        }})
      collector.on('end', async (interaction) => {
        //message.channel.send('collector kapatıldı cpu %1 boşaldı' )
      })
    })
    let çenıl = message.guild.channels.cache.find(channel => channel.name === "genel");
   if(çenıl) {message.channel.send(`<#${çenıl.id}>`)} 
  },
}
