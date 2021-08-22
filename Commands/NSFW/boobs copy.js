
const Discord = require("discord.js");
const NSFW = require("nsfw-discord");
const nsfw = new NSFW();
module.exports.run = async (client, message, args) => {
    if(!message.channel.nsfw){ message.channel.send("This command can only be used in channels marked nsfw."); return; }
    const image = await nsfw.ass();
const embed = new Discord.MessageEmbed()
    .setTitle(`ass Image`, image.urls)
    .setColor("GREEN")
    .setImage(image);
    embed.setFooter(`Requête de ${message.author} | Discord`)
message.channel.send(embed);
};

module.exports.help = {
  name : "ass",
  aliases :['cul'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  cooldown : 5,
  permissions : false,
  args : false 
};