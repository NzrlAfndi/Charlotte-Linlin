const { WA_DEFAULT_EPHEMERAL } = require('@adiwajshing/baileys')

module.exports = {
  name: "ephemeral", 
  cmd: ['ephemeral'],
  category: 'group',
  example: 'Masukkan value enable/disable',
  start: async(mom, m, { args, text }) => {
    if (args[0] === 'enable' || args[0] === 'on') {
      await mom.sendMessage(m.from, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => global.mess("done", m)).catch((err) => global.mess("error", m))
    } else if (args[0] === 'disable' || args[0] === 'off') {
      await mom.sendMessage(m.from, { disappearingMessagesInChat: false }).then((res) => global.mess("done", m)).catch((err) => global.mess("error", m))
    }
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  isQuery: true 
}