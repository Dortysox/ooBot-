

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