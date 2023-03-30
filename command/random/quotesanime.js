const { quotesAnime } = require('../../lib/Scraper')

module.exports = {
  name: "quotesanime",
  cmd: ['quotesanime'],
  category: 'random',
  start: async (mom, m, { commands, text, args }) => {
    let anu = await quotesAnime()
    result = anu[Math.floor(Math.random() * anu.length)]
    let but = [{buttonId: `.quotesanime`, buttonText: {displayText: 'Next Result'}, type: 1}]
    mom.sendMessage(m.from, { text: `${result.quotes}\n\nBy : ${result.karakter}`, buttons: but }, { quoted: m })
  }
}