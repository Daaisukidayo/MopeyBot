import JSON from '../../../JSfunctions/luck challenge/jsonForChallengeAndHistory.js'
import listGenerator from '../../../JSfunctions/luck challenge/listGenerator.js'
import raresList from '../../../JSfunctions/luck challenge/raresList.js'
import isActiveChallenge from '../../../JSfunctions/luck challenge/isActiveChallenge.js'

export default {
  name: "end",
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    ${JSON()}
    ${raresList()}
    ${listGenerator()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# 1 Hour Luck Ended!]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showPoints]]
      $addTextDisplay[## $callFunction[showRares]]
      $addSeparator[Large]
      $callFunction[listDesign]
    ;$getGlobalVar[luckyColor]]
    $sendMessage[$channelID]
    
    $if[$getChannelVar[lobby]==;
      $callFunction[resetVars]
    ;
      $!jsonSet[challengeProgress;started;false]
      $setUserVar[challengeProgress|$channelID;$env[challengeProgress]]
      $!stopInterval[1HLUCK-$authorID|$channelID]
      $deleteUserVar[1htime|$channelID]
      $callFunction[lobbyEnd]
    ]
  `
}