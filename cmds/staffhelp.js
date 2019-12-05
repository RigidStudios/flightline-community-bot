const Discord = require('discord.js')
const botSettings = require('../botSettings.json')
const prefix = botSettings.prefix

function embedStaffHelp(){
    return new Discord.RichEmbed()
    .setTitle("These are the available commands for the bot (STAFF ONLY!)")
    .addField("Commands:", "-------------------------------------------------------------------------------------------")
    .addField(`${prefix}login {username} {Airport} {Position}`, "Logs you in and records the time you start your shift. Do /loginhelp for more info! (FOR ATC's ONLY!)")
    .setColor("#FFFF66")
}

module.exports.run = async (bot, postgres, message, args) => {

    let member = message.guild.member(message.author);
    let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");

    if(!member.roles.has(role.id)) return message.channel.send("You do not have permission to execute this command!");

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    message.channel.send(embedStaffHelp());
}

module.exports.help = {
    name: "staffhelp"
}
