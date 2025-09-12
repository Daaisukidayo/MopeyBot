import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "rules",
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '10s'})}

    $description[# $hyperlink[Information;https://github.com/Daaisukidayo/MopeyBot/blob/main/README.md]
    # $hyperlink[Terms of Service;https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md]
    # $hyperlink[Privacy Policy;https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md#-privacy-policy]
    # $hyperlink[Rules;https://github.com/Daaisukidayo/MopeyBot/blob/main/Rules.md]]
    $callFunction[embed;lucky]
  `
}