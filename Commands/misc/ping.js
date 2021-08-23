const { MessageEmbed } = require('discord.js');
const pop = require('popcat-wrapper')
const Discord = require('discord.js')
const Canvas = require('canvas')
const { registerFont, createCanvas } = require('canvas')
registerFont('Fonts/Urbanist-BlackItalic.ttf', { family: 'Urbanist' })


var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '20px "Urbanist"';
welcomeCanvas.context.fillStyle = '#ffffff';

Canvas.loadImage("https://wallpaperaccess.com/full/19276.jpg").then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
    welcomeCanvas.context.stroke()
    welcomeCanvas.context.fill()
})
module.exports.run = async (client, message, args, guild) => {
   
    let canvas = welcomeCanvas;
    canvas.context.font = '57px sans-serif',
    canvas.context.textAlign = 'center';
    canvas.context.fillText('WELCOME '+message.author.tag.toUpperCase() + ' !', 512, 399)
    canvas.context.font = '40px sans serif'
    canvas.context.fillText(`You are the ${message.guild.memberCount}th`, 512, 449)
    canvas.context.beginPath()
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(message.author.displayAvatarURL({format: 'png', size: 1024}))
    .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
    })
    let atta = new Discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${message.author.id}.png`)
    try {
        message.channel.send(atta)
    } catch (error) {
        console.log(error)
    }
};

module.exports.help = {
  name : 'ping',
  aliases :['ping'],
  description: 'renvoie pong! ',
  cooldown : 10,
  usage : '',
  isUserAdmin : false ,
  permissions : true,
  args : false
};