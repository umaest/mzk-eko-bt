const db = require("croxydb");
const math = require("math-expression-evaluator");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
module.exports = {
  config: {
    name: "gönder",
    aliases: ["transfer"],
    usage: "(göndereceğin kişi) (miktar)",
    kategori: "ekonomi",
    description: "Para gönderme"
  },
  run: async (client, message, args) => {
    let member =
      message.mentions.members.first() || client.users.cache.get(args[0]);
    let miktar = args[1];
    if (miktar) {
      if (member) {
        if (!isNaN(miktar)) {
          if (miktar < 1) {
            message.channel.send("**GEÇERLİ BİR SAYI GİRİN**");
          } else {
            if (miktar > db.get(`para_${message.author.id}`)) {
              message.channel.send("**O KADAR PARAN YOK**");
            } else {
              if (db.has(`para_${member.id}`)) {
                if (message.author.id === member.id) {
                  message.channel.send("**KENDİNE PARA YOLLAYAMAZSIN**");
                } else {
                  let kabul = false
                  const row1 = new ButtonBuilder()
                    .setCustomId("yes")
                    .setLabel("KABUL ET")
                    .setEmoji("👍")
                    .setStyle(ButtonStyle.Success);
                  const row2 = new ButtonBuilder()
                    .setCustomId("no")
                    .setLabel("REDDET")
                    .setEmoji("👎")
                    .setStyle(ButtonStyle.Danger);
                  const row = new ActionRowBuilder().addComponents(row1, row2);
                  const emb = new EmbedBuilder()
                    .setAuthor({
                      name: "TRANSFER",
                      iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                      }),
                    })
                    .setDescription(`**${member.user.username}** KİŞİSİNE **${miktar}TL** GÖNDERMEK ÜZERESİN`)
                    //setImage(
                     // "https://media.tenor.com/XQ0mT-V1n30AAAAM/are-you-sure-about-that-the-rock.gif"
                  //  )
                    .setFooter({
                      text: `${message.author.username} kişisinden ${member.user.username} kişisine para transferi`,
                    });
                  const emb2 = new EmbedBuilder()
                    .setAuthor({
                      name: "TRANSFER GERÇEKLEŞTİ",
                      iconURL:
                        "https://cdn.discordapp.com/emojis/758423098885275748.gif",
                    })
                    .setDescription(`BAŞARIYLA **${member.user.username}** KİŞİSİNE ${miktar}TL GÖNDERİLDİ`)
                    .setFooter({
                      text: `UMO EKONOMİ`,
                      iconURL: member.displayAvatarURL({
                        dynamic: true,
                      }),
                    })
                    .setTimestamp()
                    .setColor("#00ff00");
                  message
                    .reply({ embeds: [emb], components: [row] })
                    .then((msg) => {
                    const filt = user => user.clicker.user.id == message.author.id
                      const collector = msg.createMessageComponentCollector(
                        {filt, time: 30000} 
                      );
                      collector.on("collect", async (buton) => {
                        if(buton.customId == 'yes'){
                         await buton.deferUpdate()
                        //__________________
                        let giden = math.eval(
                          db.get(`para_${member.id}`) + "+" + miktar
                        );
                        db.set(`para_${member.id}`, giden);
                        let eksilen = math.eval(
                          db.get(`para_${message.author.id}`) +
                            "-" +
                            `${miktar}`
                        );
                        db.set(`para_${message.author.id}`, eksilen);
                        msg.edit({embeds: [emb2], components: [] })
                         let kabul = true
                        //__________________
                        }else{
                         await buton.deferUpdate()
                          const embred = new EmbedBuilder()
                          .setAuthor({name: 'TRANSFER REDDEDİLDİ', iconURL: message.author.displayAvatarURL({dynamic: true})})
                          .setDescription(`**${member.user.username}** KİŞİSİNE **${miktar}TL** GÖNDERMEYİ REDDETTİN`)
                          .setFooter({text: 'UMO EKONOMİ', iconURL: client.user.avatarURL()})
                          .setTimestamp()
                          .setColor('#ff0000');
                          msg.edit({embeds: [embred], components: [] })
                        }
                      });
                    collector.on("end", async (ended) => {
                      if(!kabul){
                      msg.edit({content: '30sn İÇERİSİNDE CEVAP VERMEDİN', components: []})}
                    })
                    });
                }
              } else {
                message.channel.send(
                  ":warning: **GÖNDERECEĞİN KİŞİNİN UMO HESABI YOK**"
                );
              }
            }
          }
        } else {
          message.channel.send("**GEÇERLİ BİR SAYI GİRİN**");
        }
      } else {
        message.channel.send("**GÖNDERECEĞİNİZ KİŞİYİ GİRİN**");
      }
    } else {
      message.channel.send("**GÖNDERECEĞİNİZ MİKTARI GİRİN**");
    }
  },
};
