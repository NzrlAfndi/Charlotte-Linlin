require('../../settings')

module.exports = {
  name: "setnamegc", 
  cmd: ['setnamegc'],
  category: 'group',
  example: 'Textnya?',
  start: async(mom, m, { text }) => {
    await mom.groupUpdateSubject(m.from, text).then((res) => global.mess("done", m)).catch((err) => global.mess("error", m))
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  isQuery: true
} 