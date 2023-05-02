const { Client, LocalAuth } = require('whatsapp-web.js');
const OpenAIHandler = require('../Gpt/main.js');
const qrcode = require('qrcode-terminal');

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
            // const chats = await this._client.getChats();
            // const groups = chats.filter(chat => chat.isGroup);
            // const message = 'BOT ONLINE';

            // console.log(groups[0])

            // groups.forEach(group => {
            //     this._client.sendMessage(group.id._serialized, message);
            // })
            console.log('BOT ONLINE');
        });

        this.client.on('message', async (message) => {
            if (/!gpt/i.test(message.body)) {
                const gpt = new OpenAIHandler();

                if (message.body.length < 10) {
                    await message.reply("Sua mensagem deve conter 10 letras ou mais.")
                        .catch(replyError => console.error(replyError));
                    return false;
                }
                const response = await gpt.executePrompt(message.body)
                    .catch(error => console.error(error));

                await message.reply(response.data.choices[0].text)
                    .catch(replyError => console.error(replyError));
            }
        });

        this.client.on('message', async message => {
            if (/porra/i.test(message.body)) {
                const emoji = '💦';
                await message.react(emoji).catch(error => console.error(error));
            }
        });

        this.client.on('message', async message => {
            if (/!propaganddati/i.test(message.body)) {
                message.reply("!propaganddati")
                    .catch(replyError => console.error(replyError));
            }
        });

        return this.client.initialize().catch(clientError => console.error(clientError));
    }
}

module.exports = WhatsappBot;
