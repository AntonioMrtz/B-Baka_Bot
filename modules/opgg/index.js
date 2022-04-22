
const Discord = require('discord.js');

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
    }

}