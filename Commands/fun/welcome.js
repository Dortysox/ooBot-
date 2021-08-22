module.exports.run = async(client, message, args) => {

    const Discord = require("discord.js");
    const jimp = require('jimp')
    
    
    
        //Generating the actual custom Card
        let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK) 
let welcome = await jimp.read('https://s23932.pcdn.co/wp-content/uploads/2016/06/cotton-Canvas-Painting-for-Beginners-060116.jpg') //We load the image from that link
welcome.print(font, 508, 200, `Hello, ${message.author.tag}`) 
welcome.write('Welcome2.png') //We create a png file called Welcome2
message.channel.send(``, { files: ["Welcome2.png"] }) //We sent the file to the channel

    
};

module.exports.help = {
  name : "wlcm",
  aliases :['repeat', 'rep'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};