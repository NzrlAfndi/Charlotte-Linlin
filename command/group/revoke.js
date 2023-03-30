module.exports = {
  name: "revoke", 
  cmd: ['revoke'],
  category: 'group',
  start: async(mom, m, { text, metadata }) => {
    let response = await await mom.groupRevokeInvite(m.from)
    mom.sendText(m.from, `https://chat.whatsapp.com/${response}\n\nNew Link Group : ${metadata.subject}`, m, { detectLink: true })
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true, 
}