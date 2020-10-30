/**
  * !link (code) - Sends an embed message containing: a code provided via argument1 and a link to join, the name and the user count of the invoker voice channel
  * permissions required on invoker text channel:  ['READ_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'SEND_MESSAGES']
  * permissions required on invoker voice channel: ['CREATE_INVITE']
*/
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.startsWith("!link ")) {
        let code = msg.content.split(" ")[1];
        if (!msg.member.voice.channel)
            msg.reply("Tens de entrar num canal de voz primeiro :no_entry:").then(reply => { reply.delete({ timeout: 10000 }) }).catch(console.error);
        else if (!code.match(/[A-Z]{6}/g))
            msg.reply("Código inválido :no_entry:").then(reply => { reply.delete({ timeout: 10000 }) }).catch(console.error);
        else
            msg.member.voice.channel.createInvite()
                .then(invite => {
                    const gameEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setAuthor(msg.member.user.username + " precisa de tripulantes!", msg.member.user.avatarURL())
                        .setDescription("[**Clica para entrar**](" + invite.url + ")")
                        //.setThumbnail('https://i.imgur.com/wSTFkRM.png') // Do we really need this?
                        .addFields(
                            { name: ':loud_sound: Canal', value: "Lobby " + msg.member.voice.channel.name.match(/^\d+|\d+\b|\d+(?=\w)/g)[0], inline: true },
                            { name: ':man_shrugging: Jogadores', value: msg.member.voice.channel.members.size + "/" + msg.member.voice.channel.userLimit, inline: true },
                            { name: ':map: Codigo', value: code, inline: true },
                        )
                        .setFooter('Publica o teu jogo aqui, escreve !link (codigo do jogo)');
                    msg.reply(gameEmbed);
                }).catch(console.error);
        msg.delete();
    }
});

client.login('TOKEN');