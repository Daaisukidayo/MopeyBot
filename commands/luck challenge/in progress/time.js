import isActiveChallenge from '../../../JSfunctions/luck challenge/isActiveChallenge.js'
export default {
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $if[$env[challengeProgress;paused];
        $addTextDisplay[## Status: Paused]
        $addSeparator[Large]
      ]
      $addTextDisplay[## $callFunction[showTime;$authorID]]
    ;$getGlobalVar[luckyColor]]
  `
}