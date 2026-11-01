import { Command } from "@quoriel/edge"

export default new Command({
  name: "halloffame",
  type: "interactionCreate",
  allowed: ["button", "stringSelect"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $c[id: halloffame-prevPage-filter-page-author. the menu filters by game, back to page 1]
    $switch[$jsonGet[IID;1];
      $case[prevPage;$let[filter;$jsonGet[IID;2]] $let[page;$math[$jsonGet[IID;3] - 1]]]
      $case[nextPage;$let[filter;$jsonGet[IID;2]] $let[page;$math[$jsonGet[IID;3] + 1]]]
      $case[filter;$let[filter;$selectMenuValues] $let[page;1]]
    ]
    $onlyIf[$get[filter]!=;$deferUpdate]

    $hallOfFameEmbed[$get[filter];$get[page]]
    $interactionUpdate
    $newCommandTimeout[halloffame]
  `,
})
