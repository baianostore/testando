const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "help", 
    run: async(client, message, args) => {
        
        
        const embed = new Discord.MessageEmbed()
            .setTitle(`**${config.get(`title`)} | Comandos do bot**`)
            .setDescription(`**<a:NL_sino:1093559199922913310> | Comandos básicos.**\n\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**help** - Veja meus comandos.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**criarcupom "id"** - Crie um cupom.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**configcupom "id"** - Configure o cupom.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**criar "id"** - Crie produtos.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**config "id"** - Configure o produto.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**set "id"** - Setar um produto.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**criargift "id"** - Crie um gift.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**resgatar** - Resgate um gift.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**ids** - Veja todos os ids criados.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**gerenciarvendas** - Use para puxar dados de uma venda e também aprovar.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**rendimentos** - Veja seus rendimentos.\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**perms** - Adicione perms e remova\n<a:fixado:1104802923814326322> | ${config.get(`prefix`)}**addsaldo** - Adicione e remova saldo`)
            .setColor(config.get(`color`))
            .setFooter(`Todos meus comandos acima.`)
            .setThumbnail(config.get(`foto`))
            .setImage(config.get(`banner`))
        message.reply({ embeds: [embed] }) 

            }

            }
        
         
       
    