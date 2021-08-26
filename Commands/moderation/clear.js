const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = (client, message, args) => {

   message.delete()
        if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.reply(` :x: **Vous n'avez pas la permission d'ituliser cette command**`).then(m => (m.delete({timeout: 10000})));
        let clearamount = args[0];
        if(isNaN(clearamount)) return message.reply(`Veuillez entrer un chifre valid .`).then(m => (m.delete({timeout: 10000})));
        if(clearamount >= 100) clearamount = 99;
        if(clearamount <= 0) return message.reply(`Veuillez choisir un chifre plus de **0** et moins de **100**`)
        message.channel.send(`⚠ Suppresion des Messages.. Veuillez patienter ! ⚠️`).then(msg => msg.delete({timeout: 2000}));
        setTimeout(async () => {
            await message.channel.bulkDelete(clearamount);
        }, 1000)
};

module.exports.help = {
  name : "clear",
  aliases :['purge', 'delete'],
  description: "permet de suprimmer le nombre de messages ",
  usage: '<amount>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};