require('../../settings')

module.exports = {
  name: "setdesk", 
  cmd: ['setdesk'],
  category: 'group',
  example: 'Textnya?',
  start: async(mom, m, { text }) => {
    await await mom.groupUpdateDescription(m.from, text).then((res) => global.mess("done", m)).catch((err) => global.mess("error", m))
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  isQuery: true
} 