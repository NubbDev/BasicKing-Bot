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
const canvas_1 = __importDefault(require("@napi-rs/canvas"));
const discord_js_1 = __importDefault(require("discord.js"));
const bg = 'https://media.discordapp.net/attachments/941873283001888809/1003037521829183499/basicwelcomebg.png?width=960&height=376';
const dim = {
    height: 376,
    width: 960,
    margin: 50
};
const av = {
    size: 256,
    y: 188,
    x: 100,
};
const welcomeImage = (member) => __awaiter(void 0, void 0, void 0, function* () {
    let username = member.user.username;
    let discrim = member.user.discriminator;
    let avatarUrl = member.user.displayAvatarURL({ format: "png", dynamic: false, size: av.size });
    const canvas = canvas_1.default.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");
    const backImg = yield canvas_1.default.loadImage(bg);
    const avimg = yield canvas_1.default.loadImage(avatarUrl);
    ctx.drawImage(backImg, 0, 0);
    ctx.save();
    ctx.beginPath();
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avimg, av.x, av.y);
    ctx.restore();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "50px Roboto";
    ctx.fillText(`Welcome ${username}#${discrim}`, dim.width / 2, dim.margin + 70);
    const attachment = new discord_js_1.default.MessageAttachment(canvas.toBuffer("image/png"), "Welcome.png");
    return attachment;
});
exports.default = welcomeImage;
