import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addArenaOpponent",
  description: "sets up an arena opponent w/ a random wardrobe and adds the arena intro + action buttons",
  brackets: true,
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
    {
      name: "opponentId",
      description: "the opponent's animal ID",
      type: ArgType.String,
    },
    {
      name: "opponentTier",
      description: "the opponent's tier (any existing one, 1-17)",
      type: ArgType.Number,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $let[oppWrI;$arrayRandomIndex[$getAnimalInfo[$env[opponentId];skins]]]
    $let[oppDisplay;$getAnimalInfo[$env[opponentId];name;$get[oppWrI]]]
    $let[thumbnail;$animalImage[$env[opponentId];$get[oppWrI]]]
    $let[opponentXP;$random[$jsonGet[xpPerTier;$env[opponentTier];0];$jsonGet[xpPerTier;$env[opponentTier];1]]]

    $callMethod[playData;meetOpponent;$env[opponentId];$get[oppWrI];$env[opponentTier];$get[opponentXP]]

    $addSection[
      $addThumbnail[$get[thumbnail]]
      $addTextDisplay[$tl[ui.play.arena.wentInArena.$get[l];$get[oppDisplay]]]
    ]
    $addArenaActionButtons[playData]
    $addArenaDevMenu[playData]
  `,
})
