const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const Canvas = require('canvas')
const db = require('quick.db')
const canvacord = require("canvacord");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";




module.exports.run = async (client, message, args, guild) => {
  var userlvl = message.mentions.users.first() || message.author;
  var level = db.fetch(`guild_${message.guild.id}_level_${message.author.id}`) 
        var xp = db.fetch(`guild_${message.guild.id}_xp_${userlvl.id}`)
   
   const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(xp)
    .setLevel(20)
    .setAvatar(userlvl.displayAvatarURL({ format: 'png' }))
    .setRequiredXP(1000)
    .setRank(1, 'RANK', false)
    .setStatus(userlvl.presence.status)
    .setProgressBar("#f5604c", "COLOR")
    .setOverlay("#242323")
    .setBackground("COLOR", "#1a1919")
    .setUsername(userlvl.username)
    .setDiscriminator(userlvl.discriminator);

    rank.build()
    
       .then(data => {
            const atta = new Discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
  
};

module.exports.help = {
  name : 'rankcard',
  aliases :['ping'],
  description: 'renvoie pong! ',
  cooldown : 10,
  usage : '',
  isUserAdmin : false ,
  permissions : false,
  args : false
};