/* Import Modules */
const Discord = require('discord.js');

module.exports = { 
    name: "unmute",
    category: "mod",
    description: "Command to unmute a user.",
    aliases: ["um"],
    usage: "unmute <user>",
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MEMBERS')) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`You don't have the required permission to use this command`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))    
        }

        let toUnmute = message.mentions.members.first();
        if(!toUnmute) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`You must mention a member`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
        }

        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted")
        if(!toUnmute.roles.cache.has(muteRole.id)) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${toUnmute} is not muted`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
        }

        let reason = args.slice(1).join(" ") || "No reason provided"
        let logchannel = message.guild.channels.cache.find((x) => (x.name === "staff-logs" || x.name === "audit-logs" || x.name === "logs"))

        try {
            await toUnmute.roles.remove(muteRole.id)
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${toUnmute} has been unmuted`)
            .setColor("#ff919b")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
            logchannel.send(new Discord.MessageEmbed()
            .setTitle(`${message.mentions.users.first().username} was unmuted`)
            .setDescription(reason)
            .setColor("#ff919b")
            .setFooter(`Unmuted by ${message.author.username}`, message.author.displayAvatarURL()))
        } catch {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`There was an error`)
            .setColor("#fde69e"))
        }
    }
}

