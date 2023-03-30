const fs = require("fs");

module.exports = async (mom, anu) => {
  try {
    let metadata = await mom.groupMetadata(anu.id)
    let participants = anu.participants
    
    for (let num of participants) {
      try {
        ppuser = await mom.profilePictureUrl(num, 'image') 
      } catch {
        ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
      }
      
      //Message Saat Ada User Yang Masuk Ke Grup
      if (anu.action == 'add') {
        var but = [{buttonId: 'menu', buttonText: {displayText: 'Welcome Kak 👋'}, type: 1},]
        tekswell = `Welcome @${num.split('@')[0]} 👋\n\n📛 Name : @${num.split('@')[0]}\n☎️ Nomer : ${num.split('@')[0]}\n🎎 Group : ${metadata.subject}\n👫 Member : ${metadata.participants.length} Members\n\n📣 Info : ${quotes.welcome}\n`
        mom.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: tekswell, footer: `Welcome Message By ${global.ownerName}`, buttons: but, mentions: [num] })
      //Message Saat Ada User Yang Keluar Dari Grup
      } else if (anu.action == 'remove') {
        var but = [{buttonId: 'menu', buttonText: {displayText: 'Sayonara Kak 👋'}, type: 1},]
        teksbye = `Sayonaraa @${num.split("@")[0]} 👋\n\n📛 Name : @${num.split('@')[0]}\n☎️ Nomer : ${num.split('@')[0]}\n🎎 Group : ${metadata.subject}\n👫 Member : ${metadata.participants.length} Members\n\n📣 Info : ${quotes.leave}\n`
        mom.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: teksbye, footer: `Leave Message By ${global.ownerName}`, buttons: but, mentions: [num] })
      //Message Saat Ada Yang Naik Jabatan
      } else if (anu.action == 'promote') {
        var but = [{buttonId: 'menu', buttonText: {displayText: 'Congrats Kak 🎉'}, type: 1},]
        tekspromote = `Selamat Yaa @${num.split("@")[0]} Atas Kenaikan Jabatannya Di Grup ${metadata.subject} 🥂\n`
        mom.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: tekspromote, footer: `Promote Message By ${global.ownerName}`, buttons: but })
      //Message Saat Ada Yang Turun Jabatan
      } else if (anu.action == 'demote') {
        var but = [{buttonId: 'menu', buttonText: {displayText: 'Nice Try Kak 😔'}, type: 1},]
        teksdemote = `Yang Sabar Yaa @${num.split("@")[0]} Atas Penurunan Jabatannya Di Grup ${metadata.subject} 😔\n`
        mom.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: teksdemote, footer: `Demote Message By ${global.ownerName}`, buttons: but })
      } else {
        console.log('Bot Out/Terkick Dari Grup')
      }
    }
    
  } catch (err) {
    console.log(err)
  }
}