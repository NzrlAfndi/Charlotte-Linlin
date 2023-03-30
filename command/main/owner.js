require('../../settings')

module.exports = {
  name: "owner",
  cmd: ['owner'],
  category: 'main',
  start: async (mom, m) => {
    mom.sendContact(m.from, global.ownerNumber, m)
  }
}