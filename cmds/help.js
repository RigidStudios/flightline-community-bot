const Discord = require('discord.js')
const botSettings = require('../botSettings.json')
const prefix = botSettings.prefix

function embedMsgHelp(){
    return new Discord.RichEmbed()
    .setTimestamp(Date.now())
    .setTitle("These are the available commands for this bot.")
    .addField("Commands:", "-------------------------------------------------------------------------------------------")
    .addField(`${prefix}ICAOS`, "Displays all the ICAOs for all the airports in Flightline.")
    .addField(`${prefix}charts`, "Displays a link of the maps for all the airports. (Only in Flightline!)")
    .addField(`${prefix}setatis {AirportICAO,Information,Active Runways,Wind,Cloud,Visibility,Remarks(Optional: If None, say "None".)}`, "Set an ATIS for a chosen Airports. ONLY FOR ATC USE!")
    .addField(`${prefix}atis {AirportICAO}`, "Displays the ATIS for the chosen airport.")
    .addField(`${prefix}website`, "Shows you the link to our website :D")
    .addField(`${prefix}holdqueue`, "Displays the aircraft that are waiting in a holding pattern. (ONLY AVAILABLE DURING ATC USE!")
    .addField(`${prefix}holdqueueadd ,{Aircraft Callsign}`, "Adds the Aircraft to the back of the queue. (ATC USE ONLY)")
    .addField(`${prefix}holdqueueremove`, "Removes the first aircraft from the queue.")
    .addField(`${prefix}wind {Airport} {Wind to change to}`, "Changes the wind in the ATIS. Pilots are able to contribute here too!")
    .setFooter("These commands are subject to change should any occur.")
    .setColor("#FFFF66");
}

module.exports.run = async (bot, postgres, message, args) => {
        
    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    message.channel.send(embedMsgHelp());

}

module.exports.help = {
    name: "help"
}
