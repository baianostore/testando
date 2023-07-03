const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "config", 
    run: async(client, message, args) => {
        if (message.author.id !== config.get(`owner`)) return message.reply(`<a:No:1069123947897036880> | Apenas o dono do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(!args[0]) return message.reply(`<a:No:1069123947897036880> | Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[1]) return message.reply(`<a:No:1069123947897036880> | Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:No:1069123947897036880> | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
        const adb = args[0];
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('descgerenciar')
                    .setEmoji('<:desc:1110253346457141289>')
                    .setLabel('Descrição')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('bangerenciar')
                    .setEmoji('<:w_passaporte:1102400460788351057>')
                    .setLabel('Banner')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('nomegerenciar')
                    .setEmoji('<a:planeta:1069299142599393311>')
                    .setLabel('Nome')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('precogerenciar')
                    .setEmoji('<:Carteira:1099970324080103494>')
                    .setLabel('Preço')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('stock')
                    .setEmoji('<:caixa:1093295940951093259>')
                    .setLabel('Estoque')
                    .setStyle('SUCCESS'),
            )

            const row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId(`cinfigavancas`)
                .setEmoji(`<:comandos212:1114677750704373890>`)
                .setLabel('Configurações Avançadas')
                .setDisabled(true)
                .setStyle('PRIMARY')
            )

            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('rlgerenciar')
                    .setEmoji('<a:carregando:1069285457218773092>')
                    .setLabel('Atualizar Mensagem')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('deletegerenciar')
                    .setEmoji('<:limpar:1072582356692652092>')
                    .setLabel('Deletar')
                    .setStyle('DANGER'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('infos')
                    .setEmoji('<:emoji_77:1115068695035781230>')
                    .setLabel('')
                    .setDisabled(true)
                    .setStyle('PRIMARY'),
            );
           
        
            const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
                .setDescription(`<:comandos212:1114677750704373890> | Id: \`\`${adb}\`\`\n<:desc:1110253346457141289> | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n<a:planeta:1069299142599393311> | Nome: ${db.get(`${adb}.nome`)}\n<:Carteira:1099970324080103494> | Preço: ${db.get(`${adb}.preco`)}\n<:caixa:1093295940951093259> | Estoque: ${db.get(`${adb}.conta`).length}`)
                .setImage(db.get(`${adb}.banner`))
                .setColor(config.get(`color`))], components: [row, row2]})
            const interação = msg.createMessageComponentCollector({
               componentType: "BUTTON",
            })
  
            interação.on("collect", async (interaction) => {
               if (message.author.id != interaction.user.id) {
               return;
            }
                
                if (interaction.customId === "deletegerenciar") {
                    msg.delete()
                    msg.channel.send("<a:Sim:1069123911867961344>| Excluido!")
                    db.delete(adb)
                }

                if (interaction.customId === "bangerenciar") {
                    interaction.deferUpdate();
                     msg.channel.send("<a:carregando:1069285457218773092> | Qual o novo link do banner?").then(msg => {
                         const filter = m => m.author.id === interaction.user.id;
                         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                         collector.on("collect", message => {
                             message.delete()
                             db.set(`${adb}.banner`, message.content)
                             msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                         })
                     })
                 }

                if (interaction.customId === "precogerenciar") {
                   interaction.deferUpdate();
                    msg.channel.send("<a:carregando:1069285457218773092> | Qual o novo preço?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.preco`, Number(message.content.replace(",", ".")))
                            msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                        })
                    })
                }
                if (interaction.customId === "nomegerenciar") {
        interaction.deferUpdate();
                    msg.channel.send("<a:carregando:1069285457218773092> | Qual o novo nome?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.nome`, `${message.content}`)
                            msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                        })
                    })
                }
    if (interaction.customId === 'descgerenciar') {
        interaction.deferUpdate();
                    msg.channel.send("<a:carregando:1069285457218773092> | Qual a nova descrição?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.desc`, `${message.content}`)
                            msg.edit("<a:Sim:1069123911867961344> | Alterado!")
                        })
                    })
                }
    if (interaction.customId === 'rlgerenciar') {
        interaction.deferUpdate();
         const embed = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
           .setDescription(`<:desc:1110253346457141289> | Descrição: \`\`\` ${db.get(`${adb}.desc`)}\`\`\`\n<a:planeta:1069299142599393311> | Nome: ${db.get(`${adb}.nome`)}\n<:Carteira:1099970324080103494> | Preço: ${db.get(`${adb}.preco`)}\n<:caixa:1093295940951093259> | Estoque: ${db.get(`${adb}.conta`).length}`)
           setImage(db.get(`${adb}.banner`))
           .setColor(config.get(`color`))
           msg.edit({ embeds: [embed] })
           message.channel.send("<a:Sim:1069123911867961344> | Atualizado!")
                }
              


               const rowstock = new Discord.MessageActionRow()
               .addComponents(
                new Discord.MessageButton()
                  .setCustomId('addestoque')
                  .setEmoji('<:mais:1095464541535608896>')
                  .setLabel('Adicionar')
                  .setStyle('SUCCESS'),
              )
              .addComponents(
                new Discord.MessageButton()
                  .setCustomId('remestoque')
                  .setEmoji('<:menos:1072595008873562163>')
                  .setLabel('Remover')
                  .setStyle('DANGER'),
              )
              .addComponents(
                new Discord.MessageButton()
                  .setCustomId('bckestoque')
                  .setEmoji('<:caixa:1093295940951093259>')
                  .setLabel('Backup')
                  .setStyle('SECONDARY'),
              )
              .addComponents(
                new Discord.MessageButton()
                  .setCustomId('clestoque')
                  .setEmoji('<:limpar:1072582356692652092>')
                  .setLabel('Limpar')
                  .setStyle('DANGER'),
              )
              .addComponents(
                new Discord.MessageButton()
                  .setCustomId('rlestoque')
                  .setEmoji('<a:carregando:1069285457218773092>')
                  .setLabel('Atualizar Mensagem')
                  .setStyle('PRIMARY'),
              );

              const rowstock2 = new Discord.MessageActionRow()
              .addComponents(
                new Discord.MessageButton()
                  .setCustomId('voltar')
                  .setEmoji('⬅️')
                  .setLabel('Voltar')
                  .setStyle('PRIMARY'),
              );

              if (interaction.customId === "stock") {
                interaction.deferUpdate();
                var contas = `${db.get(`${adb}.conta`)}`.split(',');
                var bacxackup = `📦 | ${contas.join(`\n📦 | `)}`
                const embed = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)} | Estoque o(a) ${adb}`)
                 .setDescription(`**Este é seu estoque:**\n\n\ ${bacxackup}`)
                 .setColor(config.get(`color`))
                 .setFooter(`Seu estoque completo é este.`)
               msg.edit({ embeds: [embed], components: [rowstock, rowstock2] })
              }

              const rowstocaddk = new Discord.MessageActionRow()
              .addComponents(
               new Discord.MessageButton()
                 .setCustomId('linha')
                 .setEmoji('<:ticketlog:1100582396744716318>')
                 .setLabel('Adicionar Por linha')
                 .setStyle('PRIMARY'),
             )
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('umpo')
                 .setEmoji('<:mais:1095464541535608896>')
                 .setLabel('Adicionar Por Vez')
                 .setStyle('PRIMARY'),
             )
             .addComponents(
                new Discord.MessageButton()
                  .setCustomId('voltar1')
                  .setEmoji('⬅️')
                  .setLabel('Voltar')
                  .setStyle('PRIMARY'),
              );

              if (interaction.customId === "addestoque") {
                interaction.deferUpdate();
                const embedadds = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)} | Gerenciando o(a) ${adb}`)
                 .setDescription(`<:config:1093297723261857833> | Adicionar por linha ou um por um?`)
                 .setColor(config.get(`color`))
                msg.edit({ embeds: [embedadds], components: [rowstocaddk] })
           }

           if (interaction.customId === "linha") {
            const embede = new Discord.MessageEmbed().setDescription(`Envie o produto de um em um, quando terminar de enviar digite: "finalizar"`)
            .setColor(config.get(`color`))
            msg.edit({ embeds: [embede], components: [] }).then(msg => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = msg.channel.createMessageCollector({ filter })
                collector.on("collect", message => {
           
                    

                    if (message.content === "finalizar") {
                        interaction.deferUpdate();
                        collector.stop();
                        var contas = `${db.get(`${adb}.conta`)}`.split(',');
                var bacxackup = `📦 | ${contas.join(`\n📦 | `)}`
                const embed = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)} | Estoque o(a) ${adb}`)
                 .setDescription(`**Este é seu estoque:**\n\n\ ${bacxackup}`)
                 .setColor(config.get(`color`))
                 .setFooter(`Seu estoque completo é este.`)
               msg.edit({ embeds: [embed], components: [rowstock, rowstock2] })
                                        
                } else {

                        message.delete()

                        db.push(`${adb}.conta`, `${message.content}`)
                    }
                })
            })

            

        }

           if (interaction.customId === "umpo") {
            interaction.deferUpdate();
            msg.channel.send(" <a:carregando:1069285457218773092> | Envie os novos produtos no chat!").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter })
             collector.on("collect", message => {
                const content = message.content.split('\n');
                const contasnb = message.content.split('\n').length;
                var contas = content;
                var etapa = 0;
                var etapaf = contasnb;
                collector.stop();
                message.delete()
                const timer = setInterval(async function() {
                if(etapa === etapaf) {
                 msg.edit(`<a:Sim:1069123911867961344> | Pronto, \`${etapaf}\`\ Produtos foram adicionados com sucesso!`)
                 clearInterval(timer)
                 return;
                }
                const enviando = contas[etapa];
                db.push(`${adb}.conta`, `${enviando}`)
                etapa = etapa + 1
              }, 100)   
           })
         })
       }


           if (interaction.customId === "voltar1") {
            interaction.deferUpdate();
            var contas = `${db.get(`${adb}.conta`)}`.split(',');
                var bacxackup = `📦 | ${contas.join(`\n📦 | `)}`
                const embed = new Discord.MessageEmbed()
                 .setTitle(`${config.get(`title`)} | Estoque o(a) ${adb}`)
                 .setDescription(`**Este é seu estoque:**\n\n\ ${bacxackup}`)
                 .setColor(config.get(`color`))
                 .setFooter(`Seu estoque completo é este.`)
               msg.edit({ embeds: [embed], components: [rowstock, rowstock2] })
       }

           if (interaction.customId === "remestoque") {
            interaction.deferUpdate();
            msg.channel.send("<a:carregando:1069285457218773092> | Envie a linha do produto que você quer remover!").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 })
              collector.on("collect", message1 => {
                 const a = db.get(`${adb}.conta`);
                 a.splice(message1.content, 1)
                 db.set(`${adb}.conta`, a);
                 message1.delete()
                 msg.edit(`<a:Sim:1069123911867961344> | O Produto número \`${message1}\`\ foi removido com sucesso!`)
               })
             })
           }

           if (interaction.customId === 'clestoque') {
            interaction.deferUpdate();
            const a = db.get(`${adb}.conta`);
            const removed = a.splice(0, `${db.get(`${adb}.conta`).length}`);
             db.set(`${adb}.conta`, a);
             msg.channel.send("<a:Sim:1069123911867961344> | Estoque limpo!")
           }
          if (interaction.customId === 'bckestoque') {
               interaction.deferUpdate();
               message.channel.send("<a:Sim:1069123911867961344> | Enviado com sucesso!")
               var quantia = 1;
               var contas = `${db.get(`${adb}.conta`)}`.split(',');
               var backup = `📦 | ${contas.join(`\n📦 | `)}`
               const embed = new Discord.MessageEmbed()
               .setTitle(`${config.get(`title`)} | Backup feito`)
               .setDescription(`\`\`\`${backup} \`\`\``)
               .setColor(config.get(`color`))
               message.author.send({embeds: [embed] })
             }
                       
           if (interaction.customId === 'rlestoque') {
               interaction.deferUpdate();
                const embed = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)} | Gerenciando o(a) ${adb}`)
                  .setDescription(`<:config:1093297723261857833> | Gerenciando o estoque do produto: ${db.get(`${adb}.nome`)}\n<:caixa:1093295940951093259> | Total Estoque: ${db.get(`${adb}.conta`).length}`)
                  .setColor(config.get(`color`))
                  msg.edit({ embeds: [embed] })
                  msg.channel.send("<a:Sim:1069123911867961344> | Atualizado!")
                       }

                       if (interaction.customId === "voltar") {
                        interaction.deferUpdate();
                        const embedvoltar = new Discord.MessageEmbed()
                           .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
                           .setDescription(`<:desc:1110253346457141289> | Descrição: \`\`\` ${db.get(`${adb}.desc`)}\`\`\`\n<a:planeta:1069299142599393311> | Nome: ${db.get(`${adb}.nome`)}\n<:Carteira:1099970324080103494> | Preço: ${db.get(`${adb}.preco`)}\n<:caixa:1093295940951093259> | Estoque: ${db.get(`${adb}.conta`).length}`)
                           .setImage(db.get(`${adb}.banner`))
                           .setColor(config.get(`color`)) 
                           msg.edit({ embeds: [embedvoltar], components: [row, row2]})
                     } 

            })

            }
           }