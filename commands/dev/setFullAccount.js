module.exports = {
  name: "setfullaccount",
  aliases: ["sfa"],
  type: "messageCreate",
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;devMode]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]

    $arrayForEach[shopItems;item;
      $!jsonSet[userProfile;userPacks;$env[item;name];true]
    ]
    
    $setUserVar[userProfile;$env[userProfile]]
    # ✅ Successfully gave you all packs!
  `
}