require('../../settings')

module.exports = {
  name: "public", 
  cmd: ['public'],
  category: 'owner',
  start: async(mom, m, { text }) => {
    const botNumber = mom.user.id ? mom.user.id.split(":")[0]+"@s.whatsapp.net" : mom.user.id
    if (global.db.settings[botNumber].public) return m.reply('Sudah Public Sebelumnya')
    global.db.settings[botNumber].self = false
    global.db.settings[botNumber].public = true
    return global.mess("done", m)
  },
  isOwner: true,
}