const {
  EmbedBuilder,
  Colors,
  version,
} = require("discord.js");
const { voiceConnections } = require('@discordjs/voice');
const moment = require("moment");
require("moment-duration-format");
const os = require('os-utils')
module.exports = {
    config: {
        name: "istatistik",
        aliases: ["i"],
        usage: " ",
        kategori: "diger",
        description: "Botun istatistikleri",
    },
run: async (client, message, args) => {
  const Uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  os.cpuUsage(function(v){
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "UMO İstatistik",
      iconURL: client.user.avatarURL(),
    })
    .setDescription(
      `👑 Botun Sahibi ve Geliştiricisi: <@1017079348269953060>
  
  📊 Toplam Kullanıcı: **${client.users.cache.size}**
  📊 Toplam Sunucu: **${client.guilds.cache.size}**
  📊 Toplam Kanal: **${client.channels.cache.size}**
  :headphones: Müzik Çalınan Sunucu Sayısı: **${voiceConnections}**
  
  📊 Hafıza Kullanımı: **${(
    process.memoryUsage().heapUsed /
    1024 /
    512
  ).toFixed(1)}Mb**
  <:emoji_6:1067828999973253130> CPU Kullanımı: %${v.toFixed(2)}
  📊 Uptime: **${Uptime}**
  
  📊 NodeJS Sürümü: **${process.version}**
  📊 DiscordJS Sürümü: **${version}**` 
    )
    .setFooter({
      text: `UMO İstatistik`,
      iconURL: message.member.displayAvatarURL({ dynamic: true }),
    })
    .setColor(Colors.Blurple);
  message.reply({ embeds: [embed] });})
}}