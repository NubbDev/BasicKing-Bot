"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const wokcommands_1 = __importDefault(require("wokcommands"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
});
client.on('ready', () => {
    var _a;
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
        status: 'online',
        activities: [{
                name: "BasicKing on youtube",
                type: 'WATCHING',
                url: 'https://youtube.com/Basickingyt',
            }]
    });
    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    new wokcommands_1.default(client, {
        commandsDir: path_1.default.join(__dirname, 'commands'),
        featuresDir: path_1.default.join(__dirname, 'features'),
        dbOptions,
        mongoUri: process.env.MONGO_URI,
        testServers: ['986976198108254218'],
        botOwners: ['401844809385508903']
    })
        .setDefaultPrefix("?")
        .setDisplayName("Butler's");
    console.log(`Bot is Ready`);
});
client.login(process.env.TOKEN);
