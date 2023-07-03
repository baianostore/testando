const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db4 = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });

module.exports = {
    name: "addsaldo", 
    run: async(client, message, args) => {
      if (message.author.id !== config.get(`owner`)) return message.reply(`<a:No:1069123947897036880> | Apenas o dono do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(`addsaldo`)
            .setEmoji('')
            .setLabel('Adicionar Saldo')
            .setStyle('SUCCESS'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('retirsaldo')
            .setEmoji('')
            .setLabel('Remover Saldo')
            .setStyle('DANGER'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('setarsaldo')
            .setEmoji('')
            .setLabel('Setar Saldo')
            .setStyle('SECONDARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Gerenciando Saldo`)
          .setDescription(`**> Olá, aqui é o painel de saldo.**`)
          .setThumbnail(`${config.get(`foto`)}`)
          .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
          .setColor(config.get(`color`))], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }


           if (interaction.customId === "addsaldo") {
            interaction.deferUpdate();
          message.channel.send(`<a:carregando:1069285457218773092> | Quanto de saldo você deseja adicionar para ${args[0]} (o mesmo valor você irá pagar.)?`).then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
           collector.on("collect", message => {
           message.delete()
           const newsa = message.content
           db4.set(`${args[0]}.id`, `${args[0]}`)
           db4.set(`${args[0]}.adicionou`, `${interaction.user.id}`)
           db4.set(`${args[0]}.saldopendente`, `${newsa}`)
           msg.edit("<a:Sim:1069123911867961344> | O saldo está pendente, pague!")
                          
           const embedgerando = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)} | Gerenciando Saldo`)
           .setDescription(`**> Olá, Saldo está pendente.**`)
           .setThumbnail(`${config.get(`foto`)}`)
           .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
           .setColor(config.get(`color`))
           embed.edit({ embeds: [embedgerando]})})})
          }

          if (interaction.customId === "retirsaldo") {
            interaction.deferUpdate();
          message.channel.send(`<a:carregando:1069285457218773092> | Quanto de saldo você deseja retirar de ${args[0]}?`).then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
           collector.on("collect", message => {
           message.delete()
           const newsa = message.content
           db4.substr(`${args[0]}.saldo`, `${newsa}`)
           msg.edit("<a:Sim:1069123911867961344> | O saldo foi retirado!")
                          
           const embedgerando = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)} | Gerenciando Saldo`)
           .setDescription(`**> Olá, Saldo retirado.**`)
           .setThumbnail(`${config.get(`foto`)}`)
           .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
           .setColor(config.get(`color`))
           embed.edit({ embeds: [embedgerando]})})})
          }

          if (interaction.customId === "setarsaldo") {
            interaction.deferUpdate();
          message.channel.send(`<a:carregando:1069285457218773092> | Quanto de saldo você deseja setar para ${args[0]}?`).then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
           collector.on("collect", message => {
           message.delete()
           const newsa = message.content
           db4.set(`${args[0]}.saldo`, `${newsa}`)
           db4.set(`${args[0]}.saldopendente`, `0`)
           msg.edit("<a:Sim:1069123911867961344> | O saldo foi setado!")
                          
           const esfsf = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)} | Gerenciando Saldo`)
           .setDescription(`**> Olá, Saldo adicionado.**`)
           .setThumbnail(`${config.get(`foto`)}`)
           .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
           .setColor(config.get(`color`))
           embed.edit({ embeds: [esfsf]})
          })

          })
          }

          })

          }}

          

          

  
          
            
                      
                
                   
                    


                                   






                 








           
        
        