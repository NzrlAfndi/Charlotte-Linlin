const { delay, extractMessageContent } = require("@adiwajshing/baileys")
const { isUrl } = require("../../lib/Function")

module.exports = {
  name: "sticker",
  cmd: ['s','sticker','stiker'],
  category: 'maker',
  start: async(mom, m, { command, prefix, text, quoted, mime }) => {
    if (!quoted) return m.reply(`Kirim/Balas Media Dengan Caption ${prefix + command}`)
    if (/image|video|sticker/.test(mime)) {
        let download = await quoted.download()
        mom.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
    } else if (quoted.mentions[0]) {
        let url = await mom.profilePictureUrl(quoted.mentions[0], "image")
        mom.sendFile(m.from, url, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
    } else if (isUrl(text)) {
        if (isUrl(text)) mom.sendFile(m.from, isUrl(text)[0], "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        else m.reply('No Url Match')
    } else if (quoted.type == "templateMessage") {
        let message = quoted.imageMessage || quoted.videoMessage
        let download = await mom.downloadMediaMessage(message)
        mom.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
    } else if (quoted.type == "buttonsMessage") {
        let message = quoted.imageMessage || quoted.videoMessage
        let download = await mom.downloadMediaMessage(message)
        mom.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
    } else {
        return m.reply(`Kirim/Balas Media Dengan Caption ${prefix + command}`, m.from, { quoted: m })
    }
  }
}