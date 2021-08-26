const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const ms = require('parse-ms-js')

module.exports.run = async (client, message, args) => {

   let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${user.id}_${message.guild.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}_${message.guild.id}`);

    if (bank === null) bank = 0;
let Total = bal + bank
    if (user) {
      let moneyEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `**${user.user.username}'s Balance**\n**Cash:** ${bal}$\n**Bank:** ${bank}\n**Total:** ${Total}`
        );
      message.channel.send(moneyEmbed);
    } else {
      return message.channel.send("**Enter A Valid User!**");
    }
  
};

module.exports.help = {
  name : "balance",
  aliases :['bal'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};