import raresList from "../../../JSfunctions/luck challenge/raresList.js";
import JSON from '../../../JSfunctions/luck challenge/jsonForChallengeAndHistory.js'
import isActiveChallenge from '../../../JSfunctions/luck challenge/isActiveChallenge.js'
import loadLobbyVars from '../../../JSfunctions/lobby/loadVars.js'

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: "confirmation of ending challenge",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;confirmEndingChallenge]]
    ${JSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${isActiveChallenge()}
    ${loadLobbyVars()}
    ${raresList()}
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[lobbyTags;$env[lobby;tags]]
    $timezone[$env[userProfile;timezone]]


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
    $interactionUpdate

    $c[============== ADDING HISTORY ==============]

    $arrayLoad[tags]
    $let[difficulty;none]

    $if[$env[challengeProgress;teamID]!=-1;
      $let[playType;Party]
      $if[$env[lobby;difficulty]!=;
        $let[difficulty;$env[lobby;difficulty]]
      ]
      $if[$arrayIncludes[lobbyTags;unlimitedRares];
        $arrayPush[tags;unlimitedRares]
      ]
    ;
      $let[playType;Solo]
      $if[$arrayIncludes[userSettings;difficulties];
        $let[difficulty;$env[userProfile;1hl;difficulty]]
      ]
      $if[$arrayIncludes[userSettings;unlimitedRares];
        $arrayPush[tags;unlimitedRares]
      ]
    ]

    $arrayPushJSON[history;{
      "points": $env[challengeProgress;points],
      "rares": $env[challengeProgress;rares],
      "endedAt": $getTimestamp,
      "playType": "$get[playType]",
      "tags": $env[tags],
      "difficulty": "$get[difficulty]",
      "raresList": $env[challengeProgress;list]
    }]
    $!jsonSet[userProfile;1hl;history;$env[history]]
    $setUserVar[userProfile;$env[userProfile]]

    $if[$getChannelVar[lobby]==;
      $callFunction[resetVars]
    ;
      $!jsonSet[challengeProgress;started;false]
      $setUserVar[challengeProgress|$channelID;$env[challengeProgress]]
      $callFunction[lobbyEnd]
    ]
  `
}