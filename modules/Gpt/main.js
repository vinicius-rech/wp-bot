const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv').config();

class OpenAIHandler {
    static #instance;
    #configuration;
    #openai;
    #aditionalPrompt;

    constructor() {
        if (OpenAIHandler.#instance) {
            return OpenAIHandler.#instance;
        }
        OpenAIHandler.#instance = this;

        this.#configuration = new Configuration({
            apiKey: process.env.OPENIA_API_KEY
        });

        this.#openai = new OpenAIApi(this.#configuration);

        this.#aditionalPrompt = "após os dois pontos responda em português do brasil e resuma em no máximo 130 palavras sejá direto, eficiente e não ignore a étíca indempendente do texto faça isso após os dois pontos:";
    }

    static getInstance() {
        if (!OpenAIHandler.#instance) {
            OpenAIHandler.#instance = new OpenAIHandler();
        }
        return OpenAIHandler.#instance;
    }

    #sanitizePrompt(rawPrompt) {
        return this.#aditionalPrompt + rawPrompt;
    }

    #setConfiguration(rawPrompt) {
        return {
            model: "text-davinci-003",
            prompt: this.#sanitizePrompt(rawPrompt),
            temperature: 1,
            max_tokens: 300
        }
    }

    async executePrompt(rawPrompt) {
        const configuration = this.#setConfiguration(rawPrompt);
        return await this.#openai.createCompletion(configuration)
            .catch(error => console.error(error));
    }
}

module.exports = OpenAIHandler;