const Discord = require('discord.js');
const queues = require('./holdqueueadd.js')

function embedMsgQueue(airportQueue) {

    let embed = new Discord.MessageEmbed()

    airportQueue.forEach(function (item, index) {
        embed.addField(`Number ${index + 1} for landing:`, item);
        embed.setDescription("All the planes that are in a holding pattern.")
        embed.setColor("#FFF700")
        embed.setTimestamp(Date.now());
    });

    return embed;
}

module.exports.run = async (bot, postgres, message, args) => {

    if (message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);
    if (!args[0]) return message.channel.send("No airport specified!")

    if (args[0] === "JTPH") {
        if (queues.queueJTPH) {
            message.channel.send(embedMsgQueue(queues.queueJTPH)).catch(console.error);
        } else return message.channel.send("There is no holdqueue for JTPH!");
    }

    if (args[0] === "JSLL") {
        if (queues.queueJSLL) {
            message.channel.send(embedMsgQueue(queues.queueJSLL)).catch(console.error);
        } else return message.channel.send("There is no holdqueue for JSLL!");
    }

    if (args[0] === "JCO4") {
        if (queues.queueJCO4) {
            message.channel.send(embedMsgQueue(queues.queueJCO4)).catch(console.error);
        } else return message.channel.send("There is no holdqueue for JCO4!");
    }
}

module.exports.help = {
    "name": "holdqueue",
    "format": "holdqueue [AirportICAO]",
    "description": "Displays the Holdqueue of an airport",
    moderation: false,
    atc: false
}