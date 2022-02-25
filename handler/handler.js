/* Import Modules */
const chalk = require('chalk')
const { readdirSync } = require("fs");

module.exports = (client) => {
    console.clear()
    console.log(chalk.grey("==========================================="))
    readdirSync("./commands/").map(dir => {
       const commands = readdirSync(`./commands/${dir}/`).map(cmd=>{
           let pull = require(`../commands/${dir}/${cmd}`)
           console.log(chalk.cyan(`[CLIENT] loaded ${pull.name}`))
           client.commands.set(pull.name,pull)
           if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.commands.set(alias, pull));
       })
    })
}