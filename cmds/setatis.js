const Discord = require('discord.js');
const botSettings = require('../botSettings.json');
const prefix = botSettings.prefix;

function embedMsgATIS(AirportReq, Information, Time, ActRun, Wind, Cloud, Visibility, Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq){
    return new Discord.RichEmbed()
    .setTitle(`ATIS for ${AirportReq}`)
    .addField("Information for Airport:", `${AirportReq}`)
    .addField("Information:", `${Information}`)
    .addField("Time:", `${Time}`)
    .addField("Active Runways:", `${ActRun}`)
    .addField("Wind:", `${Wind}`)
    .addField("Cloud:", `${Cloud}`)
    .addField("Visibility:", `${Visibility}`)
    .addField("Remarks", `${Remarks}`)
    .addField("Delivery Frequency:", `${DeliveryFreq}`)
    .addField("Ground Frequency:", `${GroundFreq}`)
    .addField("Tower Frequency:", `${TowerFreq}`)
    .addField("Director Frequency:", `${DirectorFreq}`)
    .addField("Center Frequency:", `${CenterFreq}`)
    .setFooter("ATIS is constantly updated, beware of sudden weather changes!")
    .setColor("#00BFFF");
}

function embedMsgCommandHintSetATIS(){
    return new Discord.RichEmbed()
    .setDescription(`Usage for ${prefix}setatis:`)
    .addField("/setatis Airport,Information,ActiveRunways,Wind,Cloud,Visibility,Remarks", "Make sure that there is NO SPACES BETWEEN LETTER/NUMBERS AND COMMAS(,). The only Spaces that can be used ARE IN BETWEEN WORDS AND SEPERATING /setatis FROM THE AIRPORT.")
    .addField("If there is any errors, please contact JusSupra#0962.","--------------------------------------------")
    .addField("Reason of error:", "Insufficent information for the ATIS!")
    .setTimestamp(Date.now())
    .setColor("#FF0000");
}

module.exports.run = async (bot, postgres, message, args, queueJTPH, queueJSLL, queueJCO4) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")

        let guildID = "593830690777333770";
        let guild = bot.guilds.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to set ATIS'es");

            let messageArray = message.content.split(",");
            let sArgs = messageArray.slice(0);
            let firArg = sArgs[0].split(" ");
            let firstArg = firArg[1]

            let TimeIn = new Date().toISOString();
            let TimeInProgress = TimeIn.split("T")
            let TIP = TimeInProgress.splice(1, 1)
            let FinalZulu = TIP.toString().split(".")
            let Fzulu = FinalZulu[0]
            
            let AirportReqIn = firstArg;
            let InformationIn = sArgs[1];
            let ActRunIn = sArgs[2];
            let WindIn = sArgs[3];
            let CloudIn = sArgs[4];
            let VisibilityIn = sArgs[5];
            let RemarksIn = sArgs[6];
            
            if(sArgs.length < 7) return message.channel.send(embedMsgCommandHintSetATIS());

            definedATISvarJTPH = {
                AirportReq: AirportReqIn,
                Information: InformationIn,
                Time: `${Fzulu}Z`,
                ActRun: ActRunIn,
                Wind: WindIn,
                Cloud: CloudIn,
                Visibility: VisibilityIn,
                Remarks: RemarksIn,
            }            

            module.exports.airportSelected = AirportReqIn

            if(AirportReqIn === "JTPH"){

                let DeliveryFreq = "118.400MHz";
                let GroundFreq = "120.750MHz";
                let TowerFreq = "124.225MHz";
                let DirectorFreq = "126.825MHz";
                let CenterFreq = "132.600MHz";

                let finishedATISJTPH =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);  
                message.channel.send(finishedATISJTPH);
                module.exports.atisJTPH = finishedATISJTPH
                module.exports.atisJTPHRawObj = definedATISvarJTPH
            }
           
            else if(AirportReqIn === "JSLL"){

                let DeliveryFreq = "122.225MHz";
                let GroundFreq = "119.600MHz";
                let TowerFreq = "123.775MHz";
                let DirectorFreq = "130.500MHz";
                let CenterFreq = "131.775MHz";

                let finishedATISJSLL =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
                message.channel.send(finishedATISJSLL);
                module.exports.atisJSLL = finishedATISJSLL
                module.exports.atisJSLLRawObj = definedATISvarJTPH
            }

            else if(AirportReqIn === "JCO4"){

                let DeliveryFreq = "None";
                let GroundFreq = "None";
                let TowerFreq = "124.225MHz (Controlled by JTPH Tower!)";
                let DirectorFreq = "None";
                let CenterFreq = "None";

                let finishedATISJCO4 =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
                message.channel.send(finishedATISJCO4);
                module.exports.atisJCO4 = finishedATISJCO4
                module.exports.atisJCO4RawObj = definedATISvarJTPH
            }
}

module.exports.help = {
    name: "setatis",
    description: "Sets the ATIS at the specified airport with the parameters. To see the parameters, just type in" + prefix +"setatis and check the usage section.",
    moderation: false,
    atc: true
}
