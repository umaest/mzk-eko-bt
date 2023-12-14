const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const {EmbedBuilder} = require("discord.js")
module.exports = async (client, guild)=>{
    const rest = new REST({ version: "10" }).setToken(client.token);
    (async () => {
    try {
    await rest.put(Routes.applicationCommands(client.user.id), {
    body: await client.komut,
    });
    console.log("Successfully loadded application [/] commands. ", guild.name);
} catch(e) {
    guild.owner.dmChannel.send("LÜTFEN UMO'NUN KOMUTLARININ ÇALIŞMASI İÇİN UMO'NUN KOMUT OLUŞTURMA İZNİNİ AÇIN")
    console.log("Failed to load application [/] commands. " + e + guild.name);
    }
    })();
    const embed = new EmbedBuilder()
    .setColor("Blue")
    .setAuthor({text: "UMO", iconURL: guild.members.me.displayAvatarURL({dynamic: true})})
    .setDescription("**BENİ SUNUCUNA EKLEDİN!\n İŞTE ÖZELLİKLERİM:**")
    .addFields({name: "**Müzik**", value: "Gelişmiş müzik filtrelerim ve Youtube arama özelliğim ile müzik dinleyebilirsin"})
    .addFields({name: "**Ekonomi**", value: "Ekonomi komutlarım sayesinde arkadaşlarınla eğlenebilirsin"})
    .addFields({name:"**Eğlence**", value:"XOX, taş kağıt makas gibi oyunlarla eğlenebilirsin"})
    .setFooter({text: `${guild.name} SUNUCUSUNA BENİ EKLEDİN`, iconURL: guild.iconURL({dynamic: true})})
}