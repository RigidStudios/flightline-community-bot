const Discord = require('discord.js');

module.exports.run = async (bot, postgres, message, args) => {

    if(!message.member.roles.some(r => ['ATC Supervisors', 'Moderation Staff'].includes(r.name))) return message.channel.send("You do not have permission to give the starter roles!")

    let person = message.guild.members.get(message.mentions.users.first().id);

    let action = person.addRoles(['594441271871799296', '593830876035416164']);
    await action

    message.channel.send(`Successfully added starter roles to ${person}!`)

}

module.exports.help = {
    name: "roles",
    description: "Gives the starter roles for all members.",
    moderation: true,
    atc: false
}
