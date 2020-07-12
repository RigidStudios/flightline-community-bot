const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, postgres, message, args) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);

    if (!message.member.roles.cache.find(r => r.name === "Main ATC Administrator" || r.name === "Stats Analyst")) return message.channel.send("Only ATC Administrators are allowed to execute this command.");

    function statEmbed(username, discord_id, tHours, latestLogout) {
        
        let embed = new Discord.MessageEmbed()
            .setAuthor("ATC Statistics", `${message.guild.iconURL()}`)
            .setThumbnail(`${message.guild.iconURL()}`)
            .setColor("#00FFAA")
            .addField("Username:", username)
            .addField("Account Owner ID:", discord_id)
            .addField("Total Service Time:", tHours)
            .addField("Latest Logout on:", latestLogout)
            .setFooter("Note that if Total Service Time says 0ms and Latest Logout says: Thu Jan 01... this means that the account has not accumulated any hours nor has is logged on.")

        return embed;
    }

    let usernameID = args[0]

    postgres.query(`SELECT * FROM login_details WHERE discord_id = '${usernameID}';`, (err, res) => {
        if (err) {
            message.channel.send("Database error. Please contact Supra for more information.");
            console.error(err);
        }
        
        if (res.rows.length === 0) return message.channel.send("No user found with the ID of: " + usernameID)

        postgres.query(`SELECT SUM(durationunix) FROM login_logs WHERE username = '${res.rows[0].username}' UNION (SELECT MAX(time_end_unix) FROM login_logs WHERE username = '${res.rows[0].username}');`, (e, r) => {

            if (e) {
                message.channel.send("Database error. Please contact Supra for more information.");
                console.error(e);
            }

            postgres.query(`SELECT * FROM login_logs WHERE username = '${res.rows[0].username}'`, (er, re) => {

                if (er) {
                    message.channel.send("Database error. Please contact Supra for more information.");
                    console.error(er);
                }

                let tHours = r.rows[0].sum;
                let lLogout;

                if(tHours === null) {
                    tHours = 0;
                    lLogout = 0;
                } else {
                    lLogout = r.rows[1].sum
                }

                let info = {
                    username: res.rows[0].username,
                    ownerID: res.rows[0].discord_id,
                    totalHours: ms(parseInt(tHours), { long: true }),
                    lastLogout: new Date(parseInt(lLogout))
                }

                message.channel.send(statEmbed(info.username, info.ownerID, info.totalHours, info.lastLogout))
            })


        })

    });

}

module.exports.help = {
    name: "atcstatsid",
    format: "atcstatsid [userID]",
    description: "Fetches stats about a certain ATC Member using their discord ID.",
    moderation: true,
    atc: true
}
