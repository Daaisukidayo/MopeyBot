module.exports = {
  name: "setfullaccount",
  aliases: ["sfa"],
  type: "messageCreate",
  code: `
    $onlyIf[$getUserVar[dev]]
    $jsonLoad[userPacks;$getUserVar[userPacks]]
    $jsonLoad[shopItems;$getUserVar[shopItems]]

    $arrayForEach[shopItems;item;
      $!jsonSet[userPacks;$env[item;name];true]
    ]
    
    $setUserVar[userPacks;$env[userPacks]]
    # ✅ Successfully gave you all packs!
  `
}