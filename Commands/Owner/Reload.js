const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");

const ms = require("parse-ms-js");
const token = process.env.TOKEN
module.exports.run = async (client, message, args) => {
if (!message.author.id === '747564232500969588') return message.channel.send(`;-;`) ;
         console.clear();
        client.destroy()
        client.login(token);
        console.log(`Le bot a été reload par ${message.author.tag}`)
      message.channel.send("✅ Reloaded !");
};

module.exports.help = {
  name : "reload",
  aliases :['relaunch'],
  description: "permet de relancer le bot",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : false 
};