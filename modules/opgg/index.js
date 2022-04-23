
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

    queryOpgg: function (msg,lol_champions,lol_roles) {

        let flagTwoWordsChamp = 0;
        let voidChamp = 0;


        let command = msg.content.split(" ");

        let url = "https://euw.op.gg/champions/";

        
        let champion;
        let role;
        
        let champion_upperCaseFirst = "";
        
        if(command.length==2){
            
            msg.reply("```Champion or Role not found```");
            return;
        }

        else if (command.length == 4) { // 2 word champs

            flagTwoWordsChamp = 1;
            champion = command[1].toLocaleLowerCase() + command[2].toLocaleLowerCase();
            role = command[3].toLocaleLowerCase();

        }
        else if (command[1].search("'") != -1) { // has '

            voidChamp = 1;
            champion = command[1].toLocaleLowerCase();
            role = command[2].toLocaleLowerCase();

        }
        else { // single word
            champion = command[1].toLocaleLowerCase();
            role = command[2].toLocaleLowerCase();

        }

        champion = champion.trim();
        role = role.trim();



        if (lol_champions.includes(champion) && lol_roles.includes(role)) {  // check if the rol and champion exists

            if (role == "supp") {

                role = "support";
            }
            if (role == "jg" || role == "jgl") {

                role = "jungle";
            }

            if (champion.search("'") != -1) {
                champion = champion.replace("'", "");
            }

            url += champion + "/" + role + "/" + "build";


            if (voidChamp == 1) {

                champion_upperCaseFirst = champion[0].toUpperCase() + champion.slice(1);
                champion_upperCaseFirst = champion_upperCaseFirst.replace("'", "");
            }
            else if (flagTwoWordsChamp == 0) {

                champion_upperCaseFirst = champion[0].toUpperCase() + champion.slice(1);



            }
            else {

                champion_upperCaseFirst = command[1][0].toUpperCase() + command[1].slice(1) + command[2][0].toUpperCase() + command[2].slice(1);


            }

            //console.log("Runas " + champion_upperCaseFirst + " en " + role);
            
            let runesEmbeded = new Discord.MessageEmbed()
                .setTitle("Runas " + champion_upperCaseFirst + " en " + role)
                .setColor('FUCHSIA')
                .setThumbnail("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champion_upperCaseFirst + "_0.jpg")
                .addField("\u200B", url)
                .addField("\u200B", "\u200B")
                .setFooter({ text: 'Op.GG', iconURL: 'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png' })
                .setTimestamp()
                .setURL(url)


            msg.reply({ embeds: [runesEmbeded] });
        }
        else {

            msg.reply("```Champion or Role not found```")
        }
    },

    querySummonerName: function(msg,url_profile,command){


         // </div><img src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon4884.jpg?image=q_auto&amp;image=q_auto,f_png,w_auto&amp;v=1650634188962" alt="profile image"

         axios.get(url_profile)
         .then( (res)=>{

             
            let profile_img;

            let re_profile_image = new RegExp(/<\/div><img src=.*alt="profile image/); //TODO devolver



            let result_re=re_profile_image.exec(res.data);
     
            if(result_re==null){


                let profileEmbeded = new Discord.MessageEmbed()
                    .setTitle("*Summoner not Found*")
                    .setThumbnail( 'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png')
                    .addField("\u200B", "\u200B")
                    .setColor('DARK_RED')
                    .setFooter({ text: 'Op.GG', iconURL: 'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png' })
                    .setTimestamp()
     
     
                msg.reply({ embeds: [profileEmbeded] });
                return;
            }
            result_re=result_re[0];
            profile_img=result_re.split("alt")[0];
                             
            let re_profile_image_link = new RegExp(/".*"/);
            profile_img = re_profile_image_link.exec(profile_img)[0];
            profile_img=profile_img.replaceAll("\"","");
             
             
            let profileEmbeded = new Discord.MessageEmbed()
                .setTitle("Perfil de "+command[1])
                .setColor('DARK_AQUA')
                .setThumbnail(profile_img)
                .setFooter({ text: 'Op.GG', iconURL: 'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png' })
                .setTimestamp()
                .setURL(url_profile)
     
     
         msg.reply({ embeds: [profileEmbeded] });

         })
    }

}