module.exports = {
  name: "hidetag", 
  cmd: ['hidetag'],
  category: 'group',
  start: async(mom, m, { participants, text }) => {
    mom.sendMessage(m.from, { text : text ? text : '' , mentions: participants.map(a => a.id)}, { quoted: m })
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