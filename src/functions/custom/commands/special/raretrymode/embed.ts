import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'raretrymodeEmbed',
  code: `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretrymode.title.$get[l]]]

      $forOf[modes;mode;
        $if[$math[$env[i] % 3]==0;
          $addActionRow
        ]

        $addButton[rtMode-$env[mode]-$authorID;$tl[data.raretryModes.$env[mode].$get[l]];Success;;$checkCondition[$env[userProfile;rtMode]==$env[mode]]]
      ;i]
    ;$getGlobalVar[luckyColor]]
  `
})