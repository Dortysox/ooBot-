const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms-js");
module.exports.run = async (client, message, args) => {

 try {
  let user2 = message.author
    if (!args[0]) return message.channel.send("**Please Enter A User!**");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return message.channel.send("**Enter A Valid User!**");

    let member = db.fetch(`money_${user2.id}_${message.guild.id}`);

    
    let embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ You cannot pay yourself`);

    if (user.user.id === message.author.id) {
      return message.channel.send(embed2);
    }

    let embed3 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Specify an amount to pay`);

    if (!args[0]) {
      return message.channel.send(embed3);
    }
    let embed4 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Enter A Valid Amount!`);

    if (isNaN(args[0])) {
      return message.channel.send(embed4);
    }
    let embed5 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ You don't have that much money`);

    if (member < args[0]) {
      return message.channel.send(embed5);
    }

    let embed6 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`✅ You have payed ${user.displayName} ${args[0]} coins`);

    message.channel.send(embed6);
    db.add(`money_${user.id}_${message.guild.id}`, args[0]);
    db.subtract(`money_${user2.id}_${message.guild.id}`, args[0]);
    } catch {
        
    }
};

module.exports.help = {
  name : "pay",
  aliases :['payer'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};