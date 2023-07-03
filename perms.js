const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "perms", 
    run: async(client, message, args) => {
      if (message.author.id !== config.get(`owner`)) return message.reply(`<a:No:1069123947897036880> | Apenas o dono do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('adicionar')
            .setEmoji('<:mais:1095464541535608896>')
            .setLabel('Adicionar')
            .setStyle('SUCCESS'),
        )
        .addComponents(
            new Discord.MessageButton()
              .setCustomId('remover')
              .setEmoji('<:menos:1072595008873562163>')
              .setLabel('Remover')
              .setStyle('DANGER'),
          );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configuração dos termos`)
          .setDescription(`**<a:fixado:1104802923814326322> | Adicione e remova perms usando este comando.**`)
          .setThumbnail(`${config.get(`foto`)}`)
          .setColor(config.get(`color`))
          .setFooter(`Adicione e remova perms.`)], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
          interação.on("collect", async (interaction) => {
           if (message.author.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "adicionar") {
             interaction.deferUpdate();
             message.channel.send("<a:carregando:1069285457218773092> | Qual id que você quer dar perm?").then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                message.delete()
                 const user = message.content
                 perms.set(`${user}_id`, user)
                 msg.edit("<a:Sim:1069123911867961344> | Usuário adicionado!")
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Perms`)
                   .setDescription(`**Adicione e remova perms usando este comando.**`)
                   .setThumbnail(`${config.get(`foto`)}`)
                   .setColor(config.get(`color`))
                   .setFooter(`Adicione e remova perms.`)
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
             if (interaction.customId === "remover") {
              interaction.deferUpdate();
              message.channel.send("<a:carregando:1069285457218773092> | Qual o id que você quer retirar a perm?").then(msg => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = msg.channel.createMessageCollector({ filter, max: 1});
                collector.on("collect", message => {
                  message.delete()
                  const user = message.content
                  perms.delete(`${user}_id`)
                  msg.edit("<a:Sim:1069123911867961344> | Usuário removido!")

                  const embednew = new Discord.MessageEmbed()
                  .setTitle(`${config.get(`title`)} | Perms`)
                  .setDescription(`**<a:fixado:1104802923814326322> | Adicione e remova perms usando este comando.**`)
                  .setThumbnail(`${config.get(`foto`)}`)
                  .setColor(config.get(`color`))
                  .setFooter(`Adicione e remova perms.`)
                  embed.edit({ embeds: [embednew] })

                  
                })
              })
             }
          })
          }
        }