const botdash = require('botdash.pro')
module.exports.run = async (client, message, args, ) => {

  var dashboard = ""
const prefix = await dashboard.getVal(message.guild, "botprefix");
console.log(prefix);
  message.channel.send(prefix);
  
};

module.exports.help = {
  name : `cc1`,
  aliases :['repeat', 'rep'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : true, 
};