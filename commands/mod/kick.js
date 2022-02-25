/* Import Modules */
const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "Command to kick people.",
    category: "kick",
    aliases: ["k"], 
    usage: "kick <@user> [reason]",
    run: async(client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`You don't have the required permission to use this command`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))    
        }

        let toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!toKick) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`I can't find this member`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
        }
        
        if(toKick.id === message.author.id) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription("You cannot kick yourself")
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL())) 
        }

        if((message.member.roles.highest.position <= toKick.roles.highest.position) && message.guild.ownerID != message.author.id) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`You can't kick this member because their highest role is higher or equal to your highest role`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
        }

        if(message.guild.me.roles.highest.position <= toKick.roles.highest.position) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`I can't kick this member because their highest role is higher or equal to my highest role`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
        }

        let reason = args.slice(1).join(" ") || "No reason provided"
        let logchannel = message.guild.channels.cache.find((x) => (x.name === "staff-logs" || x.name === "audit-logs" || x.name === "logs"))

        try {
            await toKick.kick()
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${toKick} has been kicked`)
            .setColor("#ff919b")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
            logchannel.send(new Discord.MessageEmbed()
            .setTitle(`${message.mentions.users.first().username} was kicked`)
            .setDescription(reason)
            .setColor("#ff919b")
            .setFooter(`Kicked by ${message.author.username}`, message.author.displayAvatarURL()))
        } catch {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`There was an error`)
            .setColor("#fde69e"))
        }
    }
}