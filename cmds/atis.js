const Discord = require('discord.js');
const main = require('../index.js');

module.exports.run = async (bot, postgres, message, args) => {


    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")

    let AirportChosen = args[0];
    
    if (AirportChosen === "JTPH") {
        if(!main.atisJTPH) return message.channel.send("No ATIS available for JTPH!")
        message.channel.send(main.atisJTPH);
    }

    if (AirportChosen === "JSLL") {
        if(!main.atisJSLL) return message.channel.send("No ATIS available for JSLL!")
        message.channel.send(main.atisJSLL);
    }

    if (AirportChosen === "JCO4") {
        if(!main.atisJCO4) return message.channel.send("No ATIS available for JCO4!")
        message.channel.send(main.atisJCO4);
    }
}

module.exports.help = {
    name: "atis",
    format: "atis [AirportICAO]",
    description: "Displays the ATIS of an Airport. Takes in the Airport ICAO as a parameter.",
    moderation: false,
    atc: false
}
