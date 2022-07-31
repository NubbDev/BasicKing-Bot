import { Intents, Client}from 'discord.js';
import WOKCommands from 'wokcommands';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
})

client.on('ready', () => {
    client.user?.setPresence({
        status: 'online',
        activities: [{
            name: "BasicKing on youtube",
            type: 'WATCHING',
            url: 'https://youtube.com/Basickingyt',
        }]
    })
    const dbOptions = {
        keepAlive: true,
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        dbOptions,
        mongoUri: process.env.MONGO_URI,
        
        testServers: ['986976198108254218'],
        botOwners: ['401844809385508903']
    })
    .setDefaultPrefix("?")
    .setDisplayName("Butler's")

    console.log(`Bot is Ready`)

})

client.login(process.env.TOKEN)