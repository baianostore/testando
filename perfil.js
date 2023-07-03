const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "perfil", 
    run: async(client, message, args) => {
     if (!message.mentions.members.first()) {
      
      const id = message.author.id;
      const gasto = db2.get(`${id}.gastosaprovados`) || "0";
      const pedidos = db2.get(`${id}.pedidosaprovados`) || "0";
      const saldototal = db4.get(`${interaction.user}.saldo`)
        
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Seu perfil`)
        .addField(`<:1050595582231724102:1069285194605002763> | Produtos comprados:`, `${pedidos} compras realizadas.`)
        .addField(`<:Carteira:1099970324080103494> | Dinheiro gasto:`, `R$ ${gasto} Reais`)
        .addField(`💰 | Total Saldo:`, `${saldototal}`)
        .setColor(config.get(`color`))
      message.reply({embeds: [embed]})
     } else {
      const id = message.mentions.users.first();
      const gasto = db2.get(`${id.id}.gastosaprovados`) || "0";
      const pedidos = db2.get(`${id.id}.pedidosaprovados`) || "0";
      const saldototal = db4.get(`${interaction.user}.saldo`)  

      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Perfil do ${id.username}`)
        .addField(`<:1050595582231724102:1069285194605002763> | Produtos comprados:`, `${pedidos} compras realizadas.`)
        .addField(`<:Carteira:1099970324080103494> | Dinheiro gasto:`, `R$ ${gasto} Reais`)
        .addField(`💰 | Total Saldo:`, `${saldototal}`)
        .setColor(config.get(`color`))
      message.reply({embeds: [embed]})
     }
   }
}