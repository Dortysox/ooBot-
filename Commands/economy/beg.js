const { MessageEmbed }= require("discord.js");
const botdash = require('botdash.pro');
var dashboard = ""
dashboard = new botdash.APIclient("f236ce40-4db5-40c3-84f7-f3a646828d1f");
const db = require("quick.db");
const ms = require("parse-ms-js");
module.exports.run = async (client, message, args) => {
  
 const time = await dashboard.getVal(message.guild.id, "beg");
 if(time === '5m') time = 300000;
 if(time === '10m') time = 600000;
 if(time === '15') time = 900000;
 if(time === '30') time = 1800000;
 if(time === '1h') time = 3600000;
 if(time === '5h') time = 18000000;
 console.log(time)

  let user = message.author;

        let timeout = 120000;
        let amount = 20;

        let beg = await db.fetch(`beg_${user.id}_${message.guild.id}`);

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You've begged and received ${amount} coins`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}_${message.guild.id}`, amount)
            db.add(`begs_${user.id}_${message.guild.id}`, 1)
            db.set(`beg_${user.id}_${message.guild.id}`, Date.now())


        }
    
};

module.exports.help = {
  name : "beg",
  aliases :['repeat', 'rep'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};