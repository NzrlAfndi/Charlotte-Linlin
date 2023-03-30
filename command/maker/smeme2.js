const { TelegraPh } = require("../../lib/Uploader")
const util = require('util')

module.exports = {
  name: "smeme2",
  cmd: ['smeme2','stikermeme2'],
  category: 'maker',
  example: `Kirim/Balas Media Dengan Caption %prefix%command teks|teks`,
  start: async(mom, m, { command, prefix, text, quoted, mime, args }) => {
    if (!text.includes('|')) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks|teks*`)
    if (!/image/.test(mime)) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks|teks*`)
    if (/webp/.test(mime)) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks|teks*`)
    arg = args.join(' ')
    atas = arg.split('|')[0]
    bawah = arg.split('|')[1]
    let abeb = await mom.downloadAndSaveMediaMessage(quoted)
    let abe = await TelegraPh(abeb)
    let upz = `https://api.memegen.link/images/custom/${atas}/${bawah}.png?background=${util.format(abe)}`
    mom.sendFile(m.from, upz, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
  },
  isQuery: true
}