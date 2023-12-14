const MainClient = require("./bott");
const client = new MainClient();
const express = require("express");
const app = express();
const { ChannelType, EmbedBuilder } = require("discord.js");
const db = require("croxydb");
const fs = require('fs')
const csfetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const deprembed = (şehir, büyüklük, derinlik, tarih) => new EmbedBuilder()
            .setAuthor({name: 'UMO Deprem Bildiri', iconURL: client.user.avatarURL()})
            .setDescription(`**${şehir} ŞEHRİNDE BİR DEPREM GERÇEKLEŞTİ**`)
            .addFields({name: 'Büyüklük', value: `\`\`\`${büyüklük}\`\`\``})
            .addFields({name: 'Derinlik', value: `\`\`\`${derinlik}\`\`\``})
           .addFields({name: 'Tarih', value: `\`\`\`${tarih}\`\`\``})
            .setTimestamp();
setInterval(() => {
  csfetch('https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1').then(async deprem => {
    const djson = await deprem.json()
    if(db.get('deprem') == djson.result[0].mag + djson.result[0].title) return;
    const kanal = client.channels.cache.get('1080165802961014864')
    const şehir = djson.result[0].title
    const büyüklük = djson.result[0].mag
    const derinlik = djson.result[0].depth
   const tarih = djson.result[0].date
    kanal.send({embeds : [deprembed(şehir, büyüklük, derinlik, tarih)]})
    db.set('deprem', djson.result[0].mag + djson.result[0].title)
  }) 
}, 30000)

client.on("messageCreate", async (msg) => {
  const komut = msg.content;
  let data = ["sa", "Sa", "sA", "SA", "sea", "Sea", "SEA"];
  if (data.includes(komut)) {
    msg.channel.send("Aleyküm Selam");
    await msg.react("🇦");
    await msg.react("🇸");
  }
  //______________
  if (komut === "dom dom yes") {
    msg.channel.send(
      "https://media.tenor.com/UwT0OYUElO4AAAAS/belly-belly-bounce.gif"
    );
  }

  if (komut === "çıkumo") {
    if (client.sahip === msg.author.id) {
      db.unpush(`karaliste`, msh.author.id)
    }
    msg.channel.send('komut')
    if (komut === " ") {
    msg.guild.members.get(msg.author.id).setNickname("HAYALET BOŞLUKÇU");
    }
  } //_____________
});

app.get("/", (req, res) => res.send(`${client.user.tag} olarak giriş yapıldı`));
//app.get("/", (req, res)=> {res.sendFile(__dirname + '/site/index.html');});
app.use(express.static(__dirname + '/site'));// sitenize girdiğinde görebilirsiniz.
app.listen(8000, () =>
  console.log("Port ayarlandı: " + 8000)
);
//_________________
client.on("ready", async () => {
//BOT BAŞLADIKDAN 120 SANİYE SONRA ÇALIŞMAYA BAŞLAR VE VERİLERİ HER 120 SANİYEDE BİR YENİLER.
let csk1 = "1067423632936157234"
let csk2 = "1067423658903076925"
let csk3 = "1067423687650852914"
let csk4 = "1067423717531058276"
let csk5 = "1067423740868178001"
let csg = "1025427704444624947"

setInterval(() => {
const guild = client.guilds.cache.get(csg)
if(guild){
const c1 = guild.channels.cache.get(csk1)
const c2 = guild.channels.cache.get(csk2)
const c3 = guild.channels.cache.get(csk3)
const c4 = guild.channels.cache.get(csk4)
const c5 = guild.channels.cache.get(csk5)
if(c1){
c1.setName("Toplam Üye: "+guild.memberCount)
}
if(c2){
c2.setName("Toplam Bot: "+guild.members.cache.filter(m => m.user.bot).size)
}
if(c3){
const as = guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice);
let count = 0;
for (const [, voiceChannel] of as)
count += voiceChannel.members.size;
c3.setName("Sesdeki Üyeler: "+count)
}
if(c4){
c4.setName("Kanal Sayısı: "+guild.channels.cache.size)
}
if(c5){
let aktif =  guild.members.cache.filter(m => m.presence?.status === "online").size
let bosta =  guild.members.cache.filter(m => m.presence?.status === "idle").size
let mesgul = guild.members.cache.filter(m => m.presence?.status === "dnd").size
//let sonuc = aktif + bosta + mesgul
c5.setName(`🟢: ${aktif}  🌙: ${bosta}  ⛔:${mesgul}`).catch(() => {console.log('HACI BÖYLE BİR KANALA ERİŞİMİM YOK')})
} else {console.log('hata')}
} else {
console.log("Belirtilen Sunucu Bulunamadı!")
}
}, 35000)
})
//_________________



client.komut = [];
fs.readdir("./commands", (err, files) => {
if (err) throw err;
files.forEach(async (f) => {
try {
let props = require(`./commands/${f}`);
client.komut.push({
name: props.name,
description: props.description,
options: props.options
});
console.log(`[/] Komut yüklendi: ${props.name}`);
} catch (err) {
console.log(err);
}
});
});

client.connect();

module.exports = client;
