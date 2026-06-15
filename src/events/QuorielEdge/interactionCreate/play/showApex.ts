export default {
  name: "play_showApexes",
  type: "interactionCreate",
  allowed: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
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