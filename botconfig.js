const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });


module.exports = {
    name: "botconfig", 
    run: async(client, message, args) => {
      if (message.author.id !== config.get(`owner`)) return message.reply(`<a:No:1069123947897036880> | Apenas o dono do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(`vendasonoff`)
            .setEmoji('<:config:1093297723261857833>')
            .setLabel('Vendas On/Off')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('configpayments')
            .setEmoji('<:Comprador:1114585434182385725>')
            .setLabel('Config Payments')
            .setStyle('PRIMARY'),
        )
        
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('configbot')
            .setEmoji('<:config:1093297723261857833>')
            .setLabel('Config Bot')
            .setStyle('PRIMARY'),
         )
        
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('configcanais')
            .setEmoji('<:comandos212:1114677750704373890>')
            .setLabel('Config Canais')
            .setStyle('PRIMARY'),
        )
        
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('configtermos')
            .setEmoji('<:Termosp3:1114381398791438346>')
            .setLabel('Config Termos')
            .setStyle('PRIMARY'),
        );
        
        const rownes = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('configbanners')
            .setEmoji('<:w_passaporte:1102400460788351057>')
            .setLabel('Config Banners')
            .setStyle('PRIMARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configurações`)
          .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n<:Dinheiro:1114682101917307011> | Sistema de vendas: \`\`${config.get(`vendasonoff`)}\`\`\n\nBotão para add o bot em qualquer server:\n[Aqui](${config.get(`linkdobot`)})**`)
          .setThumbnail(`${config.get(`foto`)}`)
          .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
          .setColor(config.get(`color`))], components: [row, rownes]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }

           const rowvendasonoff = new Discord.MessageActionRow()
           .addComponents(
             new Discord.MessageButton()
               .setCustomId('vendason')
               .setEmoji('<a:Sim:1069123911867961344>')
               .setLabel('Vendas On')
               .setStyle('SUCCESS'),
           )
           .addComponents(
             new Discord.MessageButton()
               .setCustomId('vendasoff')
               .setEmoji('<a:No:1069123947897036880>')
               .setLabel('Vendas Off')
               .setStyle('DANGER'),
           )
           .addComponents(
             new Discord.MessageButton()
               .setCustomId('voltar5')
               .setEmoji('⬅️')
               .setLabel('Voltar')
               .setStyle('PRIMARY'),
           );

           if (interaction.customId === "vendasonoff") {
             interaction.deferUpdate();
             const embedvendasonoff = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)} | Configuração do bot`)
             .setDescription(`**<:comandos212:1114677750704373890> | Configurando payments.\n<:Dinheiro:1114682101917307011> | Vendas \`\`${config.get(`vendasonoff`)}\`\`**`)
             .setFooter(`Configure usando os botões abaixo.`)
             .setThumbnail(`${config.get(`foto`)}`)
             .setColor(config.get(`color`))
             embed.edit({ embeds: [embedvendasonoff], components: [rowvendasonoff] })    
               }  

          if (interaction.customId === "vendason") {
           interaction.deferUpdate();
           config.set(`vendasonoff`, `On`)
           const embedvendasonoff = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)} | Configuração do bot`)
             .setDescription(`**<:comandos212:1114677750704373890> | Configurando payments.\n<:Dinheiro:1114682101917307011> | Vendas \`\`${config.get(`vendasonoff`)}\`\`**`)
             .setFooter(`Configure usando os botões abaixo.`)
             .setThumbnail(`${config.get(`foto`)}`)
             .setColor(config.get(`color`))
           embed.edit({ embeds: [embedvendasonoff], components: [rowvendasonoff] }) 
           interaction.channel.send(`**<:Dinheiro:1114682101917307011> | Vendas \`\`${config.get(`vendasonoff`)}\`\`**`)
          }

          if (interaction.customId === "vendasoff") {
           interaction.deferUpdate();
           config.set(`vendasonoff`, `Off`)
           const embedvendasonoff = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)} | Configuração do bot`)
             .setDescription(`**<:comandos212:1114677750704373890> | Configurando payments.\n<:Dinheiro:1114682101917307011> | Vendas \`\`${config.get(`vendasonoff`)}\`\`**`)
             .setFooter(`Configure usando os botões abaixo.`)
             .setThumbnail(`${config.get(`foto`)}`)
             .setColor(config.get(`color`))
           embed.edit({ embeds: [embedvendasonoff], components: [rowvendasonoff] }) 
           interaction.channel.send(`**<:Dinheiro:1114682101917307011> | Vendas \`\`${config.get(`vendasonoff`)}\`\`**`)
          }

          if (interaction.customId === "voltar5") {
            interaction.deferUpdate();
            const embedvoltar4 = new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Configurações`)
            .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n<:Dinheiro:1114682101917307011> | Sistema de vendas: \`\`${config.get(`vendasonoff`)}\`\`\n\nBotão para add o bot em qualquer server:\n[Aqui](${config.get(`linkdobot`)})**`)
            .setThumbnail(`${config.get(`foto`)}`)
            .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
            .setColor(config.get(`color`))
            embed.edit({ embeds: [embedvoltar4], components: [row, rownes] })
           }

           const rowconfigpays2 = new Discord.MessageActionRow()
           .addComponents(
             new Discord.MessageButton()
               .setCustomId('configmp')
               .setEmoji('<:MercadoPago:1100605984101113886>')
               .setLabel('Mercado Pago')
               .setStyle('PRIMARY'),
           )
           .addComponents(
            new Discord.MessageButton()
              .setCustomId('configsaldo')
              .setEmoji('💰')
              .setLabel('Saldo')
              .setStyle('PRIMARY'),
          )
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('semiauto')
              .setDisabled(true)
              .setEmoji('<:Dinheiro:1114682101917307011>')
              .setLabel('Pagamento Semiauto')
              .setStyle('PRIMARY'),
          )
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('voltar1')
              .setEmoji('⬅️')
              .setLabel('Voltar')
              .setStyle('PRIMARY'),
          );

           if (interaction.customId === "configpayments") {
            interaction.deferUpdate();
                const embedconfigpayss = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)} | Configuração do bot`)
                  .setDescription(`**<:comandos212:1114677750704373890> | Configurando payments.**`)
                  .setFooter(`Selecione o sistema de deseja configurar.`)
                  .setThumbnail(`${config.get(`foto`)}`)
                  .setColor(config.get(`color`))
                  embed.edit({ embeds: [embedconfigpayss], components: [rowconfigpays2] })         
              }
            
            const rowconfigpaymp = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('pixonoff')
                .setEmoji('<:config:1093297723261857833>')
                .setLabel('Pix On/Off')
                .setStyle('PRIMARY'),
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('siteonoff')
                .setEmoji('<:comandos212:1114677750704373890>')
                .setLabel('Site On/Off')
                .setStyle('PRIMARY'),
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('tempopagar')
                .setEmoji('<:relogio:1101531875400503447>')
                .setLabel('Tempo Para Pagar')
                .setStyle('PRIMARY'),
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('configmpttoken')
                .setEmoji('<:MercadoPago:1100605984101113886>')
                .setLabel('Alterar Acess Token')
                .setStyle('PRIMARY'),
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('voltar2')
                .setEmoji('⬅️')
                .setLabel('Voltar')
                .setStyle('PRIMARY'),
            );

            if (interaction.customId === "configmp") {
              interaction.deferUpdate()
              const embedconfigmp = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)} | Configuração do bot`)
                  .setDescription(`**<:comandos212:1114677750704373890> | Configurando Mercado Pago.\n\n<:pix:1105629568557121556> | Pix: \`\`${config.get(`pixonoff`)}\`\`\n🔗 | Site: \`\`${config.get(`siteonoff`)}\`\`\n<:relogio:1101531875400503447> | Tempo Para Pagar: ${config.get(`tempopagar`)}\n<:MercadoPago:1100605984101113886> | Access Token: ||${config.get(`access_token`)}||**`)
                  .setFooter(`Configure usando os botões abaixo.`)
                  .setThumbnail(`${config.get(`foto`)}`)
                  .setColor(config.get(`color`))
                  embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] })         
            }

            const rowconfigsite = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('siteon')
                .setEmoji('<:config:1093297723261857833>')
                .setLabel('Site On')
                .setStyle('SUCCESS'),
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('siteoff')
                .setEmoji('<:comandos212:1114677750704373890>')
                .setLabel('Site Off')
                .setStyle('DANGER'),
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('voltar9')
                .setEmoji('⬅️')
                .setLabel('Voltar')
                .setStyle('PRIMARY'),
            );


            if (interaction.customId === "siteonoff") {
              interaction.deferUpdate();
              const embedsite = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configuração do bot`)
              .setDescription(`**<:comandos212:1114677750704373890> | Configurando Site.\n\n<:Dinheiro:1114682101917307011> | Site \`\`${config.get(`siteonoff`)}\`\`**`)
              .setFooter(`Configure usando os botões abaixo.`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setColor(config.get(`color`))
              embed.edit({ embeds: [embedsite], components: [rowconfigsite] })          
            }

            if (interaction.customId === "siteon") {
              interaction.deferUpdate();
              config.set(`siteonoff`, `On`)
              config.set(`sitetruefalse`, "false")
              const embedpisald = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configuração do bot`)
                .setDescription(`**<:comandos212:1114677750704373890> | Configurando Site.\n\n<:Dinheiro:1114682101917307011> | Site \`\`${config.get(`siteonoff`)}\`\`**`)
                .setFooter(`Configure usando os botões abaixo.`)
                .setThumbnail(`${config.get(`foto`)}`)
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embedpisald], components: [rowconfigsite] }) 
              interaction.channel.send(`**<:Dinheiro:1114682101917307011> | Site \`\`${config.get(`siteonoff`)}\`\`**`)
             }
    
             if (interaction.customId === "siteoff") {
              interaction.deferUpdate();
              config.set(`siteonoff`, `Off`)
              config.set(`sitetruefalse`, "true")
              const embedpixasdff = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configuração do bot`)
                .setDescription(`**<:comandos212:1114677750704373890> | Configurando Site.\n\n<:Dinheiro:1114682101917307011> | Site \`\`${config.get(`siteonoff`)}\`\`**`)
                .setFooter(`Configure usando os botões abaixo.`)
                .setThumbnail(`${config.get(`foto`)}`)
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embedpixasdff], components: [rowconfigsite] }) 
              interaction.channel.send(`**<:Dinheiro:1114682101917307011> | Site \`\`${config.get(`siteonoff`)}\`\`**`)
             }

             if (interaction.customId === "voltar9") {
              interaction.deferUpdate()
              const embedconfigmp = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)} | Configuração do bot`)
                  .setDescription(`**<:comandos212:1114677750704373890> | Configurando Mercado Pago.\n\n<:pix:1105629568557121556> | Pix: \`\`${config.get(`pixonoff`)}\`\`\n🔗 | Site: \`\`${config.get(`siteonoff`)}\`\`\n<:relogio:1101531875400503447> | Tempo Para Pagar: ${config.get(`tempopagar`)}\n<:MercadoPago:1100605984101113886> | Access Token: ||${config.get(`access_token`)}||**`)
                  .setFooter(`Configure usando os botões abaixo.`)
                  .setThumbnail(`${config.get(`foto`)}`)
                  .setColor(config.get(`color`))
                  embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] })
            }

          const rowconfigsaldo = new Discord.MessageActionRow()
           .addComponents(
             new Discord.MessageButton()
               .setCustomId('saldoonoff')
               .setEmoji('<:comandos212:1114677750704373890>')
               .setLabel('Saldo On/Off')
               .setStyle('PRIMARY'),
           )
           .addComponents(
            new Discord.MessageButton()
              .setCustomId('voltar6')
              .setEmoji('⬅️')
              .setLabel('Voltar')
              .setStyle('PRIMARY'),
          );

           const rowconfigad = new Discord.MessageActionRow()
           .addComponents(
            new Discord.MessageButton()
              .setCustomId('saldoon')
              .setEmoji('<a:Sim:1069123911867961344>')
              .setLabel('Saldo On')
              .setStyle('SUCCESS'),
          )
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('saldooff')
              .setEmoji('<a:No:1069123947897036880>')
              .setLabel('Saldo Off')
              .setStyle('DANGER'),
          )
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('voltar7')
              .setEmoji('⬅️')
              .setLabel('Voltar')
              .setStyle('PRIMARY'),
          );

          if (interaction.customId === "saldoonoff") {
            interaction.deferUpdate();
            const embedsaldo = new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Configuração do bot`)
            .setDescription(`**<:comandos212:1114677750704373890> | Configurando Saldo.\n\n<:Dinheiro:1114682101917307011> | Saldo \`\`${config.get(`saldoonoff`)}\`\`**`)
            .setFooter(`Configure usando os botões abaixo.`)
            .setThumbnail(`${config.get(`foto`)}`)
            .setColor(config.get(`color`))
            embed.edit({ embeds: [embedsaldo], components: [rowconfigad] })    
              } 
              
              if (interaction.customId === "configtermos") {
                interaction.deferUpdate();
              message.channel.send("<a:carregando:1069285457218773092> | O que deseja colocar nos termos?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
               message.delete()
               const newsa = message.content
               config.set(`termos`, newsa)
               msg.edit("<a:Sim:1069123911867961344> | Pronto!")
                              
               const embedvoltar4 = new Discord.MessageEmbed()
               .setTitle(`${config.get(`title`)} | Configurações`)
               .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n<:Dinheiro:1114682101917307011> | Sistema de vendas: \`\`${config.get(`vendasonoff`)}\`\`\n\nBotão para add o bot em qualquer server:\n[Aqui](${config.get(`linkdobot`)})**`)
               .setThumbnail(`${config.get(`foto`)}`)
               .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
               .setColor(config.get(`color`))
               embed.edit({ embeds: [embedvoltar4], components: [row, rownes] })})})
              }

              
           const rowbanners = new Discord.MessageActionRow()
           .addComponents(
            new Discord.MessageButton()
              .setCustomId('avatarconfig')
              .setEmoji('<:w_passaporte:1102400460788351057>')
              .setLabel('Avatar')
              .setStyle('PRIMARY'),
          )
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('bannerconfig')
              .setEmoji('<:w_passaporte:1102400460788351057>')
              .setLabel('Banner')
              .setStyle('PRIMARY'),
          )
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('voltar12')
              .setEmoji('⬅️')
              .setLabel('Voltar')
              .setStyle('PRIMARY'),
          );

              if (interaction.customId === "configbanners") {
                interaction.deferUpdate();
                const embedbanners =  new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configurando bot`)
                .setDescription(`**<:w_passaporte:1102400460788351057> | Avatar: [aqui](${config.get(`foto`)})\n<:w_passaporte:1102400460788351057> | Banner [aqui](${config.get(`banner`)})**`)
                .setFooter(`Configure usando os botões abaixo.`)
                .setThumbnail(`${config.get(`foto`)}`)
                .setColor(config.get(`color`))
                embed.edit({ embeds: [embedbanners], components: [rowbanners] })
              
        }

        if (interaction.customId === "avatarconfig") {
          interaction.deferUpdate();
          message.channel.send("<a:carregando:1069285457218773092> | Qual o novo avatar do bot?").then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
              message.delete()
               const newt = message.content
               client.user.setAvatar(message.content);
               config.set(`foto`, newt)
               msg.edit("<a:Sim:1069123911867961344>  | Alterado!")
                          
               const embednew = new Discord.MessageEmbed()
               .setTitle(`${config.get(`title`)} | Configuração dos banners`)
               .setDescription(`**<:w_passaporte:1102400460788351057> | Avatar: [aqui](${config.get(`foto`)})\n<:w_passaporte:1102400460788351057> | Banner [aqui](${config.get(`banner`)})**`)
                 .setThumbnail(`${config.get(`foto`)}`)
                 .setColor(config.get(`color`))
               embed.edit({ embeds: [embednew] })
               })
             })
           }

        if (interaction.customId === "bannerconfig") {
          interaction.deferUpdate();
          message.channel.send("<a:carregando:1069285457218773092> | Qual o banner do bot?").then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
              message.delete()
               const newt = message.content
               config.set(`banner`, newt)
               msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                          
               const embednew = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)} | Configuração dos banners`)
                 .setDescription(`**<:w_passaporte:1102400460788351057> | Avatar: [aqui](${config.get(`foto`)})\n<:w_passaporte:1102400460788351057> | Banner [aqui](${config.get(`banner`)})**`)
                 .setThumbnail(`${config.get(`foto`)}`)
                 .setColor(config.get(`color`))
               embed.edit({ embeds: [embednew] })
               })
             })
           }

           if (interaction.customId === "voltar12") {
            interaction.deferUpdate();
            const embedvoltar1 = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configurações`)
              .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n<:Dinheiro:1114682101917307011> | Sistema de vendas: \`\`${config.get(`vendasonoff`)}\`\`\n\nBotão para add o bot em qualquer server:\n[Aqui](${config.get(`linkdobot`)})**`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
              .setColor(config.get(`color`))
            embed.edit({ embeds: [embedvoltar1], components: [row, rownes] })
    
           }

         if (interaction.customId === "saldoon") {
          interaction.deferUpdate();
          config.set(`saldoonoff`, `On`)
          config.set(`saldotruefalse`, "false")
          const embedpisald = new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Configuração do bot`)
            .setDescription(`**<:comandos212:1114677750704373890> | Configurando Saldo.\n\n<:Dinheiro:1114682101917307011> | Saldo \`\`${config.get(`saldoonoff`)}\`\`**`)
            .setFooter(`Configure usando os botões abaixo.`)
            .setThumbnail(`${config.get(`foto`)}`)
            .setColor(config.get(`color`))
          embed.edit({ embeds: [embedpisald], components: [rowconfigad] }) 
          interaction.channel.send(`**<:Dinheiro:1114682101917307011> | Saldo \`\`${config.get(`saldoonoff`)}\`\`**`)
         }

         if (interaction.customId === "saldooff") {
          interaction.deferUpdate();
          config.set(`saldoonoff`, `Off`)
          config.set(`saldotruefalse`, "true")
          const embedpixasdff = new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Configuração do bot`)
            .setDescription(`**<:comandos212:1114677750704373890> | Configurando Saldo.\n\n<:Dinheiro:1114682101917307011> | Saldo \`\`${config.get(`saldoonoff`)}\`\`**`)
            .setFooter(`Configure usando os botões abaixo.`)
            .setThumbnail(`${config.get(`foto`)}`)
            .setColor(config.get(`color`))
          embed.edit({ embeds: [embedpixasdff], components: [rowconfigad] }) 
          interaction.channel.send(`**<:Dinheiro:1114682101917307011> | Saldo \`\`${config.get(`saldoonoff`)}\`\`**`)
         }

         if (interaction.customId === "voltar6") {
          interaction.deferUpdate();
          const embedconfigpayss = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configuração do bot`)
          .setDescription(`**<:comandos212:1114677750704373890> | Configurando payments.**`)
          .setFooter(`Selecione o sistema de deseja configurar.`)
          .setThumbnail(`${config.get(`foto`)}`)
          .setColor(config.get(`color`))
          embed.edit({ embeds: [embedconfigpayss], components: [rowconfigpays2] }) 
         }

         if (interaction.customId === "voltar7") {
          interaction.deferUpdate();
          const embedsaldoasd = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configuração do bot`)
          .setDescription(`**<:comandos212:1114677750704373890> | Configurando Saldo.\n\n<:Dinheiro:1114682101917307011> | Saldo \`\`${config.get(`saldoonoff`)}\`\`**`)
          .setFooter(`Configure usando os botões abaixo.`)
          .setThumbnail(`${config.get(`foto`)}`)
          .setColor(config.get(`color`))
          embed.edit({ embeds: [embedsaldoasd], components: [rowconfigsaldo] })  
         }

            if (interaction.customId === "configsaldo") {
              interaction.deferUpdate();
              const embedsaldoconfig = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configurações`)
                .setDescription(`**<:comandos212:1114677750704373890> | Configurando Saldo.\n\n<:Dinheiro:1114682101917307011> | Saldo \`\`${config.get(`saldoonoff`)}\`\`**`)
                .setThumbnail(`${config.get(`foto`)}`)
                .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embedsaldoconfig], components: [rowconfigsaldo] })
             }

            if (interaction.customId === "voltar1") {
              interaction.deferUpdate();
              const embedvoltar1 = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configurações`)
                .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n<:Dinheiro:1114682101917307011> | Sistema de vendas: \`\`${config.get(`vendasonoff`)}\`\`\n\nBotão para add o bot em qualquer server:\n[Aqui](${config.get(`linkdobot`)})**`)
                .setThumbnail(`${config.get(`foto`)}`)
                .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embedvoltar1], components: [row, rownes] })
      
             }
            
            const rowpixoffon = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('pixon')
                .setEmoji('<a:Sim:1069123911867961344>')
                .setLabel('Pix On')
                .setStyle('SUCCESS'),
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('pixoff')
                .setEmoji('<a:No:1069123947897036880>')
                .setLabel('Pix Off')
                .setStyle('DANGER'),
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('voltar3')
                .setEmoji('⬅️')
                .setLabel('Voltar')
                .setStyle('PRIMARY'),
            );

            if (interaction.customId === "pixonoff") {
              interaction.deferUpdate();
              const embedpixonoff = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configuração do bot`)
              .setDescription(`**<:comandos212:1114677750704373890> | Configurando pix.\n<:Dinheiro:1114682101917307011> | Pix \`\`${config.get(`pixonoff`)}\`\`**`)
              .setFooter(`Configure usando os botões abaixo.`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setColor(config.get(`color`))
              embed.edit({ embeds: [embedpixonoff], components: [rowpixoffon] })    
                }  

           if (interaction.customId === "pixon") {
            interaction.deferUpdate();
            config.set(`pixonoff`, `On`)
            config.set(`pixtruedalse`, `False`)
            const embedpixonoff = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configuração do bot`)
              .setDescription(`**<:comandos212:1114677750704373890> | Configurando pix.\n<:Dinheiro:1114682101917307011> | Pix \`\`${config.get(`pixonoff`)}\`\`**`)
              .setFooter(`Configure usando os botões abaixo.`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setColor(config.get(`color`))
            embed.edit({ embeds: [embedpixonoff], components: [rowpixoffon] }) 
            interaction.channel.send(`**<:Dinheiro:1114682101917307011> | Pix \`\`${config.get(`pixonoff`)}\`\`**`)
           }

           if (interaction.customId === "pixoff") {
            interaction.deferUpdate();
            config.set(`pixonoff`, `Off`)
            config.set(`pixtruedalse`, `True`)
            const embedpixonoff = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configuração do bot`)
              .setDescription(`**<:comandos212:1114677750704373890> | Configurando pix.\n<:Dinheiro:1114682101917307011> | Pix \`\`${config.get(`pixonoff`)}\`\`**`)
              .setFooter(`Configure usando os botões abaixo.`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setColor(config.get(`color`))
            embed.edit({ embeds: [embedpixonoff], components: [rowpixoffon] }) 
            interaction.channel.send(`**<:Dinheiro:1114682101917307011> | Pix \`\`${config.get(`pixonoff`)}\`\`**`)
           }

           if (interaction.customId === "voltar3") {
            interaction.deferUpdate();
            const embedconfigmp = new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Configuração do bot`)
            .setDescription(`**<:comandos212:1114677750704373890> | Configurando Mercado Pago.\n\n<:pix:1105629568557121556> | Pix: \`\`${config.get(`pixonoff`)}\`\`\n🔗 | Site: \`\`${config.get(`siteonoff`)}\`\`\n<:relogio:1101531875400503447> | Tempo Para Pagar: ${config.get(`tempopagar`)}\n<:MercadoPago:1100605984101113886> | Access Token: ||${config.get(`access_token`)}||**`)
            .setFooter(`Configure usando os botões abaixo.`)
            .setThumbnail(`${config.get(`foto`)}`)
            .setColor(config.get(`color`))
            embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] }) 
           }

          if (interaction.customId === "tempopagar") {
            interaction.deferUpdate();
            message.channel.send("<a:carregando:1069285457218773092> | Qual o tempo para pagar (em milissegundos)?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 const newt = message.content
                 config.set(`tempopagar`, newt)
                 msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                             
                 const embedconfigmp = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)} | Configuração do bot`)
                  .setDescription(`**<:comandos212:1114677750704373890> | Configurando Mercado Pago.\n\n<:pix:1105629568557121556> | Pix: \`\`${config.get(`pixonoff`)}\`\`\n🔗 | Site: \`\`${config.get(`siteonoff`)}\`\`\n<:relogio:1101531875400503447> | Tempo Para Pagar: ${config.get(`tempopagar`)}\n<:MercadoPago:1100605984101113886> | Access Token: ||${config.get(`access_token`)}||**`)
                  .setFooter(`Selecione o sistema de deseja configurar.`)
                  .setThumbnail(`${config.get(`foto`)}`)
                  .setColor(config.get(`color`))
                  embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] })
                 })
               })
          }
        
          if (interaction.customId === "configmpttoken") {
            interaction.deferUpdate();
            message.channel.send("<a:carregando:1069285457218773092> | Qual o novo acesstoken?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 const newt = message.content
                 config.set(`access_token`, newt)
                 msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                             
                 const embedconfigmp = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)} | Configuração do bot`)
                  .setDescription(`**<:comandos212:1114677750704373890> | Configurando Mercado Pago.\n\n<:pix:1105629568557121556> | Pix: \`\`${config.get(`pixonoff`)}\`\`\n🔗 | Site: \`\`${config.get(`siteonoff`)}\`\`\n<:relogio:1101531875400503447> | Tempo Para Pagar: ${config.get(`tempopagar`)}\n<:MercadoPago:1100605984101113886> | Access Token: ||${config.get(`access_token`)}||**`)
                  .setFooter(`Configure usando os botões abaixo`)
                  .setThumbnail(`${config.get(`foto`)}`)
                  .setColor(config.get(`color`))
                  embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] })
                 })
               })
          }

       if (interaction.customId === "voltar2") {
        interaction.deferUpdate();
        const embedvoltar2 = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configurações`)
          .setDescription(`**<:comandos212:1114677750704373890> | Configurando payments.**`)
          .setThumbnail(`${config.get(`foto`)}`)
          .setFooter(`Selecione o sistema de deseja configurar.`)
          .setColor(config.get(`color`))
        embed.edit({ embeds: [embedvoltar2], components: [rowconfigpays2]})
       }

       const rowconfigbot = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('nomeconfig')
            .setEmoji('<:w_passaporte:1102400460788351057>')
            .setLabel('Nome')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('titleconfig')
            .setEmoji('<:ticketlog:1100582396744716318>')
            .setLabel('Title')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('statusconfig')
            .setEmoji('<a:black_uu:1100612986642640986>')
            .setLabel('Status')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('prefixconfig')
            .setEmoji('<a:p_star:1110263202454962186>')
            .setLabel('Prefix')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('colorconfig')
            .setEmoji('<a:fixado:1104802923814326322>')
            .setLabel('Color')
            .setStyle('PRIMARY'),
        );
        const rowconfigbot2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('cargoconfig')
            .setEmoji('<a:coroablack_cpx:1069286284058705972>')
            .setLabel('Cargo')
            .setStyle('PRIMARY'),
        )  
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('voltar4')
            .setEmoji('⬅️')
            .setLabel('Voltar')
            .setStyle('PRIMARY'),
        );

       if (interaction.customId === "configbot") {
        interaction.deferUpdate();
        const embedconfigbot = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Configurações`)
          .setDescription(`**<:config:1093297723261857833> | Configurando Bot.\n\n<:config:1093297723261857833> | Nome: \`\`${config.get(`nomebot`)}\`\`\n<:config:1093297723261857833> | Title: \`\`${config.get(`title`)}\`\`\n<:config:1093297723261857833> | Status: \`\`${config.get(`status`)}\`\`\n<:config:1093297723261857833> | Prefix: \`\`${config.get(`prefix`)}\`\`\n<:config:1093297723261857833> | Color: ${config.get(`color`)}\n<:config:1093297723261857833> | Cargo Cliente: <@&${config.get(`role`)}>**`)
          .setThumbnail(`${config.get(`foto`)}`)
          .setFooter(`Configure usando os botões abaixo`)
          .setColor(config.get(`color`))
        embed.edit({ embeds: [embedconfigbot], components: [rowconfigbot, rowconfigbot2] })  
       }

       if (interaction.customId === "nomeconfig") {
        interaction.deferUpdate();
        message.channel.send("<:config:1093297723261857833> | Qual o novo nome do bot?").then(msg => {
         const filter = m => m.author.id === interaction.user.id;
         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
          collector.on("collect", message => {
            message.delete()
            const newt = message.content
            client.user.setUsername(message.content);
            config.set(`nomebot`, newt)
            msg.edit("<:config:1093297723261857833> | Alterado!")
                       
            const embednew = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configuração do bot`)
              .setDescription(`**<:config:1093297723261857833> | Configurando Bot.\n\n<:config:1093297723261857833> | Nome: \`\`${config.get(`nomebot`)}\`\`\n<:config:1093297723261857833> | Title: \`\`${config.get(`title`)}\`\`\n<:config:1093297723261857833> | Status: \`\`${config.get(`status`)}\`\`\n<:config:1093297723261857833> | Prefix: \`\`${config.get(`prefix`)}\`\`\n<:config:1093297723261857833> | Color: ${config.get(`color`)}\n<:config:1093297723261857833> | Cargo Cliente: <@&${config.get(`role`)}>**`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setColor(config.get(`color`))
            embed.edit({ embeds: [embednew] })
            })
          })
        }

        if (interaction.customId === "titleconfig") {
          interaction.deferUpdate();
          message.channel.send("<:config:1093297723261857833> | Qual o novo title do bot?").then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              const newt = message.content
              client.user.setUsername(message.content);
              config.set(`nomebot`, newt)
              msg.edit("<:config:1093297723261857833> | Alterado!")
                         
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configuração do bot`)
                .setDescription(`**<:config:1093297723261857833> | Configurando Bot.\n\n<:config:1093297723261857833> | Nome: \`\`${config.get(`nomebot`)}\`\`\n<:config:1093297723261857833> | Title: \`\`${config.get(`title`)}\`\`\n<:config:1093297723261857833> | Status: \`\`${config.get(`status`)}\`\`\n<a:config:1093297723261857833> | Prefix: \`\`${config.get(`prefix`)}\`\`\n<:config:1093297723261857833> | Color: ${config.get(`color`)}\n<:config:1093297723261857833> | Cargo Cliente: <@&${config.get(`role`)}>**`)
                .setThumbnail(`${config.get(`foto`)}`)
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew] })
              })
            })
          }
      if (interaction.customId === "colorconfig") {
        interaction.deferUpdate();
        message.channel.send("<:config:1093297723261857833> | Qual a nova cor em hex?").then(msg => {
         const filter = m => m.author.id === interaction.user.id;
         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
          collector.on("collect", message => {
            message.delete()
            const newt = message.content
            config.set(`color`, newt)
            msg.edit("<:config:1093297723261857833> | Alterado!")
                       
            const embednew = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configuração do bot`)
              .setDescription(`**<:config:1093297723261857833> | Configurando Bot.\n\n<:config:1093297723261857833> | Nome: \`\`${config.get(`nomebot`)}\`\`\n<:config:1093297723261857833> | Title: \`\`${config.get(`title`)}\`\`\n<:config:1093297723261857833> | Status: \`\`${config.get(`status`)}\`\`\n<:config:1093297723261857833> | Prefix: \`\`${config.get(`prefix`)}\`\`\n<:config:1093297723261857833> | Color: ${config.get(`color`)}\n<:config:1093297723261857833> | Cargo Cliente: <@&${config.get(`role`)}>**`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setColor(config.get(`color`))
            embed.edit({ embeds: [embednew] })
            })
          })
        }
      if (interaction.customId === "cargoconfig") {
        interaction.deferUpdate();
        message.channel.send("<:config:1093297723261857833> | Qual o novo cargo de cliente em id?").then(msg => {
         const filter = m => m.author.id === interaction.user.id;
         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
          collector.on("collect", message => {
            message.delete()
            const newt = message.content
            config.set(`role`, newt);
            msg.edit("<:config:10932977232618578334> | Alterado!")
                       
            const embednew = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configuração do bot`)
              .setDescription(`**<:config:1093297723261857833> | Configurando Bot.\n\n<:config:1093297723261857833> | Nome: \`\`${config.get(`nomebot`)}\`\`\n<:config:1093297723261857833> | Title: \`\`${config.get(`title`)}\`\`\n<:config:1093297723261857833> | Status: \`\`${config.get(`status`)}\`\`\n<:config:1093297723261857833> | Prefix: \`\`${config.get(`prefix`)}\`\`\n<:config:1093297723261857833> | Color: ${config.get(`color`)}\n<:config:1093297723261857833> | Cargo Cliente: <@&${config.get(`role`)}>**`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setColor(config.get(`color`))
            embed.edit({ embeds: [embednew] })
            })
          })
        }

        if (interaction.customId === "voltar4") {
          interaction.deferUpdate();
          const embedvoltar4 = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configurações`)
          .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n<:config:1093297723261857833> | Sistema de vendas: \`\`${config.get(`vendasonoff`)}\`\`\n\nBotão para add o bot em qualquer server:\n[Aqui](${config.get(`linkdobot`)})**`)
          .setThumbnail(`${config.get(`foto`)}`)
          .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
          .setColor(config.get(`color`))
          embed.edit({ embeds: [embedvoltar4], components: [row, rownes] })
         }

         const rowconfigcanais = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('categoriaconfig')
            .setEmoji('<:config:1093297723261857833>')
            .setLabel('Categoria Carrinho')
            .setStyle('PRIMARY'),
        )

        .addComponents(
          new Discord.MessageButton()
            .setCustomId('canalvoz')
            .setEmoji('<:config:1093297723261857833>')
            .setLabel('Canal de Voz')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('logsconfig')
            .setEmoji('<:config:1093297723261857833>')
            .setLabel('Logs Vendas')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('logs2config')
            .setEmoji('<:config:1093297723261857833>')
            .setLabel('Logs Vendas Staff')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('canaltermosconfig')
            .setEmoji('<:config:1093297723261857833>')
            .setLabel('Canal Termos')
            .setStyle('PRIMARY'),
            );

        const rowconfigcanais2 = new Discord.MessageActionRow()
            .addComponents(
          new Discord.MessageButton()
            .setCustomId('voltar8')
            .setEmoji('config:1093297723261857833')
            .setLabel('Voltar')
            .setStyle('PRIMARY'),
        );

         if (interaction.customId === "configcanais") {
          interaction.deferUpdate();
          const embedcanaisconfig = new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Configuração dos canais`)
            .setThumbnail(config.get(`foto`))
            .setDescription(`**<:comandos212:1114677750704373890> | Configurando canais.\n\n<:1050595582231724102:1069285194605002763> | Categoria Carrinho: <#${config.get(`category`)}>\n<a:Aviso:1069285985185181776> | Canal Voz: <#${config.get(`canalvoz`)}>\n<a:NL_sino:1093559199922913310> | Logs Vendas: <#${config.get(`logs`)}>\n<a:staff_gif:1103419912740945921> | Logs Vendas Staff: <#${config.get(`logs_staff`)}>\n<a:Aviso:1069285985185181776> | Canal Termos: <#${config.get(`canaltermos`)}>**`)
            .setColor(config.get(`color`))
          embed.edit({ embeds: [embedcanaisconfig], components: [rowconfigcanais, rowconfigcanais2] })  
         }

         if (interaction.customId === "categoriaconfig") {
          interaction.deferUpdate();
          message.channel.send("<a:carregando:1069285457218773092> | Qual a nova de categoria dos carrinhos em id?").then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              const newt = message.content
              config.set(`category`, newt)
              msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                          
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configuração dos canais`)
                .setThumbnail(config.get(`foto`))
                .setDescription(`**<:comandos212:1114677750704373890> | Configurando canais.\n\n<:1050595582231724102:1069285194605002763> | Categoria Carrinho: <#${config.get(`category`)}>\n<a:Aviso:1069285985185181776> | Canal Voz: <#${config.get(`canalvoz`)}>\n<a:NL_sino:1093559199922913310> | Logs Vendas: <#${config.get(`logs`)}>\n<a:staff_gif:1103419912740945921> | Logs Vendas Staff: <#${config.get(`logs_staff`)}>\n<a:Aviso:1069285985185181776> | Canal Termos: <#${config.get(`canaltermos`)}>**`)
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew] })
              })
            })
          }

          if (interaction.customId === "canalvoz") {
            interaction.deferUpdate();
            message.channel.send("<a:carregando:1069285457218773092> | Qual o novo canal de voz em id?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1});
              collector.on("collect", message => {
                message.delete()
                const newt = message.content
                config.set(`canalvoz`, newt)
                message.edit("<a:Sim:1069123911867961344> | Alterado!")

                const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configuração dos canais`)
                .setColor(config.get(`color`))
                .setThumbnail(config.get(`foto`))
                .setDescription(`**<:comandos212:1114677750704373890> | Configurando canais.\n\n<:1050595582231724102:1069285194605002763> | Categoria Carrinho: <#${config.get(`category`)}>\n<a:Aviso:1069285985185181776> | Canal Voz: <#${config.get(`canalvoz`)}>\n<a:NL_sino:1093559199922913310> | Logs Vendas: <#${config.get(`logs`)}>\n<a:staff_gif:1103419912740945921> | Logs Vendas Staff: <#${config.get(`logs_staff`)}>\n<a:Aviso:1069285985185181776> | Canal Termos: <#${config.get(`canaltermos`)}>**`)
                embed.edit({ embeds: [embednew] })
              })
            })
          }

         if (interaction.customId === "logsconfig") {
          interaction.deferUpdate();
          message.channel.send("<a:carregando:1069285457218773092> | Qual o novo canal de logs de vendas em id?").then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              const newt = message.content
              config.set(`logs`, newt)
              msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                          
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configuração dos canais`)
                .setDescription(`**<:comandos212:1114677750704373890> | Configurando canais.\n\n<:1050595582231724102:1069285194605002763> | Categoria Carrinho: <#${config.get(`category`)}>\n<a:Aviso:1069285985185181776> | Canal Voz: <#${config.get(`canalvoz`)}>\n<a:NL_sino:1093559199922913310> | Logs Vendas: <#${config.get(`logs`)}>\n<a:staff_gif:1103419912740945921> | Logs Vendas Staff: <#${config.get(`logs_staff`)}>\n<a:Aviso:1069285985185181776> | Canal Termos: <#${config.get(`canaltermos`)}>**`)
                .setThumbnail(config.get(`foto`))
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew] })
              })
            })
          }

          if (interaction.customId === "logs2config") {
            interaction.deferUpdate();
            message.channel.send("<a:carregando:1069285457218773092> | Qual o novo canal de logs de vendas staff em id?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", message => {
                message.delete()
                const newt = message.content
                config.set(`logs_staff`, newt)
                msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                          
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configuração dos canais`)
                .setDescription(`**<:comandos212:1114677750704373890> | Configurando canais.\n\n<:1050595582231724102:1069285194605002763> | Categoria Carrinho: <#${config.get(`category`)}>\n<a:Aviso:1069285985185181776> | Canal Voz: <#${config.get(`canalvoz`)}>\n<a:NL_sino:1093559199922913310> | Logs Vendas: <#${config.get(`logs`)}>\n<a:staff_gif:1103419912740945921> | Logs Vendas Staff: <#${config.get(`logs_staff`)}>\n<a:Aviso:1069285985185181776> | Canal Termos: <#${config.get(`canaltermos`)}>**`)
                .setThumbnail(config.get(`foto`))
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew] })
              })
            })
          }
          if (interaction.customId === "canaltermosconfig") {
            interaction.deferUpdate();
            message.channel.send("<a:carregando:1069285457218773092> | Qual o novo canal de termos em id?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", message => {
                message.delete()
                const newt = message.content
                config.set(`category`, newt)
                msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                            
                const embednew = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)} | Configuração dos canais`)
                  .setThumbnail(config.get(`foto`))
                  .setDescription(`**<:comandos212:1114677750704373890> | Configurando canais.\n\n<:1050595582231724102:1069285194605002763> | Categoria Carrinho: <#${config.get(`category`)}>\n<a:Aviso:1069285985185181776> | Canal Voz: <#${config.get(`canalvoz`)}>\n<a:NL_sino:1093559199922913310> | Logs Vendas: <#${config.get(`logs`)}>\n<a:staff_gif:1103419912740945921> | Logs Vendas Staff: <#${config.get(`logs_staff`)}>\n<a:Aviso:1069285985185181776> | Canal Termos: <#${config.get(`canaltermos`)}>**`)
                  .setColor(config.get(`color`))
                embed.edit({ embeds: [embednew] })
                })
              })
            }

            if (interaction.customId === "voltar8") {
              interaction.deferUpdate();
              const embedvoltar8 = new Discord.MessageEmbed()
              .setTitle(`${config.get(`title`)} | Configurações`)
              .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n<:Dinheiro:1114682101917307011> | Sistema de vendas: \`\`${config.get(`vendasonoff`)}\`\`\n\nBotão para add o bot em qualquer server:\n[Aqui](${config.get(`linkdobot`)})**`)
              .setThumbnail(`${config.get(`foto`)}`)
              .setFooter({ text: `${config.get(`title`)} - Direitos reservados.` })
              .setColor(config.get(`color`))
              embed.edit({ embeds: [embedvoltar8], components: [row, rownes] })
            }

            

          })
            }
              }
            

           
         
      

       
    