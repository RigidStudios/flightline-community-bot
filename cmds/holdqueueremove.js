const Discord = require('discord.js');
const queues = require('./holdqueueadd.js');

module.exports.run = async (bot, postgres, message, args) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
        if(!args[0]) return message.channel.send("No airport specified!")

        let guildID = "593830690777333770";
        let guild = bot.guilds.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to remove from the Holding Pattern Queue.");
        
        if(args[0] === "JTPH"){
            queues.queueJTPH.shift();
            if(queues.queueJTPH.length === 0) return message.channel.send("No planes are in a holding pattern at JTPH!");
            message.channel.send(embedMsgQueue(queues.queueJTPH));           
        }

        if(args[0] === "JSLL"){
            queues.queueJSLL.shift();
            if(queues.queueJSLL.length === 0) return message.channel.send("No planes are in a holding pattern at JSLL!");
            message.channel.send(embedMsgQueue(queues.queueJSLL));           
        }

        if(args[0] === "JCO4"){
            queues.queueJTPH.shift();
            if(queues.queueJCO4.length === 0) return message.channel.send("No planes are in a holding pattern at JCO4!");
            message.channel.send(embedMsgQueue(queues.queueJCO4));           
        }

}

module.exports.help = {
    name: "holdqueueremove [AirportICAO]",
    description: "Removes the aircraft that just landed from the queue of an airport.",
    moderation: false,
    atc: true
}
