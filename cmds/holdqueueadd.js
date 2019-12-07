const Discord = require('discord.js');

let queueJTPH = [];
let queueJSLL = [];
let queueJCO4 = [];

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

        let guildID = "593830690777333770";
        let guild = bot.guilds.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to add to Holding Pattern Queue!");

        let messageArray = message.content.split(",");
        let sArgs = messageArray.slice(0);
        let firArg = sArgs[0].split(" ");
        let firstArg = firArg[1]
        
        if(!firstArg) return message.channel.send("No airport specified!")
        if(!sArgs[1]) return message.channel.send("No aircraft specified!")        

        let Aircraft = sArgs[1];
        
        if(firstArg === "JTPH"){
            queueJTPH.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJTPH));
            module.exports.queueJTPH = queueJTPH;
        }

        if(firstArg === "JSLL"){
            queueJSLL.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJSLL));
            module.exports.queueJSLL = queueJSLL;
        }

        if(firstArg === "JCO4"){
            queueJCO4.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJCO4));
            module.exports.queueJCO4 = queueJCO4;
        }

}

module.exports.help = {
    name: "holdqueueadd [AirportICAO] [Callsign]",
    description: "Adds an aircraft to the holding queue of an airport.",
    moderation: false,
    atc: true
}
