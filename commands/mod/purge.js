/* Import Modules */
const Discord = require('discord.js');

module.exports = {
    name: "purge",
    category: "Moderation",
    description: "Command to purge up to 100 messages either from a user or from current channel.",
    aliases: [" "],
    usage: "purge [amount] or [user]",
    run: async(client, message, args) => {
        let member = message.mentions.members.first();
        let messages = message.channel.messages.fetch();

        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`You don't have the required permission to use this command`)
            .setColor("#fde69e")
            .setFooter(message.author.username, message.author.displayAvatarURL()))    
            }

        if(member) {
            const userMessages = (await messages).filter((m) => m.author.id === member.id);
            await message.channel.bulkDelete(userMessages);

            await message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Deleted 100 messages sent by ${member}`)
            .setColor("BLURPLE"))
        } else {
            if(!args[0]) {
                return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`You must mention a member or provide an amount of messages to clear`)
                .setColor("#fde69e"))
            }

            if(isNaN(args[0])) {
                return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`The given argument is not a number`)
                .setColor("#fde69e"))
            }

            if(args[0] > 100 || args[0] < 1) {
                return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`Number must be between 1 and 100`)
                .setColor("#fde69e"))
            }

            try {
                message.delete()
                let toDelete = args[0];
                await message.channel.bulkDelete(toDelete, true);
                await message.channel.send(new Discord.MessageEmbed()
                .setDescription(`Deleted \`${toDelete}\` messages`)
                .setColor("BLURPLE"))
            } catch {
                return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`There was an error`)
                .setColor("#fde69e"))
            }
        }
    }
}