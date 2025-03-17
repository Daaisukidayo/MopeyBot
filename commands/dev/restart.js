module.exports = ({
    name: "restart",
    type: "messageCreate",
    code: `

    $onlyIf[$authorID==$botOwnerID]
    Shutting down the bot and turning it on in a few seconds.
    $setTimeout[$exec[$escapeCode[if [[ -d .git \]\] && [[ 1 == "1" \]\]; then git pull; fi; if [[ ! -z \${NODE_PACKAGES} \]\]; then /usr/local/bin/npm install \${NODE_PACKAGES}; fi; if [[ ! -z \${UNNODE_PACKAGES} \]\]; then /usr/local/bin/npm uninstall \${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json \]; then /usr/local/bin/npm install; fi; if [[ ! -z "\${START_BASH_FILE}" \]\]; then bash \${START_BASH_FILE}; else /usr/local/bin/node /home/container/index.js; fi;]];10s]
    $botDestroy
    `
})