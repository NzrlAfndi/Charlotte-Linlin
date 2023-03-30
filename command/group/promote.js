module.exports = {
  name: "promote", 
  cmd: ['promote'],
  category: 'group',
  example: 'Yang Mau Di Promote Siapa?',
  start: async(mom, m, { text, quoted, args }) => {
    const { sender } = m
    if (args[0].startsWith('08')) return m.reply('Gunakan kode negara 62 Gan')
    let users = m.mentionedJid ? m.mentionedJid[0] : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
    await mom.groupParticipantsUpdate(m.from, users, 'promote').then((res) => global.mess("done", m)).catch((err) => global.mess("error", m))
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  isQuery: true
} 