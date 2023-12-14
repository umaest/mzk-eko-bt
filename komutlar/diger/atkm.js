const
    rps = [
        'makas',
        'taş',
        'kağıt'
    ],
    rpsF = (userAns, botAns) => {
        let choice = userAns,
            botChoice = botAns;
        if (choice === 'taş') {
            if (botChoice === 'makas') {
                return 'won';
            } else if (botChoice === 'kağıt') {
                return 'lost';
            }

            return 'draw';
        } else if (choice === 'kağıt') {
            if (botChoice === 'taş') {
                return 'won';
            } else if (botChoice === 'makas') {
                return 'lost';
            }

            return 'draw';
        } else if (choice === 'makas') {
            if (botChoice === 'taş') {
                return 'lost';
            } else if (botChoice === 'kağıt') {
                return 'won';
            }

            return 'draw';
        }
    };
module.exports = {
  config: {
    name: "tkm",
    usage: "(komut)",
    kategori: "diger",
    description: "Yardım komutu.",
  },
  run: async (client, message, args) => {
    if (!args[0]) {
        return message.channel.send('Lütfen seçimini yap taş, kağıt yada makas & !!tkm <taş,kağıt,makas>');
    }
    let choice = args[0].toLowerCase();
    choice = choice === 't' ? 'taş' : choice;
    choice = choice === 'k' ? 'kağıt' : choice;
    choice = choice === 'm' ? 'makas' : choice;
    if (!rps.includes(choice)) {
        return message.channel.send('Lütfen seçimini yap taş, kağıt yada makas & !!tkm <t,k,m>');
    }
    let rand = Math.floor(Math.random() * 3);
    let botChoice = rps[rand];
    let result = rpsF(choice, botChoice);
    let answer = '';

    if (result === 'won') {
        answer = ':trophy: Başarılı, sen **Kazandın** :trophy: \nSenin Seçtiği: `' + choice + '` | UMO\'nun Seçtiği: `' + botChoice + '`';
    } else if (result === 'lost') {
        answer = ':x: Bidakine **Kaybetin Dostum** :x: \nSenin Seçtiğin: `' + choice + '` | UMO\'nun Seçtiği: `' + botChoice + '`';
    } else if (result === 'draw') {
        answer = ':neutral_face: Sonuç **Berabere** :neutral_face:\nSenin Seçimin: `' + choice + '` | UMO\'nun Seçimi: `' + botChoice + '`';
    }else {answer= 'HATA VAR'}

    message.channel.send(answer);
  }}