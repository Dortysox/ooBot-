const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const ms = require('parse-ms-js')
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ You Do Not Have Permissions To Add Money! - [ADMINISTRATOR]");
       let amount = args[0]

        let user = message.mentions.members.first() 
        if (!user) return message.channel.send("**Enter A Valid User!**")
        if (!amount) return message.channel.send("**Please Enter A Amount!**")
        if (isNaN(amount)) return message.channel.send(`**❌ Your Amount Is Not A Number!**`);
        if (amount > 10000) return message.channel.send("**Cannot Add That Much Amount!**")
        db.add(`money_${user.id}_${message.guild.id}`, amount)
        let bal = db.fetch(`money_${user.id}_${message.guild.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Added ${amount} coins\n\nNew Balance: ${bal}`);
        message.channel.send(moneyEmbed)

    
};

module.exports.help = {
  name : "addmoney",
  aliases :['add-money'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};