const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms-js");
module.exports.run = async (client, message, args) => {
  let user = message.author;

        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}_${message.guild.id}`)
            let embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(`❌**You Do Not Have Any Money To Withdraw!**`)
            if (!money) return message.channel.send(embed)
            db.subtract(`bank_${user.id}_${message.guild.id}`, money)
            db.add(`money_${user.id}_${message.guild.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You have withdrawn all your coins from your bank`); 
            message.channel.send(embed5)

        } else {

            let embed2 = new MessageEmbed() 
                .setColor("GREEN")
                .setDescription(`❌ Specify an amount to withdraw!`);

            if (!args[0]) {
                return message.channel.send(embed2)
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Your Amount Is Not A Number!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You can't withdraw negative money!`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You don't have that much money in the bank!`);

            if (member2 < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You have withdrawn ${args[0]} coins from your bank!`);

            message.channel.send(embed5)
            db.subtract(`bank_${user.id}_${message.guild.id}`, args[0])
            db.add(`money_${user.id}_${message.guild.id}`, args[0])
        }
    
};

module.exports.help = {
  name : "withdraw",
  aliases :['tocash'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};