module.exports = {
  name: "group", 
  cmd: ['group'],
  category: 'group',
  example: 'Masukkan value open/close',
  start: async(mom, m, { args, text }) => {
    if (args[0] === 'close' || args[0] === 'tutup'){
      await mom.groupSettingUpdate(m.from, 'announcement').then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => m.reply('Error'))
    } else if (args[0] === 'open' || args[0] === 'buka'){
      await mom.groupSettingUpdate(m.from, 'not_announcement').then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => m.reply('Error'))
    }
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  isQuery: true
} 