# Wp-bot
Whatsapp bot

### Commits convention.
* Always use dot `.` at the end of commit. 
* API relevant changes
    * `feat` Commits, that adds a new feature
    * `fix` Commits, that fixes a bug
* `refactor` Commits, that rewrite/restructure your code, however does not change any behaviour
    * `perf` Commits are special `refactor` commits, that improve performance
* `style` Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
* `test` Commits, that add missing tests or correcting existing tests
* `docs` Commits, that affect documentation only
* `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
* `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
* `chore` Miscellaneous commits e.g. modifying `.gitignore`
  
### Used technologies
* `Node.js (v14.17.6)`


* `npm (v6.14.15)`


* `whatsapp-web.js (v1.19.5)`


* `dotenv (v16.0.3)`


* `openai (v3.2.1)`


* `qrcode-terminal (v0.12.0)`

### Installation
* Clone this repository on your local machine using the command git clone https://github.com/r3c4-d3v/wp-bot.git.


* Navigate to the root directory of the project and run the command npm install to install the necessary dependencies.
Configuration


* Rename .env.example file to .env file in the project root directory and fill it with OpenIA key.