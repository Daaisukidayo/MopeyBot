module.exports = [{
  name: "invite",
  aliases: ["inv"],
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $title[Invite links]
    $description[## $hyperlink[Invite URL;https://discord.com/oauth2/authorize?client_id=693088307285983254]
    ## $hyperlink[Official Discord Server;https://discord.gg/FE4dqGD]
    ## $hyperlink[Top.gg;https://top.gg/bot/693088307285983254]]
    $color[$getGlobalVar[defaultColor]]
    $getGlobalVar[author]
  `
}];
