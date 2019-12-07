const Discord = require('discord.js');
const setAtis = require('./setatis.js');

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

module.exports.run = async (bot, postgres, message, args) => {

    // message.channel.send("This command cannot be used at the moment. Contact JusSupra#6969 for more information!")
    
    let Airport = args[0];
    let w = args.slice(0).join(" ");
    let wind = w.slice(5);

    if(Airport === "JTPH"){

        let DeliveryFreq = "118.400MHz";
        let GroundFreq = "120.750MHz";
        let TowerFreq = "124.225MHz";
        let DirectorFreq = "126.825MHz";
        let CenterFreq = "132.600MHz";
        
        let definedATISvarJTPH = setAtis.atisJTPHRawObj
        if(!wind) return message.channel.send("No wind provided!")
        definedATISvarJTPH.Wind = wind
        let finishedATISJTPH =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
        message.channel.send(finishedATISJTPH);
        module.exports.atisJTPHRawObj = definedATISvarJTPH
        module.exports.atisJTPH = finishedATISJTPH
    }

    if(Airport === "JSLL"){
       
        let DeliveryFreq = "122.225MHz";
        let GroundFreq = "119.600MHz";
        let TowerFreq = "123.775MHz";
        let DirectorFreq = "130.500MHz";
        let CenterFreq = "131.775MHz";

        let definedATISvarJTPH = setAtis.atisJSLLRawObj
        definedATISvarJTPH.Wind = wind
        let finishedATISJSLL =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
        message.channel.send(finishedATISJSLL);
        module.exports.atisJSLLRawObj = definedATISvarJTPH
        module.exports.atisJSLL = finishedATISJSLL
    }

    if(Airport === "JCO4"){

        let DeliveryFreq = "None";
        let GroundFreq = "None";
        let TowerFreq = "124.225MHz (Controlled by JTPH Tower!)";
        let DirectorFreq = "None";
        let CenterFreq = "None";

        let definedATISvarJTPH = setAtis.atisJCO4RawObj
        definedATISvarJTPH.Wind = wind
        let finishedATISJCO4 =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
        message.channel.send(finishedATISJCO4);
        module.exports.atisJCO4RawObj = definedATISvarJTPH
        module.exports.atisJCO4 = finishedATISJCO4
    }

}

module.exports.help = {
    name: "wind [AirportICAO] [XXX @ XX]",
    description: "Updates the wind for the ATIS at the specified airport. This command can be used by anybody!",
    moderation: false,
    atc: false
}

