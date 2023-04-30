module.exports = {
    apps: [
        {
            name: "wp-bot",
            script: "index.js",
            interpreter: "/usr/bin/node",
            interpreter_args: '--experimental-modules -r esm'
        },
    ],
};