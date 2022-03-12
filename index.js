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
    
    
    console.log("hola");
    
})


client.on("messageCreate",msg => {
    
    //* FORMATO = https://euw.op.gg/champions/jhin/top/build
    
    
    if(msg.content=="!bloodtrail"){
        
        
        msg.reply({files: [{ attachment: "bloodtrail.png" }] });
        
    }
    
    else if(msg.content.startsWith("!opgg")){
        
        
        let flagTwoWordsChamp=0;

        //TODO fotos del champ sacada de google?¿
        let command = msg.content.split(" ");
        
        let url = "https://euw.op.gg/champions/";


       
        let champion;
        let role;
        
        if(command.length==4){ // 2 word champs

            flagTwoWordsChamp=1;
            champion=command[1].toLocaleLowerCase()+command[2].toLocaleLowerCase();
            role=command[3].toLocaleLowerCase();

        }
        else{

            champion=command[1].toLocaleLowerCase();
            role=command[2].toLocaleLowerCase();
            
        }
        
        
        
        
        
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
                msg.reply({files: [{ attachment: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+champion_upperCaseFirst+"_0.jpg" }] });

            }
            else{

                champion_upperCaseFirst=command[1][0].toUpperCase() + command[1].slice(1)+command[2][0].toUpperCase()+command[2].slice(1);
                msg.reply({files: [{ attachment: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+champion_upperCaseFirst+"_0.jpg" }] });
            }
            msg.reply(url);
           
        }
        else{

            msg.reply("```Champion or Role not found```")
        }
        
        
        
    }
    else if(msg.content=="!help"){

        let help_commands = "```!opgg champion_name role\n!bloodtrail```"; 
        msg.reply(help_commands);
        
    }

    else if(msg.content=="!p"){ //!PRUEBAS


       

    }
    
    
    
})




var lol_champions = fs.readFileSync("./lol_champs.txt").toString('utf-8').toLowerCase();
var lol_roles = fs.readFileSync("./lol_roles.txt").toString('utf-8').toLowerCase();
client.login(process.env['TOKEN'])
