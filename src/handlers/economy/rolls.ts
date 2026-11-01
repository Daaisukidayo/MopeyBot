import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleRolls",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $c[first game by default, or pick one by command name, number or localized name]
    $jsonLoad[games;$getGlobalVar[rollGames]]
    $let[game;$toLowerCase[$nullish[$option[game];$message[0];$jsonGet[games;0]]]]
    $if[$arrayIncludes[games;$get[game]]==false;
      $let[game;$pickLocalizedOption[data.rollGames;$get[game];$env[games];ui.rolls.unknownGame]]
    ]

    $addCooldown
    $defer

    $new[rolls;Rolls;$authorID]
    $rollsEmbed[rolls;$get[game];1]
    $newCommandTimeout[rolls]
  `,
})
