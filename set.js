const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "set", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:No:1069123947897036880> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`<a:No:1069123947897036880> | Você não selecionou nenhum ID de produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:No:1069123947897036880> | Você não selecionar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:No:1069123947897036880> | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      message.delete();
      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel('Adicionar ao Carrinho')
            .setEmoji("<:1050595582231724102:1069285194605002763>")
            .setStyle('SECONDARY'),
      );
        
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Produto`)
        .setColor(config.get(`color`))
        
        .setDescription(`\`\`\`${db.get(`${args[0]}.desc`)}\`\`\`\n**<a:planeta:1069299142599393311> | Nome: ${db.get(`${args[0]}.nome`)}**\n**<:Carteira:1099970324080103494> | Preço: __${db.get(`${args[0]}.preco`,)}__**\n**<:caixa:1093295940951093259> | Estoque: __${db.get(`${args[0]}.conta`).length}__**`)
        .setImage(db.get(`${args[0]}.banner`))
        
      message.channel.send({embeds: [embed], components: [row]})
    }
}