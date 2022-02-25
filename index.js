/* Import Modules */
const { Client, Collection } = require('discord.js');
const client = new Client({disableEveryone: true}, { partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const Discord = require('discord.js')
const chalk = require('chalk')
const config = require('./config.json')

/* Client Collections */
client.commands = new Collection(); 
client.aliases = new Collection();
["handler"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

/* Ready Event */
client.on('ready', () => {
        console.log(chalk.grey("==========================================="))
        console.log(chalk.cyan(`[INIT] ${client.user.tag} started`)) 
        client.user.setActivity(`for commands | ${config.prefix}`, { type: "WATCHING"})
})

/* Message Event */
client.on('message', async message => {
    if(!message.guild) return;
    if(message.author.bot) return;

    if(!message.content.startsWith(config.prefix)) return;

    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args)
})

/* Login using token */
client.login(config.token)
