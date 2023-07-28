class TestMessageHandler extends MessageHandler {
    async handle(message) {
        if (/!test/i.test(message.body)) {
            await message.reply(message.body.slice(5))
                .catch(replyError => console.log(replyError));
            return;
        }

        return super.handle(message);
    }
}