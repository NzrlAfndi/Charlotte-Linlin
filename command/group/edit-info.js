module.exports = {
  name: "editinfo", 
  cmd: ['editinfo'],
  category: 'editinfo',
  example: 'Masukkan value open/close',
  start: async(mom, m, { args, text }) => {
    if (args[0] === 'close' || args[0] === 'tutup'){
      await mom.groupSettingUpdate(m.from, 'locked').then((res) => m.reply(`Sukses Menutup Edit Info Group`)).catch((err) => m.reply('Error'))
    } else if (args[0] === 'open' || args[0] === 'buka'){
      await mom.groupSettingUpdate(m.from, 'unlocked').then((res) => m.reply(`Sukses Membuka Edit Info Group`)).catch((err) => m.reply('Error'))
    }
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  isQuery: true
}