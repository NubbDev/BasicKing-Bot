import Canvas from '@napi-rs/canvas'
import Discord from 'discord.js'

const bg = 'https://media.discordapp.net/attachments/941873283001888809/1003037521829183499/basicwelcomebg.png?width=960&height=376'
const dim = {
    height: 376,
    width: 960,
    margin: 50
}
const av={
    size: 256,
    y: 188,
    x: 100,
}
const welcomeImage = async (member:any) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarUrl = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    const backImg = await Canvas.loadImage(bg)
    const avimg = await Canvas.loadImage(avatarUrl)


    ctx.drawImage(backImg, 0,0)
    ctx.save();

    ctx.beginPath()
    ctx.arc(av.x + av.size/2, av.y + av.size /2, av.size / 2, 0 , Math.PI * 2, true)
    ctx.closePath();
    ctx.clip()
    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    
    ctx.font = "50px Roboto"
    ctx.fillText(`Welcome ${username}#${discrim}`, dim.width/2, dim.margin + 70)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer("image/png"), "Welcome.png")
    return attachment
}

export default welcomeImage;