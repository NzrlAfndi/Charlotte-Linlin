/**
   * Made By Code Crew Team 🕴️
   * Subscribe NZRLAFNDI
   * Follow https://github.com/NzrlAfndi
*/

//Module
require('../settings')
const { generateWAMessage, areJidsSameUser, proto } = require("@adiwajshing/baileys")
const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")

//Library
const { Simple, Collection, Function } = require("../lib")
const { correct } = require('../lib/Correct')
const Func = require('../lib')

global.db = JSON.parse(fs.readFileSync("./storage/db.json"))
if (global.db) global.db = {
  chats: {},
  settings: {},
  ...(global.db || {})
}

module.exports = async (mom, m, commands, chatUpdate) => {
  try {
    const { type, isGroup, sender, from } = m
    const body = (type == "buttonsResponseMessage") ? m.message[type].selectedButtonId : (type == "listResponseMessage") ? m.message[type].singleSelectReply.selectedRowId : (type == "templateButtonReplyMessage") ? m.message[type].selectedId : m.text
    const budy = (typeof m.text == "string" ? m.text : "")
    const groupMetadata = isGroup ? await mom.groupMetadata(from).catch(e => {}) : ''
    const metadata = isGroup ? await mom.groupMetadata(from) : {}
    const pushname = isGroup ? metadata.subject : m.pushName
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = isGroup ? metadata.participants : [sender]
    const groupAdmin = isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : []
    const isBotAdmin = isGroup ? groupAdmin.includes(mom.user?.jid) : false
    const isAdmin = isGroup ? groupAdmin.includes(sender) : false
    const isOwner = [mom.user?.jid, ...global.ownerNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)
    const botNumber = mom.user.id ? mom.user.id.split(":")[0]+"@s.whatsapp.net" : mom.user.id

    var prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi)[0] : Function.checkPrefix(prefa, body).prefix ?? "#"
    
    const isCmd = body.startsWith(prefix)
    const cmdName = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
    const cmd = commands.get(cmdName) || Array.from(commands.values()).find((v) => v.cmd.find((x) => x.toLowerCase() == cmdName)) || ""
    const args = body.trim().split(/ +/).slice(1)
    const ar = args.map((v) => v.toLowerCase())
    const text = q = args.join(" ")
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype
    const isMedia = /image|video|sticker|audio/.test(mime)
    
    try {
    
      let chats = global.db.chats[m.from]
      if (typeof chats !== "object") global.db.chats = {}
      if (chats) {
        if (!('antilink' in chats)) chats.antilink = false
        if (!('antidelete' in chats)) chats.antidelete = false
      } else global.db.chats[m.from] = {
        antilink: false,
        antidelete: false
      }
      
      let settings = global.db.settings[botNumber]
      if (typeof settings !== "object") global.db.chats = {}
      if (settings) {
        if (!('self' in settings)) settings.self = false
        if (!('public' in settings)) settings.public = true
      } else global.db.settings[botNumber] = {
        self: false,
        public: true
      }

    } catch(e) {
      console.error(e)
    }

    setInterval(() => {
      fs.writeFileSync('./storage/db.json', JSON.stringify(global.db, null, 2))
    }, 1 * 1000)
    
    if (global.db.settings[botNumber].self && !isOwner && !m.fromMe) return
    
    if (isGroup && global.db.chats[m.from].antilink) {
      if (budy.match(`chat.whatsapp.com`)) {
        m.reply(`Link Grup Lain Terdeteksi 🤬\nMaaf Kamu Akan Di Kick !`)
        if (!isBotAdmin) return //  buat ngediem in daripada nyepam m.reply(mess.botAdmin)
        var gclink = (`https://chat.whatsapp.com/`+await mom.groupInviteCode(m.from))
        var isLinkThisGc = new RegExp(gclink, 'i')
        var isgclink = isLinkThisGc.test(m.text)
        if (isgclink) return m.reply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`)
        if (isAdmin) return m.reply(`Ehh Maaf Ternyata Kamu Admin 😁`)
        if (isOwner) return m.reply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
        mom.groupParticipantsUpdate(m.from, [m.sender], 'remove')
      }
    }
    
    if (m.message) {
      console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MOM \x1b[1;37m]', time, chalk.green(budy || m.type), 'Dari', chalk.blue(pushname), 'Di', chalk.yellow(groupName ? groupName : 'Private Chat' ), 'args :', chalk.white(args.length))
    }
    
    if (cmd.isMedia && !isMedia) {
	  return global.mess("media", m)
    }

    if (cmd.isOwner && !isOwner) {
	  return global.mess("owner", m)
    }

    if (cmd.isGroup && !isGroup) {
      return global.mess("group", m)
    }

    if (cmd.isPrivate && isGroup) {
      return global.mess("private", m)
    }
    
    if (cmd.isAdmin && !isAdmin) {
      return global.mess("admin", m)
    }
    
    if (cmd.isBotAdmin && !isBotAdmin) {
      return global.mess("botAdmin", m)
    }
    
    if (cmd.isBot && m.fromMe) {
      return global.mess("bot", m)
    }

    if (cmd.disable == true && cmd.disable == false) {
      return global.mess("dead", m)
    }
    
    if (cmd.isQuery && !text) {
      return m.reply(`${cmd.example.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)
    }
    
    try {
	  cmd.start(mom, m, {
        name: 'Charlotte Linlin',
        metadata,
        pushName: pushname,
        participants,
        body,
        args,
        ar,
        text,
        quoted,
        mime,
        prefix,
        command: cmd.name,
        commands,
        Function: Func,
        toUpper: function toUpper(query) {
          return query.replace(/^\w/, c => c.toUpperCase())
        }
      })
    } catch (e) {
        e = String(e)
        if (!e.includes("cmd.start"))
	    console.error(e);
	}
  } catch (e) {
    console.log(e)
  }
}

//===> JANGAN DI HAPUS
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})