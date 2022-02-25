/* Import Modules */
const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    category: "util",
    description: "Command to display a user's avatar",
    aliases: ["pfp", "av"],
    usage: "avatar [@user]",
    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.member;

        await message.channel.send(new Discord.MessageEmbed()
        .setImage(user.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setColor("BLURPLE"))
    }
}