module.exports = {
  name: "linkgc", 
  cmd: ['linkgc'],
  category: 'group',
  start: async(mom, m, { text, metadata }) => {
    let response = await mom.groupInviteCode(m.from)
    mom.sendText(m.from, `https://chat.whatsapp.com/${response}\n\nLink Group : ${metadata.subject}`, m, { detectLink: true })
  },
  isGroup: true,
  isBotAdmin: true, 
}