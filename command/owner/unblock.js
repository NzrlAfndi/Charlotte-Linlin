require('../../settings')

module.exports = {
  name: "unblock",
  cmd: ['unblock','unblokir'],
  category: 'owner',
  example: `Example : %prefix%command 628xxxxx Atau Tag Orangnya`,
  start: async(mom, m, { text, quoted }) => {
    let users = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    await mom.updateBlockStatus(users, 'unblock').then((res) => global.mess("done", m)).catch((err) => global.mess("error", m))
  },
  isOwner: true,
  isQuery: true
}
