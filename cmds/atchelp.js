const Discord = require('discord.js');
const index = require("../index.js");
const prefix = require("../botSettings.json").prefix

module.exports.run = async (bot, postgres, message, args) => {

    function embedMsgATC(){
        let embed = new Discord.RichEmbed()
        embed.addField("***Note:***", "Anything that has [something], takes a parameter.")
            index.commands.forEach(el => {
                if(el.help.moderation === true) { return; }
                else if(el.help.ownerOnly === true) { return; }
                else if(el.help.name === "atchelp") { return; }
                else if(el.help.atc === true){
                    embed.addField(prefix + el.help.name, el.help.description)
                }
            });
        
        return embed
    }  

    let role = message.member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
    
    if(!message.member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to view this help section.")
    
    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    message.channel.send(embedMsgATC());
}

module.exports.help = {
    name: "atchelp",
    description: "Displays the ATC help section.",
    moderation: false,
    atc: true
}
