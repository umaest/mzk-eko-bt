const figlet = require('figlet');
const chalk = require('chalk');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac
module.exports = async (client) => {
  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log('hata var kontrol edin (ready)');
        console.dir(err);
        return;
    }
    console.log(chalk.red.bold(data));
  });

  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;
  let channels = client.channels.cache.size;

  const activities = [
      `${client.users.cache.size} KULLANICI`,
      `/yardım`,
      `PREFİXİM ${client.prefix}`,
      `${client.guilds.cache.size} SUNUCU`
  ]
  let counter = 0
  setInterval(function() {
  client.user.setActivity(`${activities[counter]}`)
    counter++
    if(counter == activities.length){
      counter = 0
    }
  }, 10000)
  const rest = new REST({ version: "10" }).setToken(client.token);
(async () => {
try {
await rest.put(Routes.applicationCommands(client.user.id), {
body: await client.komut,
});
console.log("Successfully loadded application [/] commands.");
} catch(e) {
console.log("Failed to load application [/] commands. " + e);
}
})();

}

