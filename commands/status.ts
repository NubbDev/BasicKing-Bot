import { ClientPresence } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'configuration',
    description: 'Sets the bot Status',
    
    minArgs: 1,
    expectedArgs:'<status>',
    slash: true,
    testOnly: true,

    ownerOnly: true,

    callback: ({client, text, }) => {
        client.user?.setPresence({
            status: 'online',
            activities: [{
                name: text
            }]
        })
        return 'Status Applied'
    }
} as ICommand