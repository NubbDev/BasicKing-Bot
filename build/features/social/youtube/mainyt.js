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
const rss_parser_1 = __importDefault(require("rss-parser"));
const discord_js_1 = require("discord.js");
const channelId = "988684565902159913";
const youtubeId = "UC0UetqANVOipDeOLx08dffg";
const request = new rss_parser_1.default;
const urlRegexp = /(https?:\/\/[^ ]*)/;
exports.default = (client) => {
    client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
        const channel = (client.channels.cache.get(channelId));
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const req = (yield request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeId}`)).items[0];
            let ifAlready = [...(yield channel.messages.fetch({ limit: 1 })).values()];
            if (ifAlready.length > 0)
                ifAlready = ifAlready[0].content.match(urlRegexp);
            if (ifAlready != null)
                ifAlready = ifAlready[1];
            if (ifAlready == (req === null || req === void 0 ? void 0 : req.link))
                return;
            const embed = new discord_js_1.MessageEmbed()
                .setColor(15844367)
                .setDescription(`${req.summary}`)
                .setURL(`${req.link}`)
                .setTitle(`${req.title}`);
            channel.send({ content: `Our lord and king BasicKing just posted a new video @everyone ${req.link}`, embeds: [embed] });
        }), 15000);
    }));
};
