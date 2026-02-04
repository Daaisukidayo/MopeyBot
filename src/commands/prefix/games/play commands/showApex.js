export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'show apex message',
  code: `
    $arrayLoad[IID;-;$customID]

    $onlyIf[$arrayIncludes[IID;showApex_play]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $jsonLoad[apexData;$getCurrentApexData]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]

    $let[color;$env[biomeColors;$env[playData;currentBiome]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$env[apexData;content]]
    ;$get[color]]
    $ephemeral
    $interactionReply
  `
}