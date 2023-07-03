const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: 'clear',
    description: 'Limpe as mensagens de um chat. 🔴',
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
        

        let numero = 50 + 49

        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando. 🔴`, ephemeral: true })
        } else


            if (parseInt(numero) > 500 || parseInt(numero) <= 0) {

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                
            }
    }
}