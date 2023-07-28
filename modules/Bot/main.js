const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { initDB } = require('../Database/main.js')

class WhatsappBot {
    static #instance;

    constructor() {
        if (WhatsappBot.#instance) {
            return WhatsappBot.#instance;
        }

        WhatsappBot.#instance = this;

        const authStrategy = new LocalAuth();

        this.configuration = {
            puppeteer: {
                args: ['--no-sandbox']
            },
            authStrategy
        }

        this.client = new Client(this.configuration);
    }

    initialize() {
        this.client.on('qr', qr => {
            qrcode.generate(qr, { small: true })
        });


        this.client.on('ready', async _ => {
            // const chats = await this.client.getChats();
            // const groups = chats.filter(chat => chat.isGroup);
            // const message = 'BOT ONLINE';
            //
            // groups.forEach(group => {
            //     this.client.sendMessage(group.id._serialized, message);
            // })

            console.log("online");
        });

        // this.client.on('message', async (message) => {
        //     if (/!gpt/i.test(message.body)) {
        //         const gpt = new OpenAIHandler();
        //
        //         if (message.body.length < 10) {
        //             await message.reply("Sua mensagem deve conter 10 letras ou mais.")
        //                 .catch(replyError => console.error(replyError));
        //             return false;
        //         }
        //         const response = await gpt.executePrompt(message.body)
        //             .catch(error => console.error(error));
        //
        //         await message.reply(response.data.choices[0].text)
        //             .catch(replyError => console.error(replyError));
        //     }
        // });

        // this.client.on('message', async message => {
        //     if (/!test/i.test(message.body)) {
        //         await message.reply(message.body.slice(5))
        //             .catch(replyError => console.error(replyError));
        //     }
        // });

        // Query realm for all instances of the "Task" type.

        initDB();


        return this.client.initialize()
            .catch(clientError => console.error(clientError));
    }
}

module.exports = WhatsappBot;
