const db = require('croxydb')
module.exports = {
    config: {
        name: "eval",
        usage: "(komut)",
        kategori: "yönetici",
        description: "Yöneticimisin la",
    },
run: async (client, message, args) => {
  if(message.author.id !== client.sahip) return
    if(!args[0]) return
    try {
      const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
      }
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code);
        let çıkış = (`\`\`\`js\n${clean(code)}\n\`\`\``)
        message.channel.send(çıkış)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}}