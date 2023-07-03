const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const mercadopago = require("mercadopago")
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });



module.exports = {
    name: "gerenciarvendas", 
    run: async(client, message, args) => {
        if (message.author.id !== config.get(`owner`)) return message.reply(`<a:No:1069123947897036880> | Apenas o dono do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('aprovar')
            .setEmoji('<a:Sim:1069123911867961344>')
            .setLabel('Aprovar')
            .setStyle('SUCCESS')
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('reembolsar')
            .setEmoji('<a:No:1069123947897036880>')
            .setLabel('Reembolsar')
            .setStyle('DANGER')
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('info')
            .setEmoji('<:desc:1110253346457141289>')
            .setLabel('Info')
            .setStyle('SECONDARY')
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pegar')
            .setEmoji('<:caixa:1093295940951093259>')
            .setLabel('Pegar Produto')
            .setStyle('SECONDARY')
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Aprovar e reembolsar`)
          .setDescription(`**<a:fixado:1104802923814326322> | Gerencie suas vendas usando este comando.**`)
          .setColor(config.get(`color`))
          .setThumbnail(config.get(`foto`))
          .setFooter(`Gerencie suas vendas por aqui.`)], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "aprovar") {
            interaction.deferUpdate();
            message.channel.send("<a:carregando:1069285457218773092> | Qual id você deseja aprovar?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
             message.delete()
             const data_id = message.content
             db3.set(`${data_id}.status`, `Processando`)
             msg.edit("<a:Sim:1069123911867961344> | Compra aprovada!")
                            
             const logsstaffs = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)} | Logs`)
             .setDescription(`**<a:alert:1104993858955247727> O ${interaction.user} acabou de aprovar uma compra. <a:alert:1104993858955247727>**`)
             .setFooter({ text: `${config.get(`title`)} - Direitos reservados` })
             client.channels.cache.get(config.get(`logs_staff`)).send({ embeds: [logsstaffs], content: `||<@&${config.get(`equipe`)}>||` })

                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Aprovar e reembolsar`)
                   .setDescription(`**<a:Sim:1069123911867961344> | Id aprovado com sucesso!**`)
                   .setColor(config.get(`color`))
                   .setThumbnail(config.get(`foto`))
                   .setFooter(`Gerencie suas vendas por aqui.`)
                 embed.edit({ embeds: [embednew] })
          }
            )})
          }

           if (interaction.customId === "reembolsar") {
            interaction.deferUpdate();
            message.channel.send("<a:carregando:1069285457218773092> | Qual id você deseja reembolsar?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", message => {
                message.delete()
                const data_id = message.content
                db3.set(`${data_id}.status`, `Reembolsado`)
                msg.edit("<a:Sim:1069123911867961344> | Compra reembolsada!")

                mercadopago.configure({
                  access_token: config.get(`access_token`)
                 });
                  
                 var refund = {
                  payment_id: data_id
                 };
                  
                 mercadopago.refund.create(refund).then(result => {
                  console.log(result.response)
                 })

                const logsstaffss = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)} | Logs`)
             .setDescription(`**<a:alert:1104993858955247727> O ${interaction.user} acabou de reembolsar uma compra. <a:alert:1104993858955247727>**`)
             .setFooter({ text: `${config.get(`title`)} - Direitos reservados` })
             client.channels.cache.get(config.get(`logs_staff`)).send({ embeds: [logsstaffss], content: `||<@&${config.get(`equipe`)}>||` })

                const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Gerenciar vendas`)
                   .setDescription(`**<a:Sim:1069123911867961344> | Id reembolsado com sucesso!**`)
                   .setColor(config.get(`color`))
                   .setFooter(`Gerencie suas vendas por aqui.`)
                 embed.edit({ embeds: [embednew] })
              })
            })
           }

           if (interaction.customId === "info") {
            interaction.deferUpdate()
            message.channel.send("<a:carregando:1069285457218773092> | Qual id você deseja pegar as info?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", message => {
                message.delete()
                const data_id = message.content
                db3.set(`${data_id}.id`, `${message.content}`)
                msg.edit("<a:Sim:1069123911867961344> | Info encontrada!")

                const embednew = new Discord.MessageEmbed()
               .setTitle(`${config.get(`title`)} | Info da compra`)
               .setThumbnail(config.get(`foto`)) .setTitle(`${config.get(`title`)} | Info da compra`)
               .addField(`<a:Estrela:1104934923258839060> | ID Da compra:`, `\`\`${db3.get(`${data_id}.id`)}\`\``)
               .addField(`📡 | Status:`, `\`\`${db3.get(`${data_id}.status`)}\`\``)
               .addField(`<:w_passaporte:1102400460788351057> | Comprador:`, `<@${db3.get(`${data_id}.userid`)}>`)
               .addField(`📅 | Data da compra:`, `${db3.get(`${data_id}.dataid`)}`)
               .addField(`<:MercadoPago:1100605984101113886> | Forma de pagamento:`, `${db3.get(`${data_id}.formapagamento`)}`)
               .addField(`<a:planeta:1069299142599393311> | Produto:`, `\`\`${db3.get(`${data_id}.nomeid`)}\`\``)
               .addField(`<:caixa:1093295940951093259> | Quantidade:`, `\`\`${db3.get(`${data_id}.qtdid`)}\`\``)
               .addField(`<:Carteira:1099970324080103494> | Preço:`, `\`\`${db3.get(`${data_id}.precoid`)}\`\``)
               .setFooter(`Gerencie suas vendas por aqui.`)
               .setColor(config.get(`color`))
               embed.edit({ embeds: [embednew] })

              })
            })
           }

           if (interaction.customId === "pegar") {
            interaction.deferUpdate()
            message.channel.send("<a:carregando:1069285457218773092> | Qual id você deseja pegar o produto?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", message => {
                message.delete()
                const data_id = message.content
                db3.set(`${data_id}.id`, `${message.content}`)
                msg.edit("<a:Sim:1069123911867961344> | Produto encontrado!")

                const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Produto da compra`)
                .setThumbnail(config.get(`foto`))
                .addField(`📡 | Status:`, `${db3.get(`${data_id}.status`)}`)
                .addField(`<:w_passaporte:1102400460788351057> | Comprador:`, `<@${db3.get(`${data_id}.userid`)}>`)
                .addField(`📅 | Data da compra:`, `${db3.get(`${data_id}.dataid`)}`)
                .addField(`<a:planeta:1069299142599393311> | Produto:`, `${db3.get(`${data_id}.nomeid`)}`)
                .addField(`<:caixa:1093295940951093259> | Produto entregue:`, `\`\`\`${db3.get(`${data_id}.entrid`)}\`\`\``)
                .setFooter(`Gerencie suas vendas por aqui.`)
                .setColor(config.get(`color`))
                embed.edit({ embeds: [embednew] })
              })
            })
           }

           
            })

          }
             }
             
             
             
          
        
        

        