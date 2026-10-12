import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "updateXpOnDeath",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String
    }
  ],
  code: `
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]

    $if[$and[$jsonGet[playData;tier]==17;$includes[$toLowerCase[$jsonGet[playData;currentAnimal]];kingdragon]];
      $!jsonSet[playData;XP;0]
    ;
      $!jsonSet[playData;XP;$floor[$math[$jsonGet[playData;XP] / $random[1.5;2.15;true]]]]
    ]
  `
})
