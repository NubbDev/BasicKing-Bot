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
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const abbrNum_js_1 = __importDefault(require("./../../abbrNum.js"));
const vc = '996257057235795968';
const guildId = '986976198108254218';
exports.default = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = client.channels.cache.get(vc);
    const name = "UC0UetqANVOipDeOLx08dffg";
    let data = yield node_superfetch_1.default.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${name}&key=${process.env.YOUTUBEAPI}`);
    let subCount = (0, abbrNum_js_1.default)((data.body.items[0].statistics.subscriberCount), 2);
    channel.setName(`📌│Youtube: ${subCount.toString()}`);
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        let data = yield node_superfetch_1.default.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${name}&key=${process.env.YOUTUBEAPI}`);
        let subCount = (0, abbrNum_js_1.default)((data.body.items[0].statistics.subscriberCount), 2);
        channel.setName(`📌│Youtube: ${subCount.toString()}`);
    }), 300000);
    console.log(`Subscriber Count: ${subCount.toString()} subs`);
});
// https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${name}&key=${process.env.YOUTUBEAPI}
