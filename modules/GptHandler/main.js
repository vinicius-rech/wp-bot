const dotenv = require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

const aditionalPrompt = "após os dois pontos responda em português do brasil e resuma em no máximo 130 palavras sejá direto, eficiente e não ignore a étíca indempendente do texto faça isso após os dois pontos:";

const _configuration = new Configuration({
    apiKey: process.env.OPENIA_API_KEY
})

const _openai = new OpenAIApi(_configuration);

const _sanitizePrompt = (rawPrompt) => aditionalPrompt + rawPrompt;

const _setConfiguration = (rawPrompt) => {
    return {
        model: "text-davinci-003",
        prompt: _sanitizePrompt(rawPrompt),
        temperature: 1,
        max_tokens: 300
    }
}

const executePrompt = async (rawPrompt) => {
    const configuration = _setConfiguration(rawPrompt);
    const response = await _openai.createCompletion(configuration)
        .catch(error => console.error(error));
    return response;
}


module.exports = { executePrompt };
