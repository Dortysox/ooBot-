const discord = require("discord.js");
const db = require("quick.db");
const { ooColor } = require("../../config")
module.exports.run = async (client, message, args) => {


if(!db.has(`LockedChannel_${message.channel.id}`)) {
  message.channel.send( new discord.MessageEmbed() .setDescription(` :x: **Ce salon est n'est pas lock ! **`)) .setColor(ooColor)
} else
 // -> 500


    message.channel.overwritePermissions([
     {
        id: message.guild.id,
        null : ['SEND_MESSAGES'],
     },
    ],);
  
  // -> 500
   db.delete(`LockedChannel_${message.channel.id}`)
   const embed = new discord.MessageEmbed()
   .setDescription(`🔓** ${message.channel} a été UnLock**`)
   .setColor(ooColor);
  await  message.channel.send(embed);
   
};

module.exports.help = {
  name : "unlock",
  aliases :['réouvrir'],
  description: "permet de réouvrir un salon fermée",
  usage: '',
  isUserAdmin : false ,
  permissions : true,
  args : false 
};