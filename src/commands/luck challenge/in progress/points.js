import challengeSnippets from '#snippets/challengeSnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "points",
  aliases: ["pts", "score", "scr"],
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.loadGJSON()}
    ${universalSnippets.checkProfile({addCooldown: false})}

    $let[id;$authorID]
    $if[$default[$mentioned[0];$message[0]]!=;
      $let[id;$default[$mentioned[0];$message[0]]]
      ${universalSnippets.loadProfile('$get[id]')}
    ]

    $onlyIf[$userExists[$get[id]];
      $callFunction[newError;Invalid User ID]
    ]

    $jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID;$get[id]]]

    $onlyIf[$env[challengeProgress;started];
      $callFunction[newError;$if[$get[id]!=$authorID;__$username[$get[id]]__ does not;You do not] have an active challenge]
    ]

    $jsonLoad[raresList;$env[challengeProgress;list]]
    ${challengeSnippets.listGenerator()}    

    $addContainer[
      $addSection[
        $addTextDisplay[## $username[$get[id]] • MUID: $env[userProfile;MUID]]
        $addThumbnail[$userAvatar[$get[id]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showPoints;$get[id]]]
      $addTextDisplay[## $callFunction[showRares;$get[id]]]
      $addSeparator[Large]
      ${challengeSnippets.listDesign()}
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showTime;$get[id]]]
    ;$getGlobalVar[luckyColor]]
  `
}