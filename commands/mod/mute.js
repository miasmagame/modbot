/* Import Modules */
const Discord = require('discord.js');

module.exports = { 
    name: "mute",
    category: "mod",
    description: "Command to mute a user.",
    aliases: ["m"],
    usage: "mute <user>",
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MEMBERS')) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`You don't have the required permission to use this command`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))    
        }

        let toMute = message.mentions.members.first();
        if(!toMute) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription("You must mention a member")
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))  
        }

        if((message.member.roles.highest.position <= toMute.roles.highest.position) && message.guild.ownerID != message.author.id) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`You can't mute this member because their highest role is higher or equal to your highest role`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
        }

        if(message.guild.me.roles.highest.position <= toMute.roles.highest.position) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`I can't mute this member because their highest role is higher or equal to my highest role`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
        }

        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted")
        if(!muteRole) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription("There is no \`Muted\` role")
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))  
        }

        if(toMute.roles.cache.has(muteRole)) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${toMute} is already muted`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))  
        }
        
        let reason = args.slice(1).join(" ") || "No reason provided"
        let logchannel = message.guild.channels.cache.find((x) => (x.name === "staff-logs" || x.name === "audit-logs" || x.name === "logs"))

        try {
            await toMute.roles.add(muteRole.id)
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${toMute} has been muted`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))  
            logchannel.send(new Discord.MessageEmbed()
            .setTitle(`${message.mentions.users.first().username} was muted`)
            .setDescription(reason)
            .setColor("#ff919b")
            .setFooter(`Muted by ${message.author.username}`, message.author.displayAvatarURL()))
        } catch {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`There was an error`)
            .setColor("#fde69e"))
        }
    }
}