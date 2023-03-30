require('../../settings')

module.exports = {
  name: "leave",
  cmd: ['leave'],
  category: 'owner',
  start: async(mom, m, { text }) => {
    await mom.groupLeave(m.from).then((res) => m.reply('Sayonara 👋\nSulit Di Kontrol Semoga Hari Kalian Mengontol')).catch((err) => global.mess("error", m))
  },
  isOwner: true,
}