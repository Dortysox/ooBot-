const fs = require('fs')


const Database = require("easy-json-database");
const db = new Database("C:/Users/Fatsah/Desktop/Wizzy Bot/Database/bdd.json", {
    snapshots: {
        enabled: true,
        interval: 24 * 60 * 60 * 1000,
        folder: './backups/'
    }
});

module.exports.run = async (client, message, args) => {

    function Savebdd() {
        fs.writeFile("C:/Users/Fatsah/Desktop/Wizzy Bot/Database/bdd.json", JSON.stringify(bdd, null, 4), (err) => {
            if (err) message.channel.send("Une erreur est survenue."+ err);
        });
      }

   
    
const arg = args.join(" ")
  
 const  welcomemsg = db.get(`welcomeChannel_${message.guild.id}`)
message.channel.send(welcomemsg + " est votre message de bienvenue de ce serveur");
    

};

module.exports.help = {
  name : "getwlcmmsg",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false
};