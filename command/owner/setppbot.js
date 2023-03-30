const jimp_1 = require('jimp')
require('../../settings')

module.exports = {
  name: "setppbot",
  cmd: ['setppbot'],
  category: 'owner',
  start: async(mom, m, { prefix, command, text, quoted, mime }) => {
    if (!quoted) return m.reply(`Kirim/m.reply Image Dengan Caption ${prefix + command}`)
    if (!/image/.test(mime)) return m.reply(`Kirim/reply Image Dengan Caption ${prefix + command}`)
    if (/webp/.test(mime)) return m.reply(`Kirim/reply Image Dengan Caption ${prefix + command}`)
    try {
      let media = await quoted.download()
      let botNumber = await mom.user.jid
      await mom.updateProfilePicture(botNumber, media, true).then(async() => global.mess("done", m))
    } catch (e) {
      console.log(e)
      return global.mess("error", m)
    }
    },
  isOwner: true
}

