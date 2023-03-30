const jimp_1 = require('jimp')

module.exports = {
  name: "setppgc", 
  cmd: ['setppgc'],
  category: 'group',
  start: async(mom, m, { command, prefix, text, quoted, mime }) => {
    if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
    if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
    if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
    try {
      let media = await mom.downloadAndSaveMediaMessage(quoted)
      await mom.updateProfilePicture(m.from, {url:media}, true).then(async() => m.reply(`Admin telah mengganti Icon Group!`))
    } catch (e) {
      console.log(e)
      m.reply(`Terjadi kesalahan, coba lagi nanti.`)
    }
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true
}
