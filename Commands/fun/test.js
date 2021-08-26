const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms-js");
module.exports.run = (client, message, args) => {

if (!args[0]) return message.channel.send("**Please Enter A User!**");
    let user = message.mentions.members.first() 
    let amount =  args[0] 

    message.channel.send(`added ${amount} to ${user}`)

};

module.exports.help = {
  name : "addir",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};