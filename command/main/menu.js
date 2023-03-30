require('../../settings')
const { getBuffer, muptime, jsonformat } = require('../../lib/Function')
const os = require('os')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

module.exports = {
  name: "menu", 
  cmd: ['menu','help','?'],
  category: 'main',
  start: async (mom, m, { commands, args, prefix, text, toUpper }) => {
    const { pushName, sender } = m
    
    let teks = `👤 User : @${m.sender.split('@')[0]} 👋\n🤖 Bot : ${global.botName}\n🏢 Server : ${os.hostname}\n🖥️ Platform : ${os.platform}\n🔌 Version : v1.0.0\n⏰ Uptime : ${muptime(process.uptime())}\n${readmore}\n`
    
    for (let type of commands.type) {
      teks += `*${toUpper(type)} Menu 🎈*\n`
      teks += `${commands.list[type].filter(v => v.type !== "hide").map((cmd) => `• ${prefix + cmd.name}`).join("\n")}\n`
      teks += `\n`
    }
    
    let but = [{buttonId: `.sc`, buttonText: {displayText: 'Script 📚'}, type: 1}, {buttonId: `.owner`, buttonText: {displayText: 'Owner 👤'}, type: 1},]
    mom.sendMessage(m.from, { image: await getBuffer(global.thumb), caption: teks, footer: global.footer, buttons: but, mentions: [m.sender]}, { quoted: m })
  }
}

async function mentions(teks, mems = [], id) {
  if (id == null || id == undefined || id == false) {
  let res = mom.sendMessage(from, { text: teks, mentions: mems })
  return res
  } else {
  let res = mom.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
  return res
  }
  }