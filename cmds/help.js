const Discord = require('discord.js')
const botSettings = require('../botSettings.json')
const prefix = botSettings.prefix
const fs = require("fs")
const index = require("../index.js");

module.exports.run = async (bot, postgres, message, args) => {
        
    function embedMsgHelp(){
        let embed = new Discord.RichEmbed()
        embed.addField("***Note:***", "Anything that has [something], takes a parameter.")
            index.commands.forEach(el => {
                if(el.help.moderation === true) { return; }
                else if(el.help.atc === true) { return; }
                else if(el.help.ownerOnly === true) { return; }
                else if(el.help.moderation === false){
                    embed.addField(prefix + el.help.format, el.help.description)
                }
            });
        
            return embed

    }    

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    message.channel.send(embedMsgHelp());

}

module.exports.help = {
    name: "help"
}
