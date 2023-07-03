const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "criar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:No:1069123947897036880> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`<a:No:1069123947897036880> | Você não deu nenhum ID a esse produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:No:1069123947897036880> | Você não pode colocar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] === `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:No:1069123947897036880> | Esse ID de produto já é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      
      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel('Adicionar ao Carrinho')
            .setEmoji("<:1050595582231724102:1069285194605002763>")
            .setStyle('SECONDARY'),
      );
       
      const adici = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Produto`)
                .setColor(config.get(`color`))
        .setDescription(`\`\`\`Sem descrição ainda...\`\`\`\n**<a:planeta:1069299142599393311> | Nome:** __Sem nome ainda...__\n**<:Carteira:1099970324080103494> | Preço:** __5.00__\n**<:caixa:1093295940951093259> | Estoque:** __0__`)
        .setColor(config.get(`color`))
        
      message.channel.send({embeds: [adici], components: [row]})
        
      const idproduto = args[0]
        db.set(`${idproduto}.idproduto`, `${idproduto}`)
        db.set(`${idproduto}.nome`, `Nada...`) 
        db.set(`${idproduto}.desc`, `Nada...`) 
        db.set(`${idproduto}.preco`, `0.0`) 

        db.push(`${idproduto}.conta`, `${idproduto}`)
        const a = db.get(`${idproduto}.conta`);
        const removed = a.splice(0, 1);
        db.set(`${idproduto}.conta`, a);
       }
     }