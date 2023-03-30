const fs = require('fs')
const util = require('util')
const path = require('path')
let { UploadFileUgu, TelegraPh } = require('../../lib/Uploader')

module.exports = {
  name: "tourl",
  cmd: ['tourl'],
  category: 'maker',
  start: async(mom, m, { text, quoted, mime }) => {
    let media = await mom.downloadAndSaveMediaMessage(quoted)
    if (/image/.test(mime)) {
      let anu = await TelegraPh(media)
      m.reply(`*Media To Url 📠*\n\n*🔗 :* ${util.format(anu)}\n*📆 :* No Expired`)
    } else if (!/image/.test(mime)) {
      let anu = await UploadFileUgu(media)
      m.reply(`*Media To Url 📠*\n\n*🔗 :* ${util.format(anu.url)}\n*📏 :* ${util.format(anu.size)} KB\n*📆 :* No Expired`)
    }
    await fs.unlinkSync(media)
  }
}