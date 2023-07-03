const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });

module.exports = {
    name: "configcupom", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:No:1069123947897036880> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`<a:No:1069123947897036880> | Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:No:1069123947897036880>  | Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idcupom`)}`) return message.reply(`<a:No:1069123947897036880> | Esse ID de cupom não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
        
      const adb = args[0];
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('qtdcupom')
            .setEmoji('<:mais:1095464541535608896>')
            .setLabel('Adicionar')
            .setStyle('SUCCESS'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('mincupom')
            .setEmoji('<:Carteira:1099970324080103494>')
            .setLabel('Mínimo')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pctcupom')
            .setEmoji('<a:p_star:1110263202454962186>')
            .setLabel('Porcentagem')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('delcupom')
            .setEmoji('<:limpar:1072582356692652092>')
            .setLabel('Excluir')
            .setStyle('DANGER'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('relcupom')
            .setEmoji('<a:carregando:1069285457218773092>')
            .setLabel('Atualizar')
            .setStyle('PRIMARY'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
          .setDescription(`<:caixa:1093295940951093259> | Quantidade: ${db.get(`${adb}.quantidade`)}\n<:Carteira:1099970324080103494> | Mínimo: ${db.get(`${adb}.minimo`)} Reais\n<:cupom:1093550063395020842> | Desconto: ${db.get(`${adb}.desconto`)}%`)

          .setColor(config.get(`color`))], components: [row]})
        const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
        interação.on("collect", async (interaction) => {
         if (message.author.id != interaction.user.id) {
          return;
         }
                
         if (interaction.customId === "delcupom") {
           msg.delete()
           msg.channel.send("<a:Sim:1069123911867961344> | Excluido!")
           db.delete(`${adb}`)
         }
         if (interaction.customId === "qtdcupom") {
             interaction.deferUpdate();
             msg.channel.send("<a:carregando:1069285457218773092> | Qual a nova quantidade de usos?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if (isNaN(message.content)) return msg.edit("<a:No:1069123947897036880> | Não coloque nenhum caractere especial além de números.")
                 db.set(`${adb}.quantidade`, `${message.content}`)
                 msg.edit("<a:Sim:1069123911867961344> | Alterado!")
             })
           })
         }
         if (interaction.customId === "mincupom") {
             interaction.deferUpdate();
             msg.channel.send("<a:carregando:1069285457218773092> | Qual o novo mínimo para uso em reais?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`${adb}.minimo`, `${message.content.replace(",", ".")}`)
                 msg.edit("<a:Sim:1069123911867961344> | Alterado!")
             })
           })
         }
         if (interaction.customId === 'pctcupom') {
             interaction.deferUpdate();
             msg.channel.send("<a:carregando:1069285457218773092> | Qual o novo desconto em porcentagem?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if(isNaN(message.content)) return msg.edit("<a:No:1069123947897036880> | Não coloque nenhum caractere especial além de números.")
                 db.set(`${adb}.desconto`, `${message.content}`)
                 msg.edit("<a:Sim:1069123911867961344> | Alterado!")
             })
           })
         }
         if (interaction.customId === 'relcupom') {
           interaction.deferUpdate();
           const embed = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
             .setDescription(`<:caixa:1093295940951093259> | Quantidade: ${db.get(`${adb}.quantidade`)}\n<:Carteira:1099970324080103494> | Mínimo: ${db.get(`${adb}.minimo`)} Reais\n<:cupom:1093550063395020842> | Desconto: ${db.get(`${adb}.desconto`)}%`)
             
             .setColor(config.get(`color`))
           msg.edit({ embeds: [embed] })
           message.channel.send("<a:Sim:1069123911867961344> | Atualizado!")
             }
           })
         }
       }