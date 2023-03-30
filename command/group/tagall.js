module.exports = {
  name: "tagall", 
  cmd: ['tagall'],
  category: 'group',
  start: async(mom, m, { participants, text }) => {
  let teks = `*👥 Tag All By Admin*\n\n🗞️ *Pesan : ${text ? text : 'kosong'}*\n\n`
  for (let mem of participants) {
    teks += `>> @${mem.id.split('@')[0]}\n`
  }
  mom.sendMessage(m.from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
  },
  isGroup: true,
  isAdmin: true
}

async function mentions(teks, mems = [], id) {
  if (id == null || id == undefined || id == false) {
  let res = mom.sendMessage(from, { text: teks, mentions: mems })
  return res
  } else {
  let res = mom.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
  return res
  }
  } 