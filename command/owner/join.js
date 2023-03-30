const { isUrl } = require('../../lib/Function')
require('../../settings')

module.exports = {
  name: "join",
  cmd: ['join'],
  category: 'owner',
  start: async(mom, m, { text, args }) => {
    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return 'Link Invalid!'
    let result = args[0].split('https://chat.whatsapp.com/')[1]
    await mom.groupAcceptInvite(result).then((res) => global.mess("done", m)).catch((err) => global.mess("error", m))
  },
  isOwner: true,
}