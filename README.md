# ooBot-
A powerfull discord bot 

```js
const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms-js");
module.exports.run = (client, message, args) => {

  message.channel.send(args.join(" "));
  message.delete()
};

module.exports.help = {
  name : "say",
  aliases :['repeat', 'rep'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};

```

