const {
  EmbedBuilder,
  SlashCommandBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");
module.exports = {
  name: "yardım",
  description: "UmoBOT'un komutlarını görebilirsin",
  options: [
    {
      name: "komut",
      description: "Komut bilgisini görmek için komut adını girin",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const kkomut = interaction.options.getString("komut");
    const embed = new EmbedBuilder()
      .setColor("#000001")
      .setAuthor({
        name: `${interaction.guild.members.me.displayName} Yardım komutu!`,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setThumbnail(
        client.user.displayAvatarURL({ dynamic: true, size: 2048 })
      );

    if (!kkomut) {
      const categories = readdirSync("./komutlar/");

      embed.setDescription(`Ön-Ekim: **${client.prefix}**`);
      embed.setFooter({
        text: `© ${interaction.guild.members.me.displayName} | Toplam Komut: ${
          client.commands.size - 3
        }`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });

      categories.forEach((kategori) => {
        const dir = client.commands.filter(
          (c) => c.config.kategori === kategori
        );
        console.log(kategori)
        const capitalise = kategori.slice(0, 1).toUpperCase() + kategori.slice(1);
        try{
          embed.addFields({
            name: `❯ ${capitalise} [${dir.size}]:`,
            value: dir.map((c) => `\`${c.config.name}\``).join(" , "),
            inline: false,
          });
       } catch (e) {
          console.log(e);
        }
      });

      return interaction.reply({ embeds: [embed] });
    } else {
      let command = client.commands.get(
        client.aliases.get(kkomut.toLowerCase()) || kkomut.toLowerCase()
      );
      if (!command)
        return interaction.reply({
          embeds: [
            embed
              .setTitle("Geçersiz Komut.")
              .setDescription(
                `Komut listesini görmek için \`/yardım\` kullanın!`
              ),
          ], ephemeral: true
        });
      command = command.config;

      embed.setDescription(stripIndents`Prefix: \`${client.prefix}\`\n
            **Komut:** ${
        command.name.slice(0, 1).toUpperCase() + command.name.slice(1)
      }
            **Açıklama:** ${command.description || "Açıklama Bulunamadı."}
            **Kullanımı:** ${
        command.usage
          ? `\`${client.prefix}${command.name} ${command.usage}\``
          : "Bulunamadı"
      }
            **Diğer kullanımları:** ${
        command.aliases ? command.aliases.join(", ") : "Bulunmamaktadir."
      }`);
      embed.setColor("#00ccff");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
