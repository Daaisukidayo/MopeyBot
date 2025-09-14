import challengeSnippets from '#snippets/challengeSnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "edittime",
  aliases: ["etime", "et"],
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}
    ${universalSnippets.checkProfile({addCooldown: false})}

    $onlyIf[$or[$and[$isNumber[$message];$message>=0;$message<3600];$checkContains[$message;:]];
      $callFunction[embed;error] 
      $description[## Your time must be:\n### Bigger than or equal to 0\n### Lower than 3600\n# Or\n### In format «\`MM:SS\`»]
    ]
    
    $if[$checkContains[$message;:];
      $let[res;$round[$math[$unparseDigital[00:$message] / 1000]]]
    ;
      $let[res;$message]
    ]

    $if[$getUserVar[1htime|$channelID]==3600;${challengeSnippets.interval()}]
    $setUserVar[1htime|$channelID;$get[res]]
    

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[## $callFunction[showTime;$authorID]]
    ;$getGlobalVar[luckyColor]]
  `
}