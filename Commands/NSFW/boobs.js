
const Discord = require("discord.js");
const NSFW = require("nsfw-discord");
const nsfw = new NSFW();
module.exports.run = async (client, message, args) => {
    if(!message.channel.nsfw){ message.channel.send("This command can only be used in channels marked nsfw."); return; }
    const image = await nsfw.boobs();
const embed = new Discord.MessageEmbed()
    .setTitle(`boobs Image`, image.url)
    .setColor("GREEN")
    .setImage(image);
    embed.setFooter(`Requête de ${message.author} | Discord`)
message.channel.send(embed);
};

module.exports.help = {
  name : "boobs",
  aliases :['siens'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  cooldown : 5,
  permissions : false,
  args : false 
};