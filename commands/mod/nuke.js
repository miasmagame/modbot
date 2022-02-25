/* Import Modules */
const Discord = require('discord.js')

module.exports = {
    name: "nuke",
    description: "Command to nuke a channel.",
    category: "mod",
    aliases: ["clear"],
    run: async(client, message, args) => {
        if(message.author.id !== "790416232762966038") {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription("Only <@790416232762966038> can use this command")
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
        }
        
        let toClear = message.channel;
        let position = toClear.position
        let logchannel = message.guild.channels.cache.find((x) => (x.name === "staff-logs" || x.name === "audit-logs" || x.name === "logs"))

        try {
            newChannel = await toClear.clone()
            newChannel.setPosition(position)
            toClear.delete()
            newChannel.send(new Discord.MessageEmbed()
            .setDescription(`${newChannel} was cleared`)
            .setColor("BLURPLE")
            .setFooter(message.author.username, message.author.displayAvatarURL()))
            logchannel.send(new Discord.MessageEmbed()
            .setDescription(`${newChannel} was nuked`)
            .setColor("BLURPLE")
            .setFooter(`Nuked by ${message.author.username}`, message.author.displayAvatarURL()))
        } catch {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`There was an error`)
            .setColor("#fde69e"))
        }
    }
}