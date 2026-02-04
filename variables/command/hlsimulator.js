export const hlsimulatorVariables = {
  hlSimKey: [
    ["pigeon", "whiteDove"], 
    ["pig", "pinkyPig", "stinkyPig"],
    ["deer", "doe", "marshDeer"],
    ["reindeer", "muskDeer"],
    ["swinehoe", "goldenPheasant"],
    ["donkey", "jackass"],
    ["macaw", "blueMacaw", "rareMacaw"],
    ["giraffe", "momaffie", "momaffieFamily", "girabie"],
    ["cheetah", "jaguar", "leopard", "blackPanther"],
    ["toucan", "chocoToucan", "keelBilledToucan", "fieryToucan", "lavaToucan", "rareToucan"],
    ["pufferfish", "yellowPufferfish", "demonPufferfish"],
    ["tiger", "whiteTiger"],
    ["lion", "lioness", "lionCub", "blackManedLion", "whiteLionCub", "whiteLioness", "whiteLion", "blackLionCub", "blackLioness", "blackLion"],
    ["falcon", "predator", "shaheen"],
    ["vulture", "rareVulture"],
    ["rhino", "whiteRhino", "blackRhino"],
    ["baldEagle", "goldenEagle", "harpyEagle", "greaterSpottedEagle"],
    [null, "markhor", "bigGoat"],
    [null, "whiteGiraffe", "giraffeFamily"],
    ["yeti", "aquaYeti"],
    [null, "rareBigfoot", "shopBigfoot"],
    [null, "rareSnowman", "shopSnowman"],
    [null, "rareSnowgirl", "shopSnowgirl"],
    ["blackDragon", "rareKingDragon"]
  ],

  hlSimAttempts: [
    [["pigeon", "pig", "deer", "reindeer", "swinehoe"], 1],
    [["donkey", "macaw"], "$random[75;250]"],
    [["giraffe"], "$random[50;100]"],
    [["cheetah", "toucan", "pufferfish"], "$random[75;250]"],
    [["tiger"], "$random[75;250]"],
    [["lion", "falcon", "vulture"], "$random[75;250]"],
    [["rhino", "baldEagle", "markhor"], "$random[10;50]"],
    [["whiteGiraffe"], "$random[3;10]"],
    [["yeti", "rareBigfoot", "rareSnowman", "rareSnowgirl"], "$random[0;3]"],
    [["blackDragon"], "$random[0;2]"]
  ]
}