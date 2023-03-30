const fs = require('fs')
const { TelegraPh } = require('../../lib/Uploader')
const { getBuffer, sleep } = require('../../lib/Function')
const store = require('../../lib/Store')

module.exports = {
  name: "bc",
  cmd: ['bc','bcall'],
  category: 'owner',
  example: `Kirim/Balas Gambar Dengan Caption %prefix%command`,
  start: async(mom, m, { text, quoted, mime }) => {
    let anu = await store.chats.all().map(v => v.id)
    m.reply('Mohon Untuk Menunggu Sejenak')
    for (let yoi of anu) {
      //Bc Image
      if (/image/.test(mime)) {
        await sleep(1500)
        var txtbc = `*Broadcast ${mom.user.name}*\n\n*✉️ Message :* ${q? q : ''}\n`
        var btnbc = [{ buttonId: `y`, buttonText: { displayText: `${global.ownerName}` }, type: 1 }]
        let media = await mom.downloadAndSaveMediaMessage(quoted)
        let url = await TelegraPh(media)
        let urll = await getBuffer(url)
        mom.sendMessage(yoi, { image: urll, caption: txtbc, buttons: btnbc }, { quoted: fdoc })
        if (fs.existsSync(media)) fs.unlinkSync(media)
      //Bc Video
      } else if (/video/.test(mime)) {
        await sleep(1500)
        var txtbc = `*Broadcast ${mom.user.name}*\n\n*✉️ Message :* ${q? q : ''}\n`
        var btnbc = [{ buttonId: `y`, buttonText: { displayText: `${global.ownerName}` }, type: 1 }]
        let media = await mom.downloadAndSaveMediaMessage(quoted)
        let url = await TelegraPh(media)
        let urll = await getBuffer(url)
        mom.sendMessage(yoi, { video: urll, caption: txtbc, buttons: btnbc }, { quoted: fdoc })
        if (fs.existsSync(media)) fs.unlinkSync(media)
      } else {
        await sleep(1500)
        var txtbc = `*Broadcast ${mom.user.name}*\n\n*✉️ Message :* ${q? q : ''}\n`
        var btnbc = [{ buttonId: `y`, buttonText: { displayText: `${global.ownerName}` }, type: 1 }]
        mom.sendMessage(yoi, { text: txtbc, buttons: btnbc }, { quoted: fdoc })
      }
      m.reply('Sukses Broadcast')
    }
  },
  isOwner: true,
  disable: true
}

var fdoc = { key : { remoteJid: 'status@broadcast', participant : '0@s.whatsapp.net' }, message: { documentMessage: { title: 'B R O A D C A S T', jpegThumbnail: getBuffer(global.thumb) }}}