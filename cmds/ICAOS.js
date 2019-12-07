const Discord = require('discord.js');

function embedMsgICAO(){
    return new Discord.RichEmbed()
        .setTimestamp(Date.now())
        .setDescription("All Airports in ICAOs in Flightline!")
        .addField("Airports:", "-------------------------------------------------")
        .addField("JTPH", "Tophon Bridge Intl.")
        .addField("JSLL", "Wellingsaul Square Intl.")
        .addField("JCO4", "Connerview Airfield")
        .setColor("#00FF00");
}

module.exports.run = async (bot, postgres, message, args) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    if(args[0] === "JTPH" || "JSLL" || "JCO4") return message.channel.send(embedMsgICAO());
    message.channel.send(embedMsgICAO());

}

module.exports.help = {
    name: "ICAOS",
    usage: "Displays all of the ICAOS of all the aiports in the game.",
    moderation: false,
    atc: false
}