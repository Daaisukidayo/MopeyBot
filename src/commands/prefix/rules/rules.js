export default {
  name: "rules",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $description[# $hyperlink[$tl[ui.rules.information];https://github.com/Daaisukidayo/MopeyBot/blob/main/README.md]
    # $hyperlink[$tl[ui.rules.tos];https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md]
    # $hyperlink[$tl[ui.rules.privacyPolicy];https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md#-privacy-policy]
    # $hyperlink[$tl[ui.rules.rules];https://github.com/Daaisukidayo/MopeyBot/blob/main/Rules.md]]
    $addEmbed[lucky]
  `
}