const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require('parse-ms-js')
module.exports.run = async (client, message, args) => {

          let user = message.author;

        let timeout = 86400000;
        let amount = 200;

        let daily = await db.fetch(`daily_${user.id}_${message.guild.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You've collected your daily reward of ${amount} coins`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}_${message.guild.id}`, amount)
            db.set(`daily_${user.id}_${message.guild.id}`, Date.now())


        }
    
};

module.exports.help = {
  name : "daily",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};