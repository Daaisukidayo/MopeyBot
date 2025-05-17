module.exports = [{
  name: "rules",
  type: "messageCreate",
  code: `
    $reply

    $let[cdTime;5s]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $getGlobalVar[author]
    $description[# $hyperlink[Information;https://github.com/Daaisukidayo/MopeyBot/blob/main/README.md]
    # $hyperlink[Terms of Service;https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md]
    # $hyperlink[Privacy Policy;https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md#-privacy-policy]
    # $hyperlink[Rules;https://github.com/Daaisukidayo/MopeyBot/blob/main/Rules.md]]
    $color[$getGlobalVar[luckyColor]]
  `
}]