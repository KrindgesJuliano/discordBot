
require('dotenv').config()

const { Client} = require('discord.js')

const client = new Client()
const PREFIX = "$"

client.on('ready', ()=> {
  console.log(`${client.user.tag} has logged in`)
})

client.on('message', async (message) => {
  if(message.author.bot) return;
  if(message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/)

    if (CMD_NAME === 'kick') {
      if(!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command')
      if(args.length === 0) return message.reply('please provide an ID');
      const member = message.guild.members.cache.get(args[0])
      if(member) {
        member.kick()
        .then((member) => message.channel.send(`${member} was kicked.`))
        .catch((err) => message.channel.send(`I do not have permissions`))
      }else{
        message.channel.send('that member was not found')
      }
    }else if (CMD_NAME === 'ban') {
      if(!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply('You do not have permissions to use that command')
      if(args.length === 0) return message.reply('please provide an ID');

      try {
        const user = await message.guild.members.ban(ars[0]);
        message.channel.send('user was banned successfully')
      }catch (err) {
        console.log(err);
        message.channel.send('An error occured. Either I do not have permissions or the user was not found')
      }
    }
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)