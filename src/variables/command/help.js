export default {
  helpCategories: [0, 1, 2, 4],
  
  helpReplacements: [
    ["{PREFIX}", "$get[prefix]"],
    ["{MAX_PARTICIPANTS}", "$get[maxParticipants]"],
    ["{BRACKETS_INFO}", "$codeBlock[$arrayJoin[bracketsInfo;\n]]"],
    ["{PUMPKINS_RARITIES}", "$codeBlock[$arrayJoin[pumpkinRarities;\n];JSON]"],
    ["{BEACHBALLS_RARITIES}", "$codeBlock[$arrayJoin[beachballRarities;\n];JSON]"],
    ["{UMBRELLAS_RARITIES}", "$codeBlock[$arrayJoin[umbrellaRarities;\n];JSON]"],
    ["{HYPERLINK_TIMEZONES}", "$get[timezonesHyperlink]"],
    ["{EMOJI}", "$get[emoji]"],
    ["{MAX_COINFLIP_BET}", "$separate[$get[maxCoinflipBet]]"],
    ["{MAX_SLOTS_BET}", "$separate[$get[maxSlotsBet]]"],
    ["{AVAILABLE_LOCALES}", "$codeBlock[$arrayJoin[locales;\n];MD]"]
  ]
}