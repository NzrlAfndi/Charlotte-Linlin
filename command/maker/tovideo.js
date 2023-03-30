const fs = require('fs')

module.exports = {
  name: "tovideo",
  cmd: ['tovideo','tomp4'],
  category: 'maker',
  start: async(mom, m, { command, prefix, text, quoted, mime }) => {
    if (!quoted) return 'Reply Image'
    if (!/webp/.test(mime)) return `balas stiker dengan caption *${prefix + command}*`
    let { webp2mp4File } = require('../../lib/Uploader')
    let media = await mom.downloadAndSaveMediaMessage(quoted)
    let webpToMp4 = await webp2mp4File(media)
    await mom.sendMessage(m.from, { video: { url: webpToMp4.result, caption: 'done' } }, { quoted: m })
    await fs.unlinkSync(media)
  },
}