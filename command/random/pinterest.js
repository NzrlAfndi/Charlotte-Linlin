const { pinterest } = require('../../lib/Scraper')

module.exports = {
  name: "pinterest",
  cmd: ['pinterest'],
  category: 'random',
  example: `Use : %prefix%command <query>`,
  start: async (mom, m, { commands, text, args }) => {
    let anu = await pinterest(args[0])
    result = anu[Math.floor(Math.random() * anu.length)]
    mom.sendMessage(m.from, { image: { url: result }, caption: 'Source Url : '+result }, { quoted: m })
  },
  isQuery: true
}