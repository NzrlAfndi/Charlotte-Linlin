require('../../settings')

module.exports = {
  name: "self", 
  cmd: ['self'],
  category: 'owner',
  start: async(mom, m, { text }) => {
    const botNumber = mom.user.id ? mom.user.id.split(":")[0]+"@s.whatsapp.net" : mom.user.id
    if (global.db.settings[botNumber].self) return m.reply('Sudah Self Sebelumnya')
    global.db.settings[botNumber].self = true
    global.db.settings[botNumber].public = false
    return global.mess("done", m)
  },
  isOwner: true,
}