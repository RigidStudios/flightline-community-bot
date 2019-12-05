const Discord = require('discord.js');
const botSettings = require('../botSettings.json')
const prefix = botSettings.prefix

function loginHelp(){
    return new Discord.RichEmbed()
    .setTitle(`${prefix}login command`)
    .addField("Note:", "Only available for ATC's!")
    .addField("Format:", `${prefix}login username Airport Position`)
    .addField("Parameters:", "-------------------------------------------------------------------------------------------")
    .addField("Username:", "The username you were provided by Supra or Pilot. If you don't have one, contact them!")
    .addField("Airport:", "The ICAO code of the airport you served / are going to serve.")
    .addField("Position:", "The position you are going to serve. Usually are: CLR, GND, TWR, DIR, CTR")
    .setColor("#FFFF66")
}

module.exports.run = async (bot, postgres, message, args) => {

    let member = message.guild.member(message.author);
        let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!member.roles.has(role.id)) return message.channel.send("You do not have permission to execute this command!");

        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
        message.channel.send(loginHelp());
}

module.exports.help = {
    name: "loginhelp"
}