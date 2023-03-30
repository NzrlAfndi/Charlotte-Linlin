const { fetchUrl } = require("../../lib/Function")

module.exports = {
  name: "emojimix",
  cmd: ['emojimix'],
  category: 'maker',
  example: `Example : %prefix%command 😎+😭`,
  start: async(mom, m, { command, prefix, text, quoted, mime }) => {
    let [emoji1, emoji2] = text.split`+`
    let anu = await fetchUrl(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
    for (let res of anu.results) {
      mom.sendFile(m.from, res.url, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: res.tags })
    }
  },
  isQuery: true
}