const { AttachmentBuilder } = require('discord.js')
const { createCanvas, loadImage } = require('canvas')
module.exports = {
    config: {
        name: "wasted",
        description: "profil fotoğrafına wasted efekti ekler",
        kategori: "diger",
        aliases: []
    },
    run: async (client, message, args) => {
        let canvas = createCanvas(500, 500);
    let ctx = canvas.getContext('2d');
    
    let background = await loadImage(message.author.displayAvatarURL({dynamic: true, size: 1024}));
    ctx.drawImage(background, 0, 0, 500, 500); // 0,0 evresinde resmi çizmek
    //ctx.font = '50px Georgia';
  //  ctx.fillStyle = '#ff0000';
    //ctx.textAlign = 'center'
   // ctx.fillText('WASTED', 250, 250);
    let wasted = await loadImage('https://data2.cupsell.pl/upload/generator/63690/640x420/2125732_print_2.png?resize=max_sizes&key=55f9a22768eed085006592c1174c0235')
    ctx.drawImage(wasted, 35, 35)
      
      const attachment = new AttachmentBuilder(canvas.toBuffer(), {name: 'wasted.png'});
    message.channel.send({files: [attachment]});
    }}