import historySorting from "../../../JSfunctions/history/sorting.js"
import historyTimeout from "../../../JSfunctions/history/timeout.js"
import historyEmbed from "../../../JSfunctions/history/embed.js"
import JSON from "../../../JSfunctions/luck challenge/jsonForChallengeAndHistory.js"

export default {
  name: "history",
  aliases: ["his"],
  type: "messageCreate",
  description: "history",
  code: `
    $reply
    ${JSON()}
    $callFunction[checking]
    $callFunction[cooldown;1m]
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

    ${historySorting()}
    ${historyEmbed()}
    $let[msg;$sendMessage[$channelID;;true]]
    ${historyTimeout()}
  `
}