const Discord = require('discord.js');
const index = require("../index.js");
const prefix = require("../botSettings.json").prefix

module.exports.run = async (bot, postgres, message, args) => {

    function embedMsgATC(){
        let embed = new Discord.RichEmbed()
            index.commands.forEach(el => {
                if(el.help.moderation === true) { return; }
                else if(el.help.ownerOnly === true) { return; }
                else if(el.help.name === "atchelp") { return; }
                else if(el.help.atc === true){
                    embed.addField(prefix + el.help.name, el.help.usage)
                }
            });
        
        return embed
    }  

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    message.channel.send(embedMsgATC());
}

module.exports.help = {
    name: "atchelp",
    usage: "Displays the ATC help section.",
    moderation: false,
    atc: true
}