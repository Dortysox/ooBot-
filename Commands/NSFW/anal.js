
const Discord = require("discord.js");
const NSFW = require("nsfw-discord");
const nsfw = new NSFW();
module.exports.run = async (client, message, args) => {
    if(!message.channel.nsfw){ message.channel.send("This command can only be used in channels marked nsfw."); return; }
    const image = await nsfw.anal();
const embed = new Discord.MessageEmbed()
    .setTitle(`Anal Image`, image)
    .setColor("GREEN")
    .setImage(image);
message.channel.send(embed);
};

module.exports.help = {
  name : "anal",
  aliases :['miaw'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  
  isUserAdmin : false ,
  permissions : false,
  args : false 
};