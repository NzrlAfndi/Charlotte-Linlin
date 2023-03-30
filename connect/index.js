/**
   * Made By Code Crew Team 🕴️
   * Subscribe NZRLAFNDI
   * Follow https://github.com/NzrlAfndi
*/

require("http").createServer((_, res) => res.end("UPTIMEEE")).listen(8080)
require('../settings');
const { default: makeWASocket, delay, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState, useSingleFileAuthState,  jidNormalizedUser, jidDecode } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const axios = require('axios');
const cfonts = require('cfonts');
const fs = require('fs');
const lolcatjs = require('lolcatjs');
const PhoneNumber = require('awesome-phonenumber')
const path = require('path');
const pino = require('pino');

//lib
const { Collection, Simple, Store } = require('../lib')
const { getBuffer } = require('../lib/Function')
const { serialize, WAConnection } = Simple
const Commands = new Collection()

Commands.prefix = global.prefa

//Biar Rapih Aja
const welcome = require('./shorten/welcome')

const express = require('express')
let app = express()
const {
   createServer
} = require('http')
let server = createServer(app)

let PORT = 3000 || 8000 || 8080

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
store.readFromFile('./session/baileys_store.json')
setInterval(() => {
	store.writeToFile('./session/baileys_store.json')
}, 10000)

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

//Connection
const viewCommand = () => {
  let dir = path.join(__dirname, '../command')
  let dirs = fs.readdirSync(dir)
  let listFeature = {}
  try {
    dirs.forEach(async(res) => {
      let groups = res.toLowerCase()
      Commands.type = dirs.filter(v => v !== '_').map(v => v);
      listFeature[groups] = []
      let filenya = fs.readdirSync(`${dir}/${res}`).filter((file) => file.endsWith(".js"));
      for (const file of filenya) {
        const command = require(`${dir}/${res}/${file}`)
        listFeature[groups].push(command)
        Commands.set(command.name, command)
        delay(100)
      }
    })
    Commands.list = listFeature
  } catch (e) {
      console.error(e)
  }
}

const connect = async () => {
  await viewCommand()
  const { state, saveCreds } = await useMultiFileAuthState(path.resolve('./session'));
  let { version, isLatest } = await fetchLatestBaileysVersion();
  cfonts.say('MOM',{
    font: 'block',
    gradient: ['red','magenta'],
    align: 'center'
  })
  cfonts.say(`Whatsapp Version : v${version.join('.')}`,{
    font: 'console',
    gradient: ['red','magenta'],
    align: 'center'
  })
  
  const conn = {
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage
        || message.templateMessage
        || message.listMessage
      );
      if (requiresPatch) {
       message = {
         viewOnceMessage: {
           message: {
             messageContextInfo: {
               deviceListMetadataVersion: 2,
               deviceListMetadata: {},
             },
             ...message,
           },
         },
       };
      }
      return message;
    },
    auth: state,
    browser: ["BY: CODECREWTEAM", "Safari", "3.0"],
    syncFullHistory: true
  }

const mom = new WAConnection(makeWASocket(conn))

mom.ev.on("creds.update", saveCreds)

mom.ev.on("connection.update", async(update) => {
  if (update.connection == "open" && mom.type == "legacy") {
    mom.user = {
      id: mom.state.legacy.user.id,
      jid: mom.state.legacy.user.id,
      name: mom.state.legacy.user.name
    }
  }
  
  const { lastDisconnect, connection } = update
    
  if (update.connection == "connecting" || update.receivedPendingNotifications == "false" ) {
    lolcatjs.fromString(`Menghubungkan Ke ==> Whatsapp Web`)
  }
  
  if (update.connection == "open" || update.receivedPendingNotifications == "true" ) {
    lolcatjs.fromString(`Berhasil Tersambung Ke ==> Whatsapp Web`)
    lolcatjs.fromString(`[Connected] ` + JSON.stringify(mom.user, null, 2))
  }

  if (connection === 'close') {
	let reason = new Boom(lastDisconnect?.error)?.output.statusCode
	if (reason === DisconnectReason.badSession) {
	console.log(`Bad Session File, Please Delete Session and Scan Again`);
	connect()
	} else if (reason === DisconnectReason.connectionClosed) {
	console.log("Connection closed, reconnecting....");
	connect();
	} else if (reason === DisconnectReason.connectionLost) {
	console.log("Connection Lost from Server, reconnecting...");
	connect();
	} else if (reason === DisconnectReason.connectionReplaced) {
	console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
	connect()
    } else if (reason === DisconnectReason.loggedOut) {
	console.log(`Device Logged Out, Please Scan Again And Run.`);
//	connect();
	} else if (reason === DisconnectReason.restartRequired) {
	console.log("Restart Required, Restarting...");
	connect();
	} else if (reason === DisconnectReason.timedOut) {
	console.log("Waktu Koneksi Habis, Menyambungkan Ulang...");
	connect();
	} else mom.end(`Unknown DisconnectReason: ${reason}|${connection}`)
  }
})

mom.ev.on("messages.upsert", async (chatUpdate) => {
  m = serialize(mom, chatUpdate.messages[0])
  if (!m.message) return
  if (m.key && m.key.remoteJid == "status@broadcast") return
  if (m.key.id.startsWith("BAE5") && m.key.id.length == 16) return
  //if (config.options.autoRead) await mom.readMessages([m.key])
  require("./mom")(mom, m, Commands, chatUpdate)
})

mom.ev.on("group-participants.update", async (anu) => {
  console.log(anu)
  welcome(mom, anu)
})
mom.ev.on("groups.update", async (json) => {
console.log(json)
})

mom.decodeJid = (jid) => {
  if (!jid) return jid
  if (/:\d+@/gi.test(jid)) {
  let decode = jidDecode(jid) || {}
  return decode.user && decode.server && decode.user + '@' + decode.server || jid
  } else return jid
  }
    
mom.ev.on('contacts.update', update => {
  for (let contact of update) {
  let id = mom.decodeJid(contact.id)
  if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
  }
  })

mom.getName = (jid, withoutContact  = false) => {
  id = mom.decodeJid(jid)
  withoutContact = mom.withoutContact || withoutContact 
  let v
  if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
  v = store.contacts[id] || {}
  if (!(v.name || v.subject)) v = mom.groupMetadata(id) || {}
  resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
  })
  else v = id === '0@s.whatsapp.net' ? {
  id,
  name: 'WhatsApp'
  } : id === mom.decodeJid(mom.user.id) ?
  mom.user :
  (store.contacts[id] || {})
  return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
  }
   
mom.sendContact = async (jid, kon, quoted = '', opts = {}) => {
  let list = []
  for (let i of kon) {
  list.push({
  displayName: await mom.getName(i + '@s.whatsapp.net'),
  vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await mom.getName(i + '@s.whatsapp.net')}\nFN:${await mom.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\n\nitem2.URL:${global.webme}\nitem2.X-ABLabel:Instagram\nitem3.ADR:;;Indonesia;;;;\nitem3.X-ABLabel:Region\nEND:VCARD`
  })
  }
  mom.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
  }

if (mom.user && mom.user?.id) mom.user.jid = jidNormalizedUser(mom.user?.id)

return mom

}

connect()
