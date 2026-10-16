import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "raretrymodeEmbed",
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretrymode.title.$get[l]]]

      $c[Three buttons in a row]
      $arrayForEach[$getGlobalVar[raretryModes];mode;
        $if[$math[$env[i] % 3]==0;
          $addActionRow
        ]

        $addButton[rtMode-$env[mode]-$authorID;$tl[data.raretryModes.$env[mode].$get[l]];Success;;$checkCondition[$jsonGet[userProfile;rtMode]==$env[mode]]]
      ;i]
    ;$getGlobalVar[luckyColor]]
  `,
})
