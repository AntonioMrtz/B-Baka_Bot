const Discord = require('discord.js');
const fs = require('fs');

require('dotenv').config();

//const mySecret = process.env['TOKEN'];

const client = new Discord.Client({
    
    intents: [
        
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
        
    ]
    
    
});



client.on("ready", () => {
    
    client.user.setActivity('!help', { type: 'COMPETING' });
    console.log("B-Baka Bot started! :)");
    
})


client.on("messageCreate",msg => {
    
    //* FORMATO = https://euw.op.gg/champions/jhin/top/build
    
    
    if(msg.content=="!bloodtrail"){
        
        msg.reply({files: [{ attachment: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/bloodtrail.png" }] });
        
    }
    
    else if(msg.content.startsWith("!opgg")){
        
        
        let flagTwoWordsChamp=0;

        let command = msg.content.split(" ");
        
        let url = "https://euw.op.gg/champions/";


       
        let champion;
        let role;

        let champion_upperCaseFirst="";
        
        if(command.length==4){ // 2 word champs

            flagTwoWordsChamp=1;
            champion=command[1].toLocaleLowerCase()+command[2].toLocaleLowerCase();
            role=command[3].toLocaleLowerCase();

        }
        else{

            champion=command[1].toLocaleLowerCase();
            role=command[2].toLocaleLowerCase();
            
        }
        
        champion=champion.trim();
        role=role.trim();
        
        
        
        if (lol_champions.includes(champion) && lol_roles.includes(role)){  // check if the rol and champion exists
            
            if(role=="supp"){

                role="support";
            }
            if(role=="jg" || role=="jgl"){

                role="jungle";
            }

            url+=champion+"/"+role+"/"+"build";

            
            if(flagTwoWordsChamp==0){
                
                champion_upperCaseFirst= champion[0].toUpperCase() + champion.slice(1);
                console.log(champion_upperCaseFirst);
                //msg.reply({files: [{ attachment: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+champion_upperCaseFirst+"_0.jpg" }] });


            }
            else{

                champion_upperCaseFirst=command[1][0].toUpperCase() + command[1].slice(1)+command[2][0].toUpperCase()+command[2].slice(1);
                console.log(champion_upperCaseFirst);
                //msg.reply({files: [{ attachment: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+champion_upperCaseFirst+"_0.jpg" }] });
                
                
            }
            
            let runesEmbeded = new Discord.MessageEmbed()
            .setTitle("Runas "+champion_upperCaseFirst+" en "+role)
            .setColor('FUCHSIA')
            .setThumbnail("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+champion_upperCaseFirst+"_0.jpg")
            .addField("\u200B",url )
            .addField("\u200B","\u200B" )
            .setFooter({ text: 'Op.GG', iconURL: 'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png' })
            .setTimestamp()
            .setURL(url)
    
    
            msg.reply({ embeds : [runesEmbeded] });
        }
        else{

            msg.reply("```Champion or Role not found```")
        }
        
    }
    else if(msg.content=="!help"){

        let help_commands = " :!opgg [champion_name] [role] 👺\n!bloodtrail 👍\n!rampas 🥵\n!bye 👋\n ```"; 
        
        
        let helpEmbeded = new Discord.MessageEmbed()
            .setTitle(" *COMMANDS *")
            .setThumbnail("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/help_logo.png")
            .setColor('GREEN')
            .addField("\u200B","\u200B")
            .addField("!opgg [champion_name] [role] ","\u200B")
            .addField("!bloodtrail ","\u200B")
            .addField("!rampas ","\u200B")
            .addField("!bye ","\u200B");
    
    
            msg.reply({ embeds : [helpEmbeded] });
        
    }

    else if(msg.content=="!p"){ //!PRUEBAS

        
        //TODO gif hotaru subir git y usar

        

    }
    else if(msg.content=="!rampas"){

        msg.reply("https://www.youtube.com/watch?v=qbEfxaIxzQg");
    }

    else if(msg.content=="!bye"){ 

        msg.reply("Bye Bye 👋👋")
        console.log("B-Baka Bot stopped! :(");
        process.exit();
       

    }
    
    
    
})




var lol_champions = fs.readFileSync("./lol_champs.txt").toString('utf-8').toLowerCase();
var lol_roles = fs.readFileSync("./lol_roles.txt").toString('utf-8').toLowerCase();
client.login(process.env['TOKEN'])

