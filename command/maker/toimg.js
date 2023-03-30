require('../../settings')
const { exec, spawn, execSync } = require("child_process")
const fs = require('fs')
const { getRandom } = require('../../lib/Function')

module.exports = {
  name: "toimg",
  cmd: ['toimg','toimage'],
  category: 'maker',
  start: async(mom, m, { command, prefix, text, quoted, mime }) => {
    if (!quoted) return 'Reply Image'
    if (!/webp/.test(mime)) return m.reply(`Balas sticker dengan caption *${prefix + command}*`)
    let media = await mom.downloadAndSaveMediaMessage(quoted)
    let ran = await getRandom('.png')
    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
      fs.unlinkSync(media)
      if (err) return err
      let buffer = fs.readFileSync(ran)
      mom.sendMessage(m.from, { image: buffer, caption: 'Done' }, { quoted: m })
      fs.unlinkSync(ran)
    })
  }, 
}