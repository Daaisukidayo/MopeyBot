import historySnippets from "#snippets/historySnippets.js"
import universalSnippets from "#snippets/universalSnippets.js"
import challengeSnippets from '#snippets/challengeSnippets.js'

export default {
  name: "history",
  aliases: ["his"],
  type: "messageCreate",
  description: "history",
  code: `
    $reply
    ${challengeSnippets.loadGJSON()}
    ${universalSnippets.checkProfile({time: '1m'})}
    $jsonLoad[history;$env[userProfile;1hl;history]]

    $let[page;1]
    $let[sortType;date]
    $onlyIf[$arrayLength[history]!=0;
      $addContainer[
        $callFunction[newAuthor]
        $addSeparator[Large]
        $addTextDisplay[## You haven't completed any challenge!]
      ;$getGlobalVar[luckyColor]]
    ]

    ${historySnippets.sorting()}
    ${historySnippets.historyEmbed()}
    $let[msg;$sendMessage[$channelID;;true]]
    ${historySnippets.timeout()}
  `
}