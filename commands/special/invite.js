module.exports = [{ name: "invite", aliases: ["inv"], type: "messageCreate", code: `
$reply

$let[cdTime;5s]
$callFunction[checking;]
$callFunction[cooldown;$get[cdTime]]


$addField[__Invite URL__;[Click\](https://discord.com/oauth2/authorize?client_id=693088307285983254)]
$addField[__Official Discord Server__;[Click\](https://discord.gg/FE4dqGD)]
$addField[__Top.gg__;[Click\](https://top.gg/bot/693088307285983254)]
$color[ffd700]
$author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]

`}]