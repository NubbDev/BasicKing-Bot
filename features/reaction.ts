import { Client} from 'discord.js';

export default (client: Client) => {
    client.on("messageCreate", async (message) => {
        if (message.content.toLowerCase().includes("cool")) {
            await message.react("😎")
        } if (message.content.toLowerCase().includes("minecraft")) {
            await message.react("<a:jumpingblock:996540350111952979>")
        } if (message.content.toLowerCase().includes("king")) {
            await message.react("👑")
        } if (message.content.toLowerCase().includes("nubb")) {
            await message.react("<:typescript:1003168956770701355>")
            await message.react("<a:developerbot:1003168955088769085>")
        } 
    })
}
export const config = {
    dbName: 'REACTIONMESSAGES',
    displayName: 'Reaction Messages',
}
