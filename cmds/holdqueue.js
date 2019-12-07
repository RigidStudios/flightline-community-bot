const Discord = require('discord.js');
const queues = require('./holdqueueadd.js')

function embedMsgQueue(airportQueue){
    
    if(airportQueue.length == 0)return "There is no planes in a holding pattern!"
    
    let embed = new Discord.RichEmbed()
    
    airportQueue.forEach(function(item, index) {
        embed.addField(`Number ${index + 1} for landing:`, item);
    
    embed.setDescription("All the planes that are in a holding pattern.")
    embed.setColor("#FFF700")
    embed.setTimestamp(Date.now());
    
    
    });
    return embed
}

module.exports.run = async (bot, postgres, message, args) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    if(!args[0]) return message.channel.send("No airport specified!")

    if(args[0] === "JTPH"){
        message.channel.send(embedMsgQueue(queues.queueJTPH));
    }

    if(args[0] === "JSLL"){
        message.channel.send(embedMsgQueue(queues.queueJSLL))
    }

    if(args[0] === "JCO4"){
        message.channel.send(embedMsgQueue(queues.queueJCO4));
    }
}

module.exports.help = {
    name: "holdqueue [AirportICAO]",
    usage: "Displays the Holdqueue of an airport",
    moderation: false,
    atc: false
}