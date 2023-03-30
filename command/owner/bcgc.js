const fs = require('fs')
const { TelegraPh } = require('../../lib/Uploader')
const { getBuffer, sleep } = require('../../lib/Function')

module.exports = {
  name: "bcgc",
  cmd: ['bcgc','bcgrup'],
  category: 'owner',
  example: `Kirim/Balas Gambar Dengan Caption %prefix%command`,
  start: async(mom, m, { text, quoted, mime }) => {
    let getGroups = await mom.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    m.reply(mess.wait + '\nMohon Untuk Menunggu Sejenak')
    for (let i of anu) {
      //Bc Image
      if (/image/.test(mime)) {
        await sleep(1500)
        var txtbc = `*Broadcast ${mom.user.name}*\n\n*✉️ Message :* ${q? q : ''}\n`
        var btnbc = [{ buttonId: `y`, buttonText: { displayText: `${global.ownerName}` }, type: 1 }]
        let media = await mom.downloadAndSaveMediaMessage(quoted)
        let url = await TelegraPh(media)
        let urll = await getBuffer(url)
        mom.sendMessage(i, { image: urll, caption: txtbc, buttons: btnbc }, { quoted: fdoc })
        if (fs.existsSync(media)) fs.unlinkSync(media)
      //Bc Video
      } else if (/video/.test(mime)) {
        await sleep(1500)
        var txtbc = `*Broadcast ${mom.user.name}*\n\n*✉️ Message :* ${q? q : ''}\n`
        var btnbc = [{ buttonId: `y`, buttonText: { displayText: `${global.ownerName}` }, type: 1 }]
        let media = await mom.downloadAndSaveMediaMessage(quoted)
        let url = await TelegraPh(media)
        let urll = await getBuffer(url)
        mom.sendMessage(i, { video: urll, caption: txtbc, buttons: btnbc }, { quoted: fdoc })
        if (fs.existsSync(media)) fs.unlinkSync(media)
      } else {
        await sleep(1500)
        var txtbc = `*Broadcast ${mom.user.name}*\n\n*✉️ Message :* ${q? q : ''}\n`
        var btnbc = [{ buttonId: `y`, buttonText: { displayText: `${global.ownerName}` }, type: 1 }]
        mom.sendMessage(i, { text: txtbc, buttons: btnbc }, { quoted: fdoc })
      }
      m.reply('Sukses Broadcast')
    }
  },
  isOwner: true,
}

var fdoc = { key : { remoteJid: 'status@broadcast', participant : '0@s.whatsapp.net' }, message: { documentMessage: { title: 'B R O A D C A S T', jpegThumbnail: getBuffer(global.thumb) }}}