const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const db = new JsonDatabase({ databasePath:"./databases/gifts.json" });

module.exports = {
    name: "resgatar", 
    run: async(client, message, args) => {
      
      if(!args[0]) return message.reply(`<a:No:1069123947897036880> | Coloque no mínimo um gift!`)
      if(args[1]) return message.reply(`<a:No:1069123947897036880> | Você não pode colocar mais de um gift!`)
      if(args[0] !== `${db.get(`${args[0]}.idgift`)}`) return message.reply(`<a:No:1069123947897036880> | Gift inválido!`)
      if(`${db.get(`${args[0]}.info`)}` == `Resgatado`) return message.reply(`<a:No:1069123947897036880> | Gift já resgatado!`)
      
      var texto = ""
      var quant = 1
      var estoque = `${db.get(`${args[0]}.estoque`)}`.split(',');
            
      for(let i in estoque) {
        texto = `${texto}${quant}° | ${estoque[i]}\n`
        quant++
      }
      
      db.set(`${args[0]}.info`, `Resgatado`)
      db.delete(`${args[0]}.estoque`)
      message.reply(`<a:Sim:1069123911867961344> | Resgatado com sucesso!`)
      const embed = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Gift Resgtado`)
          .addField(`<:caixa:1093295940951093259> | Presentes:`, `\`\`\`${texto}\`\`\``)
          .addField(`<a:apresente_gift:1104851040119042118> | Código:`, `${args[0]}`)
          .setColor(config.get(`color`))
      message.author.send({embeds: [embed]})
    }
  }      