const Discord = require('discord.js');
const fs = require('fs');
const { MongoClient } = require("mongodb");
const axios = require('axios');


const opgg = require('./modules/opgg/index.js')
const urban_dictionary = require('./modules/urban_dictionary/index.js')


 
require('dotenv').config();

const clientDB = new MongoClient(process.env['CLUSTER']);
const database = clientDB.db('B-BakaBot');


var lol_roles=require("./data/roles.json");
var lol_champions;
var lol_roles;




// cambiar parche 13.3.1 a otro parche en caso de que se añadan nuevos campeones
//var lol_champions=axios.get("http://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/champion.json");

async function getChampions() {
const data = await (axios.get("http://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/champion.json"));

    
    fs.writeFileSync("./data/lol_champions.json", JSON.stringify(data.data.data), function(err) {
        if (err) {
            console.log(err);
        }
    });

    lol_champions=require("./data/lol_champions.json");
    

}
const client = new Discord.Client({
    
    intents: [
        
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
        
    ]
    
    
});





//?--------------



client.on("ready", () => {
    
    client.user.setActivity('!help', { type: 'COMPETING' });
    console.log("B-Baka Bot started! :)");
   
    
})


client.on("messageCreate",msg => {
    
    //* FORMATO = https://euw.op.gg/champions/jhin/top/build
    
    
    if(msg.content=="!bloodtrail"){
        
        msg.reply({files: [{ attachment: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/bloodtrail.png" }] });
        
    }
    
    else if(msg.content.startsWith("!runes")){
        
    

        //getChampions().then( d => opgg.queryOpgg(msg,d,lol_roles) )

        //console.log(lol_champions)

        opgg.queryOpgg(msg,lol_champions,lol_roles);

    }
    else if(msg.content.startsWith("!opgg")){
        
        let command = msg.content.split(" ");
        let url_profile = "https://euw.op.gg/summoners/euw/";

        if(command.length==1){

            msg.reply("Invalid name");
        }

        for(let i=1;i<command.length;i++){

            url_profile+=command[i];
        }

       opgg.querySummonerName(msg,url_profile,command)





    }
    else if(msg.content=="!help"){
        
        let helpEmbeded = new Discord.MessageEmbed()
            .setTitle(" *COMMANDS *")
            .setThumbnail("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/help_logo.png")
            .setColor('GREEN')
            .addField("\u200B","\u200B")
            .addField("!opgg [Summoner Name] ","\u200B")
            .addField("!runes [champion_name] [role] ","\u200B")
            .addField("!definition [word or phrase] ","\u200B")
            .addField("!wordoftheday ","\u200B")
            .addField("!coinflip ","\u200B")
            .addField("!bloodtrail ","\u200B")
            .addField("!rampas ","\u200B")
            .addField("!bye ","\u200B")
            .addField("\u200B","\u200B")
            .setFooter({ text: 'B-Baka Bot by Ye4h', iconURL: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/baka_bot_profile_img.jpg" })
    
    
            msg.reply({ embeds : [helpEmbeded] });
        
    }
    else if(msg.content=="!coinflip"){

        

       let coinflip;

        if( Math.random() > 0.49){

            coinflip = new Discord.MessageEmbed()
                .setTitle("Coinflip -> CARA")
                .setColor('AQUA')
                .setImage("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ct_logo.png")
                .addField("\u200B","\u200B" )
        }

        else{

            coinflip = new Discord.MessageEmbed()
                .setTitle("Coinflip -> CRUZ")
                .setColor('RED')
                .setImage("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/t_logo.png")
                .addField("\u200B","\u200B" )


        }

        msg.reply({ embeds : [coinflip] });

    }
    //! { TEST ONLY }
    else if(msg.content=="!p"){ 

       
    



    }
    else if(msg.content.startsWith("!definition")){

    
        urban_dictionary.fetchResponse(msg)

    }
    else if(msg.content=="!wordoftheday"){

        axios.get("https://www.urbandictionary.com/")
        .then( (res) =>{

            let re_wordoftoday_title = new RegExp(/<title>.*<\/title>/);

            let result_re = re_wordoftoday_title.exec(res.data)[0]

            word = result_re.split(":")[1];
            word = word.trim();
            word = word.replace("</title>","");


            urban_dictionary.fetchResponse(msg,word);

        } )


    }

    else if(msg.content=="!bye"){ 

        msg.reply("Bye Bye 👋👋")
        console.log("B-Baka Bot stopped! :(");
        process.exit();
       

    }
    
    
    
})


function run(){
    
    client.login(process.env['TOKEN'])
    getChampions()





}

run()





