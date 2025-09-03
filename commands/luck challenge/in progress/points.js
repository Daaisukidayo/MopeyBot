import JSON from '../../../JSfunctions/luck challenge/jsonForChallengeAndHistory.js'
import raresList from '../../../JSfunctions/luck challenge/raresList.js'

export default {
  name: "points",
  aliases: ["pts", "score", "scr"],
  type: "messageCreate",
  code: `
    $reply
    ${JSON()}
    $callFunction[checking]

    $let[id;$authorID]
    $if[$default[$mentioned[0];$message[0]]!=;
      $let[id;$default[$mentioned[0];$message[0]]]
    ]
    $jsonLoad[userProfile;$getUserVar[userProfile;$get[id]]]

    $onlyIf[$userExists[$get[id]];
      $callFunction[newError;Invalid User ID]
    ]

    $jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID;$get[id]]]

    $onlyIf[$env[challengeProgress;started];
      $callFunction[newError;$if[$get[id]!=$authorID;__$username[$get[id]]__ doesn't;You don't] have an active challenge]
    ]

    ${raresList("$get[id]")}    

    $addContainer[
      $addSection[
        $addTextDisplay[## $username[$get[id]] • MUID: $env[userProfile;MUID]]
        $addThumbnail[$userAvatar[$get[id]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showPoints;$get[id]]]
      $addTextDisplay[## $callFunction[showRares;$get[id]]]
      $addSeparator[Large]
      $callFunction[listDesign;content]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showTime;$get[id]]]
    ;$getGlobalVar[luckyColor]]
  `
}