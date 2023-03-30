const { wikimedia } = require('../../lib/Scraper')

module.exports = {
  name: "wikimedia",
  cmd: ['wikimedia'],
  category: 'random',
  example: `Use : %prefix%command <query>`,
  start: async (mom, m, { commands, text, args }) => {
    let anu = await wikimedia(text)
    result = anu[Math.floor(Math.random() * anu.length)]
    let but = [{buttonId: `.wikimedia ${args[0]}`, buttonText: {displayText: 'Next Result'}, type: 1}]
    mom.sendMessage(m.from, { image: { url: `${result.image}` }, caption: `📄 Title : ${result.title}\n📬 Source : ${result.source}\n🔗 Media Url : ${result.image}`, buttons: but }, { quoted: m })
  },
  isQuery: true
}