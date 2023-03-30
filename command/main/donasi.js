require('../../settings')
const { getBuffer } = require('../../lib/Function')

module.exports = {
  name: "donasi",
  cmd: ['donasi','sewa'],
  category: 'main',
  start: async (mom, m, { text }) => {
    
    let teks = 'Scan QR Above To Donate\n\nRental Bot Price :\n💰 10k/week\n💰 25k/month\n💰 100k/year'

    mom.sendMessage(m.from, { image: await getBuffer(global.payment), caption: teks, footer: global.footer }, { quoted: m })
  }
}