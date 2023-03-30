const { TelegraPh } = require('../../lib/Uploader')

module.exports = {
  name: "smeme",
  cmd: ['smeme','stickermeme'],
  category: 'maker',
  example: `Kirim/Balas Media Dengan Caption %prefix%command teks`,
  start: async(mom, m, { command, prefix, text, quoted, mime, args }) => {
    if (!/image/.test(mime)) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks*`)
    if (/webp/.test(mime)) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks*`)
    arg = args.join(' ')
    mee = await mom.downloadAndSaveMediaMessage(quoted)
    mem = await TelegraPh(mee)
    meme = `https://api.memegen.link/images/custom/-/${arg}.png?background=${mem}`
    mom.sendFile(m.from, meme, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
  },
  isQuery: true
}