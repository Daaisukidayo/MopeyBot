import { Command } from "@quoriel/edge"

export default new Command({
  name: "rolls",
  type: "interactionCreate",
  allowed: ["button", "stringSelect"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $c[id: rolls-prevPage-game-page-author. the menu switches game, back to page 1]
    $switch[$jsonGet[IID;1];
      $case[prevPage;$let[game;$jsonGet[IID;2]] $let[page;$math[$jsonGet[IID;3] - 1]]]
      $case[nextPage;$let[game;$jsonGet[IID;2]] $let[page;$math[$jsonGet[IID;3] + 1]]]
      $case[game;$let[game;$selectMenuValues] $let[page;1]]
    ]
    $onlyIf[$get[game]!=;$deferUpdate]

    $new[rolls;Rolls;$authorID]
    $rollsEmbed[rolls;$get[game];$get[page]]
    $interactionUpdate
    $newCommandTimeout[rolls]
  `,
})
