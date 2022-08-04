"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
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
        // typeScript: true,
        testServers: ['986976198108254218'],
        botOwners: ['401844809385508903']
    })
        .setDefaultPrefix("?")
        .setDisplayName("Butler's");
    const membervc = client.channels.cache.get('996460777131212820');
    let guild = client.guilds.cache.get('986976198108254218');
    yield guild.members.fetch();
    membervc.setName(`👥│Members: ${guild.members.cache.filter(member => !member.user.bot).size}`);
    console.log(`Bot is Ready`);
    console.log(`${guild.name} has ${guild.memberCount} members in counting`);
}));
client.login(process.env.TOKEN);
