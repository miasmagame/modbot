/* Import Modules */
const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    category: "util",
    description: "Command to show information for the guild",
    aliases: [" "],
    usage: "serverinfo",
    run: async(client, message, args) => {
        await message.channel.send(new Discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL() || message.author.displayAvatarURL())
        .addFields(
            {
                name: "Total Members",
                value: message.guild.memberCount,
                inline: true
            },
            {
                name: "Members",
                value: message.guild.members.cache.filter(member => !member.user.bot).size,
                inline: true
            },
            {
                name: "Bots",
                value: message.guild.members.cache.filter(member => member.user.bot).size,
                inline: true
            },
            {
                name: "Total Channels",
                value: message.guild.channels.cache.size,
                inline: true
            },
            {
                name: "Text Channels",
                value: message.guild.channels.cache.filter(channel => channel.type === "text").size,
                inline: true 
            },
            {
                name: "Voice Channels",
                value: message.guild.channels.cache.filter(channel => channel.type === "voice").size,
                inline: true
            },
            {
                name: "Created At",
                value: message.guild.createdAt.toLocaleString(),
                inline: true
            },
            {
                name: "Location",
                value: message.guild.region,
                inline: true
            })
            .setColor("BLURPLE")
            .setFooter(`${message.guild.name} | ${message.guild.owner.user.tag} | ${message.guild.id}`, message.guild.iconURL()))
    }
}