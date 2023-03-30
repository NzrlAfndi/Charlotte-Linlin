const fs = require("fs")
const baileys = require("@adiwajshing/baileys")

module.exports = {
  name: "eval",
  cmd: ['>','>>','=>'],
  category: 'owner',
  example: 'undefined',
  start: async (mom, m, opt) => {
    let evaled
    let { text } = opt
    try {
      if (text.endsWith("--sync")) {
        evaled = await eval(`(async () => { ${text.trim.replace("--sync", "")} })`)
        return m.reply(evaled)
      }
      evaled = await eval(text)
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
      await mom.sendMessage(m.from, { text: evaled }, { quoted: m })
    } catch (e) {
      mom.sendMessage(m.from, { text: String(e) }, { quoted: m })
    }
  },
  isOwner: true,
  isQuery: true
}
