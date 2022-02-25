/* Import Modules */
const Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    category: "util",
    description: "Command to show information about a user",
    aliases: ["whois"],
    usage: "userinfo [@user]",
    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.member;
        
        let status;
        switch (user.presence.status) {
            case "online":
                status = "online";
                break;
            case "dnd":
                status = "dnd";
                break;
            case "idle":
                status = "idle";
                break;
            case "offline":
                status = "offline";
                break;
        }

        await message.channel.send(new Discord.MessageEmbed()
        .setThumbnail(user.user.displayAvatarURL())
        .addFields(
            {
                name: "Username",
                value: user.user.username,
                inline: true
            },
            {
                name: "Discriminator",
                value: `#${user.user.discriminator}`,
                inline: true
            },
            {
                name: "ID",
                value: user.user.id,
                inlien: true
            },
            {
                name: "Avatar URL",
                value: `[Click Here](${user.user.displayAvatarURL()})`
            },
            {
                name: "Creation Date",
                value: user.user.createdAt.toLocaleDateString("en-us"),
                inline: true,
            },
            {
                name: "Joined At",
                value: user.joinedAt.toLocaleDateString("en-us"),
                inline: true,
            },
            {
                name: "Roles",
                value: user.roles.cache.map(role => role.toString()).join(" ")
            })
            .setColor("BLURPLE"))
    }
}