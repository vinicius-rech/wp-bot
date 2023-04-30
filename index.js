import { Client, LocalAuth } from 'whatsapp-web.js';
import { executePrompt } from './modules/GptHandler';

import qrcode from 'qrcode-terminal'

const _authStrategy = new LocalAuth();

const _configuration = {
    puppeteer: {
        args: ['--no-sandbox']
    },
    authStrategy: _authStrategy
}

const _client = new Client(_configuration);

_client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
})

_client.on('ready', async _ => {
    const chats = await _client.getChats();
    const groups = chats.filter(chat => chat.isGroup);

    console.log(groups[0]);

    // const message = 'BOT ONLINE';
    //
    // groups.forEach(group => {
    //     _client.sendMessage(group.id._serialized, message);
    // })
    console.log('BOT ONLINE');
});

_client.on('message', async (message) => {
    if (/!gpt/i.test(message.body)) {
        if (message.body.length < 10) {
            await message.reply("Sua mensagem deve conter 10 letras ou mais.")
                .catch(replyError => console.error(replyError));
            return false;
        }
        const { data } = await executePrompt(message.body)
            .catch(error => console.error(error));

        await message.reply(data.choices[0].text)
            .catch(replyError => console.error(replyError));
    }
});

_client.on('message', async (message) => {
    if (/gay/i.test(message.body)) {
        const { data } = await executePrompt(message.body)
            .catch(error => console.error(error));

        await message.reply(data.choices[0].text)
            .catch(replyError => console.error(replyError));
    }
});

_client.on('message', async message => {
    if (/porra/i.test(message.body)) {
        const emoji = '💦';
        await message.react(emoji).catch(error => console.error(error));
    }
});

(async _ => {
    await _client.initialize().catch(clientError => console.error(clientError));
})();