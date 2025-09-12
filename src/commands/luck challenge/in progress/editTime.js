import challengeSnippets from '#snippets/challengeSnippets.js'

export default {
  name: "edittime",
  aliases: ["etime", "et"],
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}
    $onlyIf[$or[$and[$isNumber[$message];$message>=0;$message<3600];$checkContains[$message;:]];
      $callFunction[embed;error] 
      $description[## Your time must be:\n### Bigger than or equal to 0\n### Lower than 3600\n# Or\n### In format «\`MM:SS\`»]
    ]
    
    $if[$checkContains[$message;:];
      $let[res;$round[$math[$unparseDigital[00:$message] / 1000]]]
    ;
      $let[res;$message]
    ]
    $setUserVar[1htime|$channelID;$get[res]]
    

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[## $callFunction[showTime;$authorID]]
    ;$getGlobalVar[luckyColor]]
  `
}